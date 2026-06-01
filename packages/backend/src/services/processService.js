/**
 * ProcessService
 * In-memory tracker for long-running background operations (enrollment, sync, etc.)
 * Each process has: status, progress, results (successes/failures), conflicts, and logs.
 *
 * Conflicts are raised when a card is already assigned to a different user on the device.
 * The caller (usually a route) can resolve them via resolveConflict().
 */

import { randomUUID } from 'crypto';
import { EventEmitter } from 'events';

const MAX_PROCESSES = 200;

export default class ProcessService extends EventEmitter {
    constructor(logger) {
        super();
        this.logger = logger || console;
        /** @type {Map<string, object>} */
        this._processes = new Map();
    }

    /**
     * Create a new process entry and return its ID.
     * @param {string} type  Human-readable type, e.g. 'enroll-multi'
     * @param {object} metadata  Arbitrary extra info (deviceIds, userCount, …)
     * @returns {string} processId (UUID)
     */
    create(type, metadata = {}) {
        const id = randomUUID();
        const proc = {
            id,
            type,
            status: 'pending',  // pending | running | completed | failed | cancelled
            progress: 0,
            total: 0,
            results: [],
            conflicts: [],
            logs: [],
            metadata,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this._processes.set(id, proc);
        // Prune oldest when over capacity
        if (this._processes.size > MAX_PROCESSES) {
            const oldest = this._processes.keys().next().value;
            this._processes.delete(oldest);
        }
        this.emit('created', proc);
        return id;
    }

    /**
     * Merge updates into an existing process.
     * Always stamps updatedAt.
     */
    update(id, updates) {
        const proc = this._processes.get(id);
        if (!proc) return null;
        Object.assign(proc, updates, { updatedAt: new Date().toISOString() });
        this.emit('updated', proc);
        return proc;
    }

    /** Get a single process by ID, or null. */
    get(id) {
        return this._processes.get(id) ?? null;
    }

    /** Get all processes, newest first. */
    getAll() {
        return [...this._processes.values()].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    /**
     * Cancel a running or pending process.
     * Sets status to 'cancelled'; the background worker polls isCancelled().
     */
    cancel(id) {
        const proc = this._processes.get(id);
        if (!proc || !['pending', 'running'].includes(proc.status)) return proc ?? null;
        proc.status = 'cancelled';
        proc.updatedAt = new Date().toISOString();
        this.emit('cancelled', proc);
        return proc;
    }

    /** Returns true if the process has been cancelled. */
    isCancelled(id) {
        return this._processes.get(id)?.status === 'cancelled';
    }

    /** Append a log line to the process. */
    log(id, message, level = 'info') {
        const proc = this._processes.get(id);
        if (!proc) return;
        proc.logs.push({ time: new Date().toISOString(), level, message });
        proc.updatedAt = new Date().toISOString();
    }

    /**
     * Append a result entry.
     * @param {string} id  processId
     * @param {object} result  { type, deviceId, userId, success, error?, … }
     */
    addResult(id, result) {
        const proc = this._processes.get(id);
        if (!proc) return;
        proc.results.push(result);
        // Auto-increment progress for successful items
        if (result.success !== false) {
            proc.progress = Math.min((proc.progress || 0) + 1, proc.total || Infinity);
        }
        proc.updatedAt = new Date().toISOString();
    }

    /**
     * Add a card-assignment conflict that needs human resolution.
     * @param {string} id  processId
     * @param {object} conflict  see enrollUsersToDevices for shape
     * @returns {string|null} conflictId
     */
    addConflict(id, conflict) {
        const proc = this._processes.get(id);
        if (!proc) return null;
        const conflictId = randomUUID();
        proc.conflicts.push({ ...conflict, id: conflictId, status: 'pending' });
        proc.updatedAt = new Date().toISOString();
        return conflictId;
    }

    /**
     * Resolve a single conflict.
     * @param {string} processId
     * @param {string} conflictId
     * @param {string} status  'overridden' | 'cancelled'
     */
    resolveConflict(processId, conflictId, status) {
        const proc = this._processes.get(processId);
        if (!proc) return null;
        const conflict = proc.conflicts.find(c => c.id === conflictId);
        if (!conflict) return null;
        conflict.status = status;
        conflict.resolvedAt = new Date().toISOString();
        proc.updatedAt = new Date().toISOString();
        return conflict;
    }

    /** Convenience: check whether any pending conflicts remain. */
    hasPendingConflicts(id) {
        const proc = this._processes.get(id);
        return proc ? proc.conflicts.some(c => c.status === 'pending') : false;
    }
}
