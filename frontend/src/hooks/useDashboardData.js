import { useCallback, useEffect, useRef, useState } from "react";
import { getDemandForecast, getSolarForecast, getEnergyFlow } from "../services/energyService";
import { getBatteryStatus, getRecommendations, getMetricsComparison, getCostBreakdown } from "../services/optimizerService";

const REFRESH_INTERVAL_MS = 60000;

export function useDashboardData({ horizon = 24, refreshMs = REFRESH_INTERVAL_MS } = {}) {
    const [data, setData] = useState({
        demand: null,
        solar: null,
        energyFlow: null,
        battery: null,
        metrics: null,
        recommendations: null,
        costBreakdown: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const abortRef = useRef(null);
    const requestIdRef = useRef(0);

    const fetchAll = useCallback(async () => {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        const requestId = ++requestIdRef.current;

        const results = await Promise.allSettled([
            getDemandForecast(horizon, { signal: controller.signal }),
            getSolarForecast(horizon, { signal: controller.signal }),
            getEnergyFlow(horizon, { signal: controller.signal }),
            getBatteryStatus({ signal: controller.signal }),
            getMetricsComparison(horizon, { signal: controller.signal }),
            getRecommendations({ signal: controller.signal }),
            getCostBreakdown(horizon, { signal: controller.signal }),
        ]);

        if (requestId !== requestIdRef.current) return;

        const [demand, solar, energyFlow, battery, metrics, recommendations, costBreakdown] = results;
        const failures = results.filter((r) => r.status === "rejected");

        if (failures.length > 0) {
            failures.forEach((f) => console.error("[useDashboardData] request failed:", f.reason));
        }

        setData({
            demand: demand.status === "fulfilled" ? demand.value : null,
            solar: solar.status === "fulfilled" ? solar.value : null,
            energyFlow: energyFlow.status === "fulfilled" ? energyFlow.value : null,
            battery: battery.status === "fulfilled" ? battery.value : null,
            metrics: metrics.status === "fulfilled" ? metrics.value : null,
            recommendations: recommendations.status === "fulfilled" ? recommendations.value : null,
            costBreakdown: costBreakdown.status === "fulfilled" ? costBreakdown.value : null,
        });
        setError(failures.length > 0 ? failures[0].reason : null);
        setLoading(false);
    }, [horizon]);

    useEffect(() => {
        fetchAll();
        const id = setInterval(fetchAll, refreshMs);
        return () => {
            clearInterval(id);
            abortRef.current?.abort();
        };
    }, [fetchAll, refreshMs]);

    return { data, loading, error, refresh: fetchAll };
}