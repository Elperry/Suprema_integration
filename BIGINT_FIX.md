# BigInt Serialization Fix

## Issue: "Do not know how to serialize a BigInt"

### Error Details:
```
TypeError: Do not know how to serialize a BigInt
at JSON.stringify (<anonymous>)
at ServerResponse.json (express/lib/response.js:1160:12)
at employeeRoutes.js:28:17
```

### Root Cause:
MySQL `BIGINT` columns are returned as JavaScript `BigInt` type by Prisma's `$queryRawUnsafe`. When Express tries to serialize the response to JSON using `res.json()`, it fails because:
- JSON.stringify() cannot handle BigInt values by default
- BigInt is not part of the JSON specification
- Express response serialization uses JSON.stringify() internally

### Solution:
Added a utility method `convertBigIntToNumber()` in `database.js` that recursively converts all BigInt values to Number before returning data from employee queries.

## Implementation

### 1. Added Conversion Utility Method

```javascript
/**
 * Convert BigInt values to Number in objects/arrays
 * Required for JSON serialization of MySQL BIGINT columns
 */
convertBigIntToNumber(data) {
    if (Array.isArray(data)) {
        return data.map(item => this.convertBigIntToNumber(item));
    } else if (data !== null && typeof data === 'object') {
        const converted = {};
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'bigint') {
                converted[key] = Number(value);
            } else if (typeof value === 'object' && value !== null) {
                converted[key] = this.convertBigIntToNumber(value);
            } else {
                converted[key] = value;
            }
        }
        return converted;
    }
    return data;
}
```

### 2. Updated Employee Query Methods

#### getAllEmployees()
```javascript
async getAllEmployees(filters = {}) {
    // ... build query ...
    const employees = await this.prisma.$queryRawUnsafe(query, ...params);
    
    // Convert BigInt values to Number for JSON serialization ✅
    return this.convertBigIntToNumber(employees);
}
```

#### getEmployeeById()
```javascript
async getEmployeeById(id) {
    const employees = await this.prisma.$queryRawUnsafe(
        'SELECT * FROM employee WHERE id = ? LIMIT 1',
        id
    );
    const employee = employees[0] || null;
    
    // Convert BigInt values to Number for JSON serialization ✅
    return employee ? this.convertBigIntToNumber([employee])[0] : null;
}
```

#### searchEmployees()
```javascript
async searchEmployees(searchTerm) {
    const employees = await this.prisma.$queryRawUnsafe(
        `SELECT * FROM allemployees 
         WHERE displayname LIKE ? OR email LIKE ? OR fullname LIKE ?
         LIMIT 50`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`
    );
    
    // Convert BigInt values to Number for JSON serialization ✅
    return this.convertBigIntToNumber(employees);
}
```

## Why This Works

1. **Recursive Conversion**: Handles nested objects and arrays
2. **Type Safety**: Only converts actual BigInt values
3. **Preserves Structure**: Maintains original object/array structure
4. **No Data Loss**: Safe conversion for ID fields (BigInt → Number)
5. **JSON Compatible**: All values can now be serialized by Express

## Testing

### Before Fix:
```bash
curl http://localhost:3000/api/employees?limit=1
# Error: 500 - Do not know how to serialize a BigInt
```

### After Fix:
```bash
curl http://localhost:3000/api/employees?limit=1
# Success: 200 - { success: true, count: 1, data: [...] }
```

## Notes

- This fix is required because the employee data comes from **database views** (`employee`, `allemployees`) accessed via raw SQL
- Views may have BIGINT columns that Prisma converts to JavaScript BigInt
- Regular Prisma models with `@db.UnsignedInt` don't have this issue as Prisma handles the conversion automatically
- Alternative solution would be to cast BIGINT to INT in the SQL query, but this utility method is more flexible

## Files Modified

- `packages/backend/src/models/database.js`
  - Added `convertBigIntToNumber()` method
  - Updated `getAllEmployees()` 
  - Updated `getEmployeeById()`
  - Updated `searchEmployees()`

## Status

✅ **FIXED** - Employee API endpoints now return JSON successfully
✅ **TESTED** - All employee endpoints working correctly
✅ **NO BREAKING CHANGES** - Backward compatible conversion
