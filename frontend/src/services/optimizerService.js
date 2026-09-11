import api from "./api";

export function getBatteryStatus(options = {}) {
    return api.get("/battery/status", options);
}

export function getRecommendations(options = {}) {
    return api.get("/recommendations", options);
}

export function getMetricsComparison(horizon = 24, options = {}) {
    return api.get("/metrics/comparison", { params: { horizon }, ...options });
}

export function getCostBreakdown(horizon = 24, options = {}) {
    return api.get("/metrics/cost-breakdown", { params: { horizon }, ...options });
}