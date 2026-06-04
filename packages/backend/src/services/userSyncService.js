/**
 * User Sync Service
 * 
 * Manages synchronization between database (source of truth) and Suprema devices.
 * The database is the centralized data source for all users and card assignments.
 */

import { decodeHexToDecimal, normalizeToHex } from '../core/utils/cardUtils.js';

// PrismaClient is injected via constructor to avoid duplicate connections.

/**
 * Returns true when a gRPC error is a Suprema BS_ERR_DUPLICATE_CARD error.
 * These arise when a card is already physically assigned to another user on the device.
 */
function isDuplicateCardError(err) {
    return (
        err?.code === 13 &&
        typeof err?.details === 'string' &&
        err.details.includes('BS_ERR_DUPLICATE_CARD')
    );
}

class UserSyncService {
    /**
     * @param {Object} userService
     * @param {Object} connectionService
     * @param {Object} [logger]
     * @param {Object} [options]
     * @param {import('@prisma/client').PrismaClient} [options.prisma] - Shared PrismaClient
     * @param {Object} [options.biometricService] - Optional biometric service for blacklist queries
     * @param {Object} [options.enrollmentService] - EnrollmentService for single-path card writes
     */
    constructor(userService, connectionService, logger, options = {}) {
        this.userService = userService;
        this.connectionService = connectionService;
        this.logger = logger || console;
        this.prisma = options.prisma || connectionService.database?.getPrisma();
        this.biometricService = options.biometricService || null;
        this.enrollmentService = options.enrollmentService || null;
        this._autoSyncInterval = null;
        this._autoSyncIntervalMs = null;
        this._autoImportInterval = null;
        this._autoImportIntervalMs = null;
        this._autoImportRunning = false;
        this._onAutoImportDeviceConnected = null;
        this._lastDeviceImportAt = new Map();
        this._deviceImportCooldownMs = 30000;

        if (!this.prisma) {
            throw new Error('UserSyncService requires a PrismaClient');
        }
    }

    /**
     * Get all users from database with their card assignments
     * This is the primary data source
     * @param {string|number|null} deviceId - Optional device filter
     * @param {Object} [options] - Pagination and search options
     * @param {number} [options.page] - Page number (1-based)
     * @param {number} [options.limit] - Items per page
     * @param {string} [options.search] - Search by name or employee ID
     * @param {string} [options.status] - Filter by card status
     * @returns {Promise<{users: Array, total: number, page: number, limit: number}>}
     */
    async getUsersFromDB(deviceId = null, options = {}) {
        try {
            const { page, limit, search, status } = options;
            const isPaginated = page && limit;

            const whereClause = {};

            // Device filter
            if (deviceId) {
                whereClause.enrollments = {
                    some: {
                        deviceId: parseInt(deviceId),
                        status: { in: ['active', 'pending'] }
                    }
                };
            }

            // Status filter (default: active only for backward compat)
            if (status) {
                whereClause.status = status;
            } else if (!status && !options._allStatuses) {
                whereClause.status = 'active';
            }

            const queryOptions = {
                where: whereClause,
                include: {
                    user: true,
                    enrollments: {
                        where: {
                            status: { in: ['active', 'pending'] }
                        },
                        include: {
                            device: true
                        }
                    }
                },
                orderBy: [
                    { assignedAt: 'desc' },
                    { id: 'desc' }
                ]
            };

            const cardAssignments = await this.prisma.cardAssignment.findMany(queryOptions);

            const groupedUsers = this.groupAssignmentsByUser(cardAssignments);
            const users = this.filterGroupedUsers(groupedUsers, search);
            const total = users.length;

            if (isPaginated) {
                const pageNum = Math.max(1, parseInt(page));
                // Cap defensively at 10 000 so a malformed query can't OOM the server,
                // but allow the UI's "All" option (sent as limit=9999) to work.
                const limitNum = Math.min(10000, Math.max(1, parseInt(limit)));
                const startIndex = (pageNum - 1) * limitNum;
                return {
                    users: users.slice(startIndex, startIndex + limitNum),
                    total,
                    page: pageNum,
                    limit: limitNum,
                    totalPages: Math.ceil(total / limitNum)
                };
            }

            return users;
        } catch (error) {
            this.logger.error('Error getting users from DB:', error);
            throw error;
        }
    }

    groupAssignmentsByUser(cardAssignments = []) {
        const groupedUsers = new Map();

        for (const assignment of cardAssignments) {
            const employeeId = assignment.user?.employee_id != null
                ? String(assignment.user.employee_id)
                : String(assignment.user_id || '');
            const groupKey = employeeId ? `employee:${employeeId}` : `unknown:${assignment.id}`;
            const normalizedCardData = this.normalizeCardForStorage(assignment.card_data);

            const cardSummary = {
                id: assignment.id,
                employeeId: employeeId || null,
                employeeName: String(assignment.user?.name || '').trim(),
                cardData: normalizedCardData,
                rawCardData: assignment.card_data == null ? null : String(assignment.card_data),
                cardDecimal: normalizedCardData ? decodeHexToDecimal(normalizedCardData) : '',
                cardCsn: assignment.card_csn || '',
                status: assignment.status,
                assignedAt: assignment.assignedAt,
                enrolledDevices: assignment.enrollments.map((enrollment) => ({
                    deviceId: enrollment.deviceId,
                    deviceName: enrollment.device?.name,
                    deviceUserId: enrollment.deviceUserId,
                    enrolledAt: enrollment.enrolledAt,
                    status: enrollment.status
                }))
            };

            if (!groupedUsers.has(groupKey)) {
                groupedUsers.set(groupKey, {
                    userID: employeeId || `unknown-${assignment.id}`,
                    userId: assignment.user?.id ?? null,
                    employeeId: employeeId || null,
                    code: assignment.user?.code || null,
                    name: '',
                    cards: [],
                    activeCardCount: 0,
                    primaryCard: null,
                    assignedAt: assignment.assignedAt,
                    enrolledDeviceMap: new Map()
                });
            }

            const user = groupedUsers.get(groupKey);

            if (!user.name && cardSummary.employeeName) {
                user.name = cardSummary.employeeName;
            }

            if (!user.code && assignment.user?.code) {
                user.code = assignment.user.code;
            }

            user.cards.push(cardSummary);

            if (cardSummary.status === 'active') {
                user.activeCardCount += 1;
            }

            if (!user.assignedAt || new Date(cardSummary.assignedAt) > new Date(user.assignedAt)) {
                user.assignedAt = cardSummary.assignedAt;
            }

            for (const enrollment of cardSummary.enrolledDevices) {
                const enrollmentKey = String(enrollment.deviceId || '');
                const currentEnrollment = user.enrolledDeviceMap.get(enrollmentKey);

                if (!currentEnrollment || (currentEnrollment.status !== 'active' && enrollment.status === 'active')) {
                    user.enrolledDeviceMap.set(enrollmentKey, enrollment);
                }
            }

            if (this.shouldPromotePrimaryCard(cardSummary, user.primaryCard)) {
                user.primaryCard = cardSummary;
            }
        }

        return Array.from(groupedUsers.values())
            .map((user) => {
                const cards = user.cards.sort((left, right) => {
                    if (this.shouldPromotePrimaryCard(left, right)) return -1;
                    if (this.shouldPromotePrimaryCard(right, left)) return 1;
                    return 0;
                });

                const statusSummary = cards.reduce((summary, card) => {
                    const key = String(card.status || 'unknown');
                    summary[key] = (summary[key] || 0) + 1;
                    return summary;
                }, {});

                const primaryCard = cards[0] || null;

                return {
                    userID: user.userID,
                    userId: user.userId ?? null,
                    employeeId: user.employeeId,
                    code: user.code || null,
                    name: user.name || 'Unknown',
                    isUnknown: !user.name,
                    cardCount: cards.length,
                    activeCardCount: user.activeCardCount,
                    inactiveCardCount: Math.max(0, cards.length - user.activeCardCount),
                    cards,
                    cardData: primaryCard?.cardData || null,
                    rawCardData: primaryCard?.rawCardData || null,
                    cardDecimal: primaryCard?.cardDecimal || '',
                    status: primaryCard?.status || 'unknown',
                    statusSummary,
                    statusSummaryLabel: this.formatUserStatusSummary(statusSummary),
                    assignedAt: user.assignedAt,
                    enrolledDevices: Array.from(user.enrolledDeviceMap.values())
                };
            })
            .sort((left, right) => new Date(right.assignedAt || 0) - new Date(left.assignedAt || 0));
    }

    filterGroupedUsers(users = [], search = '') {
        const term = String(search || '').trim().toLowerCase();
        if (!term) {
            return users;
        }

        return users.filter((user) => {
            if (String(user.userID || '').toLowerCase().includes(term)) return true;
            if (String(user.userId ?? '').toLowerCase().includes(term)) return true;
            if (String(user.employeeId || '').toLowerCase().includes(term)) return true;
            if (String(user.code || '').toLowerCase().includes(term)) return true;
            if (String(user.name || '').toLowerCase().includes(term)) return true;
            if (String(user.statusSummaryLabel || '').toLowerCase().includes(term)) return true;

            return (user.cards || []).some((card) => {
                if (String(card.cardType || '').toLowerCase().includes(term)) return true;
                if (String(card.status || '').toLowerCase().includes(term)) return true;
                if (String(card.cardData || '').toLowerCase().includes(term)) return true;
                if (String(card.rawCardData || '').toLowerCase().includes(term)) return true;
                if (String(card.cardDecimal || '').includes(term)) return true;
                return false;
            });
        });
    }

    shouldPromotePrimaryCard(candidate, current) {
        if (!candidate) return false;
        if (!current) return true;

        const statusRank = (status) => {
            if (status === 'active') return 3;
            if (status === 'pending') return 2;
            if (status === 'lost') return 1;
            return 0;
        };

        const candidateRank = statusRank(candidate.status);
        const currentRank = statusRank(current.status);
        if (candidateRank !== currentRank) {
            return candidateRank > currentRank;
        }

        return new Date(candidate.assignedAt || 0) > new Date(current.assignedAt || 0);
    }

