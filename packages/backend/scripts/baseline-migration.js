/**
 * Baseline existing database with Prisma migrations.
 * 
 * Run this ONCE on databases that already have the schema tables.
 * It marks the initial migration as "already applied" without running the SQL.
 * 
 * Usage:
 *   npx prisma migrate resolve --applied 0_init
 * 
 * For new databases, use:
 *   npx prisma migrate deploy
 * 
 * To check current migration status:
 *   npx prisma migrate status
 */
console.log(`
Prisma Migration Baseline
==========================

If your database already has the tables, run:

  npx prisma migrate resolve --applied 0_init

This marks the initial migration as applied without running SQL.

If this is a fresh database, run:

  npx prisma migrate deploy

To check status:

  npx prisma migrate status
`);
