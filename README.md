# Suprema HR Integration System

A comprehensive full-stack application for integrating Suprema BioStar devices with HR systems. Built as a monorepo with React.js frontend and Node.js backend using the G-SDK framework.

## Project Structure

This is a Lerna monorepo containing two packages:

```
suprema/
├── lerna.json                      # Lerna configuration
├── package.json                    # Root package configuration
├── packages/
│   ├── frontend/                   # React.js frontend application
│   │   ├── package.json
│   │   ├── vite.config.js         # Vite build configuration
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.jsx           # React entry point
│   │       ├── App.jsx            # Main App component
│   │       ├── App.css
│   │       ├── index.css
│   │       └── components/        # React components
│   │           ├── Dashboard.jsx
│   │           ├── Devices.jsx
│   │           ├── Users.jsx
│   │           ├── CardScanning.jsx
│   │           ├── Events.jsx
│   │           └── Settings.jsx
│   └── backend/                    # Node.js backend API
│       ├── package.json
│       ├── index.js               # Express server entry
│       ├── prisma/                # Database schema and migrations
│       ├── biostar/               # G-SDK integration
│       └── src/
│           ├── routes/            # API routes
│           ├── services/          # Business logic
│           └── utils/             # Utilities
└── docs/                          # Documentation
    ├── Architecture.md
    └── backlog.md
```

## Features

- **Modern Frontend**: React 18 with Vite for fast development
- **Device Management**: Connect, configure, and monitor Suprema BioStar devices
- **User Management**: Enroll users with biometric credentials (fingerprint, face, card)
- **Card Credentials**: Support for CSN, Wiegand, Smart Cards, and Access ON cards
- **Access Control**: Manage doors, access levels, and schedules
- **Time & Attendance**: Track employee attendance with work hour calculations
- **Event Monitoring**: Real-time event subscription and log management
- **HR Integration**: REST API endpoints for seamless HR system integration

## Documentation