    formatUserStatusSummary(statusSummary = {}) {
        const orderedStatuses = ['active', 'pending', 'revoked', 'lost', 'expired', 'unknown'];
        const labels = [];

        for (const status of orderedStatuses) {
            if (!statusSummary[status]) continue;
            labels.push(`${statusSummary[status]} ${status}`);
        }

        for (const [status, count] of Object.entries(statusSummary)) {
            if (orderedStatuses.includes(status)) continue;
            labels.push(`${count} ${status}`);
        }

        return labels.join(', ');
    }

    /**
     * Get users from a specific device
     */
    async getUsersFromDevice(deviceId) {
        try {
            const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
            const userHeaders = await this.userService.getUserList(supremaDeviceId);
            
            // Get cards for users who have them
            const userIdsWithCards = userHeaders
                .filter(h => h.numofcard > 0)
                .map(h => h.id);
            
            let userCards = [];
            if (userIdsWithCards.length > 0) {
                try {
                    userCards = await this.userService.getCards(supremaDeviceId, userIdsWithCards);
                } catch (cardError) {
                    this.logger.warn('Failed to fetch cards from device:', cardError.message);
                }
            }

            // Build card map
            const cardMap = new Map();
            for (const uc of userCards) {
                const userId = String(uc.userid);
                const cards = uc.cardslist || uc.cardsList || [];
                cardMap.set(userId, cards);
            }

            // Transform to standard format
            const users = userHeaders.map(header => {
                const cards = (cardMap.get(String(header.id)) || []).map((card) => {
                    const normalizedCardData = this.normalizeCardForStorage(card?.data);
                    return {
                        ...card,
                        data: normalizedCardData
                    };
                });
                const normalizedCardData = cards.length > 0 ? cards[0].data : null;
                return {
                    userID: header.id,
                    name: header.name || '',
                    numOfCard: header.numofcard || 0,
                    cardsList: cards,
                    hasCard: cards.length > 0 && !!normalizedCardData,
                    cardData: normalizedCardData,
                    source: 'device'
                };
            });

            return users;
        } catch (error) {
            this.logger.error('Error getting users from device:', error);
            throw error;
        }
    }

    getNormalizedDatabaseCardSet(user) {
        const cards = Array.isArray(user?.cards) && user.cards.length > 0
            ? user.cards
            : (user?.cardData ? [{ cardData: user.cardData }] : []);

        return new Set(
            cards
                .map((card) => this.normalizeCardData(card?.cardData ?? card?.data ?? card))
                .filter(Boolean)
        );
    }

    getNormalizedDeviceCardSet(user) {
        const cards = Array.isArray(user?.cardsList) && user.cardsList.length > 0
            ? user.cardsList
            : Array.isArray(user?.cards) && user.cards.length > 0
                ? user.cards
                : (user?.cardData ? [{ data: user.cardData }] : []);

        return new Set(
            cards
                .map((card) => this.normalizeCardData(card?.data ?? card?.cardData ?? card))
                .filter(Boolean)
        );
    }

    areNormalizedCardSetsEqual(leftSet, rightSet) {
        if (leftSet.size !== rightSet.size) {
            return false;
        }

        for (const cardData of leftSet) {
            if (!rightSet.has(cardData)) {
                return false;
            }
        }

        return true;
    }

    buildExpectedDeviceCards(assignments = []) {
        const seen = new Set();
        const expectedCards = [];

        for (const assignment of assignments) {
            const normalizedCardData = this.normalizeCardForStorage(assignment?.card_data);
            if (!normalizedCardData || seen.has(normalizedCardData)) {
                continue;
            }

            seen.add(normalizedCardData);
            expectedCards.push({
                cardData: normalizedCardData,
                cardType: this.getCardTypeNumber('CSN'),
                cardSize: 32
            });
        }

        return expectedCards;
    }

    /**
     * Sync ALL: Push database users/cards to all connected devices
     * Database is the source of truth
     */
    async syncDatabaseToAllDevices() {
        const results = [];
        
        try {
            // Get all card assignments from database
            const cardAssignments = await this.prisma.cardAssignment.findMany({
                where: { status: 'active' },
                include: { user: true, enrollments: true }
            });

            this.logger.info(`[SyncAll] Found ${cardAssignments.length} active card assignments in database`);

            // Get all connected devices
            const connectedDevices = await this.connectionService.getConnectedDevices();
            const dbDevices = await this.connectionService.getAllDevicesFromDB();
            
            if (!connectedDevices || connectedDevices.length === 0) {
                return {
                    success: true,
                    message: 'No connected devices',
                    results: []
                };
            }

            this.logger.info(`[SyncAll] Syncing to ${connectedDevices.length} connected devices`);

            for (const device of connectedDevices) {
                const deviceInfo = device.toObject ? device.toObject() : device;
                const supremaDeviceId = deviceInfo.deviceid;
                
                // Find DB device record
                const dbDevice = dbDevices.find(d => {
                    return deviceInfo.ipaddr === d.ip && deviceInfo.port === d.port;
                });
                const dbDeviceId = dbDevice?.id;

                try {
                    const syncResult = await this.syncDatabaseToDevice(
                        supremaDeviceId, 
                        dbDeviceId, 
                        cardAssignments
                    );
                    
                    results.push({
                        deviceId: supremaDeviceId,
                        dbDeviceId: dbDeviceId,
                        deviceName: dbDevice?.name,
                        success: true,
                        ...syncResult
                    });
                } catch (deviceError) {
                    this.logger.error(`[SyncAll] Failed to sync device ${supremaDeviceId}:`, deviceError.message);
                    results.push({
                        deviceId: supremaDeviceId,
                        dbDeviceId: dbDeviceId,
                        deviceName: dbDevice?.name,
                        success: false,
                        error: deviceError.message
                    });
                }
            }

            return {
                success: true,
                totalDevices: connectedDevices.length,
                totalCardAssignments: cardAssignments.length,
                results
            };
        } catch (error) {
            this.logger.error('[SyncAll] Error:', error);
            throw error;
        }
    }

    /**
     * Build (and cache in `indexCache`) a Map<normalizedCardHex, deviceUserId>
     * representing every card currently stored on the device.
     *
     * Doing this ONCE per device per enrollment is dramatically faster than
     * calling findUserWithCard() per conflict (which scans the whole device).
     *
     * @param {string|number} supremaDeviceId
     * @param {Map<string|number, Map<string,string>>|null} indexCache
     * @returns {Promise<Map<string,string>|null>}
     */
    /**
     * Build (and cache) a Set<normalizedCardHex> of cards currently in the
     * device's blacklist. Per Suprema docs, blacklisted cards trigger
     * BS_ERR_DUPLICATE_CARD when an enrollment tries to assign them, even
     * though no user owns them.
     *
     * @param {string|number} supremaDeviceId
     * @param {Map<string|number, Set<string>>|null} cache
     * @returns {Promise<Set<string>|null>}
     */
    async _getDeviceBlacklist(supremaDeviceId, cache) {
        if (cache?.has(supremaDeviceId)) return cache.get(supremaDeviceId);
        if (!this.biometricService?.getCardBlacklist) {
            cache?.set(supremaDeviceId, null);
            return null;
        }

        const set = new Set();
        try {
            const items = await this.biometricService.getCardBlacklist(supremaDeviceId);
            for (const it of items || []) {
                // cardid is bytes (typically the 32-byte right-aligned buffer);
                // protobuf decodes to base64 string or Uint8Array depending on version.
                let hex = '';
                if (typeof it.cardid === 'string') {
                    hex = Buffer.from(it.cardid, 'base64').toString('hex').toUpperCase();
                } else if (it.cardid) {
                    hex = Buffer.from(it.cardid).toString('hex').toUpperCase();
                }
                const normalized = this.userService.normalizeComparableCardHex(hex);
                if (normalized) set.add(normalized);
            }
            this.logger.info(
                `[Blacklist] Device ${supremaDeviceId}: ${set.size} blacklisted card(s)`,
            );
        } catch (err) {
            this.logger.warn(`[Blacklist] Device ${supremaDeviceId}: query failed: ${err.message}`);
            cache?.set(supremaDeviceId, null);
            return null;
        }

        cache?.set(supremaDeviceId, set);
        return set;
    }

    async _getDeviceCardIndex(supremaDeviceId, indexCache) {
        if (indexCache?.has(supremaDeviceId)) return indexCache.get(supremaDeviceId);

        const index = new Map();
        try {
            const userHeaders = await this.userService.getUserList(supremaDeviceId);
            if (!userHeaders || userHeaders.length === 0) {
                this.logger.info(`[CardIndex] Device ${supremaDeviceId}: no users on device`);
                indexCache?.set(supremaDeviceId, index);
                return index;
            }

            // Diagnostic: log the shape of the first header so we can see which
            // protobuf field name carries the card count.
            const sample = userHeaders[0];
            this.logger.info(
                `[CardIndex] Device ${supremaDeviceId}: sample user header keys = ${Object.keys(sample).join(',')}`,
            );

            // Always scan ALL users (not just those with numofcard>0) because
            // Suprema device headers occasionally desync from actual card
            // storage — a user can have numofcard=0 but still hold a card that
            // triggers BS_ERR_DUPLICATE_CARD on a re-enrollment attempt.
            const userIds = userHeaders.map((u) => u.id);
            const BATCH_SIZE = 100;
            let rawCardLogged = false;
            for (let i = 0; i < userIds.length; i += BATCH_SIZE) {
                const batchIds = userIds.slice(i, i + BATCH_SIZE);
                try {
                    const userCards = await this.userService.getCards(supremaDeviceId, batchIds);
                    for (const uc of userCards) {
                        if (!uc.cardsList?.length) continue;
                        for (const card of uc.cardsList) {
                            // One-time diagnostic dump so we can see the actual
                            // shape of a device card object (size, data, type…)
                            if (!rawCardLogged) {
                                rawCardLogged = true;
                                try {
                                    const dataPreview =
                                        typeof card.data === 'string'
                                            ? `b64="${card.data}" (${Buffer.from(card.data, 'base64').toString('hex').toUpperCase()})`
                                            : `bytes=${Buffer.from(card.data || []).toString('hex').toUpperCase()}`;
                                    this.logger.info(
                                        `[CardIndex] Device ${supremaDeviceId}: sample card object keys=${Object.keys(card).join(',')} size=${card.size ?? '?'} type=${card.type ?? '?'} data=${dataPreview}`,
                                    );
                                } catch (_) { /* ignore */ }
                            }

                            const rawHex = this.userService.normalizeDeviceCardHex(card);
                            const normalized = this.userService.normalizeComparableCardHex(rawHex);
                            if (!normalized) continue;
                            const userIdStr = String(uc.userid);
                            if (!index.has(normalized)) index.set(normalized, userIdStr);
                        }
                    }
                } catch (batchErr) {
                    this.logger.warn(
                        `[CardIndex] Device ${supremaDeviceId} batch ${Math.floor(i / BATCH_SIZE) + 1} failed: ${batchErr.message}`,
                    );
                }
            }
            this.logger.info(
                `[CardIndex] Device ${supremaDeviceId}: indexed ${index.size} card(s) from ${userHeaders.length} user(s)`,
            );
        } catch (err) {
            this.logger.warn(`[CardIndex] Device ${supremaDeviceId}: index build failed: ${err.message}`);
            indexCache?.set(supremaDeviceId, null);
            return null;
        }

        indexCache?.set(supremaDeviceId, index);
        return index;
    }

