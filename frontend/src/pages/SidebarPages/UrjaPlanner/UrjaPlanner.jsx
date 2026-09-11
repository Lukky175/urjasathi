/**
 * ============================================================================
 * File        : UrjaPlanner.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Personalized energy planning and scenario analysis page.
 *
 * Urja Planner allows users to enter their own energy scenario and explore
 * potential outcomes using the existing /api/urja-planner analysis endpoint.
 *
 * IMPORTANT:
 * - Data entered here is ONLY for this scenario.
 * - It does not modify dashboard data.
 * - It does not affect Consumption, Generation, Cost & Savings, etc.
 * ============================================================================
 */

import { useEffect, useMemo, useRef, useState } from "react";

import {
    MapPin,
    SunMedium,
    Zap,
    ArrowRight,
    Sparkles,
    RotateCcw,
    TrendingUp,
    IndianRupee,
    BatteryCharging,
    Activity,
    Leaf,
} from "lucide-react";

import LineChart from "../../../components/charts/LineChart";
import api, { ApiError } from "../../../services/api";


/**
 * ============================================================================
 * SUPPORTED LOCATIONS
 * ============================================================================
 *
 * Currently supported by the planner.
 *
 * More cities can be added later when the planner supports them.
 */
const SUPPORTED_CITIES = [
    "Delhi",
    "Greater Noida",
];

const PLANNER_RESULT_FIELDS = [
    "city",
    "daily_solar_kwh",
    "daily_consumption_kwh",
    "monthly_savings_inr",
    "savings_pct",
    "grid_reduction_pct",
    "peak_demand_shaved_kw",
    "co2_abated_kg_daily",
    "co2_abated_tonnes_monthly",
    "battery_buffer_kwh",
    "hourly_profile",
];


function parseRequiredNumber(value) {
    if (value === "" || value === null || value === undefined) {
        return null;
    }

    const parsed = Number(value);

    if (!Number.isFinite(parsed) || parsed < 0) {
        return null;
    }

    return parsed;
}


function isPlannerResult(payload) {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        return false;
    }

    const hasFields = PLANNER_RESULT_FIELDS.every((field) => field in payload);

    return hasFields && Array.isArray(payload.hourly_profile);
}


function formatMetric(value, digits = 1) {
    const numeric = Number(value);

    if (!Number.isFinite(numeric)) {
        return "—";
    }

    return numeric.toLocaleString("en-IN", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    });
}


function formatHourLabel(hour) {
    const numeric = Number(hour);

    if (!Number.isFinite(numeric)) {
        return "";
    }

    return `${String(Math.trunc(numeric)).padStart(2, "0")}:00`;
}


function plannerErrorMessage(error) {
    if (!(error instanceof ApiError)) {
        return "Something went wrong while analyzing this scenario. Please try again.";
    }

    if (error.code === "ABORTED") {
        return null;
    }

    if (error.code === "TIMEOUT") {
        return "The analysis request timed out. Please try again.";
    }

    if (error.code === "MALFORMED") {
        return "The analysis service returned an unexpected response. Please try again.";
    }

    if (error.status === 0 || error.code === "NETWORK") {
        return "Could not reach the analysis service. Check your connection and try again.";
    }

    const detail = error.payload?.detail;

    if (typeof detail === "string" && detail.trim()) {
        return detail;
    }

    if (Array.isArray(detail) && detail[0]?.msg) {
        return detail[0].msg;
    }

    if (error.status >= 500) {
        return "The analysis service ran into a problem. Please try again later.";
    }

    if (error.status >= 400) {
        return "The scenario could not be analyzed. Please check your inputs and try again.";
    }

    return "Something went wrong while analyzing this scenario. Please try again.";
}


/**
 * ============================================================================
 * UrjaPlanner
 * ============================================================================
 */

