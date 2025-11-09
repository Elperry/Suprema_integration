# ES6 Quick Reference Guide

## Common Conversions

### Import Statements
```javascript
// CommonJS → ES6
const express = require('express');          → import express from 'express';
const { Router } = require('express');       → import { Router } from 'express';
const grpc = require('@grpc/grpc-js');       → import grpc from '@grpc/grpc-js';
const fs = require('fs');                    → import fs from 'fs';
```

### Export Statements
```javascript
// CommonJS → ES6
module.exports = MyClass;                    → export default MyClass;
module.exports = function() {};              → export default function() {};
exports.myFunction = () => {};               → export const myFunction = () => {};
```

### Local Imports (Don't Forget .js!)
```javascript
// CommonJS → ES6
const Service = require('./service');        → import Service from './service.js';
const { helper } = require('../utils/help'); → import { helper } from '../utils/help.js';
```

### Protobuf Imports (Special Case)
```javascript
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const service = require('../../biostar/service/connect_grpc_pb');
```

### __dirname and __filename
```javascript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

### Module Main Check
```javascript
// CommonJS
if (require.main === module) {
    app.start();
}

// ES6
const isMainModule = import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`;
if (isMainModule) {
    app.start();
}
```

## Running the Application

### Backend
```bash
cd packages/backend
node index.js
```

### Frontend
```bash
cd packages/frontend
npm run dev
```

## Troubleshooting

### Error: "does not provide an export named 'default'"
Add `createRequire` for CommonJS modules

### Error: "Cannot find module" (missing .js)
Add `.js` extension to local imports

### Error: "require is not defined"
Import and use `createRequire` from 'module'

### Error: "__dirname is not defined"
Add manual __dirname definition (see above)

## File Structure
```
suprema/
├── package.json (type: "module")
├── packages/
│   ├── backend/
│   │   ├── package.json (type: "module")
│   │   ├── index.js (ES6)
│   │   ├── biostar/
│   │   │   ├── package.json (type: "commonjs")
│   │   │   └── service/ (CommonJS - 95 files)
│   │   └── src/
│   │       ├── services/ (ES6 - 7 files)
│   │       ├── routes/ (ES6 - 10 files)
│   │       ├── models/ (ES6 - 2 files)
│   │       └── utils/ (ES6 - 3 files)
│   └── frontend/
└── example/ (ES6 - 138+ files)
```

## Key Points
- ✅ All .js files use ES6 except biostar/service/*
- ✅ Local imports need .js extension
- ✅ NPM imports don't need extension
- ✅ Protobuf uses createRequire
- ✅ Backend starts successfully