    /**
     * Look up the user that currently owns `cardData`, in priority order:
     *   1. Local DB (other active assignment for the same card)
     *   2. Live device card index (cached per device per call)
     *   3. Local DB by `id = deviceUserId` (to resolve name when device knows the user)
     *
     * Always returns { conflictingUserId, conflictingEmployeeName, conflictingEmployeeId, source }.
     * Fields are null when no info could be obtained.
     *
     * @param {string|number} supremaDeviceId
     * @param {object} cardAssignment  the card we're trying to enroll
     * @param {Map<string|number, Map<string,string>>|null} [indexCache]
     */
    async _resolveCardConflict(supremaDeviceId, cardAssignment, indexCache = null) {
        const targetUserId = cardAssignment.user?.id ?? cardAssignment.user_id;
        const cardHex = cardAssignment.card_data;
        const normalizedTarget = this.userService.normalizeComparableCardHex(cardHex);

        // 1. Try local DB first (fast, O(1))
        try {
            const dbHit = await this.prisma.cardAssignment.findFirst({
                where: {
                    card_data: cardHex,
                    status: 'active',
                    NOT: { user_id: targetUserId },
                },
                include: { user: true },
            });
            if (dbHit) {
                return {
                    conflictingUserId: String(dbHit.user?.id ?? dbHit.user_id),
                    conflictingEmployeeName: dbHit.user?.name || null,
                    conflictingEmployeeId: dbHit.user?.employee_id ?? null,
                    source: 'db',
                };
            }
        } catch (dbErr) {
            this.logger.warn(`[ResolveConflict] DB lookup failed: ${dbErr.message}`);
        }

        // 2. Card not in DB → consult the cached device index.
        // This catches cards enrolled manually on the device.
        const index = await this._getDeviceCardIndex(supremaDeviceId, indexCache);
        const deviceUserId = index?.get(normalizedTarget);
        if (deviceUserId) {            // Try to look up that device user in our DB by id (PK) for a friendly name
            let employeeName = null;
            let employeeId = null;
            try {
                const dbUser = await this.prisma.user.findFirst({
                    where: { id: Number(deviceUserId) },
                });
                if (dbUser) {
                    employeeName = dbUser.name;
                    employeeId = dbUser.employee_id;
                }
            } catch (_) { /* ignore PK mismatch */ }

            return {
                conflictingUserId: String(deviceUserId),
                conflictingEmployeeName: employeeName || `Device user ${deviceUserId}`,
                conflictingEmployeeId: employeeId,
                source: employeeName ? 'device+db' : 'device',
            };
        }

        // Diagnostic: index built but target card missing — log sample keys once
        // so we can spot any hex-format mismatch between DB and device.
        if (index && index.size > 0 && !indexCache?._diagLogged?.has(supremaDeviceId)) {
            const sampleKeys = Array.from(index.keys()).slice(0, 3);
            this.logger.warn(
                `[ResolveConflict] Device ${supremaDeviceId}: target card "${normalizedTarget}" not in device index (${index.size} entries). Sample device hexes: [${sampleKeys.join(', ')}]`,
            );
            if (indexCache) {
                if (!indexCache._diagLogged) indexCache._diagLogged = new Set();
                indexCache._diagLogged.add(supremaDeviceId);
            }
        }

        // 3. Card not in DB and not on any device user → check the blacklist.
        // Per Suprema docs, blacklisted cards trigger BS_ERR_DUPLICATE_CARD.
        // Reuse the index cache map for blacklist storage (different key shape
        // so they don't collide — we use a sub-key).
        if (!indexCache?._blacklistCache) {
            if (indexCache) indexCache._blacklistCache = new Map();
        }
        const blacklist = await this._getDeviceBlacklist(
            supremaDeviceId,
            indexCache?._blacklistCache,
        );
        if (blacklist?.has(normalizedTarget)) {
            return {
                conflictingUserId: null,
                conflictingEmployeeName: 'Card is blacklisted on this device',
                conflictingEmployeeId: null,
                source: 'blacklist',
            };
        }

        return {
            conflictingUserId: null,
            conflictingEmployeeName: null,
            conflictingEmployeeId: null,
            source: 'unknown',
        };
    }

    /**
     * Build a ProcessService conflict object for a duplicate-card situation.
     */
    _buildConflictData(dbDeviceId, supremaDeviceId, deviceName, cardAssignment, conflictInfo) {
        const userId = String(cardAssignment.user?.id ?? cardAssignment.user_id);
        return {
            deviceDbId: Number(dbDeviceId),
            supremaDeviceId,
            deviceName: deviceName || `Device ${dbDeviceId}`,
            userId,
            employeeName: cardAssignment.user?.name || `User ${userId}`,
            employeeId: cardAssignment.user?.employee_id ?? null,
            cardData: cardAssignment.card_data,
            cardAssignmentId: cardAssignment.id,
            ...conflictInfo,
        };
    }

    /**
     * Enroll selected users (by employee ID) on one or more devices.
     *
     * Supports background operation via ProcessService:
     *   options.processId      — ID of the process record to update
     *   options.processService — ProcessService instance
     *
     * Duplicate-card conflicts are reported as process conflicts instead of
     * throwing, so the UI can ask the user whether to override or skip each one.
     *
     * @param {(string|number)[]} dbDeviceIds
     * @param {(string|number)[]} employeeIds
     * @param {{ processId?: string, processService?: object }} [options]
     */
    async enrollUsersToDevices(dbDeviceIds, employeeIds, options = {}) {
        const { processId, processService: ps } = options;
        const numericEmpIds = employeeIds.map(Number).filter((n) => !Number.isNaN(n));
        const cardAssignments = await this.prisma.cardAssignment.findMany({
            where: { status: 'active', user: { employee_id: { in: numericEmpIds } } },
            include: { user: true },
        });

        // Pre-fetch device names for conflict reporting
        const dbDevices = await this.connectionService.getAllDevicesFromDB();
        const dbDeviceMap = new Map(dbDevices.map(d => [Number(d.id), d]));

        const total = dbDeviceIds.length * cardAssignments.length;

        if (processId && ps) {
            ps.update(processId, { status: 'running', total });
            ps.log(processId, `Starting enrollment: ${cardAssignments.length} card(s) across ${dbDeviceIds.length} device(s)`, 'info');
        }

        this.logger.info(`[EnrollMulti] ${cardAssignments.length} card assignment(s) for ${numericEmpIds.length} employee(s)`);

        // Cache device card indexes for the duration of this enrollment.
        // Built lazily on the first conflict for each device.
        const deviceCardIndexCache = new Map();

        const results = [];
        for (const dbDeviceId of dbDeviceIds) {
            // Respect cancellation between devices
            if (processId && ps?.isCancelled(processId)) {
                ps.log(processId, 'Enrollment cancelled by user', 'warning');
                break;
            }

            let supremaDeviceId;
            try {
                supremaDeviceId = await this._resolveSupremaId(dbDeviceId);
            } catch (connErr) {
                const errEntry = { deviceId: dbDeviceId, success: false, enrolled: 0, error: connErr.message };
                results.push(errEntry);
                ps?.log(processId, `Device ${dbDeviceId}: ${connErr.message}`, 'error');
                continue;
            }

            const dbDevice = dbDeviceMap.get(Number(dbDeviceId));
            let enrolled = 0;
            const errors = [];

            for (const ca of cardAssignments) {
                // Respect cancellation between cards
                if (processId && ps?.isCancelled(processId)) break;

                const userId = String(ca.user?.id ?? ca.user_id);
                try {
                    // Pass skipDuplicateCheck=true so setUserCards skips the slow
                    // findUserWithCard scan — we handle conflicts here instead.
                    await this.enrollUserWithCard(supremaDeviceId, ca, { skipDuplicateCheck: true });
                    await this.updateEnrollmentRecord(dbDeviceId, ca.id, userId, 'active');
                    enrolled++;
                    ps?.addResult(processId, {
                        type: 'enrolled',
                        deviceId: dbDeviceId,
                        deviceName: dbDevice?.name,
                        userId,
                        employeeName: ca.user?.name,
                        success: true,
                    });
                } catch (err) {
                    if (isDuplicateCardError(err)) {
                        // Single-path conflict resolution: DB → device (cached index) → unknown
                        const conflictInfo = await this._resolveCardConflict(
                            supremaDeviceId,
                            ca,
                            deviceCardIndexCache,
                        );

                        // Self-conflict: device already has this card on the same
                        // user we were trying to enroll. Treat as success.
                        if (
                            conflictInfo.conflictingUserId &&
                            String(conflictInfo.conflictingUserId) === userId
                        ) {
                            await this.updateEnrollmentRecord(dbDeviceId, ca.id, userId, 'active');
                            enrolled++;
                            ps?.addResult(processId, {
                                type: 'already-enrolled',
                                deviceId: dbDeviceId,
                                deviceName: dbDevice?.name,
                                userId,
                                employeeName: ca.user?.name,
                                success: true,
                            });
                            ps?.log(
                                processId,
                                `Already enrolled: ${ca.user?.name || userId} on ${dbDevice?.name || dbDeviceId}`,
                                'info',
                            );
                            continue;
                        }

                        // Ghost duplicate: device's duplicate-index rejects the
                        // card but no DB row, no device user, and no blacklist
                        // entry holds it. Most common cause: the legacy DB
                        // stores 5-byte CSNs but the device's 32-bit
                        // duplicate-detection index collides with an existing
                        // 4-byte card sibling. Neither delete-and-retry nor
                        // blacklist removal fixes this — the card must be
                        // resolved manually (re-enroll via card scan, or
                        // full device re-sync).
                        //
                        // Only retry if the card is on the blacklist (where
                        // removal genuinely fixes things).
                        if (conflictInfo.source === 'blacklist' && this.biometricService?.removeCardFromBlacklist) {
                            try {
                                this.logger.warn(
                                    `[EnrollMulti] Removing blacklisted card for ${ca.user?.name || userId} on ${dbDevice?.name || dbDeviceId}`,
                                );
                                await this.biometricService.removeCardFromBlacklist(
                                    supremaDeviceId,
                                    [{ cardId: ca.card_data, issueCount: 0 }],
                                );
                                await this.userService.deleteUsers(supremaDeviceId, [userId]);
                                await this.enrollUserWithCard(supremaDeviceId, ca, { skipDuplicateCheck: true });
                                await this.updateEnrollmentRecord(dbDeviceId, ca.id, userId, 'active');
                                enrolled++;
                                ps?.addResult(processId, {
                                    type: 'enrolled-after-retry',
                                    deviceId: dbDeviceId,
                                    deviceName: dbDevice?.name,
                                    userId,
                                    employeeName: ca.user?.name,
                                    success: true,
                                    recoveredFrom: 'blacklist',
                                });
                                ps?.log(
                                    processId,
                                    `Recovered (blacklist): ${ca.user?.name || userId} enrolled on ${dbDevice?.name || dbDeviceId}`,
                                    'info',
                                );
                                continue;
                            } catch (retryErr) {
                                this.logger.warn(
                                    `[EnrollMulti] Blacklist retry failed for ${userId}: ${retryErr.message}`,
                                );
                                // Fall through to record as conflict
                            }
                        }

                        const conflictData = this._buildConflictData(
                            dbDeviceId,
                            supremaDeviceId,
                            dbDevice?.name,
                            ca,
                            conflictInfo,
                        );

                        if (processId && ps) {
                            ps.addConflict(processId, conflictData);
                            const conflictLabel =
                                conflictInfo.conflictingEmployeeName ||
                                conflictInfo.conflictingUserId ||
                                'unresolved duplicate (holder unknown)';
                            ps.log(
                                processId,
                                `Card conflict: ${ca.user?.name || userId} vs ${conflictLabel} on ${dbDevice?.name || dbDeviceId} [source=${conflictInfo.source}]`,
                                'warning',
                            );
                        } else {
                            // Synchronous (non-background) fallback: include in errors
                            errors.push({
                                userId,
                                error: 'Duplicate card — another user already has this card on the device',
                                isDuplicate: true,
                                conflict: conflictData,
                            });
                        }
                    } else {
                        this.logger.error(`[EnrollMulti] Error enrolling user ${userId} on device ${dbDeviceId}:`, err.message);
                        errors.push({ userId, error: err.message });
                        ps?.addResult(processId, {
                            type: 'error',
                            deviceId: dbDeviceId,
                            deviceName: dbDevice?.name,
                            userId,
                            employeeName: ca.user?.name,
                            success: false,
                            error: err.message,
                        });
                    }
                }
            }
            results.push({ deviceId: dbDeviceId, success: errors.length === 0, enrolled, errors });
        }

        if (processId && ps) {
            const proc = ps.get(processId);
            if (proc?.status !== 'cancelled') {
                ps.update(processId, { status: 'completed' });
            }
            ps.log(processId, 'Enrollment finished', 'info');
        }

        return { results };
    }

