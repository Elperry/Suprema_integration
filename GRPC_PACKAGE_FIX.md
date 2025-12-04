# gRPC Package Migration Fix

## Issue

```
TypeError: Channel credentials must be a ChannelCredentials object
    at new ChannelImplementation
```

## Root Cause

The example files use the deprecated **`grpc`** package:
```javascript
const grpc = require('grpc');  // ❌ DEPRECATED
```

But the project dependencies use the modern **`@grpc/grpc-js`** package, which has a different implementation of `ChannelCredentials`.

## Solution

Replace all instances of `require('grpc')` with `require('@grpc/grpc-js')` in example files.

### Files That Need Update (18 files)

1. `example/action/test/test.js`
2. `example/apb/test/test.js`
3. `example/connect/test/test.js`
4. `example/connectMaster/test/test.js`
5. `example/door/test/test.js`
6. `example/event/test/test.js`
7. `example/monitor/quick.js`
8. `example/quick/quick.js`
9. `example/rtsp/test/test.js`
10. `example/schedule/test/test.js`
11. `example/server/test/test.js`
12. `example/status/test/test.js`
13. `example/sync/test.js`
14. `example/thermal/test/test.js`
15. `example/tna/test/test.js`
16. `example/user/test/test.js`
17. `example/voip/test/test.js`
18. `example/wiegand/test/test.js`

### Quick Fix Script

Run this command to fix all files at once:

**Linux/Mac:**
```bash
find example -name "*.js" -type f -exec sed -i "s/require('grpc')/require('@grpc\/grpc-js')/g" {} +
```

**Windows PowerShell:**
```powershell
Get-ChildItem -Path example -Filter *.js -Recurse | ForEach-Object {
    (Get-Content $_.FullName) -replace "require\('grpc'\)", "require('@grpc/grpc-js')" | Set-Content $_.FullName
}
```

**Manual Fix:**

Edit each file and change line 1:
```javascript
// FROM:
const grpc = require('grpc');

// TO:
const grpc = require('@grpc/grpc-js');
```

## Why This Happened

The `grpc` package was deprecated in favor of `@grpc/grpc-js`:
- **`grpc`** - Old C++ based implementation (deprecated)
- **`@grpc/grpc-js`** - New pure JavaScript implementation (active)

## Verification

After fixing, the example should work:

```bash
node example/user/test/test.js
```

Expected output: Connection succeeds without credential errors.

## Additional Notes

### Both packages have the same API:
```javascript
// Creating credentials
grpc.credentials.createInsecure()
grpc.credentials.createSsl(rootCa)

// Same for both packages!
```

### Why the error occurs:
The `@grpc/grpc-js` package creates `ChannelCredentials` objects that are incompatible with the old `grpc` package's implementation, even though they have the same API.

### Project Standard:
This project uses **`@grpc/grpc-js`** everywhere:
- ✅ Backend services
- ✅ Dependencies in package.json
- ❌ Example files (need update)

## Recommendation

Update all example files to use `@grpc/grpc-js` for consistency with the rest of the project.
