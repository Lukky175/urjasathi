/**
 * ============================================================================
 * File        : Recommendations.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Energy recommendations and optimization page.
 *
 * Features:
 * - Personalized energy recommendations
 * - Priority-based recommendations
 * - Estimated savings
 * - Energy optimization opportunities
 * - Recommendation categories
 * - Recommendation history
 *
 * Uses UrjaSathi design tokens through Tailwind utility classes.
 * ============================================================================
 */

import {
    Lightbulb,
    SunMedium,
    BatteryCharging,
    Zap,
    IndianRupee,
    Clock3,
    ArrowRight,
    Check,
    X,
    Sparkles,
    TrendingDown,
    Leaf,
    ChevronRight,
} from "lucide-react";


export default function Recommendations() {

    /**
     * =========================================================================
     * RECOMMENDATIONS
     * =========================================================================
     *
     * These are currently mock recommendations.
     *
     * Later these values can come from the recommendation / ML backend.
     */

    const recommendations = [
        {
            id: 1,
            title: "Shift high-power usage to solar hours",
            description:
                "Your highest electricity consumption occurs between 7 PM and 10 PM. Consider running high-power appliances between 11 AM and 3 PM when solar generation is strongest.",
            category: "Consumption",
            priority: "High",
            priorityClass:
                "bg-action/10 text-action border-action/20",
            icon: Zap,
            iconClass: "text-action",
            iconBg: "bg-action/10",
            savings: "₹420",
            savingsLabel: "potential monthly savings",
            impact: "12%",
            impactLabel: "lower grid usage",
        },
        {
            id: 2,
            title: "Optimize battery charging",
            description:
                "Your battery reaches full charge earlier than necessary on several days. Adjusting the charging schedule can improve battery utilization and reduce unnecessary grid charging.",
            category: "Battery",
            priority: "Medium",
            priorityClass:
                "bg-secondary/10 text-secondary border-secondary/20",
            icon: BatteryCharging,
            iconClass: "text-secondary",
            iconBg: "bg-secondary/10",
            savings: "₹280",
            savingsLabel: "potential monthly savings",
            impact: "8%",
            impactLabel: "better utilization",
        },
        {
            id: 3,
            title: "Increase daytime solar utilization",
            description:
                "A portion of your solar generation is currently exported or unused. Running selected appliances during peak generation hours can increase your self-consumption.",
            category: "Solar",
            priority: "Medium",
            priorityClass:
                "bg-solar/10 text-solar border-solar/20",
            icon: SunMedium,
            iconClass: "text-solar",
            iconBg: "bg-solar/10",
            savings: "₹350",
            savingsLabel: "potential monthly savings",
            impact: "15%",
            impactLabel: "higher self-consumption",
        },
    ];


    /**
     * =========================================================================
     * QUICK OPTIMIZATION STATS
     * =========================================================================
     */

    const optimizationStats = [
        {
            label: "Potential Savings",
            value: "₹1,050",
            suffix: "/month",
            icon: IndianRupee,
            iconClass: "text-success",
            iconBg: "bg-success/10",
        },
        {
            label: "Energy Reduction",
            value: "12.8",
            suffix: "%",
            icon: TrendingDown,
            iconClass: "text-secondary",
            iconBg: "bg-secondary/10",
        },
        {
            label: "CO₂ Reduction",
            value: "38.4",
            suffix: " kg/month",
            icon: Leaf,
            iconClass: "text-success",
            iconBg: "bg-success/10",
        },
    ];


    /**
     * =========================================================================
     * CATEGORIES
     * =========================================================================
     */

    const categories = [
        {
            label: "All",
            count: 3,
            active: true,
        },
        {
            label: "Consumption",
            count: 1,
        },
        {
            label: "Solar",
            count: 1,
        },
        {
            label: "Battery",
            count: 1,
        },
    ];


    /**
     * =========================================================================
     * RENDER
     * =========================================================================
     */

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">


            {/* =================================================================
                PAGE HEADER
               ================================================================= */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-primary/10
                            text-primary
                        "
                    >
                        <Lightbulb className="h-5 w-5" />
                    </div>

                    <div>

                        <div className="flex items-center gap-2">

                            <h1
                                className="
                                    text-2xl
                                    font-bold
                                    tracking-tight
                                    text-text
                                    sm:text-3xl
                                "
                            >
                                Recommendations
                            </h1>

                            <Sparkles
                                className="
                                    hidden
                                    h-5
                                    w-5
                                    text-action
                                    sm:block
                                "
                            />

                        </div>

                        <p className="mt-1 text-sm text-text-secondary">
                            Personalized suggestions to optimize your energy usage.
                        </p>

                    </div>

                </div>

            </div>


            {/* =================================================================
                AI INSIGHT BANNER
               ================================================================= */}

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-primary/20
                    bg-gradient-to-r
                    from-primary/10
                    via-primary/5
                    to-secondary/10
                    p-5
                    sm:p-6
                "
            >

                {/* Decorative element */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-10
                        -top-10
                        h-32
                        w-32
                        rounded-full
                        bg-primary/10
                        blur-2xl
                    "
                />


                <div
                    className="
                        relative
                        flex
                        flex-col
                        gap-5
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div className="flex items-start gap-3">

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary
                                text-white
                                shadow-lg
                            "
                        >
                            <Sparkles className="h-5 w-5" />
                        </div>

                        <div>

                            <div className="flex items-center gap-2">

                                <h2
                                    className="
                                        font-semibold
                                        text-text
                                    "
                                >
                                    Your energy profile has been analyzed
                                </h2>

                            </div>

                            <p
                                className="
                                    mt-1
                                    max-w-2xl
                                    text-sm
                                    leading-6
                                    text-text-secondary
                                "
                            >
                                We found several opportunities that could
                                reduce your electricity costs while improving
                                renewable energy utilization.
                            </p>

                        </div>

                    </div>


                    <div
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-border
                            bg-surface/80
                            px-3
                            py-2
                            text-xs
                            font-medium
                            text-text-secondary
                            backdrop-blur-sm
                        "
                    >
                        <Clock3 className="h-3.5 w-3.5 text-primary" />

                        Updated 10 min ago

                    </div>

                </div>

            </div>


            {/* =================================================================
                OPTIMIZATION STATS
               ================================================================= */}

            <div
                className="
                    grid
                    gap-4
                    sm:grid-cols-3
                "
            >

                {optimizationStats.map((stat) => {

                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="
                                rounded-2xl
                                border
                                border-border
                                bg-surface
                                p-5
                                shadow-[var(--shadow-card-value)]
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-[var(--shadow-hover-value)]
                            "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className={`
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        ${stat.iconBg}
                                        ${stat.iconClass}
                                    `}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div>

                                    <p className="text-xs text-text-muted">
                                        {stat.label}
                                    </p>

                                    <div className="mt-1">

                                        <span
                                            className="
                                                text-xl
                                                font-bold
                                                text-text
                                            "
                                        >
                                            {stat.value}
                                        </span>

                                        <span
                                            className="
                                                ml-1
                                                text-xs
                                                text-text-muted
                                            "
                                        >
                                            {stat.suffix}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>
                    );

                })}

            </div>


            {/* =================================================================
                RECOMMENDATIONS SECTION
               ================================================================= */}

            <div>

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div>

                        <h2
                            className="
                                text-xl
                                font-semibold
                                text-text
                            "
                        >
                            Recommended Actions
                        </h2>

                        <p className="mt-1 text-sm text-text-muted">
                            Actions that can improve your energy efficiency.
                        </p>

                    </div>


                    {/* Category filters */}

                    <div
                        className="
                            flex
                            w-full
                            gap-1
                            overflow-x-auto
                            rounded-xl
                            border
                            border-border
                            bg-surface
                            p-1
                            sm:w-fit
                        "
                    >

                        {categories.map((category) => (

                            <button
                                key={category.label}
                                type="button"
                                className={`
                                    flex
                                    shrink-0
                                    items-center
                                    gap-1.5
                                    rounded-lg
                                    px-3
                                    py-2
                                    text-xs
                                    font-medium
                                    transition-all
                                    duration-200

                                    ${
                                        category.active
                                            ? "bg-primary text-white shadow-sm"
                                            : "text-text-secondary hover:bg-surface-soft hover:text-primary"
                                    }
                                `}
                            >

                                {category.label}

                                <span
                                    className={`
                                        rounded-full
                                        px-1.5
                                        py-0.5
                                        text-[10px]
                                        ${
                                            category.active
                                                ? "bg-white/20 text-white"
                                                : "bg-surface-soft text-text-muted"
                                        }
                                    `}
                                >
                                    {category.count}
                                </span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* =============================================================
                    RECOMMENDATION CARDS
                   ============================================================= */}

                <div className="mt-5 space-y-4">

                    {recommendations.map((recommendation) => {

                        const Icon = recommendation.icon;

                        return (
                            <div
                                key={recommendation.id}
                                className="
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-border
                                    bg-surface
                                    shadow-[var(--shadow-card-value)]
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:shadow-[var(--shadow-hover-value)]
                                "
                            >

                                <div className="p-5 sm:p-6">

                                    {/* Top */}

                                    <div
                                        className="
                                            flex
                                            flex-col
                                            gap-4
                                            sm:flex-row
                                            sm:items-start
                                            sm:justify-between
                                        "
                                    >

                                        <div className="flex items-start gap-3">

                                            <div
                                                className={`
                                                    flex
                                                    h-11
                                                    w-11
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    ${recommendation.iconBg}
                                                    ${recommendation.iconClass}
                                                `}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>


                                            <div>

                                                <div
                                                    className="
                                                        flex
                                                        flex-wrap
                                                        items-center
                                                        gap-2
                                                    "
                                                >

                                                    <h3
                                                        className="
                                                            text-base
                                                            font-semibold
                                                            text-text
                                                            sm:text-lg
                                                        "
                                                    >
                                                        {recommendation.title}
                                                    </h3>

                                                    <span
                                                        className={`
                                                            rounded-full
                                                            border
                                                            px-2
                                                            py-0.5
                                                            text-[10px]
                                                            font-semibold
                                                            ${recommendation.priorityClass}
                                                        `}
                                                    >
                                                        {recommendation.priority}
                                                    </span>

                                                </div>


                                                <p
                                                    className="
                                                        mt-2
                                                        max-w-3xl
                                                        text-sm
                                                        leading-6
                                                        text-text-secondary
                                                    "
                                                >
                                                    {recommendation.description}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Category */}

                                        <span
                                            className="
                                                w-fit
                                                shrink-0
                                                rounded-lg
                                                bg-surface-soft
                                                px-2.5
                                                py-1.5
                                                text-xs
                                                font-medium
                                                text-text-muted
                                            "
                                        >
                                            {recommendation.category}
                                        </span>

                                    </div>


                                    {/* Metrics */}

                                    <div
                                        className="
                                            mt-5
                                            grid
                                            gap-3
                                            sm:grid-cols-2
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                rounded-xl
                                                bg-surface-soft
                                                p-3
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    h-8
                                                    w-8
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    bg-success/10
                                                    text-success
                                                "
                                            >
                                                <IndianRupee className="h-4 w-4" />
                                            </div>

                                            <div>

                                                <p
                                                    className="
                                                        text-xs
                                                        text-text-muted
                                                    "
                                                >
                                                    {recommendation.savingsLabel}
                                                </p>

                                                <p
                                                    className="
                                                        mt-0.5
                                                        text-sm
                                                        font-semibold
                                                        text-text
                                                    "
                                                >
                                                    {recommendation.savings}
                                                </p>

                                            </div>

                                        </div>


                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                rounded-xl
                                                bg-surface-soft
                                                p-3
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    h-8
                                                    w-8
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    bg-secondary/10
                                                    text-secondary
                                                "
                                            >
                                                <TrendingDown className="h-4 w-4" />
                                            </div>

                                            <div>

                                                <p
                                                    className="
                                                        text-xs
                                                        text-text-muted
                                                    "
                                                >
                                                    {recommendation.impactLabel}
                                                </p>

                                                <p
                                                    className="
                                                        mt-0.5
                                                        text-sm
                                                        font-semibold
                                                        text-text
                                                    "
                                                >
                                                    {recommendation.impact}
                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* Actions */}

                                    <div
                                        className="
                                            mt-5
                                            flex
                                            flex-col
                                            gap-2
                                            border-t
                                            border-border
                                            pt-4
                                            sm:flex-row
                                            sm:items-center
                                            sm:justify-between
                                        "
                                    >

                                        <button
                                            type="button"
                                            className="
                                                inline-flex
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-xl
                                                bg-primary
                                                px-4
                                                py-2.5
                                                text-sm
                                                font-semibold
                                                text-white
                                                shadow-sm
                                                transition-all
                                                duration-200
                                                hover:-translate-y-0.5
                                                hover:bg-primary-dark
                                                hover:shadow-md
                                                focus-visible:outline-2
                                                focus-visible:outline-offset-2
                                                focus-visible:outline-focus
                                            "
                                        >
                                            Apply recommendation

                                            <ArrowRight className="h-4 w-4" />

                                        </button>


                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-1
                                            "
                                        >

                                            <button
                                                type="button"
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-1.5
                                                    rounded-lg
                                                    px-3
                                                    py-2
                                                    text-xs
                                                    font-medium
                                                    text-text-muted
                                                    transition-colors
                                                    hover:bg-surface-soft
                                                    hover:text-text
                                                "
                                            >
                                                <Check className="h-3.5 w-3.5" />
                                                Done
                                            </button>


                                            <button
                                                type="button"
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-1.5
                                                    rounded-lg
                                                    px-3
                                                    py-2
                                                    text-xs
                                                    font-medium
                                                    text-text-muted
                                                    transition-colors
                                                    hover:bg-surface-soft
                                                    hover:text-text
                                                "
                                            >
                                                <X className="h-3.5 w-3.5" />
                                                Dismiss
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        );

                    })}

                </div>

            </div>


            {/* =================================================================
                ENERGY OPTIMIZATION TIP
               ================================================================= */}

            <div
                className="
                    rounded-2xl
                    border
                    border-secondary/20
                    bg-secondary/5
                    p-5
                    sm:p-6
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                    "
                >

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-secondary/10
                            text-secondary
                        "
                    >
                        <Leaf className="h-5 w-5" />
                    </div>


                    <div className="flex-1">

                        <h3
                            className="
                                font-semibold
                                text-text
                            "
                        >
                            Small changes can make a big difference
                        </h3>

                        <p
                            className="
                                mt-1
                                text-sm
                                leading-6
                                text-text-secondary
                            "
                        >
                            Following your recommendations could save
                            approximately ₹12,600 annually while reducing
                            your household's carbon footprint.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="
                            inline-flex
                            shrink-0
                            items-center
                            gap-1.5
                            rounded-lg
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-secondary
                            transition-all
                            duration-200
                            hover:bg-secondary/10
                        "
                    >
                        Learn more
                        <ChevronRight className="h-4 w-4" />
                    </button>

                </div>

            </div>

        </div>
    );
}