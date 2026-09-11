export default function LineChart({ series, unit = "", height = 240 }) {
    if (!series || series.length === 0 || series[0].data.length === 0) {
        return (
            <div className="flex h-60 items-center justify-center text-sm text-text-muted">
                No data available
            </div>
        );
    }

    const width = 600;
    const paddingX = 12;
    const paddingY = 16;
    const labels = series[0].data.map((point) => point.label);
    const pointCount = labels.length;

    const allValues = series.flatMap((s) => s.data.map((point) => point.value));
    const maxValue = Math.max(...allValues, 0.0001);
    const minValue = Math.min(0, ...allValues);
    const valueRange = maxValue - minValue || 1;

    const xStep = pointCount > 1 ? (width - paddingX * 2) / (pointCount - 1) : 0;

    const toPoints = (data) =>
        data
            .map((point, index) => {
                const x = paddingX + index * xStep;
                const y =
                    height -
                    paddingY -
                    ((point.value - minValue) / valueRange) * (height - paddingY * 2);
                return `${x},${y}`;
            })
            .join(" ");

    const labelEvery = Math.max(1, Math.ceil(pointCount / 6));

    return (
        <div>
            <div className="flex flex-wrap items-center gap-4">
                {series.map((s) => (
                    <div key={s.name} className="flex items-center gap-2 text-xs text-text-secondary">
                        <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: s.color }}
                        />
                        {s.name}
                    </div>
                ))}
            </div>

            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="mt-4 w-full"
                preserveAspectRatio="none"
                style={{ height: `${height}px` }}
            >
                <line
                    x1={paddingX}
                    y1={height - paddingY}
                    x2={width - paddingX}
                    y2={height - paddingY}
                    stroke="currentColor"
                    className="text-border"
                    strokeWidth="1"
                />

                {series.map((s) => (
                    <polyline
                        key={s.name}
                        points={toPoints(s.data)}
                        fill="none"
                        stroke={s.color}
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                ))}
            </svg>

            <div className="mt-2 flex justify-between text-[10px] text-text-muted">
                {labels
                    .filter((_, index) => index % labelEvery === 0)
                    .map((label, index) => (
                        <span key={`${label}-${index}`}>{label}</span>
                    ))}
            </div>
        </div>
    );
}