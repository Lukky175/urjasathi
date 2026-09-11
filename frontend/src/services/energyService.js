import api from "./api";

export function getDemandForecast(horizon = 24, options = {}) {
    return api.get("/forecast/demand", { params: { horizon }, ...options });
}

export function getSolarForecast(horizon = 24, options = {}) {
    return api.get("/forecast/solar", { params: { horizon }, ...options });
}

export function getEnergyFlow(horizon = 24, options = {}) {
    return api.get("/energy-flow", { params: { horizon }, ...options });
}