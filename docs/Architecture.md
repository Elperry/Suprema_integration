# Suprema HR Integration - System Architecture

## Overview

The Suprema HR Integration system is a Node.js-based middleware that bridges Suprema biometric devices with HR management systems through a RESTful API. The architecture follows a service-oriented design pattern with clear separation of concerns.

## System Components

### 1. Application Layer

```
┌─────────────────────────────────────────────────────────────┐
│                      Express.js Server                       │
│                         (Port 3000)                          │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
        ┌───────▼────────┐         ┌───────▼────────┐
        │   Middleware   │         │     Routes     │
        │   - CORS       │         │   - Devices    │
        │   - Helmet     │         │   - Users      │
        │   - Morgan     │         │   - Cards      │
        │   - Body Parse │         │   - Events     │
        └────────────────┘         │   - Doors      │
                                   │   - T&A        │
                                   │   - Biometric  │
                                   └────────────────┘
```

### 2. Service Layer

**Connection Service**
- Gateway connection management
- Device connectivity monitoring
- Auto-reconnection logic
- Health check implementation

**User Service**
- User CRUD operations
- Card credential management
- Biometric template handling
- User synchronization

**Event Service**
- Real-time event monitoring
- Event code mapping
- Event filtering and retrieval
- Event persistence

**Door Service**
- Door control operations
- Access zone management
- Door status monitoring

**Time & Attendance Service**
- Clock in/out operations
- T&A event tracking
- Work schedule management

**Biometric Service**
- Fingerprint scanning
- Card scanning
- Template verification
- Multi-modal authentication

### 3. Data Layer

```
┌──────────────────────────────────────────────────────────┐
│                    MySQL Database                         │
│                    (Prisma ORM)                          │
├──────────────────────────────────────────────────────────┤
│  Models:                                                  │
│  - Device        (Suprema device registry)               │
│  - User          (User information)                       │
│  - Event         (System events log)                      │
│  - SystemConfig  (Gateway configuration)                  │
└──────────────────────────────────────────────────────────┘
```

### 4. Integration Layer

```
┌─────────────────────────────────────────────────────────┐
│              Suprema G-SDK (gRPC/Protobuf)              │
├─────────────────────────────────────────────────────────┤
│  Gateway                                                 │
│  - IP: Configured in DB or .env                         │
│  - Port: 4000 (default)                                 │
│  - Protocol: gRPC with SSL/TLS support                  │
└─────────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼──────┐  ┌─────▼─────┐  ┌──────▼──────┐
│  BioStation  │  │ BioEntry  │  │  BioLite    │
│      3       │  │    W2     │  │     N2      │
└──────────────┘  └───────────┘  └─────────────┘
```

## Technology Stack

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js v4.x
- **Language**: JavaScript (ES6+)

### Database
- **DBMS**: MySQL 8.0+
- **ORM**: Prisma 6.x
- **Migrations**: Prisma Migrate

### Communication
- **API Protocol**: REST (HTTP/JSON)
- **Device Protocol**: gRPC (Protocol Buffers)
- **G-SDK Version**: Suprema G-SDK v1.x

### Security
- **Headers**: Helmet.js
- **CORS**: Configurable origins
- **Authentication**: Basic Auth (planned)
- **SSL/TLS**: Optional for gRPC

### Frontend
- **Framework**: Vanilla JavaScript
- **UI**: HTML5 + CSS3
- **HTTP Client**: Fetch API
- **Server**: http-server (Port 8080)

## Architecture Patterns

### 1. Service-Oriented Architecture (SOA)
Each business capability is encapsulated in a dedicated service:
- Promotes code reusability
- Enables independent testing
- Facilitates maintenance

### 2. Repository Pattern
Database operations abstracted through Prisma:
- Decouples business logic from data access
- Simplifies database migrations
- Type-safe queries

### 3. Middleware Chain
Request processing through Express middleware:
```
Request → CORS → Helmet → Morgan → Body Parser → Router → Response
```

