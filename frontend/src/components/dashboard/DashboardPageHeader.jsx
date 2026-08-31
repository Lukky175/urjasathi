/**
 * ============================================================================
 * File        : DashboardPageHeader.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Reusable header component for dashboard pages.
 *
 * Provides:
 * - Page title
 * - Page description
 * - Optional action area
 * ============================================================================
 */

export default function DashboardPageHeader({
    title,
    description,
    action = null,
}) {
    return (
        <div
            className="
                mb-8
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-end
                sm:justify-between
            "
        >

            {/* =============================================================
                TITLE AREA
               ============================================================= */}

            <div>

                <h1
                    className="
                        text-2xl
                        font-bold
                        tracking-tight
                        text-text
                        sm:text-3xl
                    "
                >
                    {title}
                </h1>

                {description && (
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
                        {description}
                    </p>
                )}

            </div>


            {/* =============================================================
                OPTIONAL ACTION
               ============================================================= */}

            {action && (
                <div className="shrink-0">
                    {action}
                </div>
            )}

        </div>
    );
}