    /**
     * Delete selected users (by employee ID) from one or more DB devices.
     * @param {(string|number)[]} dbDeviceIds
     * @param {(string|number)[]} employeeIds
     * @returns {Promise<{results: Array}>}
     */
    async deleteUsersFromDevices(dbDeviceIds, employeeIds) {
        const numericEmpIds = employeeIds.map(Number).filter((n) => !Number.isNaN(n));
        const dbUsers = await this.prisma.user.findMany({
            where: { employee_id: { in: numericEmpIds } },
            select: { id: true },
        });
        const deviceUserIds = dbUsers.map((u) => String(u.id));

        this.logger.info(`[DeleteMulti] Deleting ${deviceUserIds.length} device user(s) from ${dbDeviceIds.length} device(s)`);

        const results = [];
        for (const dbDeviceId of dbDeviceIds) {
            try {
                const supremaDeviceId = await this._resolveSupremaId(dbDeviceId);
                await this.userService.deleteUsers(supremaDeviceId, deviceUserIds);
                results.push({ deviceId: dbDeviceId, success: true });
            } catch (err) {
                this.logger.error(`[DeleteMulti] Error deleting users from device ${dbDeviceId}:`, err.message);
                results.push({ deviceId: dbDeviceId, success: false, error: err.message });
            }
        }

        return { results };
    }

    /**
     * Resolve a DB device ID to its Suprema hardware device ID.
     * @private
     */
    async _resolveSupremaId(dbDeviceId) {
        const parsedId = parseInt(dbDeviceId, 10);
        if (isNaN(parsedId)) throw new Error(`Invalid device ID: ${dbDeviceId}`);
        if (parsedId > 100000) return parsedId; // already a Suprema ID

        const [connectedDevices, dbDevices] = await Promise.all([
            this.connectionService.getConnectedDevices(),
            this.connectionService.getAllDevicesFromDB(),
        ]);
        const dbDevice = dbDevices.find((d) => d.id === parsedId);
        if (!dbDevice) throw new Error(`Device ${parsedId} not found in database`);

        for (const device of connectedDevices) {
            const info = device.toObject ? device.toObject() : device;
            if (info.ipaddr === dbDevice.ip && info.port === dbDevice.port) {
                return info.deviceid;
            }
        }
        throw new Error(`Device ${dbDevice.name} (${dbDevice.ip}) is not connected`);
    }

    /**
     * Sync database users/cards to a specific device
     */
    async syncDatabaseToDevice(supremaDeviceId, dbDeviceId, cardAssignments = null) {
        try {
            // Get card assignments if not provided
            if (!cardAssignments) {
                cardAssignments = await this.prisma.cardAssignment.findMany({
                    where: { status: 'active' },
                    include: { user: true }
                });
            }

            // Get current users on device
            const deviceUsers = await this.userService.getUserList(supremaDeviceId);
            const deviceUserIds = new Set(deviceUsers.map(u => String(u.id)));

            this.logger.info(`[SyncToDevice] Device ${supremaDeviceId} has ${deviceUsers.length} users`);
            this.logger.info(`[SyncToDevice] Database has ${cardAssignments.length} card assignments`);

            const stats = {
                usersAdded: 0,
                usersUpdated: 0,
                usersRemoved: 0,
                errors: []
            };

            // Process each card assignment from database
            for (const ca of cardAssignments) {
                const userId = String(ca.user?.id ?? ca.user_id);
                
                try {
                    if (!deviceUserIds.has(userId)) {
                        // User not on device - add them
                        await this.enrollUserWithCard(supremaDeviceId, ca);
                        stats.usersAdded++;
                        
                        // Update enrollment record
                        if (dbDeviceId) {
                            await this.updateEnrollmentRecord(dbDeviceId, ca.id, userId, 'active');
                        }
                    } else {
                        // User exists - update their card if needed
                        await this.updateUserCard(supremaDeviceId, ca);
                        stats.usersUpdated++;
                        deviceUserIds.delete(userId); // Mark as processed
                    }
                } catch (userError) {
                    this.logger.error(`[SyncToDevice] Error processing user ${userId}:`, userError.message);
                    stats.errors.push({ userId, error: userError.message });
                    
                    // Abort sync for this device if the connection was lost
                    if (userError.message && (userError.message.includes('Cannot get connection') || userError.message.includes('Gateway not connected'))) {
                        this.logger.error(`[SyncToDevice] Aborting sync for device ${supremaDeviceId} due to connection failure.`);
                        break;
                    }
                }
            }

            // Users on device but not in DB - optionally remove them
            // This ensures device matches database exactly
            const dbUserIds = new Set(cardAssignments.map(ca => String(ca.user?.id ?? ca.user_id)));
            for (const deviceUserId of deviceUserIds) {
                if (!dbUserIds.has(deviceUserId)) {
                    try {
                        this.logger.info(`[SyncToDevice] Removing user ${deviceUserId} not in database`);
                        await this.userService.deleteUsers(supremaDeviceId, [deviceUserId]);
                        stats.usersRemoved++;
                        
                        // Update enrollment record as removed
                        if (dbDeviceId) {
                            await this.markEnrollmentRemoved(dbDeviceId, deviceUserId);
                        }
                    } catch (deleteError) {
                        this.logger.error(`[SyncToDevice] Error removing user ${deviceUserId}:`, deleteError.message);
                        stats.errors.push({ userId: deviceUserId, error: deleteError.message });
                        
                        if (deleteError.message && (deleteError.message.includes('Cannot get connection') || deleteError.message.includes('Gateway not connected'))) {
                            this.logger.error(`[SyncToDevice] Aborting deletion sync for device ${supremaDeviceId} due to connection failure.`);
                            break;
                        }
                    }
                }
            }

            this.logger.info(`[SyncToDevice] Complete - Added: ${stats.usersAdded}, Updated: ${stats.usersUpdated}, Removed: ${stats.usersRemoved}`);
            
            return stats;
        } catch (error) {
            this.logger.error('[SyncToDevice] Error:', error);
            throw error;
        }
    }