export default function UrjaPlanner() {

    /**
     * ------------------------------------------------------------------------
     * FORM STATE
     * ------------------------------------------------------------------------
     *
     * These values belong only to this page.
     */
    const [city, setCity] = useState("Delhi");

    const [solarGeneration, setSolarGeneration] = useState("");

    const [energyConsumption, setEnergyConsumption] = useState("");


    /**
     * ------------------------------------------------------------------------
     * ANALYSIS STATE
     * ------------------------------------------------------------------------
     */

    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const [hasAnalyzed, setHasAnalyzed] = useState(false);

    const [analysisResult, setAnalysisResult] = useState(null);

    const [error, setError] = useState(null);

    const abortRef = useRef(null);

    const requestIdRef = useRef(0);


    useEffect(() => {
        return () => {
            abortRef.current?.abort();
        };
    }, []);


    /**
     * =========================================================================
     * HANDLE SUBMIT
     * =========================================================================
     *
     * form data
     *      ↓
     * api.post("/api/urja-planner")
     *      ↓
     * FastAPI planner calculations
     *      ↓
     * analysis results
     */
    const handleSubmit = async (event) => {

        event.preventDefault();

        const solarValue = parseRequiredNumber(solarGeneration);
        const consumptionValue = parseRequiredNumber(energyConsumption);

        if (solarValue === null || consumptionValue === null) {
            setError("Enter valid numeric values for solar generation and energy consumption.");
            setHasAnalyzed(false);
            return;
        }

        abortRef.current?.abort();

        const controller = new AbortController();
        abortRef.current = controller;

        const requestId = ++requestIdRef.current;

        setError(null);
        setIsAnalyzing(true);

        try {
            const result = await api.post(
                "/api/urja-planner",
                {
                    city,
                    solar_generation: solarValue,
                    energy_consumption: consumptionValue,
                },
                { signal: controller.signal }
            );

            if (requestId !== requestIdRef.current) {
                return;
            }

            if (!isPlannerResult(result)) {
                setAnalysisResult(null);
                setHasAnalyzed(false);
                setError("The analysis service returned an unexpected response. Please try again.");
                return;
            }

            setAnalysisResult(result);
            setHasAnalyzed(true);
        } catch (err) {
            if (requestId !== requestIdRef.current) {
                return;
            }

            const message = plannerErrorMessage(err);

            if (!message) {
                return;
            }

            setAnalysisResult(null);
            setHasAnalyzed(false);
            setError(message);
        } finally {
            if (requestId === requestIdRef.current) {
                setIsAnalyzing(false);
            }
        }
    };


    /**
     * =========================================================================
     * RESET SCENARIO
     * =========================================================================
     */

    const handleReset = () => {

        abortRef.current?.abort();
        requestIdRef.current += 1;

        setCity("Delhi");

        setSolarGeneration("");

        setEnergyConsumption("");

        setHasAnalyzed(false);

        setIsAnalyzing(false);

        setAnalysisResult(null);

        setError(null);
    };


    const hourlyProfile = analysisResult?.hourly_profile ?? [];

    const hourlyChartSeries = useMemo(() => {
        if (!hourlyProfile.length) {
            return [];
        }

        const toSeries = (name, color, key) => ({
            name,
            color,
            data: hourlyProfile.map((point) => ({
                label: formatHourLabel(point.hour),
                value: Number(point[key]) || 0,
            })),
        });

        return [
            toSeries("Demand", "#7c3aed", "demand_kw"),
            toSeries("Solar", "#f59e0b", "solar_kw"),
            toSeries("Battery discharge", "#0ea5e9", "battery_discharge_kw"),
            toSeries("Grid import", "#64748b", "grid_import_kw"),
        ];
    }, [hourlyProfile]);

    const batterySocSeries = useMemo(() => {
        if (!hourlyProfile.length) {
            return [];
        }

        return [
            {
                name: "Battery SOC",
                color: "#10b981",
                data: hourlyProfile.map((point) => ({
                    label: formatHourLabel(point.hour),
                    value: Number(point.battery_soc_pct) || 0,
                })),
            },
        ];
    }, [hourlyProfile]);

    const resultCards = analysisResult
        ? [
            {
                label: "Daily Solar",
                value: `${formatMetric(analysisResult.daily_solar_kwh)} kWh`,
                description: "Average daily generation",
                icon: SunMedium,
                iconClass: "text-[var(--solar)]",
            },
            {
                label: "Daily Consumption",
                value: `${formatMetric(analysisResult.daily_consumption_kwh)} kWh`,
                description: "Average daily demand",
                icon: Zap,
                iconClass: "text-[var(--consumption)]",
            },
            {
                label: "Monthly Savings",
                value: `₹${formatMetric(analysisResult.monthly_savings_inr, 0)}`,
                description: `${formatMetric(analysisResult.savings_pct, 1)}% vs baseline`,
                icon: IndianRupee,
                iconClass: "text-secondary",
            },
            {
                label: "Grid Reduction",
                value: `${formatMetric(analysisResult.grid_reduction_pct, 1)}%`,
                description: "Less energy imported from the grid",
                icon: TrendingUp,
                iconClass: "text-primary",
            },
            {
                label: "Peak Demand Shaved",
                value: `${formatMetric(analysisResult.peak_demand_shaved_kw)} kW`,
                description: "Peak load reduced in this scenario",
                icon: Activity,
                iconClass: "text-secondary",
            },
            {
                label: "Daily CO₂ Reduction",
                value: `${formatMetric(analysisResult.co2_abated_kg_daily)} kg`,
                description: `${formatMetric(analysisResult.co2_abated_tonnes_monthly, 2)} t monthly`,
                icon: Leaf,
                iconClass: "text-secondary",
            },
            {
                label: "Battery Buffer",
                value: `${formatMetric(analysisResult.battery_buffer_kwh)} kWh`,
                description: `${formatMetric(analysisResult.battery_soc_min_pct, 0)}–${formatMetric(analysisResult.battery_soc_max_pct, 0)}% SOC window`,
                icon: BatteryCharging,
                iconClass: "text-primary",
            },
            {
                label: "Location",
                value: analysisResult.city || city,
                description: "Planner scenario city",
                icon: MapPin,
                iconClass: "text-primary",
            },
        ]
        : [];


    /**
     * =========================================================================
     * RENDER
     * =========================================================================
     */

    return (
        <div className="mx-auto w-full max-w-7xl">

            {/* =================================================================
                PAGE HEADER
               ================================================================= */}

            <section className="mb-8">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        {/* Small label */}

                        <div
                            className="
                                mb-3
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-primary/20
                                bg-primary/10
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-primary
                            "
                        >
                            <Sparkles className="h-3.5 w-3.5" />

                            Personalized Planning
                        </div>


                        <h1
                            className="
                                text-3xl
                                font-bold
                                tracking-tight
                                text-text
                                sm:text-4xl
                            "
                        >
                            Urja Planner
                        </h1>


                        <p
                            className="
                                mt-2
                                max-w-2xl
                                text-sm
                                leading-6
                                text-text-secondary
                                sm:text-base
                            "
                        >
                            Explore how your energy setup could perform
                            with personalized solar and consumption details.
                        </p>

                    </div>


                    {/* Reset */}

                    {hasAnalyzed && (
                        <button
                            type="button"
                            onClick={handleReset}
                            className="
                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-border
                                bg-surface
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-text-secondary
                                shadow-sm
                                transition-all
                                duration-200
                                hover:border-primary
                                hover:bg-primary/5
                                hover:text-primary
                                focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-focus
                            "
                        >
                            <RotateCcw className="h-4 w-4" />

                            New Scenario
                        </button>
                    )}

                </div>

            </section>


            {/* =================================================================
                MAIN PLANNER
               ================================================================= */}

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">


                {/* =================================================================
                    SCENARIO FORM
                   ================================================================= */}

                <section
                    className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        shadow-[var(--shadow-card-value)]
                    "
                >

                    {/* Card header */}

                    <div
                        className="
                            border-b
                            border-border
                            px-5
                            py-5
                            sm:px-7
                        "
                    >

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-primary/10
                                    text-primary
                                "
                            >
                                <Activity className="h-5 w-5" />
                            </div>

                            <div>

                                <h2
                                    className="
                                        text-base
                                        font-semibold
                                        text-text
                                    "
                                >
                                    Your Energy Scenario
                                </h2>

                                <p
                                    className="
                                        mt-0.5
                                        text-xs
                                        text-text-muted
                                    "
                                >
                                    Enter your current energy details
                                    to generate a personalized analysis.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="p-5 sm:p-7"
                    >

                        <div className="space-y-6">


                            {/* =================================================
                                CITY
                               ================================================= */}

                            <div>

                                <label
                                    htmlFor="city"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-semibold
                                        text-text
                                    "
                                >
                                    City
                                </label>

                                <div className="relative">

                                    <MapPin
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-3.5
                                            top-1/2
                                            h-4.5
                                            w-4.5
                                            -translate-y-1/2
                                            text-primary
                                        "
                                    />

                                    <select
                                        id="city"
                                        value={city}
                                        onChange={(event) =>
                                            setCity(event.target.value)
                                        }
                                        disabled={isAnalyzing}
                                        className="
                                            w-full
                                            appearance-none
                                            rounded-xl
                                            border
                                            border-border
                                            bg-surface
                                            px-10
                                            py-3
                                            text-sm
                                            text-text
                                            outline-none
                                            transition-all
                                            duration-200
                                            hover:border-border-strong
                                            focus:border-primary
                                            focus:ring-4
                                            focus:ring-primary/10
                                        "
                                    >

                                        {SUPPORTED_CITIES.map(
                                            (supportedCity) => (
                                                <option
                                                    key={supportedCity}
                                                    value={supportedCity}
                                                >
                                                    {supportedCity}
                                                </option>
                                            )
                                        )}

                                    </select>

                                    <span
                                        className="
                                            pointer-events-none
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-text-muted
                                        "
                                    >
                                        ▾
                                    </span>

                                </div>

                                <p
                                    className="
                                        mt-2
                                        text-xs
                                        text-text-muted
                                    "
                                >
                                    Currently supported locations:
                                    Delhi and Greater Noida.
                                </p>

                            </div>


                            {/* =================================================
                                ENERGY INPUTS
                               ================================================= */}

                            <div className="grid gap-5 sm:grid-cols-2">


                                {/* -------------------------------------------------
                                    SOLAR GENERATION
                                   ------------------------------------------------- */}

                                <div>

                                    <label
                                        htmlFor="solar-generation"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        Current Solar Generation
                                    </label>

                                    <div className="relative">

                                        <SunMedium
                                            className="
                                                pointer-events-none
                                                absolute
                                                left-3.5
                                                top-1/2
                                                h-4.5
                                                w-4.5
                                                -translate-y-1/2
                                                text-[var(--solar)]
                                            "
                                        />

                                        <input
                                            id="solar-generation"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={solarGeneration}
                                            onChange={(event) =>
                                                setSolarGeneration(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="e.g. 8.5"
                                            disabled={isAnalyzing}
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-border
                                                bg-surface
                                                px-10
                                                py-3
                                                pr-20
                                                text-sm
                                                text-text
                                                outline-none
                                                transition-all
                                                duration-200
                                                placeholder:text-text-muted
                                                hover:border-border-strong
                                                focus:border-primary
                                                focus:ring-4
                                                focus:ring-primary/10
                                            "
                                            required
                                        />

                                        <span
                                            className="
                                                pointer-events-none
                                                absolute
                                                right-3.5
                                                top-1/2
                                                -translate-y-1/2
                                                text-xs
                                                font-medium
                                                text-text-muted
                                            "
                                        >
                                            kWh/day
                                        </span>

                                    </div>

                                    <p
                                        className="
                                            mt-2
                                            text-xs
                                            leading-5
                                            text-text-muted
                                        "
                                    >
                                        Average energy currently generated
                                        by your solar setup.
                                    </p>

                                </div>


                                {/* -------------------------------------------------
                                    ENERGY CONSUMPTION
                                   ------------------------------------------------- */}

                                <div>

                                    <label
                                        htmlFor="energy-consumption"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        Energy Consumption
                                    </label>

                                    <div className="relative">

                                        <Zap
                                            className="
                                                pointer-events-none
                                                absolute
                                                left-3.5
                                                top-1/2
                                                h-4.5
                                                w-4.5
                                                -translate-y-1/2
                                                text-[var(--consumption)]
                                            "
                                        />

                                        <input
                                            id="energy-consumption"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={energyConsumption}
                                            onChange={(event) =>
                                                setEnergyConsumption(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="e.g. 12.4"
                                            disabled={isAnalyzing}
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-border
                                                bg-surface
                                                px-10
                                                py-3
                                                pr-20
                                                text-sm
                                                text-text
                                                outline-none
                                                transition-all
                                                duration-200
                                                placeholder:text-text-muted
                                                hover:border-border-strong
                                                focus:border-primary
                                                focus:ring-4
                                                focus:ring-primary/10
                                            "
                                            required
                                        />

                                        <span
                                            className="
                                                pointer-events-none
                                                absolute
                                                right-3.5
                                                top-1/2
                                                -translate-y-1/2
                                                text-xs
                                                font-medium
                                                text-text-muted
                                            "
                                        >
                                            kWh/day
                                        </span>

                                    </div>

                                    <p
                                        className="
                                            mt-2
                                            text-xs
                                            leading-5
                                            text-text-muted
                                        "
                                    >
                                        Average electricity consumed
                                        by your household.
                                    </p>

                                </div>

                            </div>


                            {error && (
                                <div
                                    role="alert"
                                    className="
                                        rounded-xl
                                        border
                                        border-red-500/30
                                        bg-red-500/10
                                        px-4
                                        py-3
                                        text-sm
                                        text-red-500
                                    "
                                >
                                    {error}
                                </div>
                            )}


                            {/* =================================================
                                DIVIDER
                               ================================================= */}

                            <div className="border-t border-border" />


                            {/* =================================================
                                SUBMIT
                               ================================================= */}

                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-3
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                "
                            >

                                <div className="flex items-start gap-2">

                                    <Sparkles
                                        className="
                                            mt-0.5
                                            h-4
                                            w-4
                                            shrink-0
                                            text-primary
                                        "
                                    />

                                    <p
                                        className="
                                            max-w-md
                                            text-xs
                                            leading-5
                                            text-text-muted
                                        "
                                    >
                                        Your details are used only for
                                        this personalized scenario.
                                    </p>

                                </div>


                                <button
                                    type="submit"
                                    disabled={
                                        isAnalyzing ||
                                        !solarGeneration ||
                                        !energyConsumption
                                    }
                                    className="
                                        inline-flex
                                        shrink-0
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-primary
                                        px-5
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        shadow-md
                                        transition-all
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:bg-primary-dark
                                        hover:shadow-lg
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                        disabled:hover:translate-y-0
                                        focus-visible:outline-2
                                        focus-visible:outline-offset-2
                                        focus-visible:outline-focus
                                    "
                                >

                                    {isAnalyzing ? (
                                        <>
                                            <span
                                                className="
                                                    h-4
                                                    w-4
                                                    animate-spin
                                                    rounded-full
                                                    border-2
                                                    border-white/40
                                                    border-t-white
                                                "
                                            />

                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            Analyze Scenario

                                            <ArrowRight
                                                className="h-4 w-4"
                                            />
                                        </>
                                    )}

                                </button>

                            </div>

                        </div>

                    </form>

                </section>


                {/* =================================================================
                    INFORMATION CARD
                   ================================================================= */}

                <aside
                    className="
                        h-fit
                        rounded-2xl
                        border
                        border-border
                        bg-surface
                        p-5
                        shadow-[var(--shadow-card-value)]
                        sm:p-6
                    "
                >

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-secondary/10
                            text-secondary
                        "
                    >
                        <SunMedium className="h-5 w-5" />
                    </div>


                    <h2
                        className="
                            mt-4
                            text-base
                            font-semibold
                            text-text
                        "
                    >
                        Plan with your energy data
                    </h2>


                    <p
                        className="
                            mt-2
                            text-sm
                            leading-6
                            text-text-secondary
                        "
                    >
                        Use Urja Planner to explore the potential impact
                        of your energy setup before making a decision.
                    </p>


                    {/* =============================================================
                        WHAT WILL BE ANALYZED
                       ============================================================= */}

                    <div className="mt-6 space-y-3">

                        <p
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-text-muted
                            "
                        >
                            Potential insights
                        </p>


                        <div className="space-y-2.5">

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-primary/10
                                        text-primary
                                    "
                                >
                                    <TrendingUp className="h-4 w-4" />
                                </div>

                                <span
                                    className="
                                        text-sm
                                        text-text-secondary
                                    "
                                >
                                    Energy generation potential
                                </span>

                            </div>


                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-secondary/10
                                        text-secondary
                                    "
                                >
                                    <IndianRupee className="h-4 w-4" />
                                </div>

                                <span
                                    className="
                                        text-sm
                                        text-text-secondary
                                    "
                                >
                                    Potential cost savings
                                </span>

                            </div>


                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-primary/10
                                        text-primary
                                    "
                                >
                                    <BatteryCharging className="h-4 w-4" />
                                </div>

                                <span
                                    className="
                                        text-sm
                                        text-text-secondary
                                    "
                                >
                                    Energy independence
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* =============================================================
                        NOTE
                       ============================================================= */}

                    <div
                        className="
                            mt-6
                            rounded-xl
                            border
                            border-border
                            bg-surface-soft
                            p-4
                        "
                    >

                        <p
                            className="
                                text-xs
                                leading-5
                                text-text-muted
                            "
                        >
                            <span className="font-semibold text-text-secondary">
                                Note:
                            </span>{" "}
                            Results are generated from UrjaSathi planner
                            calculations for this scenario. Insights vary
                            with the selected location and the values you enter.
                        </p>

                    </div>

                </aside>

            </div>


            {/* =================================================================
                RESULTS
               ================================================================= */}

            {hasAnalyzed && analysisResult && (

                <section className="mt-6">

                    <div
                        className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-border
                            bg-surface
                            shadow-[var(--shadow-card-value)]
                        "
                    >

                        {/* Results header */}

                        <div
                            className="
                                border-b
                                border-border
                                px-5
                                py-5
                                sm:px-7
                            "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-secondary/10
                                        text-secondary
                                    "
                                >
                                    <TrendingUp className="h-5 w-5" />
                                </div>

                                <div>

                                    <h2
                                        className="
                                            text-base
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        Scenario Results
                                    </h2>

                                    <p
                                        className="
                                            mt-0.5
                                            text-xs
                                            text-text-muted
                                        "
                                    >
                                        Personalized analysis for {analysisResult.city || city}
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="p-5 sm:p-7">

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                                {resultCards.map((card) => {
                                    const Icon = card.icon;

                                    return (
                                        <div
                                            key={card.label}
                                            className="
                                                rounded-xl
                                                border
                                                border-border
                                                bg-surface-soft
                                                p-4
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                "
                                            >

                                                <span
                                                    className="
                                                        text-xs
                                                        font-medium
                                                        text-text-muted
                                                    "
                                                >
                                                    {card.label}
                                                </span>

                                                <Icon
                                                    className={`h-4 w-4 ${card.iconClass}`}
                                                />

                                            </div>

                                            <p
                                                className="
                                                    mt-3
                                                    text-2xl
                                                    font-bold
                                                    text-text
                                                "
                                            >
                                                {card.value}
                                            </p>

                                            <p
                                                className="
                                                    mt-1
                                                    text-xs
                                                    text-text-muted
                                                "
                                            >
                                                {card.description}
                                            </p>

                                        </div>
                                    );
                                })}

                            </div>


                            <div
                                className="
                                    mt-6
                                    rounded-xl
                                    border
                                    border-border
                                    bg-surface-soft
                                    p-4
                                    sm:p-5
                                "
                            >

                                <h3
                                    className="
                                        text-sm
                                        font-semibold
                                        text-text
                                    "
                                >
                                    Hourly energy profile
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-text-muted
                                    "
                                >
                                    Demand, solar, battery discharge, and grid import from this scenario.
                                </p>

                                <div className="mt-4">
                                    <LineChart
                                        series={hourlyChartSeries}
                                        unit=" kW"
                                        height={260}
                                    />
                                </div>

                            </div>


                            <div
                                className="
                                    mt-4
                                    rounded-xl
                                    border
                                    border-border
                                    bg-surface-soft
                                    p-4
                                    sm:p-5
                                "
                            >

                                <h3
                                    className="
                                        text-sm
                                        font-semibold
                                        text-text
                                    "
                                >
                                    Battery state of charge
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-text-muted
                                    "
                                >
                                    Hourly battery SOC for the planned dispatch window.
                                </p>

                                <div className="mt-4">
                                    <LineChart
                                        series={batterySocSeries}
                                        unit="%"
                                        height={200}
                                    />
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            )}

        </div>
    );
}
