#!/usr/bin/env node
/**
 * Read-only cut-over check (deploy/README.md §1): which local swipes since
 * --since=<ISO UTC> does the shared cloud lack? Prints a JSON report whose
 * `earliestMissing` is the value for CLOUD_SYNC_EVENTS_SINCE.
 *
 *   set -a; . /etc/suprema/backend.env; set +a
 *   node scripts/cloud-event-backlog.mjs --since=2026-10-15T00:00:00Z
 *
 * Reads DATABASE_URL (this PC) and CLOUD_DATABASE_URL. Writes nothing.
 */
import { PrismaClient } from '@prisma/client';
import { CloudStore } from '../src/services/cloudSync/CloudStore.js';
import { LocalSource } from '../src/services/cloudSync/LocalSource.js';
import { EventBacklog } from '../src/services/cloudSync/EventBacklog.js';

const sinceArg = process.argv.find(arg => arg.startsWith('--since='))?.slice('--since='.length);
const since = sinceArg ? new Date(sinceArg) : null;
if (!since || Number.isNaN(since.getTime())) {
    console.error('usage: node scripts/cloud-event-backlog.mjs --since=<ISO UTC time>');
    process.exit(2);
}
if (!process.env.DATABASE_URL || !process.env.CLOUD_DATABASE_URL) {
    console.error('DATABASE_URL and CLOUD_DATABASE_URL must be set (source /etc/suprema/backend.env)');
    process.exit(2);
}

const local = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
const cloud = new PrismaClient({ datasourceUrl: process.env.CLOUD_DATABASE_URL });
try {
    const report = await new EventBacklog({ cloud: new CloudStore(cloud), local: new LocalSource(local) }).report({ since });
    console.log(JSON.stringify(report, null, 2));
} finally {
    await local.$disconnect();
    await cloud.$disconnect();
}
