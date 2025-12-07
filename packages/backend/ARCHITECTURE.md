# Backend Architecture Guide

## Overview

This document describes the enhanced modular backend architecture for the Suprema Integration project. The architecture follows software engineering best practices including:

- **Layered Architecture** - Clear separation of concerns
- **Interface-Based Design** - Contracts for each layer
- **Dependency Injection** - Loose coupling between components
- **Repository Pattern** - Abstracted data access
- **Centralized Error Handling** - Consistent error responses
- **Modular Utilities** - Reusable helper functions

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Controllers                             │  │
│  │  • HTTP request/response handling                         │  │
│  │  • Input validation                                       │  │
│  │  • Response formatting                                    │  │
│  │  • Extends: BaseController                                │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       BUSINESS LAYER                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      Services                              │  │
│  │  • Business logic implementation                          │  │
│  │  • Transaction orchestration                              │  │
│  │  • Domain event emission                                  │  │
│  │  • Extends: BaseService                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Repositories                            │  │
│  │  • Database operations via Prisma                         │  │
│  │  • Query building                                         │  │
│  │  • Data mapping                                           │  │
│  │  • Extends: BaseRepository                                │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       INFRASTRUCTURE                             │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │   Config     │  │   Logger     │  │   Error Handler       │  │
│  └──────────────┘  └──────────────┘  └───────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │  Container   │  │    Utils     │  │    Validators         │  │
│  └──────────────┘  └──────────────┘  └───────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── core/                      # Core framework modules
│   ├── base/                  # Base classes
│   │   ├── BaseController.js  # HTTP controller base
│   │   ├── BaseRepository.js  # Data access base
│   │   ├── BaseService.js     # Business logic base
│   │   └── index.js
│   ├── config/                # Configuration management
│   │   └── index.js
│   ├── container/             # Dependency injection
│   │   └── index.js
│   ├── errors/                # Error handling
│   │   ├── AppErrors.js       # Custom error classes
│   │   ├── errorHandler.js    # Express middleware
│   │   └── index.js
│   ├── interfaces/            # Interface contracts
│   │   ├── IController.js
│   │   ├── IRepository.js
│   │   ├── IService.js
│   │   └── index.js
│   ├── utils/                 # Shared utilities
│   │   ├── asyncUtils.js      # Async helpers
│   │   ├── cardUtils.js       # Card encoding/decoding
│   │   ├── dateUtils.js       # Date manipulation
│   │   ├── objectUtils.js     # Object helpers
│   │   ├── stringUtils.js     # String manipulation
│   │   ├── validationUtils.js # Validation helpers
│   │   └── index.js
│   └── index.js               # Core exports
├── repositories/              # Data access layer
│   ├── CardAssignmentRepository.js
│   ├── DeviceEnrollmentRepository.js
│   ├── DeviceRepository.js
│   ├── EventRepository.js
│   └── index.js
├── services/                  # Business logic layer
│   ├── connectionService.js
│   ├── enrollmentService.js
│   ├── userService.js
│   └── ...
├── routes/                    # HTTP routes (controllers)
│   ├── enrollmentRoutes.js
│   ├── userRoutes.js
│   └── ...
├── middleware/                # Express middleware
└── bootstrap.js               # Application initialization
```

## Core Modules

### 1. Interfaces (`src/core/interfaces/`)

Defines contracts that each layer must implement.

```javascript
// Using interfaces
import { IService, IRepository, IController } from './core/interfaces/index.js';

class MyService extends BaseService implements IService {
    async initialize() { /* ... */ }
    async healthCheck() { /* ... */ }
}
```

### 2. Base Classes (`src/core/base/`)

Provides common functionality for each layer.

#### BaseRepository
```javascript
import { BaseRepository } from './core/base/BaseRepository.js';

class UserRepository extends BaseRepository {
    constructor(prisma, logger) {
        super(prisma, 'user', logger);
    }

    async findActiveUsers() {
        return this.findMany({ where: { status: 'active' } });
    }
}
```

#### BaseService
```javascript
import { BaseService } from './core/base/BaseService.js';

class UserService extends BaseService {
    constructor(options) {
        super(options);
        this.userRepository = options.userRepository;
    }

    async createUser(data) {
        return this.executeOperation('createUser', async () => {
            const user = await this.userRepository.create(data);
            this.emit('user:created', user);
            return this.successResult(user, 'User created');
        });
    }
}
```

#### BaseController
```javascript
import { BaseController } from './core/base/BaseController.js';

class UserController extends BaseController {
    constructor(options) {
        super({ ...options, basePath: '/users' });
        this.userService = options.userService;
        
        this.addRoute('GET', '/', this.index);
        this.addRoute('GET', '/:id', this.show);
        this.addRoute('POST', '/', this.create);
    }

    async index(req, res) {
        const result = await this.userService.getAll();
        this.sendSuccess(res, result.data);
    }

    async show(req, res) {
        const id = this.parseId(req);
        const result = await this.userService.getById(id);
        if (!result.data) {
            return this.sendNotFound(res, 'User');
        }
        this.sendSuccess(res, result.data);
    }
}
```

### 3. Error Handling (`src/core/errors/`)

Centralized error classes and handlers.

```javascript
import { 
    AppError, 
    ValidationError, 
    NotFoundError,
    DeviceError,
    createErrorHandler 
} from './core/errors/index.js';

// Throwing errors
throw new ValidationError('Invalid email format', 'email');
throw new NotFoundError('User', userId);
throw new DeviceError('Device communication failed', deviceId);

// Express middleware
app.use(createErrorHandler({ logger }));
```

### 4. Configuration (`src/core/config/`)

Environment-based configuration with validation.

```javascript
import config, { get, isProduction } from './core/config/index.js';

