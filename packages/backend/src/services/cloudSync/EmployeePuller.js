/**
 * EmployeePuller
 *
 * The cloud `employee` view is the source of truth for who works at the
 * school. Each cycle it is copied into the local `employee` cache, and every
 * employee without a local `user` row gets one (card assignments hang off
 * `user`). Users are only ever added here, never removed.
 *
 * Only the columns the gate PC uses are read (EMPLOYEE_COLUMNS, the same in
 * every tenant's view). Whatever else the view exposes - passwords, bank
 * details, salary - is never selected, so the gate PC's cloud account needs
 * SELECT on these columns only. The local cache used to keep everything in
 * an `extra` JSON column, which is how it leaked into database dumps.
 *
 * Local stale-row pruning is skipped when the cloud answer is suspiciously
 * small (below `minPrunePct` of the local count).
 */
export const EMPLOYEE_COLUMNS = [
    'id', 'displayname', 'code', 'ssn', 'username', 'officialemail', 'jobtitle', 'company_id', 'departmentid', 'suspend',
];

export class EmployeePuller {
    /**
     * @param {object} o
     * @param {object} o.cloud  CloudStore
     * @param {object} o.local  { upsertEmployees, countEmployees, deleteEmployeesNotIn,
     *                            employeesWithoutUser, createUsers }
     */
    constructor({ cloud, local, logger, minPrunePct = 50 }) {
        this.cloud = cloud;
        this.local = local;
        this.logger = logger;
        this.minPrunePct = Number.isFinite(minPrunePct) ? Math.max(0, Math.min(100, minPrunePct)) : 50;
    }

    async run() {
        const rows = await this.cloud.findAll('employee', EMPLOYEE_COLUMNS);
        if (!rows || rows.length === 0) {
            this.logger.warn('Employee pull: cloud returned 0 rows - local cache left as is');
            return { upserted: 0, removed: 0, usersCreated: 0 };
        }

        const employees = rows.map(row => mapEmployee(row)).filter(e => e.id !== null);
        await this.local.upsertEmployees(employees);

        const removed = await this._prune(employees.map(e => e.id));
        const usersCreated = await this._provisionUsers();
        await this.local.refreshUsersFromEmployees();
        this.logger.info(`Employee pull: ${employees.length} upserted, ${removed} stale removed, ${usersCreated} user(s) created`);
        return { upserted: employees.length, removed, usersCreated };
    }

    async _prune(cloudIds) {
        const localCount = await this.local.countEmployees();
        const minRequired = Math.ceil((localCount * this.minPrunePct) / 100);
        if (localCount > 0 && cloudIds.length < minRequired) {
            this.logger.warn(
                `Employee pull: cloud returned ${cloudIds.length} row(s) vs local ${localCount}; ` +
                `below ${this.minPrunePct}% - stale-row delete skipped`
            );
            return 0;
        }
        const before = localCount;
        await this.local.deleteEmployeesNotIn(cloudIds);
        return Math.max(0, before - (await this.local.countEmployees()));
    }

    async _provisionUsers() {
        const missing = await this.local.employeesWithoutUser();
        if (missing.length === 0) return 0;
        await this.local.createUsers(missing.map(e => ({
            code: e.code || '',
            name: e.displayname || e.fullname || '',
            full_name: e.fullname || e.displayname || '',
            employee_id: e.id,
        })));
        return missing.length;
    }
}

/** One cloud employee row in the local cache's shape (known columns only). */
export function mapEmployee(row) {
    const explicitFirst = firstNonEmpty(row.firstname, row.first_name, row.firstName);
    const explicitLast = firstNonEmpty(row.lastname, row.last_name, row.lastName);
    const displayName = firstNonEmpty(
        row.displayname, row.fullname, row.full_name, row.employee_name, row.name,
        joinName(explicitFirst, explicitLast),
    );
    const { firstname, lastname } = splitName(displayName, explicitFirst, explicitLast);
    const plain = value => (typeof value === 'bigint' ? Number(value) : value ?? null);

    return {
        id: plain(row.id),
        fullname: firstNonEmpty(row.fullname, row.full_name, displayName, joinName(firstname, lastname)),
        firstname,
        lastname,
        displayname: displayName,
        email: firstNonEmpty(row.email, row.officialemail, row.username),
        mobile: firstNonEmpty(row.mobile, row.phone, row.phoneNumber, row.phonenumber, row.telephone),
        jobtitle: firstNonEmpty(row.jobtitle, row.job_title),
        company_id: plain(row.company_id),
        suspend: firstNonEmpty(row.suspend),
        ssn: firstNonEmpty(row.ssn),
        card: firstNonEmpty(row.card),
        department: firstNonEmpty(row.department, row.departmentid),
        code: firstNonEmpty(row.code, row.employee_code, row.emp_code),
        extra: null,
    };
}

function firstNonEmpty(...values) {
    for (const value of values) {
        if (value === null || value === undefined) continue;
        if (typeof value === 'string') {
            const trimmed = value.trim();
            if (trimmed) return trimmed;
            continue;
        }
        return typeof value === 'bigint' ? Number(value) : value;
    }
    return null;
}

function joinName(first, last) {
    const full = [first, last].map(p => (typeof p === 'string' ? p.trim() : p)).filter(Boolean).join(' ').trim();
    return full || null;
}

function splitName(displayName, explicitFirst, explicitLast) {
    if (explicitFirst || explicitLast) {
        return { firstname: explicitFirst ?? null, lastname: explicitLast ?? null };
    }
    const name = typeof displayName === 'string' ? displayName.trim().replace(/\s+/g, ' ') : '';
    if (!name) return { firstname: null, lastname: null };
    const [firstname, ...rest] = name.split(' ');
    return { firstname: firstname || null, lastname: rest.length ? rest.join(' ') : null };
}