### 4. Configuration Management
Hierarchical configuration priority:
```
Database Config → .env Variables → Default Values
```

## Data Flow

### Device Registration Flow
```
Client → POST /devices → Route Handler → Database (Prisma) → MySQL
                              ↓
                     Gateway Connection
                              ↓
                    Device Validation (gRPC)
                              ↓
                       Status Update
```

### Card Scanning Flow
```
Client → POST /cards/scan/:deviceId
    ↓
Route Handler
    ↓
Biometric Service → scanCard()
    ↓
gRPC Call → Device Scanner
    ↓
Card Data (Protobuf)
    ↓
Parse & Format
    ↓
Return to Client
```

### Event Monitoring Flow
```
Device Events → Gateway (gRPC Stream)
    ↓
Event Service → Event Code Mapping
    ↓
Database Storage (Prisma)
    ↓
Real-time Notification (Planned)
    ↓
Client Dashboard
```

## Directory Structure

```
suprema/
├── biostar/                    # G-SDK integration
│   ├── service/               # gRPC service clients
│   └── proto/                 # Protocol buffer definitions
├── src/
│   ├── routes/                # API route handlers
│   │   ├── deviceRoutes.js
│   │   ├── userRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── doorRoutes.js
│   │   ├── tnaRoutes.js
│   │   └── biometricRoutes.js
│   ├── services/              # Business logic layer
│   │   ├── connectionService.js
│   │   ├── userService.js
│   │   ├── eventService.js
│   │   ├── doorService.js
│   │   ├── tnaService.js
│   │   └── biometricService.js
│   └── models/                # Data models
│       └── database.js
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Frontend files
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── scripts/                   # Utility scripts
│   └── configure-gateway.js
├── logs/                      # Application logs
├── .env                       # Environment variables
├── index.js                   # Application entry point
└── package.json               # Dependencies
```

## API Architecture

### RESTful Endpoints

**Health & System**
- `GET /health` - System health check
- `GET /api` - API documentation

**Device Management**
- `GET /devices` - List all devices
- `POST /devices` - Register new device
- `DELETE /devices/:id` - Remove device

**User Management**
- `GET /users/:deviceId` - Get device users
- `POST /users/:deviceId` - Add user to device
- `DELETE /users/:deviceId/:userId` - Remove user

**Card Operations**
- `POST /cards/set/:deviceId` - Assign cards to user
- `POST /cards/scan/:deviceId` - Scan card
- `POST /cards/blacklist/:deviceId` - Manage blacklist

**Event Operations**
- `GET /events` - Get all events
- `GET /events/:deviceId` - Get device events
- `POST /events/subscribe/:deviceId` - Subscribe to events

**Door Control**
- `POST /doors/open/:deviceId/:doorId` - Open door
- `POST /doors/close/:deviceId/:doorId` - Close door

**Time & Attendance**
- `GET /tna/logs/:deviceId` - Get T&A logs
- `POST /tna/clockin/:deviceId` - Clock in
- `POST /tna/clockout/:deviceId` - Clock out

## Security Architecture

### Current Implementation
- CORS protection with configurable origins
- Helmet.js security headers
- Request logging with Morgan
- Environment variable protection

### Planned Enhancements
- JWT-based authentication
- Role-based access control (RBAC)
- API rate limiting
- Request encryption (HTTPS)
- Database connection pooling
- Input validation and sanitization

## Scalability Considerations

### Current Limitations
- Single server instance
- In-memory connection management
- No load balancing
- Limited concurrent device support

### Future Improvements
- Horizontal scaling with load balancer
- Redis for session management
- Message queue for event processing (RabbitMQ/Kafka)
- Microservices architecture for large deployments
- Container orchestration (Docker/Kubernetes)

## Monitoring & Observability

### Logging
- Winston logger with multiple transports
- Console output for development
- File logging for production
- Structured JSON logs

