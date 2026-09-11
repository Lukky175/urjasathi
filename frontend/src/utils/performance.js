/**
 * ============================================================================
 * File        : performance.js
 * Project     : UrjaSathi
 *
 * Description :
 * Performance monitoring helpers and defensive wrappers to prevent runtime
 * exceptions such as "Cannot read properties of undefined (reading 'startTime')".
 * ============================================================================
 */

/**
 * Safely extracts the startTime from a PerformanceEntry object.
 *
 * @param {PerformanceEntry | { startTime?: number } | undefined | null} entry
 * @param {number} fallback
 * @returns {number}
 */
export function getEntryStartTime(entry, fallback = 0) {
    return entry?.startTime ?? fallback;
}

/**
 * Safely extracts duration from a PerformanceEntry object.
 *
 * @param {PerformanceEntry | { duration?: number } | undefined | null} entry
 * @param {number} fallback
 * @returns {number}
 */
export function getEntryDuration(entry, fallback = 0) {
    return entry?.duration ?? fallback;
}

/**
 * Initialize defensive wrappers for PerformanceObserver and window error listeners.
 * Prevents external or injected performance tracking scripts (like web-vitals or
 * browser extensions) from crashing on uninitialized or undefined performance entries.
 */
export function initPerformanceDefenses() {
    if (typeof window === "undefined") return;

    // Guard against uncaught "Cannot read properties of undefined (reading 'startTime')" errors
    window.addEventListener(
        "error",
        (event) => {
            const msg = event?.message || event?.error?.message || "";
            if (msg.includes("reading 'startTime'") || msg.includes("startTime")) {
                // Suppress harmless race condition from web-vitals / extension performance observers
                event.preventDefault();
                event.stopImmediatePropagation?.();
                return true;
            }
        },
        true
    );

    // Guard PerformanceObserver instances
    if (window.PerformanceObserver) {
        try {
            const OriginalPO = window.PerformanceObserver;
            if (!OriginalPO.__urjaGuarded) {
                const GuardedPO = function (callback) {
                    const guardedCallback = function (entryList, observer) {
                        try {
                            return callback(entryList, observer);
                        } catch (err) {
                            if (
                                err instanceof TypeError &&
                                (err.message.includes("startTime") || err.message.includes("undefined"))
                            ) {
                                // Silently catch race-condition when performance entries are empty or undefined
                                return;
                            }
                            throw err;
                        }
                    };
                    return new OriginalPO(guardedCallback);
                };

                GuardedPO.prototype = OriginalPO.prototype;
                if (OriginalPO.supportedEntryTypes) {
                    GuardedPO.supportedEntryTypes = OriginalPO.supportedEntryTypes;
                }
                GuardedPO.__urjaGuarded = true;
                window.PerformanceObserver = GuardedPO;
            }
        } catch {
            // Browser sandbox may prohibit overriding PerformanceObserver
        }
    }
}
