const stats = [
  {
    value: "24/7",
    label: "Energy visibility",
    description: "Understand where your energy goes.",
  },
  {
    value: "12%",
    label: "Average savings",
    description: "Identify opportunities to reduce waste.",
  },
  {
    value: "3×",
    label: "Smarter decisions",
    description: "Turn energy data into useful actions.",
  },
  {
    value: "100%",
    label: "Renewable ready",
    description: "Built for a cleaner energy future.",
  },
];

export default function HomeStats() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-1 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={[
              "px-6 py-10",
              index !== 0 ? "border-t border-border sm:border-l sm:border-t-0" : "",
            ].join(" ")}
          >
            <p className="text-3xl font-semibold tracking-tight text-text">
              {stat.value}
            </p>

            <p className="mt-2 font-medium text-text">
              {stat.label}
            </p>

            <p className="mt-1 text-sm leading-6 text-text-muted">
              {stat.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}