### Health Checks
- Database connectivity
- Gateway connection status
- Device availability
- Service status indicators

### Metrics (Planned)
- API response times
- Device connection uptime
- Event processing throughput
- Error rates and types

## Deployment Architecture

### Development
```
Developer Machine
├── Node.js Server (Port 3000)
├── Frontend Server (Port 8080)
└── MySQL Database (Local/WAMP)
```

### Production (Recommended)
```
Load Balancer (HTTPS)
    ↓
┌───────────────────────────────┐
│   Application Servers (N)     │
│   - Node.js + PM2             │
│   - Auto-restart on failure   │
└───────────────────────────────┘
    ↓
┌───────────────────────────────┐
│   Database Cluster            │
│   - Master-Slave Replication  │
│   - Automated backups         │
└───────────────────────────────┘
    ↓
┌───────────────────────────────┐
│   Suprema Gateway             │
│   - High Availability Setup   │
└───────────────────────────────┘
```

## Error Handling Strategy

### Layers
1. **Route Level**: HTTP error responses
2. **Service Level**: Business logic errors
3. **Integration Level**: gRPC call failures
4. **Database Level**: Query failures

### Error Types
- `400` - Bad Request (validation errors)
- `404` - Not Found (resource missing)
- `500` - Internal Server Error (system failures)
- `503` - Service Unavailable (device offline)

## Performance Optimization

### Current Optimizations
- Connection pooling for database
- Persistent gRPC connections
- Efficient protobuf serialization
- Index-based database queries

### Planned Optimizations
- Response caching (Redis)
- Database query optimization
- Lazy loading for device connections
- Batch operations for bulk updates
- CDN for frontend assets

## Testing Strategy

### Unit Tests
- Service layer methods
- Utility functions
- Data transformations

### Integration Tests
- API endpoint testing
- Database operations
- gRPC communication

### End-to-End Tests
- Complete user flows
- Device registration workflow
- Card scanning process
- Event monitoring cycle

## Version Control & CI/CD

### Git Workflow
- Feature branches for development
- Pull requests for code review
- Main branch for stable releases

### CI/CD Pipeline (Planned)
```
Commit → Build → Test → Deploy
    ↓       ↓       ↓       ↓
  GitHub  npm ci  Jest   PM2
```

## Configuration Management

### Environment Variables
```
# Server Configuration
PORT=3000
NODE_ENV=production

# Database Configuration
DATABASE_URL=mysql://user:pass@host:port/db

# Gateway Configuration (Fallback)
GATEWAY_IP=192.168.1.100
GATEWAY_PORT=4000

# Security Configuration
SSL_ENABLED=true
CERT_PATH=./cert/client.crt
KEY_PATH=./cert/client.key

# Feature Flags
ENABLE_REALTIME_EVENTS=true
ENABLE_AUTO_RECONNECT=true
```

### Database Configuration
Priority: Database → Environment Variables → Defaults

## Dependencies

### Core Dependencies
- `express` - Web framework
- `@prisma/client` - Database ORM
- `@grpc/grpc-js` - gRPC client
- `google-protobuf` - Protobuf runtime
- `winston` - Logging
- `dotenv` - Environment configuration

### Development Dependencies
- `nodemon` - Auto-restart during development
- `jest` - Testing framework
- `prisma` - Database migrations

## Future Architecture Enhancements

1. **Microservices Migration**: Split services into independent deployable units
2. **Event-Driven Architecture**: Implement event sourcing for audit trails
3. **GraphQL API**: Alternative to REST for flexible queries
4. **WebSocket Support**: Real-time updates to frontend
5. **Caching Layer**: Redis for performance optimization
6. **API Gateway**: Centralized API management and authentication
7. **Service Mesh**: Enhanced inter-service communication
8. **Containerization**: Docker containers for consistent deployments

---

**Last Updated**: November 9, 2025  
**Architecture Version**: 1.0  
**Maintained By**: Development Team