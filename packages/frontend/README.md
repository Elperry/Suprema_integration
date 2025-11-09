# Suprema Frontend - User Guide

## Overview
Modern, user-friendly React frontend for the Suprema HR Integration System.

## Configuration

### Environment Variables

The frontend uses environment variables for configuration. Create or modify `.env` files:

**`.env` (Base configuration)**
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Suprema HR Integration
VITE_APP_VERSION=1.0.0
```

**`.env.development` (Development mode)**
- Backend URL: `http://localhost:3000`
- DevTools enabled

**`.env.production` (Production mode)**
- Update `VITE_API_URL` with your production backend URL
- DevTools disabled

### Global Constants

All application constants are centralized in `src/config/constants.js`:
- API endpoints
- UI configuration (refresh intervals, limits)
- Device status constants
- Event types
- HTTP status codes
- Feature flags

## Features

### 📊 Dashboard
- Real-time system health monitoring
- Device statistics and status
- Employee count
- Recent events table
- Service status indicators

### 🖥️ Devices
- **Full CRUD Operations**
  - Add new devices (name, IP, port)
  - Edit existing devices
  - Delete devices
  - Connect/disconnect devices
- View device list with connection status
- Real-time status indicators

### 👥 Users & Cards
- **User Management**
  - Select device
  - Enroll new users
  - View all users on device
  - Delete users
- **Sync Operations**
  - Sync users to database
  - Sync from all devices

### 🔍 Card Scanning
- **Card Operations**
  - Scan cards from device
  - View scanned card data
  - Add cards to blacklist
  - View blacklisted cards
- Real-time scanning

### 📋 Events
- **Event Monitoring**
  - View event logs from devices
  - Start/stop real-time monitoring
  - Sync events to database
  - Refresh event list
- Event log table with filtering

### ⚙️ Settings
- **Sync Configuration**
  - Configure sync intervals
  - Manual sync operations
- **System Information**
  - Frontend version
  - Backend API endpoint
  - Available endpoints list

## API Integration

All backend endpoints are integrated through `src/services/api.js`:

- ✅ Device API (14 endpoints)
- ✅ User API (21 endpoints)
- ✅ Card API (10 endpoints)
- ✅ Event API (18 endpoints)
- ✅ Gate Event API (4 endpoints)
- ✅ Employee API (4 endpoints)
- ✅ Door API
- ✅ T&A API
- ✅ Biometric API
- ✅ HR API

## Running the Frontend

```bash
# Development mode
cd packages/frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The frontend runs on **http://localhost:3001** and proxies API requests to the backend on port 3000.

## Technology Stack

- **React 18.2.0** - UI framework
- **React Router 6.20.0** - Client-side routing
- **Axios 1.6.2** - HTTP client
- **Vite 5.0.8** - Build tool
- **Modern CSS** - Responsive styling

## UI/UX Features

- 🎨 Clean, modern design
- 📱 Fully responsive (mobile-friendly)
- ⚡ Fast and lightweight
- 🔄 Real-time updates
- 💡 Intuitive navigation
- 🎯 Clear visual feedback
- ✨ Smooth transitions

## Page Navigation

- **Dashboard** (`/`) - System overview and statistics
- **Devices** (`/devices`) - Device management
- **Users & Cards** (`/users`) - User enrollment and management
- **Card Scanning** (`/scanning`) - Card operations
- **Events** (`/events`) - Event logs and monitoring
- **Settings** (`/settings`) - System configuration

## Color Scheme

- Primary: Blue (#2563eb)
- Success: Green (#10b981)
- Error: Red (#ef4444)
- Background: Light gray (#f8fafc)
- Cards: White (#ffffff)

## Component Structure

```
src/
├── components/
│   ├── Dashboard.jsx      # Main dashboard
│   ├── Devices.jsx        # Device CRUD
│   ├── Users.jsx          # User management
│   ├── CardScanning.jsx   # Card operations
│   ├── Events.jsx         # Event monitoring
│   └── Settings.jsx       # System settings
├── services/
│   └── api.js             # API service layer
├── App.jsx                # Main app component
├── App.css                # Global styles
└── main.jsx               # Entry point
```

## Future Enhancements

- [ ] Add data visualization charts
- [ ] Implement WebSocket for real-time events
- [ ] Add export functionality for reports
- [ ] Enhanced filtering and search
- [ ] User authentication UI
- [ ] Dark mode support
- [ ] Multi-language support
