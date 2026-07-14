const normalize = (value) => String(value ?? '').trim().toLowerCase();

export function matchesEmployeeSearch(employee, term) {
  if (!employee || !term) return false;

  const searchTerm = normalize(term);
  if (!searchTerm) return false;

  const haystacks = [
    employee.displayname,
    employee.fullname,
    employee.full_name,
    employee.name,
    employee.employee_name,
    employee.firstname,
    employee.lastname,
    employee.email,
    employee.code,
    employee.id,
    employee.employee_id,
  ];

  return haystacks.some((value) => normalize(value).includes(searchTerm));
}
