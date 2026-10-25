/**
 * LocalSource
 *
 * Everything the cloud sync reads from or writes to this gate PC's own
 * database, behind one small interface (so the sync logic can be tested
 * without Prisma). Writes here are local only: the event sync stamp, the
 * employee cache, auto-created users, and the visitor provisioning cache.
 */
export class LocalSource {
    /** @param {import('@prisma/client').PrismaClient} prisma local client */
    constructor(prisma, { upsertBatchSize = 50 } = {}) {
        this.prisma = prisma;
        this.upsertBatchSize = upsertBatchSize;
    }

    // ── snapshots for the pushers ───────────────────────────────────────────

    users() {
        return this.prisma.user.findMany({ select: { id: true, code: true, name: true, full_name: true, employee_id: true } });
    }

    devices() {
        return this.prisma.device.findMany({
            select: {
                id: true, name: true, ip: true, port: true, isActive: true,
                direction: true, deviceType: true, serialNumber: true,
            },
        });
    }

    cards() {
        return this.prisma.cardAssignment.findMany({
            select: {
                id: true, user_id: true, card_data: true, card_csn: true,
                status: true, assignedAt: true, revokedAt: true, notes: true,
            },
        });
    }

    enrollments() {
        return this.prisma.deviceEnrollment.findMany({
            select: { id: true, deviceId: true, cardAssignmentId: true, deviceUserId: true, enrolledAt: true, status: true },
        });
    }

    // ── events ──────────────────────────────────────────────────────────────

    pendingEvents({ since, limit, afterId = 0 }) {
        return this.prisma.event.findMany({
            where: { cloudSyncedAt: null, timestamp: { gte: since }, id: { gt: afterId } },
            orderBy: { id: 'asc' },
            take: limit,
        });
    }

    /** Which of these device user ids are local users right now (not a cached snapshot). */
    async existingUserIds(ids) {
        const rows = await this.prisma.user.findMany({ where: { id: { in: ids.map(Number) } }, select: { id: true } });
        return rows.map(row => String(row.id));
    }

    markEventsSynced(ids, at) {
        return this.prisma.event.updateMany({ where: { id: { in: ids } }, data: { cloudSyncedAt: at } });
    }

    // ── employee cache and user provisioning ────────────────────────────────

    async upsertEmployees(rows) {
        for (let i = 0; i < rows.length; i += this.upsertBatchSize) {
            const batch = rows.slice(i, i + this.upsertBatchSize);
            await this.prisma.$transaction(batch.map(({ id, ...data }) => this.prisma.employee.upsert({
                where: { id },
                update: { ...data, lastSyncedAt: new Date() },
                create: { id, ...data },
            })));
        }
    }

    countEmployees() {
        return this.prisma.employee.count();
    }

    deleteEmployeesNotIn(ids) {
        return this.prisma.employee.deleteMany({ where: { id: { notIn: ids } } });
    }

    async employeesWithoutUser() {
        const [employees, users] = await Promise.all([
            this.prisma.employee.findMany({ select: { id: true, code: true, displayname: true, fullname: true } }),
            this.prisma.user.findMany({ select: { employee_id: true } }),
        ]);
        const have = new Set(users.map(u => u.employee_id));
        return employees.filter(e => !have.has(e.id));
    }

    createUsers(rows) {
        return this.prisma.user.createMany({ data: rows, skipDuplicates: true });
    }

    /**
     * Existing users take their code and names from the employee cache
     * (HR edits an employee code; the cloud user row follows on the next
     * push). Never touches user.id - it is the user ID on the terminals.
     */
    refreshUsersFromEmployees() {
        return this.prisma.$executeRawUnsafe(
            "UPDATE `user` u JOIN `employee` e ON e.id = u.employee_id SET "
            + "u.code = COALESCE(NULLIF(e.code, ''), u.code), "
            + "u.name = COALESCE(NULLIF(e.displayname, ''), NULLIF(e.fullname, ''), u.name), "
            + "u.full_name = COALESCE(NULLIF(e.fullname, ''), NULLIF(e.displayname, ''), u.full_name)"
        );
    }

    // ── visitors (local tempaccess is a cache of cloud rows, keyed by cloud id) ─

    async provisionedIds(ids) {
        const rows = await this.prisma.tempAccess.findMany({ where: { id: { in: ids }, done: true }, select: { id: true } });
        return rows.map(row => row.id);
    }

    recordProvisioned(row) {
        const data = {
            person_name: row.person_name ?? null,
            date: row.date === null || row.date === undefined ? null : String(row.date),
            qrcode: row.qrcode ?? null,
            email: row.email ?? null,
            done: true,
        };
        return this.prisma.tempAccess.upsert({
            where: { id: row.id },
            create: { id: row.id, ...data },
            update: { done: true },
        });
    }
}