    /**
     * Enroll a user with their card from database record.
     * @param {string|number} deviceId  Suprema hardware device ID
     * @param {object} cardAssignment
     * @param {{ skipDuplicateCheck?: boolean }} [options]
     */
    async enrollUserWithCard(deviceId, cardAssignment, options = {}) {
        try {
            const userId = String(cardAssignment.user?.id ?? cardAssignment.user_id);
            const employeeName = cardAssignment.user?.name || '';
            // First, enroll the user (create user on device)
            const userData = {
                id: userId,
                name: employeeName
            };
            
            this.logger.info(`[EnrollUser] Creating user ${userId} on device ${deviceId}`);
            await this.userService.enrollUsers(deviceId, [userData]);
            
            // Then set their card
            const cardData = cardAssignment.card_data;
            const userCardData = [{
                userId,
                cardData
            }];

            this.logger.info(`[EnrollUser] Setting card for user ${userId}`);
            await this.userService.setUserCards(deviceId, userCardData, options);
            
            this.logger.info(`[EnrollUser] Enrolled user ${userId} with card on device ${deviceId}`);
        } catch (error) {
            const userId = String(cardAssignment.user?.id ?? cardAssignment.user_id);
            this.logger.error(`[EnrollUser] Error enrolling user ${userId}:`, error);
            throw error;
        }
    }

    /**
     * Update user's card on device
     */
    async updateUserCard(deviceId, cardAssignment) {
        try {
            const userId = String(cardAssignment.user?.id ?? cardAssignment.user_id);
            const userCardData = [{
                userId,
                cardData: cardAssignment.card_data
            }];

            this.logger.info(`[UpdateCard] Updating card for user ${userId} on device ${deviceId}`);
            await this.userService.setUserCards(deviceId, userCardData);
            this.logger.info(`[UpdateCard] Card updated for user ${userId}`);
        } catch (error) {
            const userId = String(cardAssignment.user?.id ?? cardAssignment.user_id);
            // Check for connection failures first
            if (error.message && (error.message.includes('Cannot get connection') || error.message.includes('Gateway not connected'))) {
                throw error;
            }
            
            // If user doesn't exist, enroll them with card
            if (error.message && (error.message.includes('NOT_FOUND') || error.message.includes('not found'))) {
                this.logger.info(`[UpdateCard] User ${userId} not found, enrolling...`);
                await this.enrollUserWithCard(deviceId, cardAssignment);
            } else if (error.code === 5) {
                this.logger.info(`[UpdateCard] User ${userId} not found (code 5), enrolling...`);
                await this.enrollUserWithCard(deviceId, cardAssignment);
            } else {
                throw error;
            }
        }
    }

    /**
     * Update enrollment record in database
     */
    async updateEnrollmentRecord(dbDeviceId, cardAssignmentId, deviceUserId, status) {
        try {
            await this.prisma.$transaction((tx) =>
                this._upsertEnrollmentRecord(tx, dbDeviceId, cardAssignmentId, deviceUserId, status)
            );
        } catch (error) {
            this.logger.error('[UpdateEnrollment] Error:', error);
        }
    }

    async _upsertEnrollmentRecord(client, dbDeviceId, cardAssignmentId, deviceUserId, status) {
        const now = new Date();
        const normalizedDeviceUserId = String(deviceUserId);

        const byAssignment = await client.deviceEnrollment.findUnique({
            where: {
                deviceId_cardAssignmentId: {
                    deviceId: dbDeviceId,
                    cardAssignmentId
                }
            }
        });

        const byDeviceUser = await client.deviceEnrollment.findUnique({
            where: {
                deviceId_deviceUserId: {
                    deviceId: dbDeviceId,
                    deviceUserId: normalizedDeviceUserId
                }
            }
        });

        if (byDeviceUser && byDeviceUser.cardAssignmentId !== cardAssignmentId) {
            if (byAssignment && byAssignment.id !== byDeviceUser.id) {
                await client.deviceEnrollment.delete({ where: { id: byAssignment.id } });
            }

            return client.deviceEnrollment.update({
                where: { id: byDeviceUser.id },
                data: {
                    cardAssignmentId,
                    status,
                    lastSyncAt: now
                }
            });
        }

        if (byAssignment) {
            return client.deviceEnrollment.update({
                where: { id: byAssignment.id },
                data: {
                    deviceUserId: normalizedDeviceUserId,
                    status,
                    lastSyncAt: now
                }
            });
        }

        return client.deviceEnrollment.create({
            data: {
                deviceId: dbDeviceId,
                cardAssignmentId,
                deviceUserId: normalizedDeviceUserId,
                status,
                enrolledAt: now,
                lastSyncAt: now
            }
        });
    }

    /**
     * Mark enrollment as removed
     */
    async markEnrollmentRemoved(dbDeviceId, deviceUserId) {
        try {
            await this.prisma.deviceEnrollment.updateMany({
                where: {
                    deviceId: dbDeviceId,
                    deviceUserId: deviceUserId
                },
                data: {
                    status: 'removed',
                    lastSyncAt: new Date()
                }
            });
        } catch (error) {
            this.logger.error('[MarkEnrollmentRemoved] Error:', error);
        }
    }

    /**
     * Delete user from device and update database
     */
    async deleteUserFromDevice(deviceId, userId) {
        try {
            const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
            
            // Delete from device
            await this.userService.deleteUsers(supremaDeviceId, [userId]);
            
            // Update database - mark enrollment as removed
            const dbDevice = await this.getDbDevice(deviceId);
            if (dbDevice) {
                await this.prisma.deviceEnrollment.updateMany({
                    where: {
                        deviceId: dbDevice.id,
                        deviceUserId: userId
                    },
                    data: {
                        status: 'removed',
                        lastSyncAt: new Date()
                    }
                });
            }

            this.logger.info(`[DeleteUser] Deleted user ${userId} from device ${deviceId} and updated DB`);
            
            return { success: true, userId, deviceId };
        } catch (error) {
            this.logger.error('[DeleteUser] Error:', error);
            throw error;
        }
    }

    /**
     * Delete user from ALL devices and revoke card in database
     */
    async deleteUserFromAllDevices(userId, revokeCard = false) {
        try {
            const results = [];
            
            // Get all connected devices
            const connectedDevices = await this.connectionService.getConnectedDevices();
            
            for (const device of connectedDevices) {
                const deviceInfo = device.toObject ? device.toObject() : device;
                try {
                    await this.userService.deleteUsers(deviceInfo.deviceid, [userId]);
                    results.push({ deviceId: deviceInfo.deviceid, success: true });
                } catch (deviceError) {
                    results.push({ deviceId: deviceInfo.deviceid, success: false, error: deviceError.message });
                }
            }

            // Update database enrollment records
            await this.prisma.deviceEnrollment.updateMany({
                where: { deviceUserId: userId },
                data: { status: 'removed', lastSyncAt: new Date() }
            });

            // Revoke the card via enrollmentService (single write-path)
            if (revokeCard && this.enrollmentService) {
                const user = await this.prisma.user.findFirst({
                    where: { id: parseInt(userId) }
                });
                if (user) {
                    const activeAssignments = await this.prisma.cardAssignment.findMany({
                        where: { user_id: user.id, status: 'active' }
                    });
                    for (const assignment of activeAssignments) {
                        try {
                            await this.enrollmentService.revokeCardAssignment(assignment.id, 'Deleted from all devices');
                        } catch (revokeErr) {
                            this.logger.warn(`[DeleteUserAll] Failed to revoke card ${assignment.id}: ${revokeErr.message}`);
                        }
                    }
                }
            } else if (revokeCard) {
                // Fallback when enrollmentService is not injected (should not happen in production)
                const user = await this.prisma.user.findFirst({ where: { id: parseInt(userId) } });
                if (user) {
                    await this.prisma.cardAssignment.updateMany({
                        where: { user_id: user.id, status: 'active' },
                        data: { status: 'revoked', revokedAt: new Date() }
                    });
                }
            }

            this.logger.info(`[DeleteUserAll] Deleted user ${userId} from ${results.length} devices`);
            
            return { success: true, userId, results };
        } catch (error) {
            this.logger.error('[DeleteUserAll] Error:', error);
            throw error;
        }
    }