// Access configuration
const port = config.server.port;
const dbUrl = config.database.url;

// Using helper functions
const timeout = get('features.defaultTimeout', 30000);

if (isProduction()) {
    // Production-specific logic
}
```

### 5. Dependency Injection (`src/core/container/`)

IoC container for managing dependencies.

```javascript
import { getContainer } from './core/container/index.js';

const container = getContainer();

// Register services
container.registerInstance('logger', logger);
container.register('userService', (c) => {
    return new UserService({
        logger: c.resolve('logger'),
        userRepository: c.resolve('userRepository')
    });
});

// Resolve dependencies
const userService = container.resolve('userService');
```

### 6. Utilities (`src/core/utils/`)

Reusable helper functions organized by domain.

```javascript
// Card utilities
import { decodeHexToDecimal, encodeDecimalToHex } from './core/utils/cardUtils.js';

const cardNumber = decodeHexToDecimal('070044B524'); // '30069273892'

// Date utilities
import { todayRange, formatDuration } from './core/utils/dateUtils.js';

const { start, end } = todayRange();

// Async utilities
import { retry, withTimeout, parallelLimit } from './core/utils/asyncUtils.js';

const result = await retry(() => fetchData(), { maxRetries: 3 });

// Validation utilities
import { validate, isValidIP } from './core/utils/validationUtils.js';

const result = validate(data, {
    email: { required: true, type: 'string', pattern: PATTERNS.EMAIL },
    port: { required: true, type: 'integer', min: 1, max: 65535 }
});
```

## Repository Layer

Repositories abstract database operations and provide domain-specific queries.

```javascript
import { CardAssignmentRepository } from './repositories/index.js';

const repo = new CardAssignmentRepository(prisma, logger);

// Basic CRUD
const assignment = await repo.findById(1);
const all = await repo.findMany({ where: { status: 'active' } });
const created = await repo.create({ employeeId: '123', cardData: '...' });

// Domain-specific methods
const active = await repo.findActive();
const byEmployee = await repo.findByEmployeeId('123');
const stats = await repo.getStatistics();
```

## Service Layer

Services implement business logic and orchestrate operations.

```javascript
import { BaseService } from './core/base/BaseService.js';

class EnrollmentService extends BaseService {
    constructor(options) {
        super({ ...options, serviceName: 'EnrollmentService' });
        this.cardRepo = options.cardAssignmentRepository;
        this.enrollmentRepo = options.deviceEnrollmentRepository;
        this.userService = options.userService;
    }

    async revokeCard(assignmentId, reason) {
        return this.executeOperation('revokeCard', async () => {
            // Update database
            const assignment = await this.cardRepo.revoke(assignmentId, reason);
            
            // Remove from all devices
            for (const enrollment of assignment.enrollments) {
                await this.userService.deleteUsers(
                    enrollment.device.supremaId,
                    [enrollment.deviceUserId]
                );
                await this.enrollmentRepo.markRemoved(enrollment.id);
            }
            
            this.emit('card:revoked', { assignmentId, reason });
            return this.successResult(assignment, 'Card revoked');
        });
    }
}
```

## Bootstrap & Initialization

The `bootstrap.js` file wires everything together.

```javascript
import { bootstrap, createShutdownHandler } from './bootstrap.js';

// Initialize application
const container = await bootstrap();

// Get dependencies
const logger = container.resolve('logger');
const repositories = container.resolve('repositories');

// Setup graceful shutdown
const shutdown = createShutdownHandler(container);
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```

## Best Practices

### 1. Dependency Injection
Always inject dependencies through constructors:
```javascript
class MyService {
    constructor({ logger, repository }) {
        this.logger = logger;
        this.repository = repository;
    }
}
```

### 2. Error Handling
Use custom error classes for different scenarios:
```javascript
if (!user) {
    throw new NotFoundError('User', userId);
}

if (!isValidEmail(email)) {
    throw new ValidationError('Invalid email format', 'email');
}
```

### 3. Logging
Use structured logging with context:
```javascript
this.logger.info('User created', { userId: user.id, action: 'create' });
this.logger.error('Operation failed', { error: err.message, userId });
```

### 4. Async Operations
Use the async utilities for resilient operations:
```javascript
import { retry, withTimeout } from './core/utils/asyncUtils.js';

// Retry with exponential backoff
const result = await retry(
    () => deviceService.connect(deviceId),
    { maxRetries: 3, baseDelay: 1000 }
);

// Timeout for slow operations
const data = await withTimeout(
    fetchFromDevice(deviceId),
    5000,
    'Device timeout'
);
```

### 5. Configuration
Access configuration through the config module:
```javascript
import config from './core/config/index.js';

// Good
const port = config.server.port;

// Avoid
const port = process.env.PORT; // Use config instead
```

## Migration Guide

To migrate existing code to use the new architecture:

1. **Create Repository**: Extract database operations into a repository class
2. **Create Service**: Move business logic into a service class
3. **Update Routes**: Inject services and use BaseController patterns
4. **Use Custom Errors**: Replace generic errors with AppError subclasses
5. **Add to Container**: Register new services in the DI container

## Testing

The architecture supports easy testing through dependency injection:

```javascript
// Mock dependencies
const mockRepo = {
    findById: jest.fn().mockResolvedValue({ id: 1, name: 'Test' }),
    create: jest.fn().mockResolvedValue({ id: 2 })
};

const mockLogger = {
    info: jest.fn(),
    error: jest.fn()
};

// Create service with mocks
const service = new MyService({
    logger: mockLogger,
    repository: mockRepo
});

// Test
const result = await service.getById(1);
expect(mockRepo.findById).toHaveBeenCalledWith(1);
```
