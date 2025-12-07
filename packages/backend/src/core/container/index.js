/**
 * Dependency Injection Container
 * Manages service instances and their dependencies
 * Provides IoC (Inversion of Control) pattern
 */

/**
 * @class Container
 * @description Simple dependency injection container
 * 
 * Features:
 * - Service registration with factory functions
 * - Singleton and transient lifetime support
 * - Lazy instantiation
 * - Dependency resolution
 */
export class Container {
    constructor() {
        this.services = new Map();
        this.instances = new Map();
        this.factories = new Map();
    }

    /**
     * Register a service instance (singleton)
     * 
     * @param {string} name - Service name
     * @param {*} instance - Service instance
     * @returns {Container}
     */
    registerInstance(name, instance) {
        this.instances.set(name, instance);
        return this;
    }

    /**
     * Register a service factory
     * 
     * @param {string} name - Service name
     * @param {Function} factory - Factory function (container) => instance
     * @param {Object} [options] - Registration options
     * @param {boolean} [options.singleton=true] - Create singleton instance
     * @returns {Container}
     */
    register(name, factory, options = {}) {
        const { singleton = true } = options;
        
        this.factories.set(name, {
            factory,
            singleton,
            resolved: false
        });
        
        return this;
    }

    /**
     * Register a class (constructor)
     * 
     * @param {string} name - Service name
     * @param {Function} Class - Class constructor
     * @param {Array} [dependencies] - Dependency names
     * @param {Object} [options] - Registration options
     * @returns {Container}
     */
    registerClass(name, Class, dependencies = [], options = {}) {
        return this.register(name, (container) => {
            const deps = dependencies.map(dep => container.resolve(dep));
            return new Class(...deps);
        }, options);
    }

    /**
     * Resolve a service by name
     * 
     * @param {string} name - Service name
     * @returns {*}
     */
    resolve(name) {
        // Check for direct instance
        if (this.instances.has(name)) {
            return this.instances.get(name);
        }

        // Check for factory
        const registration = this.factories.get(name);
        if (!registration) {
            throw new Error(`Service '${name}' is not registered`);
        }

        // Return cached singleton if available
        if (registration.singleton && registration.resolved) {
            return this.instances.get(name);
        }

        // Create instance
        const instance = registration.factory(this);

        // Cache singleton
        if (registration.singleton) {
            this.instances.set(name, instance);
            registration.resolved = true;
        }

        return instance;
    }

    /**
     * Check if service is registered
     * 
     * @param {string} name - Service name
     * @returns {boolean}
     */
    has(name) {
        return this.instances.has(name) || this.factories.has(name);
    }

    /**
     * Get all registered service names
     * 
     * @returns {string[]}
     */
    getRegisteredServices() {
        return [
            ...this.instances.keys(),
            ...this.factories.keys()
        ];
    }

    /**
     * Clear all instances (useful for testing)
     */
    clear() {
        this.instances.clear();
        this.factories.forEach(reg => {
            reg.resolved = false;
        });
    }

    /**
     * Dispose all services that have a dispose method
     * 
     * @returns {Promise<void>}
     */
    async dispose() {
        for (const [name, instance] of this.instances) {
            if (typeof instance.dispose === 'function') {
                try {
                    await instance.dispose();
                } catch (error) {
                    console.error(`Error disposing service ${name}:`, error);
                }
            }
        }
        this.clear();
    }
}

/**
 * Global container instance
 */
let globalContainer = null;

/**
 * Get or create the global container
 * 
 * @returns {Container}
 */
export function getContainer() {
    if (!globalContainer) {
        globalContainer = new Container();
    }
    return globalContainer;
}

/**
 * Reset the global container (for testing)
 */
export function resetContainer() {
    if (globalContainer) {
        globalContainer.clear();
    }
    globalContainer = new Container();
}

/**
 * Service decorator helper
 * Resolves dependencies from container
 * 
 * @param {Container} container - DI container
 * @param {string[]} dependencies - Service names to inject
 * @returns {Object} Resolved dependencies object
 */
export function inject(container, dependencies) {
    const resolved = {};
    for (const dep of dependencies) {
        resolved[dep] = container.resolve(dep);
    }
    return resolved;
}

export default {
    Container,
    getContainer,
    resetContainer,
    inject
};