    /**
     * Import users from device to database
     * Used for initial setup or when device has users not in DB
     */
    async importUsersFromDevice(deviceId) {
        try {
            const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
            const dbDevice = await this.getDbDevice(deviceId);
            
            // Get all users with cards from device
            const deviceUsers = await this.getUsersFromDevice(deviceId);
            
            const stats = {
                imported: 0,
                enrolled: 0,
                skipped: 0,
                invalidCards: 0,
                conflicts: 0,
                errors: []
            };

            const candidates = [];

            for (const user of deviceUsers) {
                if (!user.hasCard || !user.cardData) {
                    if ((user.numOfCard || 0) > 0) {
                        stats.invalidCards++;
                        stats.errors.push({
                            userId: user.userID,
                            error: 'Device returned card data in an unsupported format'
                        });
                    }
                    stats.skipped++;
                    continue;
                }

                const normalizedCardData = this.normalizeCardForStorage(user.cardData);
                if (!normalizedCardData) {
                    stats.invalidCards++;
                    stats.errors.push({
                        userId: user.userID,
                        error: 'Device card data could not be normalized to storage hex'
                    });
                    stats.skipped++;
                    continue;
                }

                candidates.push({
                    ...user,
                    userID: String(user.userID),
                    cardData: normalizedCardData
                });
            }

            const employeeIds = [...new Set(candidates.map(user => user.userID))];
            const cardDataList = [...new Set(candidates.map(user => user.cardData).filter(Boolean))];

            // Build lookup maps for existing card assignments
            // Look up by card_data and by user.id (device user ID = local user.id)
            const existingUsers = candidates.length > 0
                ? await this.prisma.user.findMany({
                    where: { id: { in: employeeIds.map(id => parseInt(id)) } }
                })
                : [];
            const userById = new Map(existingUsers.map(u => [String(u.id), u]));
            const userIds = existingUsers.map(u => u.id);

            const existingAssignments = (userIds.length > 0 || cardDataList.length > 0)
                ? await this.prisma.cardAssignment.findMany({
                    where: {
                        OR: [
                            ...(userIds.length > 0 ? [{ user_id: { in: userIds } }] : []),
                            ...(cardDataList.length > 0 ? [{ card_data: { in: cardDataList } }] : [])
                        ]
                    },
                    include: { user: true },
                    orderBy: { assignedAt: 'desc' }
                })
                : [];

            const byCardData = new Map();
            const activeByUserId = new Map();
            for (const assignment of existingAssignments) {
                if (!byCardData.has(assignment.card_data)) {
                    byCardData.set(assignment.card_data, assignment);
                }
                const uid = String(assignment.user?.id || '');
                if (uid && assignment.status === 'active' && !activeByUserId.has(uid)) {
                    activeByUserId.set(uid, assignment);
                }
            }

            for (const user of candidates) {
                try {
                    const existingCard = byCardData.get(user.cardData);
                    const existingUserCard = activeByUserId.get(user.userID);
                    const localUser = userById.get(user.userID);

                    if (existingCard) {
                        const existingUid = String(existingCard.user?.id || '');
                        if (existingUid && existingUid !== user.userID) {
                            stats.conflicts++;
                            stats.errors.push({
                                userId: user.userID,
                                error: `Card is already assigned to user ${existingUid}`
                            });
                            continue;
                        }

                        // Update enrollment record to reflect this device has the card
                        if (dbDevice) {
                            await this.updateEnrollmentRecord(
                                dbDevice.id,
                                existingCard.id,
                                user.userID,
                                'active'
                            );
                            stats.enrolled++;
                        }
                        stats.skipped++;
                    } else if (existingUserCard && existingUserCard.card_data !== user.cardData) {
                        stats.conflicts++;
                        stats.errors.push({
                            userId: user.userID,
                            error: `User already has active card assignment ${existingUserCard.id}`
                        });
                    } else if (!localUser) {
                        stats.skipped++;
                        stats.errors.push({
                            userId: user.userID,
                            error: `No local user found for user ID ${user.userID}. Run a sync cycle first.`
                        });
                    } else {
                        // Atomically create cardAssignment + deviceEnrollment via the single write-path
                        const cardAssignment = await this.enrollmentService.recordCardImport({
                            userId: localUser.id,
                            cardData: user.cardData,
                            deviceDbId: dbDevice ? dbDevice.id : null,
                            deviceUserId: user.userID
                        });

                        byCardData.set(cardAssignment.card_data, cardAssignment);
                        activeByEmployee.set(user.userID, cardAssignment);

                        stats.imported++;
                        if (dbDevice) stats.enrolled++;
                    }
                } catch (userError) {
                    stats.errors.push({ userId: user.userID, error: userError.message });
                }
            }

            this.logger.info(
                `[ImportUsers] Device ${deviceId}: imported=${stats.imported}, ` +
                `enrolled=${stats.enrolled}, skipped=${stats.skipped}, ` +
                `conflicts=${stats.conflicts}, invalidCards=${stats.invalidCards}`
            );
            
            return stats;
        } catch (error) {
            this.logger.error('[ImportUsers] Error:', error);
            throw error;
        }
    }

    /**
     * Import users from every currently connected device into the local DB.
     */
    async importUsersFromAllConnectedDevices() {
        if (!this._isGatewayConnected()) {
            return {
                success: true,
                summary: {
                    totalDevices: 0,
                    imported: 0,
                    skipped: 0,
                    errors: 0,
                },
                devices: [],
                skippedReason: 'Gateway not connected',
            };
        }

        const connectedDevices = await this.connectionService.getConnectedDevices();
        const results = [];
        let imported = 0;
        let skipped = 0;
        let errors = 0;

        for (const device of connectedDevices) {
            const deviceInfo = device.toObject ? device.toObject() : device;
            const deviceId = deviceInfo.deviceid;

            try {
                const result = await this.importUsersFromDevice(deviceId);
                imported += result.imported || 0;
                skipped += result.skipped || 0;
                errors += Array.isArray(result.errors) ? result.errors.length : 0;

                results.push({
                    deviceId,
                    success: true,
                    ...result,
                });
            } catch (error) {
                errors += 1;
                results.push({
                    deviceId,
                    success: false,
                    error: error.message,
                });
            }
        }

        return {
            success: true,
            summary: {
                totalDevices: connectedDevices.length,
                imported,
                skipped,
                errors,
            },
            devices: results,
        };
    }

    _isGatewayConnected() {
        if (typeof this.connectionService.getConnectionStats !== 'function') {
            return true;
        }

        return !!this.connectionService.getConnectionStats().gatewayConnected;
    }

    async _runAutoImportCycle(trigger = 'interval') {
        if (this._autoImportRunning) {
            this.logger.debug(`[AutoImport] Cycle skipped — previous cycle still running (${trigger})`);
            return null;
        }

        this._autoImportRunning = true;

        try {
            this.logger.info(`[AutoImport] Running device→DB import (${trigger})...`);
            const result = await this.importUsersFromAllConnectedDevices();
            const reason = result.skippedReason ? ` — ${result.skippedReason}` : '';
            this.logger.info(
                `[AutoImport] Complete — ${result.summary.totalDevices} device(s), ` +
                `${result.summary.imported} imported, ${result.summary.skipped} skipped, ` +
                `${result.summary.errors} error(s)${reason}`
            );
            return result;
        } catch (error) {
            if (error.message === 'Gateway not connected') {
                this.logger.info('[AutoImport] Gateway not connected — skipping device import cycle');
                return null;
            }

            this.logger.error('[AutoImport] Error during device→DB import:', error.message);
            return null;
        } finally {
            this._autoImportRunning = false;
        }
    }

    async _importConnectedDevice(deviceId, trigger = 'device:connected') {
        if (!this._isGatewayConnected()) {
            this.logger.info(`[AutoImport] Device ${deviceId} skipped — gateway not connected`);
            return null;
        }

        // Debounce: avoid hammering on rapid reconnect flaps.
        const key = String(deviceId);
        const last = this._lastDeviceImportAt.get(key) || 0;
        const now = Date.now();
        if (now - last < this._deviceImportCooldownMs) {
            this.logger.debug(
                `[AutoImport] Device ${deviceId} skipped — within cooldown ` +
                `(${this._deviceImportCooldownMs}ms)`
            );
            return null;
        }
        this._lastDeviceImportAt.set(key, now);

        try {
            this.logger.info(`[AutoImport] Importing users from connected device ${deviceId} (${trigger})...`);
            const result = await this.importUsersFromDevice(deviceId);
            const errorCount = Array.isArray(result.errors) ? result.errors.length : 0;

            this.logger.info(
                `[AutoImport] Device ${deviceId} import complete — ` +
                `imported=${result.imported}, skipped=${result.skipped}, errors=${errorCount}`
            );

            return result;
        } catch (error) {
            if (error.message === 'Gateway not connected') {
                this.logger.info(`[AutoImport] Device ${deviceId} skipped — gateway not connected`);
                return null;
            }

            this.logger.error(`[AutoImport] Device ${deviceId} import failed:`, error.message);
            return null;
        }
    }

    /**
     * Compare database assignments with the current state of a device.
     */
    async compareDeviceToDatabase(deviceId) {
        const dbDevice = await this.getDbDevice(deviceId);

        if (!dbDevice) {
            throw new Error(`Device ${deviceId} is not registered in the database`);
        }

        const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
        const [dbUsers, deviceUsers, enrollmentCounts] = await Promise.all([
            this.getUsersFromDB(dbDevice.id),
            this.getUsersFromDevice(deviceId),
            this.prisma.deviceEnrollment.groupBy({
                by: ['status'],
                where: { deviceId: dbDevice.id },
                _count: { status: true }
            })
        ]);

        const dbUsersById = new Map(dbUsers.map((user) => [String(user.userID), {
            ...user,
            normalizedCardSet: this.getNormalizedDatabaseCardSet(user)
        }]));
        const deviceUsersById = new Map(deviceUsers.map((user) => [String(user.userID), {
            ...user,
            normalizedCardSet: this.getNormalizedDeviceCardSet(user)
        }]));

        const missingOnDevice = [];
        const missingInDatabase = [];
        const cardMismatches = [];
        let matched = 0;

        for (const [userId, dbUser] of dbUsersById.entries()) {
            const deviceUser = deviceUsersById.get(userId);

            if (!deviceUser) {
                missingOnDevice.push({
                    userId,
                    employeeName: dbUser.name,
                    cardData: dbUser.cardData,
                    enrolledDevices: dbUser.enrolledDevices
                });
                continue;
            }

            if (!this.areNormalizedCardSetsEqual(dbUser.normalizedCardSet, deviceUser.normalizedCardSet)) {
                cardMismatches.push({
                    userId,
                    employeeName: dbUser.name || deviceUser.name || null,
                    databaseCardData: dbUser.cardData,
                    deviceCardData: deviceUser.cardData,
                    dbHasCard: dbUser.normalizedCardSet.size > 0,
                    deviceHasCard: deviceUser.normalizedCardSet.size > 0,
                    databaseCardDataList: [...dbUser.normalizedCardSet],
                    deviceCardDataList: [...deviceUser.normalizedCardSet]
                });
                continue;
            }

            matched += 1;
        }

        for (const [userId, deviceUser] of deviceUsersById.entries()) {
            if (!dbUsersById.has(userId)) {
                missingInDatabase.push({
                    userId,
                    employeeName: deviceUser.name || null,
                    cardData: deviceUser.cardData,
                    hasCard: deviceUser.hasCard
                });
            }
        }

        const enrollmentStatus = enrollmentCounts.reduce((acc, entry) => {
            acc[entry.status] = entry._count.status;
            return acc;
        }, {});

        return {
            device: {
                databaseDeviceId: dbDevice.id,
                supremaDeviceId,
                name: dbDevice.name,
                ip: dbDevice.ip,
                port: dbDevice.port,
                status: dbDevice.status,
                lastUserSync: dbDevice.last_user_sync,
                lastEventSync: dbDevice.last_event_sync
            },
            summary: {
                databaseUsers: dbUsers.length,
                deviceUsers: deviceUsers.length,
                matched,
                missingOnDevice: missingOnDevice.length,
                missingInDatabase: missingInDatabase.length,
                cardMismatches: cardMismatches.length,
                activeEnrollments: enrollmentStatus.active || 0,
                pendingEnrollments: enrollmentStatus.pending || 0,
                removedEnrollments: enrollmentStatus.removed || 0
            },
            differences: {
                missingOnDevice,
                missingInDatabase,
                cardMismatches
            }
        };
    }

