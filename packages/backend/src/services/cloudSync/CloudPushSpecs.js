/**
 * The four tables a gate PC pushes into the shared cloud schema, as
 * KeyedPusher specs. Each spec names the natural key that identifies a row
 * across PCs and the only columns a push may change on an existing row.
 *
 *   user                employee_id                 updates code, name, full_name
 *   device              Suprema serialNumber        updates name, ip, port, isActive, direction, deviceType
 *   card_assignments    card_data                   updates status, revokedAt, notes   (user_id immutable)
 *   device_enrollments  (cloud device, cloud card)  updates status
 *
 * Local ids are translated through `ctx` (see CloudIdentityMap); a row that
 * cannot be translated yet is skipped and retried on a later cycle.
 */

export function userSpec() {
    return {
        table: 'user',
        columns: ['id', 'code', 'name', 'full_name', 'employee_id'],
        keysOf: row => (row.employee_id !== null && row.employee_id !== undefined ? [`emp:${row.employee_id}`] : []),
        toCloud: row => ({
            employee_id: row.employee_id,
            code: row.code ?? '',
            name: row.name ?? '',
            full_name: row.full_name ?? '',
        }),
        updatable: ['code', 'name', 'full_name'],
        immutable: ['employee_id'],
        lookup: { column: 'employee_id' },
    };
}

export function deviceSpec() {
    return {
        table: 'device',
        columns: ['id', 'name', 'ip', 'port', 'isActive', 'direction', 'deviceType', 'serialNumber'],
        // A device without its Suprema serial could never be matched again
        // after an insert (the cloud assigns another id), so it is not pushed.
        keysOf: row => (row.serialNumber ? [`sn:${row.serialNumber}`] : []),
        toCloud: row => (row.serialNumber ? {
            name: row.name ?? null,
            ip: row.ip ?? null,
            port: row.port ?? null,
            isActive: row.isActive ?? true,
            direction: row.direction ?? 'in',
            deviceType: row.deviceType ?? null,
            serialNumber: String(row.serialNumber),
        } : null),
        updatable: ['name', 'ip', 'port', 'isActive', 'direction', 'deviceType'],
        immutable: [],
        lookup: { column: 'serialNumber' },
    };
}

/**
 * @param {{cloudUserId: (localUserId:number) => number|null,
 *          sameCloudUser: (a:number, b:number) => boolean}} ctx
 */
export function cardSpec(ctx) {
    return {
        table: 'card_assignments',
        columns: ['id', 'user_id', 'card_data', 'card_csn', 'status', 'assignedAt', 'revokedAt', 'notes'],
        keysOf: row => (row.card_data ? [`card:${row.card_data}`] : []),
        toCloud: row => {
            const userId = ctx.cloudUserId(row.user_id);
            if (userId === null || userId === undefined || !row.card_data) return null;
            return {
                user_id: userId,
                card_data: row.card_data,
                card_csn: row.card_csn ?? '',
                status: row.status ?? 'active',
                assignedAt: row.assignedAt ?? null,
                revokedAt: row.revokedAt ?? null,
                notes: row.notes ?? null,
            };
        },
        updatable: ['status', 'revokedAt', 'notes'],
        // A card the cloud already holds for another person is never moved.
        // Two cloud user rows of one employee (old duplicates) are one person.
        immutable: ['user_id'],
        equal: { user_id: (cloudValue, wanted) => ctx.sameCloudUser(cloudValue, wanted) },
        lookup: { column: 'card_data' },
    };
}

/**
 * @param {{cloudDeviceId: (localDeviceId:number) => number|null,
 *          cloudCardId: (localCardId:number) => number|null}} ctx
 */
export function enrollmentSpec(ctx) {
    return {
        table: 'device_enrollments',
        columns: ['id', 'deviceId', 'cardAssignmentId', 'deviceUserId', 'enrolledAt', 'status'],
        keysOf: row => (row.deviceId !== null && row.deviceId !== undefined
            && row.cardAssignmentId !== null && row.cardAssignmentId !== undefined
            ? [`enr:${row.deviceId}:${row.cardAssignmentId}`] : []),
        toCloud: row => {
            const deviceId = ctx.cloudDeviceId(row.deviceId);
            const cardId = ctx.cloudCardId(row.cardAssignmentId);
            if (deviceId === null || deviceId === undefined || cardId === null || cardId === undefined) return null;
            return {
                deviceId,
                cardAssignmentId: cardId,
                deviceUserId: String(row.deviceUserId ?? ''),
                enrolledAt: row.enrolledAt ?? null,
                status: row.status ?? 'active',
            };
        },
        updatable: ['status'],
        immutable: [],
        lookup: { scope: 'deviceId', column: 'cardAssignmentId' },
    };
}