- **[Card Credentials Guide](./docs/CARD_CREDENTIALS.md)** - Complete guide for card management
- **[Card Quick Reference](./docs/CARD_QUICK_REF.md)** - Quick reference for card operations
- **[API Documentation](#api-documentation)** - Full REST API reference

## Prerequisites

- Node.js 14.x or higher
- NPM package manager
- Suprema BioStar devices with G-SDK support
- Network connectivity to devices
- MySQL database

## Installation

1. **Clone or navigate to the project:**
   ```bash
   cd c:\wamp64\www\suprema
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```
   This will install dependencies for both frontend and backend packages.

3. **Configure backend environment:**
   ```bash
   cd packages/backend
   cp .env.example .env
   ```
   Edit `packages/backend/.env` with your database and device configuration.

4. **Database Setup:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # (Optional) Seed initial data
   npm run db:seed
   ```

## Running the Application

### Development Mode

**Start Backend (API Server on port 3000):**
```bash
npm run dev:backend
```

**Start Frontend (Development Server on port 3001):**
```bash
npm run dev:frontend
```

The frontend will proxy API requests to the backend automatically.

Access the application at: **http://localhost:3001**

### Production Mode

**Start Backend:**
```bash
npm run start:backend
```

**Build and Start Frontend:**
```bash
npm run build:frontend
npm run start:frontend
```

## Available Scripts

### Root Level

- `npm run dev:frontend` - Start frontend development server (port 3001)
- `npm run dev:backend` - Start backend development server (port 3000)
- `npm run build:frontend` - Build frontend for production
- `npm run start:frontend` - Start frontend production preview
- `npm run start:backend` - Start backend in production mode
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Create and apply migration
- `npm run db:studio` - Open Prisma Studio (database GUI)

### Backend Package

Navigate to `packages/backend` to run backend-specific scripts:

```bash
cd packages/backend
npm run dev              # Start with nodemon
npm run start            # Start production server
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:migrate       # Create migration
npm run db:studio        # Open Prisma Studio
npm run gsdk:generate    # Generate protobuf files
```

### Frontend Package

Navigate to `packages/frontend` to run frontend-specific scripts:

```bash
cd packages/frontend
npm run dev             # Start Vite dev server
npm run build           # Build for production
npm run preview         # Preview production build
```

## Configuration

### Backend Environment Variables

Create a `.env` file in `packages/backend`:

```env
# Database Configuration (MySQL) - REQUIRED
DATABASE_URL="mysql://username:password@localhost:3306/suprema_hr"

# Gateway Configuration
GATEWAY_HOST=192.168.1.100
GATEWAY_PORT=4000
GATEWAY_SSL=false

# API Configuration
API_PORT=3000
CORS_ORIGIN=http://localhost:3001

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=./logs/application.log

# Features
MAX_EVENTS=1000
ENABLE_WEBHOOKS=true
WEBHOOK_URL=http://your-hr-system.com/webhooks/suprema

# Security (optional)
JWT_SECRET=your-jwt-secret
API_KEY=your-api-key
```

### Frontend Configuration

The frontend is configured via `packages/frontend/vite.config.js`:

- **Development Server**: Port 3001
- **API Proxy**: All `/api/*` requests are proxied to `http://localhost:3000`
- **Hot Module Replacement**: Enabled for fast development

### Device Configuration

Devices are now managed through the database instead of environment variables. This allows for dynamic device management and better scalability.

**Add a new device:**
```bash
POST /api/devices
{
    "name": "Main Entrance",
    "description": "Primary building entrance device",
    "ip": "192.168.1.101",
    "port": 51211,
    "useSSL": false,
    "location": "Building A - Main Entrance"
}
```

**The system will automatically:**
- Store device configurations in the database
- Connect to all active devices on startup
- Monitor device connection status
- Auto-reconnect failed devices
- Sync device status periodically

## Database Management

The application uses Prisma ORM with MySQL for data persistence. Here are the available database scripts:

### Database Scripts

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database (development)
npm run db:push

# Create and apply migration (production-ready)
npm run db:migrate

# Deploy migrations to production
npm run db:migrate:deploy

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database with initial data
npm run db:seed
```

### Database Schema

The system includes the following main entities:
- **Devices**: Suprema device configurations and status
- **Users**: Enrolled users with biometric data
- **Events**: Access events and system activities
- **Doors**: Door configurations and access control
- **TNALogs**: Time and attendance records
- **AccessLevels**: User access permissions
- **Schedules**: Time-based access schedules
- **SystemLogs**: Application logs and audit trail

## Usage

### Quick Start

1. **Start the backend:**
   ```bash
   npm run dev:backend
   ```
   Backend API will be available at http://localhost:3000

2. **Start the frontend (in a new terminal):**
   ```bash
   npm run dev:frontend
   ```
   Frontend will be available at http://localhost:3001

3. **Open your browser:**
   Navigate to http://localhost:3001

### Frontend Features

The React frontend provides:

- **Dashboard**: System health, statistics, and recent activity
- **Devices**: Add, connect, and manage Suprema devices
- **Users & Cards**: User enrollment and card credential management
- **Card Scanning**: Real-time card scanning interface
- **Events**: Real-time event monitoring with filtering
- **Settings**: Gateway and system configuration

### Backend API

### Health Check

Check backend health:
```bash
curl http://localhost:3000/health
# or
GET http://localhost:3000/api/health
```

Frontend health checks are automatically performed every 30 seconds.

## API Documentation

### Device Management

#### Get All Devices
```http
GET /api/devices
GET /api/devices?connected=true
GET /api/devices?status=active
```

#### Add New Device
```http
POST /api/devices
Content-Type: application/json

{
    "name": "Main Entrance",
    "description": "Primary building entrance device",
    "ip": "192.168.1.101",
    "port": 51211,
    "useSSL": false,
    "location": "Building A - Main Entrance"
}
```

#### Connect to Device
```http
POST /api/devices/:deviceId/connect
```

#### Update Device
```http
PUT /api/devices/:deviceId
Content-Type: application/json

{
    "name": "Updated Device Name",
    "location": "New Location"
}
```

#### Delete Device
```http
DELETE /api/devices/:deviceId
```

#### Search for New Devices on Network
```http
GET /api/devices/search?timeout=5
```

#### Get Device Information
```http
GET /api/devices/:deviceId/info
```

#### Sync Device Status
```http
POST /api/devices/sync
```

#### Auto-reconnect Failed Devices
```http
POST /api/devices/reconnect
```

### User Management

#### Enroll Users
```http
POST /api/users/enroll
Content-Type: application/json

{
    "deviceId": "device123",
    "users": [
        {
            "userID": "emp001",
            "name": "John Doe",
            "email": "john.doe@company.com"
        }
    ]
}
```

#### Set User Fingerprints
```http
POST /api/users/fingerprints
Content-Type: application/json

{
    "deviceId": "device123",
    "userFingerprints": [
        {
            "userID": "emp001",
            "fingerprints": [
                {
                    "index": 0,
                    "template": "base64-encoded-template"
                }
            ]
        }
    ]
}
```

#### Set User Card Credentials
```http
POST /api/users/:deviceId/cards
Content-Type: application/json

{
    "userCardData": [
        {
            "userId": "emp001",
            "cardData": {
                "type": "CSN",
                "data": "1234567890ABCDEF",
                "smartCardHeader": null
            },
            "cardIndex": 0
        },
        {
            "userId": "emp002",
            "cardData": {
                "type": "WIEGAND",
                "data": "FEDCBA0987654321",
                "smartCardHeader": null
            },
            "cardIndex": 0
        }
    ]
}
```

**Card Types Supported:**
- **CSN (Card Serial Number)**: Standard proximity cards
- **WIEGAND**: Wiegand format cards (26-bit, 32-bit, etc.)
- **SECURE**: Secure smart cards
- **ACCESS_ON**: Access ON cards
- **CUSTOM**: Custom card formats

#### Scan Card from Device
```http
POST /api/biometric/scan/card
Content-Type: application/json

{
    "deviceId": "device123",
    "timeout": 30
}
```

**Response:**
```json
{
    "success": true,
    "message": "Card scanned successfully",
    "data": {
        "type": "CSN",
        "data": "1234567890ABCDEF",
        "cardId": "card_12345"
    }
}
```

#### Set User Face Recognition
```http
POST /api/users/:deviceId/faces
Content-Type: application/json

{
    "userFaceData": [
        {
            "userId": "emp001",
            "faceTemplates": [
                {
                    "index": 0,
                    "template": "base64-encoded-face-template",
                    "imageData": "base64-encoded-image"
                }
            ]
        }
    ]
}
```

### Event Management

#### Subscribe to Events
```http
POST /api/events/subscribe
Content-Type: application/json

{
    "deviceId": "device123",
    "filters": ["ACCESS_SUCCESS", "ACCESS_DENIED"]
}
```

#### Get Event Logs
```http
GET /api/events/logs?deviceId=device123&startTime=2024-01-01T00:00:00Z&endTime=2024-01-31T23:59:59Z
```

### Door & Access Control

#### Get All Doors
```http
GET /api/doors?deviceId=device123
```

#### Unlock Door
```http
POST /api/doors/:doorId/unlock
Content-Type: application/json

{
    "deviceId": "device123",
    "duration": 5
}
```

### Time & Attendance

#### Get T&A Logs
```http
GET /api/tna/logs?deviceId=device123&startTime=2024-01-01T00:00:00Z&endTime=2024-01-31T23:59:59Z
```

#### Calculate Work Hours
```http
GET /api/tna/work-hours?deviceId=device123&userId=emp001&startDate=2024-01-01&endDate=2024-01-07
```

### Biometric Operations

#### Scan Fingerprint
```http
POST /api/biometric/scan/fingerprint
Content-Type: application/json

{
    "deviceId": "device123",
    "templateFormat": "SUPREMA",
    "quality": "HIGH"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Fingerprint scanned successfully",
    "data": {
        "templateFormat": "SUPREMA",
        "template": "base64-encoded-template",
        "quality": 95
    }
}
```

#### Scan Card
```http
POST /api/biometric/scan/card
Content-Type: application/json

{
    "deviceId": "device123",
    "timeout": 30
}
```

**Response:**
```json
{
    "success": true,
    "message": "Card scanned successfully",
    "data": {
        "type": "CSN",
        "data": "1234567890ABCDEF",
        "cardId": "card_12345"
    }
}
```

#### Scan Face
```http
POST /api/biometric/scan/face
Content-Type: application/json

{
    "deviceId": "device123",
    "templateFormat": "SUPREMA",
    "enrollmentCount": 3
}
```

**Response:**
```json
{
    "success": true,
    "message": "Face scanned successfully",
    "data": {
        "templateFormat": "SUPREMA",
        "template": "base64-encoded-face-template",
        "imageData": "base64-encoded-image"
    }
}
```

### Card Management

#### Get Card Information
```http
GET /api/users/:deviceId/cards/:userId
```

**Response:**
```json
{
    "success": true,
    "data": {
        "userId": "emp001",
        "cards": [
            {
                "index": 0,
                "type": "CSN",
                "data": "1234567890ABCDEF",
                "isActive": true
            }
        ]
    }
}
```

#### Update Card Credentials
```http
PUT /api/users/:deviceId/cards/:userId
Content-Type: application/json

{
    "cardData": {
        "type": "CSN",
        "data": "NEW1234567890",
        "smartCardHeader": null
    },
    "cardIndex": 0
}
```

#### Delete Card Credentials
```http
DELETE /api/users/:deviceId/cards/:userId?cardIndex=0
```

#### Manage Card Blacklist
```http
POST /api/users/:deviceId/cards/blacklist
Content-Type: application/json

{
    "action": "add",
    "cardInfos": [
        {
            "cardId": "1234567890ABCDEF",
            "issueCount": 1
        }
    ]
}
```

**Actions:**
- `add`: Add cards to blacklist
- `delete`: Remove cards from blacklist

### HR Integration

#### Sync Users with HR System
```http
POST /api/hr/users/sync
Content-Type: application/json

{
    "deviceId": "device123",
    "hrSystemUrl": "http://hr-system.com/api",
    "syncDirection": "bidirectional"
}
```

#### Export Attendance Data
```http
GET /api/hr/attendance?deviceId=device123&startDate=2024-01-01&endDate=2024-01-31&format=csv
```

## Architecture

### Project Structure

```
suprema/
├── package.json                 # Project dependencies and scripts
├── index.js                     # Main application entry point
├── .env                         # Environment configuration
├── src/
│   ├── services/               # Core business logic services
│   │   ├── connectionService.js # Device connection management
│   │   ├── userService.js      # User enrollment and management
│   │   ├── eventService.js     # Event monitoring and logging
│   │   ├── doorService.js      # Door and access control
│   │   ├── tnaService.js       # Time & attendance management
│   │   └── biometricService.js # Biometric operations
│   ├── routes/                 # REST API route handlers
│   │   ├── deviceRoutes.js     # Device management endpoints
│   │   ├── userRoutes.js       # User management endpoints
│   │   ├── eventRoutes.js      # Event monitoring endpoints
│   │   ├── doorRoutes.js       # Door control endpoints
│   │   ├── tnaRoutes.js        # T&A endpoints
│   │   ├── biometricRoutes.js  # Biometric endpoints
│   │   └── hrRoutes.js         # HR integration endpoints
│   └── utils/                  # Utility functions and helpers
│       ├── validation.js       # Input validation utilities
│       ├── errors.js          # Error handling and custom errors
│       └── logger.js          # Logging utilities
└── logs/                       # Application logs
    ├── application.log         # General application logs
    └── application.error.log   # Error-specific logs
```

### Service Layer

The application is built with a service-oriented architecture:

- **ConnectionService**: Manages device connections and gateway communication
- **UserService**: Handles user enrollment, management, and biometric credentials
- **EventService**: Monitors device events and provides real-time notifications
- **DoorService**: Controls door operations and access management
- **TNAService**: Manages time and attendance tracking
- **BiometricService**: Handles biometric scanning and template operations

### Error Handling

Comprehensive error handling with custom error types:

- `SupremaError`: Base error class
- `ConnectionError`: Device connection issues
- `ValidationError`: Input validation failures
- `DeviceError`: Device operation failures
- `BiometricError`: Biometric operation issues

## Development

### Running in Development Mode

```bash
npm run dev
```

This starts the application with auto-restart on file changes.

### Testing

```bash
# Run tests (when test suite is implemented)
npm test

# Run with coverage
npm run test:coverage
```

### Debugging

Enable debug logging by setting the environment variable:
```bash
LOG_LEVEL=debug npm start
```

## Deployment

### Production Setup

1. **Set production environment:**
   ```bash
   NODE_ENV=production
   ```

2. **Configure production variables:**
   ```env
   LOG_LEVEL=info
   GATEWAY_SSL=true
   CORS_ORIGIN=https://your-hr-system.com
   ```

3. **Start with process manager:**
   ```bash
   # Using PM2
   pm2 start index.js --name suprema-hr-integration

   # Using systemd (create service file)
   sudo systemctl start suprema-hr
   ```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:14-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3000

CMD ["node", "index.js"]
```

Build and run:
```bash
docker build -t suprema-hr-integration .
docker run -p 3000:3000 --env-file .env suprema-hr-integration
```

## Monitoring and Maintenance

### Logs

Application logs are stored in the `logs/` directory:
- `application.log`: General application logs
- `application.error.log`: Error-specific logs

### Health Monitoring

Monitor application health using the health endpoint:
```http
GET /health
```

### Performance Monitoring

The application includes performance logging for operation timing and resource usage.

## Troubleshooting

### Common Issues

1. **Connection Timeout**
   - Check network connectivity to devices
   - Verify gateway configuration
   - Ensure firewall allows communication

2. **Authentication Failures**
   - Verify device credentials
   - Check SSL/TLS configuration
   - Review access permissions

3. **High Memory Usage**
   - Monitor event subscription count
   - Check for memory leaks in long-running operations
   - Consider implementing event batching

### Debug Mode

Enable detailed logging:
```bash
LOG_LEVEL=debug npm start
```

## Support

For technical support and documentation:
- Suprema G-SDK Documentation: https://supremainc.github.io/g-sdk/node/
- BioStar 2 API Reference: https://www.supremainc.com/support/

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Changelog

### Version 1.0.0
- Initial release
- Complete G-SDK integration
- REST API implementation
- HR system integration features
- Comprehensive error handling and logging