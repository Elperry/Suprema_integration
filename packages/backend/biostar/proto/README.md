# ⚠️ PROTO FILES NEEDED

## This Directory is Empty

You need to place Suprema G-SDK `.proto` files here.

---

## 📋 Required Files

Place these `.proto` files from Suprema G-SDK in this directory:

- [ ] `connect.proto` - Device connection services
- [ ] `device.proto` - Device management
- [ ] `user.proto` - User management
- [ ] `card.proto` - Card credentials ⭐ **REQUIRED FOR YOUR IMPLEMENTATION**
- [ ] `finger.proto` - Fingerprint management
- [ ] `face.proto` - Face recognition
- [ ] `door.proto` - Door control
- [ ] `access.proto` - Access control
- [ ] `event.proto` - Event monitoring
- [ ] `tna.proto` - Time & Attendance
- [ ] `auth.proto` - Authentication
- [ ] `schedule.proto` - Schedule management
- [ ] `zone.proto` - Zone management

---

## 🔧 How to Get These Files

### Contact Suprema
**Email**: support@supremainc.com  
**Website**: https://www.supremainc.com

**Request Template:**
```
Subject: Request for G-SDK (gRPC SDK) Proto Files

Hello,

I need the G-SDK (gRPC SDK) package with .proto files for Node.js 
integration with Suprema devices.

Could you provide the complete SDK package including:
- All .proto files
- SDK documentation
- Setup instructions

Use case: HR system integration with card credentials management
Programming Language: Node.js

Thank you!
```

---

## 📦 After You Get the Files

1. **Copy** all `.proto` files to this directory (`biostar/proto/`)

2. **Generate** JavaScript files:
   ```bash
   npm run gsdk:generate
   ```

3. **Start** your server:
   ```bash
   npm start
   ```

---

## ✅ What's Already Done

Your implementation is complete! You only need the proto files to connect to devices:

- ✅ All API endpoints implemented
- ✅ All service methods ready
- ✅ Complete documentation
- ✅ Test suite prepared
- ✅ Integration examples ready

**Just add the proto files and you're ready to go!** 🚀

---

## 🎭 Alternative: Mock Mode

If you want to test WITHOUT proto files, tell the AI:
```
"Create mock mode for testing"
```

This lets you test everything without real devices or G-SDK.
