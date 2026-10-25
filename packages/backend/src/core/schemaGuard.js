/**
 * What startup may do about the local schema.
 *
 *   none      schema complete, generated client current
 *   generate  regenerate the Prisma client (no database change)
 *   refuse    tables are missing: stop and ask the operator to run
 *             `npx prisma migrate deploy`. Startup used to run
 *             `prisma db push --accept-data-loss` here, which can drop
 *             columns and their data on a gate PC.
 */
export function schemaAction({ missing, clientStale }) {
    if (missing) return 'refuse';
    return clientStale ? 'generate' : 'none';
}
