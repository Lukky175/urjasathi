/**
 * ============================================================================
 * File        : useTableData.js
 * Project     : UrjaSathi
 *
 * Description :
 * Hook for fetching authenticated per-user dashboard snapshot data from
 * GET /table-data. Handles loading, 404 (no data yet), 401 (expired token),
 * and auto-refresh every 60 seconds.
 *
 * Returns:
 *   {
 *     tableData: { current_consumption, solar_generation, battery_level,
 *                  today_saving, energy_flow, renewable_implant } | null,
 *     loading: boolean,
 *     error: string | null,
 *     notFound: boolean,   // true when user has no dashboard doc in MongoDB
 *     refresh: () => void,
 *   }
 * ============================================================================
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { getDashboardTableData } from "../services/tableDataService";
import { clearAuthSession } from "../services/authService";

const REFRESH_INTERVAL_MS = 60_000;

export function useTableData({ refreshMs = REFRESH_INTERVAL_MS } = {}) {
    const [tableData, setTableData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const abortRef = useRef(null);
    const requestIdRef = useRef(0);

    const fetch = useCallback(async () => {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        const requestId = ++requestIdRef.current;
        setLoading(true);
        setError(null);
        setNotFound(false);

        try {
            const data = await getDashboardTableData({ signal: controller.signal });

            if (requestId !== requestIdRef.current) return;

            setTableData(data);
            setLoading(false);
        } catch (err) {
            if (err.name === "AbortError" || err.code === "ABORTED") return;
            if (requestId !== requestIdRef.current) return;

            const status = err.status ?? err.response?.status;

            if (status === 404) {
                // User exists but has no dashboard snapshot document yet
                setNotFound(true);
                setTableData(null);
                setError(null);
            } else if (status === 401) {
                // Token expired — clear session so the app redirects to login
                clearAuthSession();
                setError("Session expired. Please log in again.");
                setTableData(null);
            } else {
                const detail = err.payload?.detail ?? err.response?.data?.detail;
                setError(
                    typeof detail === "string"
                        ? detail
                        : err.message ?? "Failed to load dashboard data."
                );
                setTableData(null);
            }

            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetch();
        const id = setInterval(fetch, refreshMs);
        return () => {
            clearInterval(id);
            abortRef.current?.abort();
        };
    }, [fetch, refreshMs]);

    return { tableData, loading, error, notFound, refresh: fetch };
}
