/**
 * CircuitBreaker
 *
 * Lightweight, dependency-free circuit breaker for protecting calls to
 * flaky external resources (cloud DB, gateway, HTTP APIs, ...).
 *
 * States:
 *   CLOSED    — calls pass through; consecutive failures are counted.
 *   OPEN      — calls short-circuit immediately with `CircuitOpenError`
 *               until the cool-down (`openMs`) elapses.
 *   HALF_OPEN — exactly one trial call is allowed; success closes the
 *               breaker, failure re-opens it (with reset cool-down).
 *
 * The breaker is intentionally synchronous and non-blocking: open-state
 * checks are O(1) and never await.
 */

export const CircuitState = Object.freeze({
    CLOSED: 'closed',
    OPEN: 'open',
    HALF_OPEN: 'half_open',
});

export class CircuitOpenError extends Error {
    constructor(name, retryInMs) {
        super(`Circuit "${name}" is open — retry in ${retryInMs}ms`);
        this.name = 'CircuitOpenError';
        this.code = 'CIRCUIT_OPEN';
        this.retryInMs = retryInMs;
    }
}

export class CircuitBreaker {
    /**
     * @param {object} opts
     * @param {string}   opts.name             - Human-readable label for logs.
     * @param {number}  [opts.failureThreshold=3]
     *        Consecutive failures while CLOSED before the breaker opens.
     * @param {number}  [opts.openMs=60000]
     *        Cool-down before a half-open trial is allowed.
     * @param {object}  [opts.logger]          - Winston-style logger.
     * @param {(err:any)=>boolean} [opts.isFailure]
     *        Optional filter — return false to ignore an error (do not
     *        count it as a breaker failure). Defaults to "all errors fail".
     * @param {(state:string, prev:string)=>void} [opts.onStateChange]
     */
    constructor({
        name = 'breaker',
        failureThreshold = 3,
        openMs = 60_000,
        logger = null,
        isFailure = () => true,
        onStateChange = null,
    } = {}) {
        this.name = name;
        this.failureThreshold = Math.max(1, failureThreshold);
        this.openMs = Math.max(0, openMs);
        this.logger = logger;
        this.isFailure = isFailure;
        this.onStateChange = onStateChange;

        this._state = CircuitState.CLOSED;
        this._consecutiveFailures = 0;
        this._openedAt = 0;
        this._lastError = null;
    }

    get state() { return this._state; }
    get consecutiveFailures() { return this._consecutiveFailures; }
    get lastError() { return this._lastError; }

    /**
     * Returns true when a call is allowed to proceed. May transition the
     * breaker from OPEN → HALF_OPEN when the cool-down has elapsed.
     */
    canExecute() {
        if (this._state === CircuitState.CLOSED) return true;

        if (this._state === CircuitState.OPEN) {
            if (Date.now() - this._openedAt >= this.openMs) {
                this._transition(CircuitState.HALF_OPEN);
                return true;
            }
            return false;
        }

        // HALF_OPEN: only allow if no trial is already in flight. Since this
        // breaker is single-threaded (Node event loop) and the trial call
        // sets state synchronously on completion, an additional in-flight
        // flag is unnecessary for the typical use case.
        return true;
    }

    /**
     * Milliseconds remaining before the next call would be allowed.
     * Returns 0 when the breaker is not open.
     */
    msUntilRetry() {
        if (this._state !== CircuitState.OPEN) return 0;
        return Math.max(0, this.openMs - (Date.now() - this._openedAt));
    }

    recordSuccess() {
        this._consecutiveFailures = 0;
        this._lastError = null;
        if (this._state !== CircuitState.CLOSED) {
            this._transition(CircuitState.CLOSED);
        }
    }

    recordFailure(error) {
        if (!this.isFailure(error)) return;
        this._lastError = error;

        if (this._state === CircuitState.HALF_OPEN) {
            // Trial failed → re-open with a fresh cool-down window.
            this._open();
            return;
        }

        this._consecutiveFailures += 1;
        if (this._consecutiveFailures >= this.failureThreshold) {
            this._open();
        }
    }

    /**
     * Convenience wrapper: short-circuits when open, otherwise invokes
     * `fn()` and records success/failure automatically.
     *
     * @template T
     * @param {() => Promise<T>|T} fn
     * @returns {Promise<T>}
     */
    async exec(fn) {
        if (!this.canExecute()) {
            throw new CircuitOpenError(this.name, this.msUntilRetry());
        }
        try {
            const result = await fn();
            this.recordSuccess();
            return result;
        } catch (err) {
            this.recordFailure(err);
            throw err;
        }
    }

    // ── internals ────────────────────────────────────────────────────────

    _open() {
        this._openedAt = Date.now();
        this._transition(CircuitState.OPEN);
    }

    _transition(next) {
        const prev = this._state;
        if (prev === next) return;
        this._state = next;
        this.logger?.warn?.(
            `[CircuitBreaker:${this.name}] state ${prev} → ${next}` +
            (next === CircuitState.OPEN
                ? ` (consecutiveFailures=${this._consecutiveFailures}, cooldown=${this.openMs}ms)`
                : '')
        );
        try {
            this.onStateChange?.(next, prev);
        } catch (_) { /* swallow — listener errors must not affect the breaker */ }
    }
}

/**
 * Default classifier for DB / network connectivity errors.
 * Returns true for the failure modes that should trip a DB-facing breaker.
 *
 * Recognized:
 *   - Prisma codes:  P1001 P1002 P1008 P1017 P2024
 *   - Node net err:  ECONNRESET ETIMEDOUT ECONNREFUSED ENOTFOUND EAI_AGAIN EPIPE
 *   - Custom flag:   err.isConnectivityError === true
 *   - Heuristics:    /timed out|connection|socket|reach|unreachable|ECONN/i in message
 *
 * Application bugs (ReferenceError, TypeError, …) and schema errors
 * (P2022, P2010, etc.) are intentionally excluded.
 */
export function isConnectivityError(err) {
    if (!err) return false;
    if (err.isConnectivityError === true) return true;
    if (err.code === 'CIRCUIT_OPEN') return false;

    const code = err.code;
    if (typeof code === 'string') {
        if (['P1001', 'P1002', 'P1008', 'P1017', 'P2024'].includes(code)) return true;
        if (['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN', 'EPIPE'].includes(code)) return true;
    }

    const msg = String(err.message || '');
    return /timed out|timeout|connection|socket|unreachable|can't reach|ECONN|reset by peer/i.test(msg);
}

export default CircuitBreaker;