    /**
     * Check one database user against one device without enumerating the full device user list.
     * @param {number|string} deviceId
     * @param {string|number} userId
     * @returns {Promise<Object>}
     */
    async checkUserOnDevice(deviceId, userId) {
        const dbDevice = await this.getDbDevice(deviceId);

        if (!dbDevice) {
            throw new Error(`Device ${deviceId} is not registered in the database`);
        }

        const normalizedUserId = String(userId || '').trim();
        if (!normalizedUserId) {
            throw new Error('User ID is required');
        }

        const supremaDeviceId = await this.getSupremaDeviceId(deviceId);

        const [assignments, deviceUsers, userCards] = await Promise.all([
            this.prisma.cardAssignment.findMany({
                where: {
                    employeeId: normalizedUserId,
                    status: 'active',
                    enrollments: {
                        some: {
                            deviceId: dbDevice.id,
                            status: { in: ['active', 'pending'] }
                        }
                    }
                },
                orderBy: [
                    { assignedAt: 'desc' },
                    { id: 'desc' }
                ],
                include: {
                    enrollments: {
                        where: {
                            deviceId: dbDevice.id,
                            status: { in: ['active', 'pending'] }
                        },
                        include: {
                            device: true
                        }
                    }
                }
            }),
            this.userService.getUsers(supremaDeviceId, [normalizedUserId]).catch(() => []),
            this.userService.getCards(supremaDeviceId, [normalizedUserId]).catch(() => []),
        ]);

        const deviceUser = Array.isArray(deviceUsers) && deviceUsers.length > 0 ? deviceUsers[0] : null;
        const userCardEntry = Array.isArray(userCards)
            ? userCards.find((entry) => String(entry.userid || entry.userId || '') === normalizedUserId) || userCards[0] || null
            : null;
        const cardEntries = userCardEntry?.cardslist || userCardEntry?.cardsList || deviceUser?.cardsList || deviceUser?.cards || [];

        const databaseCardDataList = [...new Set(
            assignments
                .map((assignment) => this.normalizeCardData(assignment?.cardData))
                .filter(Boolean)
        )];
        const deviceCardDataList = [...new Set(
            cardEntries
                .map((cardEntry) => this.normalizeCardData(cardEntry?.data ?? cardEntry?.cardData ?? cardEntry))
                .filter(Boolean)
        )];
        const databaseCardSet = new Set(databaseCardDataList);
        const deviceCardSet = new Set(deviceCardDataList);
        const databaseCardData = databaseCardDataList[0] || null;
        const deviceCardData = deviceCardDataList[0] || null;

        let status = 'not-assigned';
        if (assignments.length > 0 && deviceUser) {
            status = this.areNormalizedCardSetsEqual(databaseCardSet, deviceCardSet) ? 'matched' : 'card-mismatch';
        } else if (assignments.length > 0) {
            status = 'missing-on-device';
        } else if (deviceUser) {
            status = 'device-only';
        }

        const recommendedAction = {
            matched: 'No repair needed. The selected device already matches the database assignment.',
            'card-mismatch': 'Repair will replace the device card set from the database assignments for this user.',
            'missing-on-device': 'Repair will enroll this user on the selected device from the database.',
            'device-only': 'Repair will remove this user from the selected device because no database assignment targets it.',
            'not-assigned': 'No matching database assignment or device user was found for this user on the selected device.'
        }[status];

        return {
            userId: normalizedUserId,
            deviceId: dbDevice.id,
            deviceName: dbDevice.name,
            employeeName: assignments[0]?.employeeName || deviceUser?.name || null,
            status,
            expectedOnDevice: assignments.length > 0,
            presentOnDevice: Boolean(deviceUser),
            databaseCardData,
            deviceCardData,
            databaseCardDataList,
            deviceCardDataList,
            dbHasCard: databaseCardSet.size > 0,
            deviceHasCard: deviceCardSet.size > 0,
            recommendedAction,
        };
    }

    /**
     * Build a cross-device reconciliation overview.
     */
    async getReconciliationOverview() {
        const dbDevices = await this.connectionService.getAllDevicesFromDB();
        const connectedDevices = await this.connectionService.getConnectedDevices();
        const connectedKeys = new Set(
            connectedDevices.map((device) => {
                const info = device.toObject ? device.toObject() : device;
                return `${info.ipaddr}:${info.port}`;
            })
        );

        const summary = {
            totalDevices: dbDevices.length,
            connectedDevices: 0,
            disconnectedDevices: 0,
            matchedUsers: 0,
            missingOnDevice: 0,
            missingInDatabase: 0,
            cardMismatches: 0,
            devicesWithIssues: 0
        };

        const deviceResults = await Promise.all(dbDevices.map(async (dbDevice) => {
            const isConnected = connectedKeys.has(`${dbDevice.ip}:${dbDevice.port}`);

            if (!isConnected) {
                const enrollmentCounts = await this.prisma.deviceEnrollment.groupBy({
                    by: ['status'],
                    where: { deviceId: dbDevice.id },
                    _count: { status: true }
                });
                const enrollmentStatus = enrollmentCounts.reduce((acc, entry) => {
                    acc[entry.status] = entry._count.status;
                    return acc;
                }, {});

                return {
                    _summaryDelta: { disconnectedDevices: 1, devicesWithIssues: 1, missingOnDevice: enrollmentStatus.active || 0 },
                    entry: {
                        device: {
                            databaseDeviceId: dbDevice.id,
                            name: dbDevice.name,
                            ip: dbDevice.ip,
                            port: dbDevice.port,
                            status: dbDevice.status,
                            connected: false,
                            lastUserSync: dbDevice.last_user_sync,
                            lastEventSync: dbDevice.last_event_sync
                        },
                        summary: {
                            databaseUsers: enrollmentStatus.active || 0,
                            deviceUsers: null,
                            matched: 0,
                            missingOnDevice: enrollmentStatus.active || 0,
                            missingInDatabase: 0,
                            cardMismatches: 0,
                            activeEnrollments: enrollmentStatus.active || 0,
                            pendingEnrollments: enrollmentStatus.pending || 0,
                            removedEnrollments: enrollmentStatus.removed || 0
                        },
                        differences: {
                            missingOnDevice: [],
                            missingInDatabase: [],
                            cardMismatches: []
                        },
                        warning: 'Device is not currently connected'
                    }
                };
            }

            try {
                const comparison = await this.compareDeviceToDatabase(dbDevice.id);
                const hasIssues = comparison.summary.missingOnDevice > 0 ||
                    comparison.summary.missingInDatabase > 0 ||
                    comparison.summary.cardMismatches > 0;

                return {
                    _summaryDelta: {
                        connectedDevices: 1,
                        matchedUsers: comparison.summary.matched,
                        missingOnDevice: comparison.summary.missingOnDevice,
                        missingInDatabase: comparison.summary.missingInDatabase,
                        cardMismatches: comparison.summary.cardMismatches,
                        devicesWithIssues: hasIssues ? 1 : 0
                    },
                    entry: {
                        ...comparison,
                        device: { ...comparison.device, connected: true }
                    }
                };
            } catch (error) {
                return {
                    _summaryDelta: { connectedDevices: 1, devicesWithIssues: 1 },
                    entry: {
                        device: {
                            databaseDeviceId: dbDevice.id,
                            name: dbDevice.name,
                            ip: dbDevice.ip,
                            port: dbDevice.port,
                            status: dbDevice.status,
                            connected: true,
                            lastUserSync: dbDevice.last_user_sync,
                            lastEventSync: dbDevice.last_event_sync
                        },
                        summary: {
                            databaseUsers: 0,
                            deviceUsers: null,
                            matched: 0,
                            missingOnDevice: 0,
                            missingInDatabase: 0,
                            cardMismatches: 0,
                            activeEnrollments: 0,
                            pendingEnrollments: 0,
                            removedEnrollments: 0
                        },
                        differences: {
                            missingOnDevice: [],
                            missingInDatabase: [],
                            cardMismatches: []
                        },
                        error: error.message
                    }
                };
            }
        }));

        const devices = deviceResults.map(({ _summaryDelta, entry }) => {
            for (const [key, val] of Object.entries(_summaryDelta)) {
                summary[key] = (summary[key] || 0) + val;
            }
            return entry;
        });

        return {
            summary,
            devices
        };
    }

    async repairDeviceFromDatabase(deviceId) {
        const dbDevice = await this.getDbDevice(deviceId);

        if (!dbDevice) {
            throw new Error(`Device ${deviceId} is not registered in the database`);
        }

        const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
        const cardAssignments = await this.prisma.cardAssignment.findMany({
            where: {
                status: 'active',
                enrollments: {
                    some: {
                        deviceId: dbDevice.id,
                        status: 'active'
                    }
                }
            },
            include: {
                enrollments: true
            }
        });

        const syncStats = await this.syncDatabaseToDevice(supremaDeviceId, dbDevice.id, cardAssignments);
        const reconciliation = await this.compareDeviceToDatabase(dbDevice.id);

        return {
            action: 'db-to-device',
            deviceId: dbDevice.id,
            supremaDeviceId,
            syncStats,
            reconciliation
        };
    }

