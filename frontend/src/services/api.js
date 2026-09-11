const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const DEFAULT_TIMEOUT_MS = 25000;

export class ApiError extends Error {
    constructor(message, status, payload, code = null) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.payload = payload;
        this.code = code;
        this.response = {
            status,
            data: payload,
        };
    }
}

async function request(path, { method = "GET", params, body, signal, headers: customHeaders, credentials = "include", timeout = DEFAULT_TIMEOUT_MS } = {}) {
    const url = new URL(path, BASE_URL);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, value);
            }
        });
    }

    const controller = new AbortController();
    let timeoutTriggered = false;
    const timeoutId = setTimeout(() => {
        timeoutTriggered = true;
        controller.abort();
    }, timeout);

    const abortHandler = () => controller.abort();
    if (signal) {
        if (signal.aborted) {
            controller.abort();
        } else {
            signal.addEventListener("abort", abortHandler, { once: true });
        }
    }

    const token = typeof window !== "undefined"
        ? (localStorage.getItem("access_token") || sessionStorage.getItem("access_token"))
        : null;

    const headers = {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...customHeaders,
    };
    const init = {
        method,
        headers,
        credentials,
        signal: controller.signal,
    };

    if (body !== undefined) {
        headers["Content-Type"] = customHeaders?.["Content-Type"] || "application/json";
        init.body = typeof body === "string" ? body : JSON.stringify(body);
    }

    try {
        const response = await fetch(url.toString(), init);

        if (response.status === 204) {
            return null;
        }

        let payload = null;
        const raw = await response.text();
        if (raw) {
            try {
                payload = JSON.parse(raw);
            } catch {
                if (response.ok) {
                    throw new ApiError(
                        `Request to ${path} returned invalid JSON`,
                        response.status,
                        raw,
                        "MALFORMED"
                    );
                }
            }
        }

        if (!response.ok) {
            throw new ApiError(
                `Request to ${path} failed with status ${response.status}`,
                response.status,
                payload,
                "HTTP"
            );
        }

        if (payload === null) {
            throw new ApiError(
                `Request to ${path} returned an unexpected response`,
                response.status,
                payload,
                "MALFORMED"
            );
        }

        return payload;
    } catch (err) {
        if (err.name === "AbortError") {
            if (timeoutTriggered) {
                throw new ApiError(`Request to ${path} timed out`, 0, null, "TIMEOUT");
            }
            throw new ApiError(`Request to ${path} was cancelled`, 0, null, "ABORTED");
        }
        if (err instanceof ApiError) {
            throw err;
        }
        throw new ApiError(err.message || "Network error while calling the API", 0, null, "NETWORK");
    } finally {
        clearTimeout(timeoutId);
        if (signal) {
            signal.removeEventListener("abort", abortHandler);
        }
    }
}

export const api = {
    get: (path, options) => request(path, { ...options, method: "GET" }),
    post: (path, body, options) => request(path, { ...options, method: "POST", body }),
};

export default api;
