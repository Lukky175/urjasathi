/**
 * ============================================================================
 * File        : UrjaPlanner.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Personalized energy planning and scenario analysis page.
 *
 * Urja Planner allows users to enter their own energy scenario and explore
 * potential outcomes using the UrjaSathi analysis model.
 *
 * IMPORTANT:
 * - Data entered here is ONLY for this scenario.
 * - It does not modify dashboard data.
 * - It does not affect Consumption, Generation, Cost & Savings, etc.
 * - The Analyze button will later connect to the ML/model API.
 * ============================================================================
 */

import { useState } from "react";

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
} from "lucide-react";


/**
 * ============================================================================
 * SUPPORTED LOCATIONS
 * ============================================================================
 *
 * Currently supported by the model.
 *
 * More cities can be added later when the model supports them.
 */
const SUPPORTED_CITIES = [
    "Delhi",
    "Greater Noida",
];


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


    /**
     * =========================================================================
     * HANDLE SUBMIT
     * =========================================================================
     *
     * For now this only simulates the analysis process.
     *
     * Later:
     *
     * form data
     *      ↓
     * API
     *      ↓
     * ML model
     *      ↓
     * analysis results
     */
    const handleSubmit = (event) => {

        event.preventDefault();

        if (!solarGeneration || !energyConsumption) {
            return;
        }

        setIsAnalyzing(true);

        /*
         * Temporary simulated model delay.
         *
         * This will later be replaced with an API call such as:
         *
         * const response = await fetch("/api/urja-planner", {
         *     method: "POST",
         *     body: JSON.stringify({
         *         city,
         *         solarGeneration,
         *         energyConsumption,
         *     }),
         * });
         */

        setTimeout(() => {
            setIsAnalyzing(false);
            setHasAnalyzed(true);
        }, 1200);
    };


    /**
     * =========================================================================
     * RESET SCENARIO
     * =========================================================================
     */

    const handleReset = () => {

        setCity("Delhi");

        setSolarGeneration("");

        setEnergyConsumption("");

        setHasAnalyzed(false);

        setIsAnalyzing(false);
    };


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
                            Results will be generated using the UrjaSathi
                            energy analysis model. The available insights
                            may vary depending on the selected location
                            and model capabilities.
                        </p>

                    </div>

                </aside>

            </div>


            {/* =================================================================
                RESULTS PLACEHOLDER
               =================================================================
               
               This section intentionally remains on the same page.
               
               When the ML model is connected, this area will display the
               returned metrics and charts without changing the rest of
               the dashboard.
               ================================================================= */}

            {hasAnalyzed && (

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
                                        Personalized analysis for {city}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Temporary result cards */}

                        <div className="p-5 sm:p-7">

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


                                {/* =================================================
                                    GENERATION
                                   ================================================= */}

                                <div
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
                                            Solar Generation
                                        </span>

                                        <SunMedium
                                            className="
                                                h-4
                                                w-4
                                                text-[var(--solar)]
                                            "
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
                                        —
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            text-text-muted
                                        "
                                    >
                                        Model output
                                    </p>

                                </div>


                                {/* =================================================
                                    SAVINGS
                                   ================================================= */}

                                <div
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
                                            Cost Savings
                                        </span>

                                        <IndianRupee
                                            className="
                                                h-4
                                                w-4
                                                text-secondary
                                            "
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
                                        —
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            text-text-muted
                                        "
                                    >
                                        Model output
                                    </p>

                                </div>


                                {/* =================================================
                                    GRID DEPENDENCY
                                   ================================================= */}

                                <div
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
                                            Grid Dependency
                                        </span>

                                        <Zap
                                            className="
                                                h-4
                                                w-4
                                                text-primary
                                            "
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
                                        —
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            text-text-muted
                                        "
                                    >
                                        Model output
                                    </p>

                                </div>


                                {/* =================================================
                                    ENERGY IMPACT
                                   ================================================= */}

                                <div
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
                                            Energy Impact
                                        </span>

                                        <Activity
                                            className="
                                                h-4
                                                w-4
                                                text-secondary
                                            "
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
                                        —
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            text-text-muted
                                        "
                                    >
                                        Model output
                                    </p>

                                </div>

                            </div>


                            {/* =====================================================
                                CHART PLACEHOLDER
                               ===================================================== */}

                            <div
                                className="
                                    mt-6
                                    flex
                                    min-h-[280px]
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-dashed
                                    border-border-strong
                                    bg-surface-soft
                                "
                            >

                                <div className="text-center">

                                    <div
                                        className="
                                            mx-auto
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-primary/10
                                            text-primary
                                        "
                                    >
                                        <TrendingUp className="h-6 w-6" />
                                    </div>

                                    <h3
                                        className="
                                            mt-4
                                            text-sm
                                            font-semibold
                                            text-text
                                        "
                                    >
                                        Analysis Visualization
                                    </h3>

                                    <p
                                        className="
                                            mx-auto
                                            mt-1
                                            max-w-md
                                            text-xs
                                            leading-5
                                            text-text-muted
                                        "
                                    >
                                        Model-generated charts and detailed
                                        energy insights will appear here once
                                        the UrjaSathi analysis API is connected.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            )}

        </div>
    );
}