    async repairUserOnDevice(deviceId, userId) {
        const dbDevice = await this.getDbDevice(deviceId);

        if (!dbDevice) {
            throw new Error(`Device ${deviceId} is not registered in the database`);
        }

        const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
        const normalizedUserId = String(userId);
        const assignments = await this.prisma.cardAssignment.findMany({
            where: {
                employeeId: normalizedUserId,
                status: 'active',
                enrollments: {
                    some: {
                        deviceId: dbDevice.id,
                        status: { in: ['active', 'pending'] }
                    }
                }
            },
            orderBy: [
                { assignedAt: 'desc' },
                { id: 'desc' }
            ]
        });

        if (assignments.length === 0) {
            const deleteResult = await this.deleteUserFromDevice(dbDevice.id, normalizedUserId);
            return {
                action: 'remove-device-user',
                userId: normalizedUserId,
                deviceId: dbDevice.id,
                result: deleteResult
            };
        }

        const expectedCards = this.buildExpectedDeviceCards(assignments);
        const deviceUsers = await this.userService.getUsers(supremaDeviceId, [normalizedUserId]).catch(() => []);
        const deviceUser = Array.isArray(deviceUsers) && deviceUsers.length > 0 ? deviceUsers[0] : null;

        if (!deviceUser) {
            await this.userService.enrollUsers(supremaDeviceId, [{
                id: normalizedUserId,
                name: assignments[0]?.employeeName || ''
            }]);
        }

        for (const card of expectedCards) {
            await this.userService.removeDuplicateCardAssignment(supremaDeviceId, card.cardData, normalizedUserId);
        }

        if (deviceUser) {
            await this.userService.clearUserCards(supremaDeviceId, normalizedUserId);
        }

        if (expectedCards.length > 0) {
            await this.userService.setCardsForUser(supremaDeviceId, normalizedUserId, expectedCards);
        }

        await Promise.all(assignments.map((assignment) =>
            this.updateEnrollmentRecord(dbDevice.id, assignment.id, normalizedUserId, 'active')
        ));

        return {
            action: deviceUser ? 'update-user-card' : 'enroll-user',
            userId: normalizedUserId,
            deviceId: dbDevice.id,
            assignmentId: assignments[0]?.id || null,
            assignmentCount: assignments.length,
            reconciliation: await this.compareDeviceToDatabase(dbDevice.id)
        };
    }

    // Helper methods

    normalizeCardForStorage(cardData) {
        if (cardData === null || cardData === undefined || cardData === '') {
            return null;
        } else {
        }

        if (Buffer.isBuffer(cardData)) {
            return normalizeToHex(cardData.toString('hex'));
        }

        if (Array.isArray(cardData) || cardData instanceof Uint8Array) {
            return normalizeToHex(Buffer.from(cardData).toString('hex'));
        }

        if (typeof cardData === 'object') {
            if (cardData.data !== undefined) {
                return this.normalizeCardForStorage(cardData.data);
            }
            return null;
        }

        const value = String(cardData).trim();
        if (!value) return null;

        if (/^[0-9A-Fa-f]+$/.test(value)) {
            return normalizeToHex(value);
        }

        const base64Pattern = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        if (value.length % 4 === 0 && base64Pattern.test(value)) {
            const decoded = Buffer.from(value, 'base64');
            if (decoded.length > 0) {
                return normalizeToHex(decoded.toString('hex'));
            }
        }

        return null;
    }

    normalizeCardData(cardData) {
        if (cardData === null || cardData === undefined || cardData === '') {
            return null;
        }

        const normalizedForStorage = this.normalizeCardForStorage(cardData);
        if (normalizedForStorage) {
            return normalizedForStorage;
        }

        if (Buffer.isBuffer(cardData)) {
            return cardData.toString('hex').toUpperCase();
        }

        if (Array.isArray(cardData)) {
            return JSON.stringify(cardData);
        }

        if (typeof cardData === 'object') {
            if (cardData.data !== undefined) {
                return this.normalizeCardData(cardData.data);
            }

            return JSON.stringify(cardData);
        }

        return String(cardData).trim().toUpperCase();
    }
    
    getCardTypeNumber(cardType) {
        const types = { 'CSN': 1, 'Secure': 2, 'Wiegand': 256, 'QR': 512 };
        return types[cardType] || 1;
    }

    async getSupremaDeviceId(dbDeviceId) {
        if (parseInt(dbDeviceId) > 100000) {
            return parseInt(dbDeviceId);
        }
        
        const connectedDevices = await this.connectionService.getConnectedDevices();
        const dbDevices = await this.connectionService.getAllDevicesFromDB();
        const dbDevice = dbDevices.find(d => d.id === parseInt(dbDeviceId));
        
        if (!dbDevice) {
            throw new Error(`Device with ID ${dbDeviceId} not found in database`);
        }
        
        for (const device of connectedDevices) {
            const info = device.toObject ? device.toObject() : device;
            if (info.ipaddr === dbDevice.ip && info.port === dbDevice.port) {
                return info.deviceid;
            }
        }
        
        throw new Error(`Device ${dbDevice.name} is not connected`);
    }

    async getDbDevice(deviceIdOrSupremaId) {
        const dbDevices = await this.connectionService.getAllDevicesFromDB();
        
        // If it looks like a DB ID
        if (parseInt(deviceIdOrSupremaId) < 100000) {
            return dbDevices.find(d => d.id === parseInt(deviceIdOrSupremaId));
        }
        
        // Otherwise it's a Suprema ID - find by connected device info
        const connectedDevices = await this.connectionService.getConnectedDevices();
        for (const device of connectedDevices) {
            const info = device.toObject ? device.toObject() : device;
            if (info.deviceid === parseInt(deviceIdOrSupremaId)) {
                return dbDevices.find(d => d.ip === info.ipaddr && d.port === info.port);
            }
        }
        
        return null;
    }

    /**
     * Repair ALL connected devices in sequence.
     * Returns per-device results including successes and failures.
     */
    async repairAllDevices() {
        const overview = await this.getReconciliationOverview();
        const results = [];
        let successCount = 0;
        let failureCount = 0;
        let skippedCount = 0;

        for (const entry of overview.devices) {
            if (!entry.device.connected) {
                skippedCount++;
                results.push({
                    deviceId: entry.device.databaseDeviceId,
                    name: entry.device.name,
                    status: 'skipped',
                    reason: 'Device not connected',
                });
                continue;
            }

            const hasDrift = entry.summary.missingOnDevice > 0
                || entry.summary.missingInDatabase > 0
                || entry.summary.cardMismatches > 0;

            if (!hasDrift) {
                skippedCount++;
                results.push({
                    deviceId: entry.device.databaseDeviceId,
                    name: entry.device.name,
                    status: 'skipped',
                    reason: 'No drift detected',
                });
                continue;
            }

            try {
                const repairResult = await this.repairDeviceFromDatabase(entry.device.databaseDeviceId);
                successCount++;
                results.push({
                    deviceId: entry.device.databaseDeviceId,
                    name: entry.device.name,
                    status: 'success',
                    syncStats: repairResult.syncStats,
                    reconciliation: repairResult.reconciliation?.summary || null,
                });
            } catch (error) {
                failureCount++;
                results.push({
                    deviceId: entry.device.databaseDeviceId,
                    name: entry.device.name,
                    status: 'failure',
                    error: error.message,
                });
            }
        }

        return {
            summary: {
                total: overview.devices.length,
                repaired: successCount,
                failed: failureCount,
                skipped: skippedCount,
            },
            devices: results,
        };
    }

    // ==================== AUTO-SYNC ====================

    /**
     * Start periodic DB→Device reconciliation.
     * Calls syncDatabaseToAllDevices() on every tick.
     *
     * @param {number} [interval=300000] - Interval in ms (default: 5 minutes)
     */
    startAutoSync(interval = 300000) {
        this.stopAutoSync(); // clear any existing timer

        this._autoSyncRunning = false;

        this._autoSyncInterval = setInterval(async () => {
            if (this._autoSyncRunning) {
                this.logger.debug('[AutoSync] Skipped — previous cycle still running');
                return;
            }
            try {
                if (!this._isGatewayConnected()) {
                    this.logger.debug('[AutoSync] Skipped — gateway not connected');
                    return;
                }
                this._autoSyncRunning = true;
                this.logger.info('[AutoSync] Running scheduled DB→Device sync...');
                const result = await this.syncDatabaseToAllDevices();
                this.logger.info(
                    `[AutoSync] Complete — ${result.totalDevices} device(s), ` +
                    `${result.totalCardAssignments} assignment(s)`
                );
            } catch (err) {
                this.logger.error('[AutoSync] Error during scheduled sync:', err.message);
            } finally {
                this._autoSyncRunning = false;
            }
        }, interval);

        this._autoSyncIntervalMs = interval;
        this.logger.info(`[AutoSync] Started (interval: ${interval}ms)`);
    }

    /**
     * Stop the periodic auto-sync. Idempotent.
     */
    stopAutoSync() {
        if (this._autoSyncInterval) {
            clearInterval(this._autoSyncInterval);
            this._autoSyncInterval   = null;
            this._autoSyncIntervalMs = null;
            this._autoSyncRunning    = false;
            this.logger.info('[AutoSync] Stopped');
        }
    }

    /**
     * @returns {{ running: boolean, intervalMs: number|null }}
     */
    getAutoSyncStatus() {
        return {
            running:    !!this._autoSyncInterval,
            intervalMs: this._autoSyncIntervalMs ?? null
        };
    }

    /**
     * Start periodic Device→DB import for all connected devices.
     * Also listens for future device:connected events to import immediately.
     *
     * @param {number} [interval=30000] - Interval in ms (default: 30 seconds)
     */
    startAutoImportFromDevices(interval = 30000) {
        this.stopAutoImportFromDevices();

        // Use the routine interval as the per-device cooldown floor so a
        // reconnect storm can never produce more work than the scheduled cycle.
        this._deviceImportCooldownMs = Math.max(5000, Math.floor(interval / 2));

        this._onAutoImportDeviceConnected = ({ deviceId }) => {
            this._importConnectedDevice(deviceId).catch(() => {});
        };
        this.connectionService.on('device:connected', this._onAutoImportDeviceConnected);

        this._autoImportInterval = setInterval(() => {
            this._runAutoImportCycle('interval').catch(() => {});
        }, interval);

        this._autoImportIntervalMs = interval;
        this.logger.info(`[AutoImport] Started device→DB import routine (interval: ${interval}ms)`);

        this._runAutoImportCycle('startup').catch(() => {});
    }

    /**
     * Stop the periodic Device→DB import routine.
     */
    stopAutoImportFromDevices() {
        if (this._autoImportInterval) {
            clearInterval(this._autoImportInterval);
            this._autoImportInterval = null;
            this._autoImportIntervalMs = null;
            this.logger.info('[AutoImport] Stopped device→DB import routine');
        }

        if (this._onAutoImportDeviceConnected) {
            this.connectionService.removeListener('device:connected', this._onAutoImportDeviceConnected);
            this._onAutoImportDeviceConnected = null;
        }
    }

    getAutoImportStatus() {
        return {
            running: !!this._autoImportInterval,
            intervalMs: this._autoImportIntervalMs ?? null,
        };
    }
}

export default UserSyncService;
