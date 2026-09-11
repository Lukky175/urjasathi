export default function BarChart({ data, unit = "", height = 256 }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-64 items-center justify-center text-sm text-text-muted">
                No data available
            </div>
        );
    }

    const maxValue = Math.max(...data.map((item) => item.value), 0.0001);

    return (
        <div className="mt-8 flex items-end gap-2 sm:gap-4" style={{ height: `${height}px` }}>
            {data.map((item, index) => {
                const barHeight = (item.value / maxValue) * 100;
                const isPeak = item.value === maxValue;

                return (
                    <div
                        key={`${item.label}-${index}`}
                        className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                        <div className="flex h-full w-full items-end">
                            <div
                                title={`${item.value.toFixed(1)}${unit}`}
                                className={`
                                    group relative w-full rounded-t-lg
                                    transition-all duration-500 hover:opacity-80
                                    ${isPeak ? "bg-primary" : "bg-primary/20"}
                                `}
                                style={{ height: `${barHeight}%` }}
                            >
                                <div
                                    className="
                                        absolute -top-8 left-1/2 hidden -translate-x-1/2
                                        whitespace-nowrap rounded-md bg-text px-2 py-1
                                        text-[10px] text-surface group-hover:block
                                    "
                                >
                                    {item.value.toFixed(1)}{unit}
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-text-muted">{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
}