# Biostar G-SDK Directory

## ⚠️ IMPORTANT: You Need to Get Proto Files from Suprema

This directory is where the Suprema G-SDK files should be placed. These files are **proprietary** and must be obtained from Suprema.

---

## 📋 Current Status

```
✅ biostar/              Created
✅ biostar/proto/        Created (EMPTY - needs .proto files)
✅ biostar/service/      Created (EMPTY - needs generated files)
❌ .proto files          MISSING - Get from Suprema
❌ Generated JS files    MISSING - Generate after getting protos
```

---

## 🔧 How to Get the Files

### Step 1: Contact Suprema
**Email**: support@supremainc.com  
**Website**: https://www.supremainc.com

**Email Template:**
```
Subject: Request for G-SDK (gRPC SDK) for Node.js Integration

Hello Suprema Support Team,

I am developing an HR system integration with Suprema BioStar devices 
using Node.js. I need the G-SDK (gRPC SDK) package with protobuf 
definitions to communicate with the devices.

Could you please provide:
- G-SDK package with .proto files
- Documentation for the SDK
- Any required licenses or setup instructions

Project Details:
- Programming Language: Node.js
- Use Case: HR system integration with card credentials
- Devices: [List your device models here]

Thank you!
```

### Step 2: Place Proto Files Here
Once you receive the G-SDK from Suprema:

1. Copy all `.proto` files to `biostar/proto/` directory
2. The files should include:
   - `connect.proto`
   - `device.proto`
   - `user.proto`
   - `card.proto`
   - `finger.proto`
   - `face.proto`
   - `door.proto`
   - `access.proto`
   - `event.proto`
   - `tna.proto`
   - `auth.proto`
   - `schedule.proto`
   - `zone.proto`

### Step 3: Generate JavaScript Files
After placing the `.proto` files, run:

```bash
# From the suprema root directory
npm run gsdk:generate
```

Or manually using the provided script:
```bash
node biostar/generate-protos.js
```

---

## 📁 Expected Directory Structure

After completing all steps:

```
biostar/
├── README.md                    ✅ This file
├── generate-protos.js          ✅ Helper script (created)
├── generate-protos.ps1         ✅ PowerShell script (created)
│
├── proto/                       ⏳ NEEDS .proto FILES FROM SUPREMA
│   ├── connect.proto           ❌ Get from Suprema
│   ├── device.proto            ❌ Get from Suprema
│   ├── user.proto              ❌ Get from Suprema
│   ├── card.proto              ❌ Get from Suprema
│   ├── finger.proto            ❌ Get from Suprema
│   ├── face.proto              ❌ Get from Suprema
│   ├── door.proto              ❌ Get from Suprema
│   ├── access.proto            ❌ Get from Suprema
│   ├── event.proto             ❌ Get from Suprema
│   ├── tna.proto               ❌ Get from Suprema
│   ├── auth.proto              ❌ Get from Suprema
│   ├── schedule.proto          ❌ Get from Suprema
│   └── zone.proto              ❌ Get from Suprema
│
└── service/                     ⏳ WILL BE AUTO-GENERATED
    ├── connect_grpc_pb.js      ⏳ Generated from connect.proto
    ├── connect_pb.js           ⏳ Generated from connect.proto
    ├── device_grpc_pb.js       ⏳ Generated from device.proto
    ├── device_pb.js            ⏳ Generated from device.proto
    ├── user_grpc_pb.js         ⏳ Generated from user.proto
    ├── user_pb.js              ⏳ Generated from user.proto
    ├── card_grpc_pb.js         ⏳ Generated from card.proto
    ├── card_pb.js              ⏳ Generated from card.proto
    └── ... (other generated files)
```

---

## 🚀 Quick Commands

### Install Required Tools
```bash
npm install -g grpc-tools
```

### Generate Protobuf Files (after placing .proto files)
```bash
# Windows PowerShell
.\biostar\generate-protos.ps1

# Or using Node.js script
node biostar/generate-protos.js

# Or use npm script
npm run gsdk:generate
```

### Verify Setup
```bash
# Check if proto files exist
ls biostar/proto/*.proto

# Check if generated files exist
ls biostar/service/*_pb.js
```

---

## ❌ Cannot Start Server Yet

If you see this error:
```
Error: Cannot find module '../../biostar/service/connect_grpc_pb'
```

**This means:**
1. You don't have the `.proto` files yet (need from Suprema)
2. OR you haven't generated the JavaScript files yet

**Solution:**
1. Get `.proto` files from Suprema
2. Place them in `biostar/proto/`
3. Run `npm run gsdk:generate`
4. Then `npm start` will work

---

## 🎭 Alternative: Use Mock Mode

If you want to test WITHOUT waiting for Suprema, tell the AI:

```
"Create mock mode for testing"
```

This will let you test all features immediately without real devices.

---

## 📞 Need Help?

- **Can't reach Suprema?** → Use mock mode
- **Don't have devices?** → Use mock mode
- **Just want to test?** → Use mock mode
- **Production deployment?** → Get real G-SDK from Suprema

---

## ✅ What's Ready

Your implementation is complete:
- ✅ All API endpoints
- ✅ All service methods
- ✅ Complete documentation
- ✅ Test suite
- ✅ Integration examples

**Only missing: G-SDK proto files from Suprema**
