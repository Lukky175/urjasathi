import { ArrowRight, BatteryCharging, Brain, Leaf, Sun, Zap } from "lucide-react";

function Home() {
  return (
    <div className="bg-app-bg text-text">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-bright">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-emerald/20 blur-3xl" />

        <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8">
          {/* Hero Content */}
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald" />

              <span className="text-sm font-medium text-white/90">
                Smarter Energy. Sustainable Future.
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your intelligent
              <span className="block text-emerald">
                energy companion.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              UrjaSathi helps you understand energy consumption, predict
              renewable generation, optimize battery usage, and make smarter
              energy decisions for your building.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/login"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-action px-6 text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-action-dark"
              >
                Start Managing Energy
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:bg-white/15"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-6">
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="mt-1 text-xs text-white/60">
                  Energy Insights
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">AI</p>
                <p className="mt-1 text-xs text-white/60">
                  Smart Predictions
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">
                  Renewable
                </p>
                <p className="mt-1 text-xs text-white/60">
                  First Approach
                </p>
              </div>
            </div>
          </div>

          {/* Energy Dashboard Preview */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-0 rounded-[2rem] bg-emerald/20 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                    Energy Overview
                  </p>

                  <p className="mt-1 text-xl font-semibold text-white">
                    Today
                  </p>
                </div>

                <div className="rounded-xl bg-emerald/15 px-3 py-1.5 text-xs font-medium text-emerald">
                  Optimized
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-white/50">
                      Net Energy
                    </p>

                    <p className="mt-1 text-3xl font-bold text-white">
                      +8.4
                      <span className="ml-1 text-base font-medium text-white/50">
                        kWh
                      </span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-white/50">
                      Solar
                    </p>

                    <p className="mt-1 text-lg font-semibold text-emerald">
                      14.8 kWh
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex h-28 items-end gap-2">
                  {[35, 48, 42, 65, 58, 78, 68, 92, 76, 88, 70, 96].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-md bg-emerald/60 transition duration-300 hover:bg-emerald"
                        style={{ height: `${height}%` }}
                      />
                    ),
                  )}
                </div>

                <div className="mt-3 flex justify-between text-[10px] text-white/40">
                  <span>6 AM</span>
                  <span>12 PM</span>
                  <span>6 PM</span>
                  <span>Now</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/45">
                    Consumption
                  </p>

                  <p className="mt-1 text-lg font-semibold text-white">
                    6.4 kWh
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/45">
                    Grid Export
                  </p>

                  <p className="mt-1 text-lg font-semibold text-emerald">
                    8.4 kWh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-app-bg py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              How UrjaSathi Works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
              One platform for your complete energy cycle
            </h2>

            <p className="mt-4 text-base leading-7 text-text-secondary">
              From understanding consumption to predicting renewable
              generation, UrjaSathi brings your energy data together in one
              intelligent platform.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={Brain}
              number="01"
              title="Predict Consumption"
              description="Understand how much electricity your building is likely to consume using intelligent demand forecasting."
            />

            <FeatureCard
              icon={Sun}
              number="02"
              title="Predict Solar Generation"
              description="Estimate renewable energy generation and understand when your solar system can produce the most power."
            />

            <FeatureCard
              icon={BatteryCharging}
              number="03"
              title="Optimize Energy"
              description="Make smarter decisions about consumption, batteries, and grid export to improve energy efficiency."
            />
          </div>
        </div>
      </section>

      {/* Energy Intelligence */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Energy Intelligence
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
                Turn energy data into better decisions.
              </h2>

              <p className="mt-5 text-base leading-7 text-text-secondary">
                UrjaSathi combines consumption patterns, solar generation,
                battery status, and grid interaction to give you a clearer
                picture of how energy flows through your building.
              </p>

              <div className="mt-8 space-y-5">
                <Benefit
                  icon={Zap}
                  title="Understand consumption"
                  description="See where and when your electricity is being used."
                />

                <Benefit
                  icon={Sun}
                  title="Use renewable energy intelligently"
                  description="Know when solar generation can meet your energy demand."
                />

                <Benefit
                  icon={Leaf}
                  title="Build a more sustainable future"
                  description="Reduce unnecessary consumption and make better use of renewable energy."
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-app-bg p-6 shadow-card sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">
                    Energy Flow
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-text">
                    Today's Overview
                  </h3>
                </div>

                <div className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                  Efficient
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <EnergyRow
                  label="Solar Generation"
                  value="14.8 kWh"
                  percentage="82%"
                  color="bg-solar"
                />

                <EnergyRow
                  label="Consumption"
                  value="6.4 kWh"
                  percentage="46%"
                  color="bg-consumption"
                />

                <EnergyRow
                  label="Battery"
                  value="78%"
                  percentage="78%"
                  color="bg-battery"
                />

                <EnergyRow
                  label="Grid Export"
                  value="8.4 kWh"
                  percentage="58%"
                  color="bg-primary"
                />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-primary-tint p-4">
                  <p className="text-xs text-text-muted">
                    Renewable Share
                  </p>

                  <p className="mt-1 text-2xl font-bold text-primary">
                    82%
                  </p>
                </div>

                <div className="rounded-xl bg-secondary-tint p-4">
                  <p className="text-xs text-text-muted">
                    Energy Saved
                  </p>

                  <p className="mt-1 text-2xl font-bold text-secondary">
                    18%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-dark py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Make every unit of energy count.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
            Start understanding your energy today and take a smarter step
            towards efficient and sustainable energy management.
          </p>

          <a
            href="/login"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-action px-7 text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-action-dark"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  number,
  title,
  description,
}) {
  return (
    <div className="group rounded-card border border-border bg-surface p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-tint text-primary">
          <Icon className="h-5 w-5" />
        </div>

        <span className="text-sm font-bold text-primary">
          {number}
        </span>
      </div>

      <h3 className="mt-6 text-lg font-semibold text-text">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-text-secondary">
        {description}
      </p>
    </div>
  );
}

function Benefit({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-tint text-secondary">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h3 className="font-semibold text-text">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-text-secondary">
          {description}
        </p>
      </div>
    </div>
  );
}

function EnergyRow({
  label,
  value,
  percentage,
  color,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-text">
          {label}
        </span>

        <span className="text-sm font-semibold text-text">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-surface-3">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: percentage }}
        />
      </div>
    </div>
  );
}

export default Home;