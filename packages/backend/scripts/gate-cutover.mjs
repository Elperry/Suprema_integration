#!/usr/bin/env node
/**
 * Cut-over helper for a gate PC (deploy/README.md §1). Used by the install
 * script; nothing here prints a password to the terminal.
 *
 *   export --env <old .env> KEY...   print `export KEY='value'` lines (for eval)
 *   check                            read-only report on DATABASE_URL and CLOUD_DATABASE_URL
 *   rotate-cloud                     change this PC's own cloud password; print the new URL
 *   plan-sql <diff.sql> <apply.sql>  split a schema diff: write the additive part to apply.sql,
 *                                    set foreign-key-only lines aside (exit 0), refuse the rest (exit 4)
 *   write-env --env <old .env> --dirs <a,b>
 *                                    print backend.env (needs API_TOKEN,
 *                                    CLOUD_SYNC_EVENTS_SINCE, NEW_CLOUD_DATABASE_URL)
 */
import fs from 'node:fs';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { GateEnvMigration } from '../src/deploy/GateEnvMigration.js';
import { GateDbProbe, CloudPasswordRotation } from '../src/deploy/GateDb.js';
import { AdditiveSql } from '../src/deploy/AdditiveSql.js';

const [command, ...rest] = process.argv.slice(2);
const option = name => {
    const i = rest.indexOf(`--${name}`);
    return i >= 0 ? rest[i + 1] : undefined;
};
const connect = url => new PrismaClient({ datasourceUrl: url });
const readEnv = file => dotenv.parse(fs.readFileSync(file));

async function main() {
    switch (command) {
        case 'export': {
            const values = readEnv(option('env'));
            const keys = rest.filter((arg, i) => !arg.startsWith('--') && rest[i - 1] !== '--env');
            const only = Object.fromEntries(keys.map(k => [k, values[k] ?? '']));
            process.stdout.write(GateEnvMigration.render(only).split('\n').filter(l => l && !l.startsWith('#')).map(l => `export ${l}`).join('\n') + '\n');
            return 0;
        }
        case 'check': {
            const probe = new GateDbProbe({ connect });
            const report = {
                local: await probe.local(process.env.DATABASE_URL),
                cloud: await probe.cloud(process.env.CLOUD_DATABASE_URL),
            };
            console.log(JSON.stringify(report, null, 2));
            return report.local.ok && report.cloud.ok ? 0 : 1;
        }
        case 'rotate-cloud': {
            const rotation = new CloudPasswordRotation({ connect });
            const { url, verified } = await rotation.rotate(process.env.CLOUD_DATABASE_URL);
            process.stdout.write(url + '\n');
            return verified ? 0 : 3;
        }
        case 'plan-sql': {
            const plan = AdditiveSql.plan(fs.readFileSync(rest[0], 'utf8'));
            fs.writeFileSync(rest[1], AdditiveSql.script(plan.apply));
            console.log(JSON.stringify(plan, null, 2));
            return plan.offending.length === 0 ? 0 : 4;
        }
        case 'write-env': {
            const migration = new GateEnvMigration({
                values: readEnv(option('env')),
                searchDirs: String(option('dirs') || '').split(',').filter(Boolean),
                exists: p => fs.existsSync(p),
            });
            const { values, warnings } = migration.build({
                apiToken: process.env.API_TOKEN,
                eventsSince: process.env.CLOUD_SYNC_EVENTS_SINCE,
                cloudDatabaseUrl: process.env.NEW_CLOUD_DATABASE_URL,
            });
            for (const w of warnings) console.error(`WARNING: ${w}`);
            process.stdout.write(GateEnvMigration.render(values));
            return 0;
        }
        default:
            console.error('usage: gate-cutover.mjs export|check|rotate-cloud|plan-sql|write-env (see the header)');
            return 2;
    }
}

main().then(code => process.exit(code), error => {
    console.error(`gate-cutover ${command}: ${error.message}`);
    process.exit(1);
});
