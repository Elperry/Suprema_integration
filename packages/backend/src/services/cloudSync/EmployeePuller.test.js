import test from 'node:test';
import assert from 'node:assert/strict';
import { EmployeePuller } from './EmployeePuller.js';
import { MemoryCloudStore } from './testing/MemoryCloudStore.js';

const silent = { info() {}, warn() {}, error() {}, debug() {} };

function fakeLocal(existing = [], users = []) {
    const local = {
        employees: new Map(existing.map(e => [e.id, e])),
        users: [...users],
        deletedNotIn: null,
        async upsertEmployees(rows) { for (const r of rows) local.employees.set(r.id, r); },
        async countEmployees() { return local.employees.size; },
        async deleteEmployeesNotIn(ids) {
            local.deletedNotIn = ids;
            for (const id of [...local.employees.keys()]) if (!ids.includes(id)) local.employees.delete(id);
        },
        async employeesWithoutUser() {
            const have = new Set(local.users.map(u => u.employee_id));
            return [...local.employees.values()].filter(e => !have.has(e.id));
        },
        async createUsers(rows) { local.users.push(...rows); },
        refreshed: 0,
        async refreshUsersFromEmployees() { local.refreshed++; return 0; },
    };
    return local;
}

const cloudEmployee = (id, extra = {}) => ({
    id, fullname: `Emp ${id}`, displayname: `E${id}`, email: `e${id}@school`, code: `C${id}`,
    userpassword: 'secret', bankaccount: '123', salary: 9000, ...extra,
});

test('only the known columns reach the local cache: no passwords, bank or salary', async () => {
    const cloud = new MemoryCloudStore({ employee: [cloudEmployee(1)] });
    const local = fakeLocal();
    await new EmployeePuller({ cloud, local, logger: silent }).run();
    const stored = local.employees.get(1);
    assert.equal(stored.fullname, 'Emp 1');
    assert.equal(stored.code, 'C1');
    assert.equal(stored.extra, null);
    for (const leaked of ['userpassword', 'bankaccount', 'salary']) {
        assert.equal(JSON.stringify(stored).includes(leaked), false, `${leaked} must not be stored`);
    }
});

test('an empty cloud answer changes nothing locally', async () => {
    const cloud = new MemoryCloudStore({ employee: [] });
    const local = fakeLocal([{ id: 1 }, { id: 2 }]);
    await new EmployeePuller({ cloud, local, logger: silent }).run();
    assert.equal(local.employees.size, 2);
    assert.equal(local.deletedNotIn, null);
});

test('stale employees are removed only when the cloud answer is not suspiciously small', async () => {
    const small = fakeLocal([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
    await new EmployeePuller({ cloud: new MemoryCloudStore({ employee: [cloudEmployee(1)] }), local: small, logger: silent }).run();
    assert.equal(small.deletedNotIn, null, '1 of 4 is below the 50% guard');

    const fine = fakeLocal([{ id: 1 }, { id: 2 }]);
    await new EmployeePuller({ cloud: new MemoryCloudStore({ employee: [cloudEmployee(1), cloudEmployee(3)] }), local: fine, logger: silent }).run();
    assert.deepEqual(fine.deletedNotIn, [1, 3]);
});

test('every employee without a local user gets one', async () => {
    const cloud = new MemoryCloudStore({ employee: [cloudEmployee(1), cloudEmployee(2)] });
    const local = fakeLocal([], [{ employee_id: 1 }]);
    await new EmployeePuller({ cloud, local, logger: silent }).run();
    assert.deepEqual(local.users.map(u => u.employee_id), [1, 2]);
    assert.deepEqual(local.users[1], { code: 'C2', name: 'E2', full_name: 'Emp 2', employee_id: 2 });
});

test('existing users take their code and names from the employee cache every cycle', async () => {
    const cloud = new MemoryCloudStore({ employee: [cloudEmployee(1)] });
    const local = fakeLocal([], [{ employee_id: 1 }]);
    await new EmployeePuller({ cloud, local, logger: silent }).run();
    assert.equal(local.refreshed, 1);
});
