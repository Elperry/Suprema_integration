import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesEmployeeSearch } from './employeeSearch.js';

test('matches employee search by display name and full name variants', () => {
  const employee = {
    id: 42,
    displayname: 'Jane Doe',
    fullname: 'Jane Marie Doe',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'jane@example.com',
    code: 'EMP-42',
  };

  assert.equal(matchesEmployeeSearch(employee, 'jane'), true);
  assert.equal(matchesEmployeeSearch(employee, 'doe'), true);
  assert.equal(matchesEmployeeSearch(employee, 'marie'), true);
  assert.equal(matchesEmployeeSearch(employee, 'jane@example.com'), true);
  assert.equal(matchesEmployeeSearch(employee, 'emp-42'), true);
  assert.equal(matchesEmployeeSearch(employee, 'unknown'), false);
});
