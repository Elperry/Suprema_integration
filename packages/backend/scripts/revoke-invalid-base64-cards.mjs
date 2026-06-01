import dotenv from 'dotenv';
import winston from 'winston';
import { PrismaClient } from '@prisma/client';

import config from '../src/core/config/index.js';
import DatabaseManager from '../src/models/database.js';
import SupremaConnectionService from '../src/services/connectionService.js';
import SupremaUserService from '../src/services/userService.js';
import SupremaBiometricService from '../src/services/biometricService.js';
import EnrollmentService from '../src/services/enrollmentService.js';
import { normalizeToHex, validateCardData } from '../src/core/utils/cardUtils.js';

dotenv.config();

function createLogger() {
    return winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
        ),
        transports: [new winston.transports.Console()]
    });
}

function isBase64CardData(cardData) {
    const validation = validateCardData(String(cardData || '').trim());
    return validation.valid && validation.format === 'base64';
}

function appendMaintenanceNote(existingNotes, normalizedHex) {
    const notePrefix = 'Invalid Base64 card data revoked by maintenance script';

    if (existingNotes && existingNotes.includes(notePrefix)) {
        return existingNotes;
    }

    const maintenanceNote = `${notePrefix}. Normalized hex: ${normalizedHex}`;
    return [existingNotes, maintenanceNote].filter(Boolean).join('\n');
}

function serialize(value) {
    return JSON.stringify(
        value,
        (_, current) => (typeof current === 'bigint' ? current.toString() : current),
        2
    );
}

function closeGrpcClient(client) {
    if (!client || typeof client.close !== 'function') {
        return;
    }

    try {
        client.close();
    } catch {
        // Ignore close errors during one-shot maintenance cleanup.
    }
}

async function buildRuntime(logger) {
    if (!config.database.url) {
        throw new Error('DATABASE_URL is not configured');
    }

    const datasourceUrl = `${config.database.url}${config.database.url.includes('?') ? '&' : '?'}connection_limit=${config.database.poolMax}&pool_timeout=${config.database.poolTimeout}`;
    const prisma = new PrismaClient({
        log: [{ emit: 'stdout', level: 'error' }],
        datasourceUrl
    });

    const database = new DatabaseManager(logger, prisma);
    await database.initialize();

    const connectionService = new SupremaConnectionService(
        {
            gateway: {
                ip: config.gateway.ip,
                port: config.gateway.port,
                useSSL: config.gateway.useSSL,
                caFile: config.gateway.caFile,
                tlsServerName: config.gateway.tlsServerName,
                readyTimeoutMs: config.gateway.readyTimeoutMs,
            }
        },
        database
    );

    await connectionService.initializeGateway();

    const userService = new SupremaUserService(connectionService, { prisma, logger });
    const biometricService = new SupremaBiometricService(connectionService);
    const enrollmentService = new EnrollmentService(
        userService,
        biometricService,
        connectionService,
        { prisma, logger }
    );

    return {
        prisma,
        database,
        connectionService,
        userService,
        biometricService,
        enrollmentService
    };
}

async function cleanupRuntime(runtime) {
    if (!runtime) {
        return;
    }

    closeGrpcClient(runtime.connectionService?.connClient);
    closeGrpcClient(runtime.connectionService?.deviceClient);

    closeGrpcClient(runtime.userService?.userClient);
    closeGrpcClient(runtime.userService?.fingerClient);
    closeGrpcClient(runtime.userService?.cardClient);
    closeGrpcClient(runtime.userService?.faceClient);
    closeGrpcClient(runtime.userService?.accessClient);
    closeGrpcClient(runtime.userService?.authClient);

    closeGrpcClient(runtime.biometricService?.fingerClient);
    closeGrpcClient(runtime.biometricService?.cardClient);
    closeGrpcClient(runtime.biometricService?.faceClient);

    if (runtime.database) {
        await runtime.database.close();
    } else if (runtime.prisma) {
        await runtime.prisma.$disconnect();
    }
}

async function loadCandidates(prisma) {
    const assignments = await prisma.cardAssignment.findMany({
        where: {
            OR: [
                { status: { not: 'revoked' } },
                { enrollments: { some: { status: 'active' } } }
            ]
        },
        include: {
            enrollments: {
                where: { status: 'active' },
                include: { device: true }
            }
        },
        orderBy: { id: 'asc' }
    });

    return assignments.filter((assignment) => isBase64CardData(assignment.cardData));
}

async function revokeAssignment(runtime, assignment, summary, logger) {
    const normalizedHex = normalizeToHex(String(assignment.cardData || '').trim());
    const itemSummary = {
        assignmentId: assignment.id,
        employeeId: assignment.employeeId,
        employeeName: assignment.employeeName,
        normalizedHex,
        deviceRemovals: [],
        errors: []
    };

    for (const enrollment of assignment.enrollments) {
        try {
            await runtime.enrollmentService.removeFromDevice(enrollment.deviceId, assignment.id);
            itemSummary.deviceRemovals.push({
                deviceId: enrollment.deviceId,
                deviceName: enrollment.device?.name || null,
                status: 'removed'
            });
            summary.deviceRemovals += 1;
        } catch (error) {
            itemSummary.errors.push({
                deviceId: enrollment.deviceId,
                deviceName: enrollment.device?.name || null,
                message: error.message
            });
            summary.deviceFailures += 1;
        }
    }

    const noteValue = appendMaintenanceNote(assignment.notes, normalizedHex);
    const updateData = {
        status: 'revoked',
        revokedAt: assignment.revokedAt || new Date(),
        notes: noteValue
    };

    await runtime.prisma.cardAssignment.update({
        where: { id: assignment.id },
        data: updateData
    });

    if (assignment.status === 'revoked') {
        summary.alreadyRevoked += 1;
    } else {
        summary.revoked += 1;
    }

    if (itemSummary.errors.length > 0) {
        summary.failures.push(itemSummary);
        logger.warn(
            `Assignment ${assignment.id} revoked in DB, but ${itemSummary.errors.length} device removal(s) failed`
        );
        return;
    }

    summary.processed += 1;
    logger.info(`Assignment ${assignment.id} revoked and removed from ${itemSummary.deviceRemovals.length} device(s)`);
}

async function main() {
    const logger = createLogger();
    let runtime;

    const summary = {
        candidates: 0,
        processed: 0,
        revoked: 0,
        alreadyRevoked: 0,
        deviceRemovals: 0,
        deviceFailures: 0,
        failures: []
    };

    try {
        runtime = await buildRuntime(logger);

        const candidates = await loadCandidates(runtime.prisma);
        summary.candidates = candidates.length;

        if (candidates.length === 0) {
            logger.info('No Base64 card assignments requiring revocation were found.');
            console.log(serialize(summary));
            return;
        }

        logger.info(`Found ${candidates.length} Base64 card assignment(s) to revoke.`);

        for (const assignment of candidates) {
            await revokeAssignment(runtime, assignment, summary, logger);
        }

        console.log(serialize(summary));

        if (summary.failures.length > 0) {
            process.exitCode = 1;
        }
    } finally {
        await cleanupRuntime(runtime);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});