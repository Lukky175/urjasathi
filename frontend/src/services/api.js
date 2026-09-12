// Production API configuration
const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "/api";

const DEFAULT_TIMEOUT_MS = 25000;

function buildUrl(path) {
    if (BASE_URL.startsWith("http://") || BASE_URL.startsWith("https://")) {
        return new URL(path, BASE_URL);
    }

    const normalizedBase = BASE_URL.replace(/\/$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    return new URL(
        `${normalizedBase}${normalizedPath}`,
        window.location.origin,
    );
}

export class ApiError extends Error {
    constructor(message, status, payload) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.payload = payload;
    }
}

async function request(path, { method = "GET", params, signal, timeout = DEFAULT_TIMEOUT_MS } = {}) {
    const url = buildUrl(path);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, value);
            }
        });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    if (signal) {
        signal.addEventListener("abort", () => controller.abort(), { once: true });
    }

    try {
        const response = await fetch(url.toString(), {
            method,
            headers: { Accept: "application/json" },
            signal: controller.signal,
        });

        if (!response.ok) {
            let payload = null;
            try {
                payload = await response.json();
            } catch {
                // No JSON body on this error response - that's fine.
            }
            throw new ApiError(
                `Request to ${path} failed with status ${response.status}`,
                response.status,
                payload
            );
        }

        return await response.json();
    } catch (err) {
        if (err.name === "AbortError") {
            throw new ApiError(`Request to ${path} timed out or was cancelled`, 0, null);
        }
        if (err instanceof ApiError) {
            throw err;
        }
        throw new ApiError(err.message || "Network error while calling the API", 0, null);
    } finally {
        clearTimeout(timeoutId);
    }
}

export const api = {
    get: (path, options) => request(path, { ...options, method: "GET" }),
};

export default api;