/**
 * ============================================================================
 * File        : Cost.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Energy cost and savings page for the UrjaSathi dashboard, driven dynamically
 * by authenticated per-user MongoDB data.
 * ============================================================================
 */

import {
    ArrowDownRight,
    BatteryCharging,
    CalendarDays,
    IndianRupee,
    Lightbulb,
    PiggyBank,
    ReceiptIndianRupee,
    SunMedium,
    TrendingDown,
    Zap,
} from "lucide-react";

import { useTableData } from "../../../hooks/useTableData";

function formatCurrency(val) {
    if (val == null) return "₹0";
    if (typeof val === "string") {
        if (val.trim().startsWith("₹") || val.trim().startsWith("Rs")) {
            return val;
        }
        const num = parseFloat(val.replace(/[^0-9.-]/g, ""));
        return isNaN(num) ? val : `₹${Math.round(num).toLocaleString("en-IN")}`;
    }
    return `₹${Math.round(Number(val)).toLocaleString("en-IN")}`;
}

function parseCurrencyNumber(val) {
    if (val == null) return 0;
    if (typeof val === "number") return val;
    const num = parseFloat(String(val).replace(/[^0-9.-]/g, ""));
    return isNaN(num) ? 0 : num;
}

export default function Cost() {
    const { tableData, loading } = useTableData();

    // 1. Dynamic Financial Metrics from tableData
    const estimatedBillStr = formatCurrency(tableData?.estimated_monthly_bill);
    const estimatedBillNum = parseCurrencyNumber(tableData?.estimated_monthly_bill);

    const solarSavingsStr = formatCurrency(tableData?.solar_savings);
    const solarSavingsNum = parseCurrencyNumber(tableData?.solar_savings);

    const batterySavingsStr = formatCurrency(tableData?.battery_savings);
    const batterySavingsNum = parseCurrencyNumber(tableData?.battery_savings);

    const totalSavingsStr =
        tableData?.total_savings && tableData.total_savings !== "₹0"
            ? formatCurrency(tableData.total_savings)
            : tableData?.today_saving != null && Number(tableData.today_saving) > 0
            ? formatCurrency(tableData.today_saving)
            : formatCurrency(solarSavingsNum + batterySavingsNum);

    const totalSavingsNum = parseCurrencyNumber(totalSavingsStr);

    // 2. Dynamic Monthly/Hourly Cost Trend Chart
    let monthlyCostData = [];
    if (Array.isArray(tableData?.cost_trend_chart) && tableData.cost_trend_chart.length > 0) {
        monthlyCostData = tableData.cost_trend_chart.map((item) => ({
            month: item.month || item.label || item.time || "-",
            cost: Number(item.cost ?? item.value ?? item.bill ?? 0),
        }));
    }

    const highestCost =
        monthlyCostData.length > 0
            ? Math.max(...monthlyCostData.map((item) => item.cost), 1)
            : Math.max(estimatedBillNum, 1);

    const currentMonth =
        monthlyCostData.length > 0
            ? monthlyCostData[monthlyCostData.length - 1]
            : { month: "Current", cost: estimatedBillNum };

    const previousMonth =
        monthlyCostData.length > 1
            ? monthlyCostData[monthlyCostData.length - 2]
            : currentMonth;

    const monthlyReduction = previousMonth.cost - currentMonth.cost;
    const monthlyReductionPercentage =
        previousMonth.cost > 0 ? (monthlyReduction / previousMonth.cost) * 100 : 0;

    // 3. Dynamic Cost Breakdown
    const totalBreakdownBase = estimatedBillNum + solarSavingsNum + batterySavingsNum;
    const gridPercentage = totalBreakdownBase > 0 ? Math.round((estimatedBillNum / totalBreakdownBase) * 100) : 0;
    const solarPercentage = totalBreakdownBase > 0 ? Math.round((solarSavingsNum / totalBreakdownBase) * 100) : 0;
    const batteryPercentage = totalBreakdownBase > 0 ? Math.round((batterySavingsNum / totalBreakdownBase) * 100) : 0;

    const costBreakdown = [
        {
            label: "Grid Electricity",
            value: estimatedBillNum,
            percentage: gridPercentage,
            icon: Zap,
        },
        {
            label: "Solar Contribution",
            value: solarSavingsNum,
            percentage: solarPercentage,
            icon: SunMedium,
        },
        {
            label: "Battery Optimization",
            value: batterySavingsNum,
            percentage: batteryPercentage,
            icon: BatteryCharging,
        },
    ];

    const unoptimizedCost = estimatedBillNum + totalSavingsNum;
    const costReductionPct = unoptimizedCost > 0 ? Math.round((totalSavingsNum / unoptimizedCost) * 100) : 0;

    const stats = [
        {
            label: "Estimated Monthly Bill",
            value: estimatedBillStr,
            description: "Current month's estimated cost",
            icon: ReceiptIndianRupee,
            trend: "down",
            trendText: monthlyReductionPercentage > 0 ? `${monthlyReductionPercentage.toFixed(0)}% lower` : "Estimated",
            positive: true,
        },
        {
            label: "Total Savings",
            value: totalSavingsStr,
            description: "Savings achieved with UrjaSathi",
            icon: PiggyBank,
            trend: "up",
            trendText: "Live data",
            positive: true,
            live: true,
        },
        {
            label: "Solar Savings",
            value: solarSavingsStr,
            description: "Estimated savings from solar",
            icon: SunMedium,
            trend: "up",
            trendText: "Renewable offset",
            positive: true,
        },
        {
            label: "Battery Savings",
            value: batterySavingsStr,
            description: "Peak-hour cost avoided",
            icon: BatteryCharging,
            trend: "up",
            trendText: "Peak shifting",
            positive: true,
        },
    ];

    const isLoading = loading && !tableData;

    return (
        <div className="mx-auto w-full max-w-7xl">
            {/* Page Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-text-secondary">
                        <IndianRupee className="h-4 w-4 text-primary" />
                        <span>Financial Impact</span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
                        Cost & Savings
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                        Understand your electricity costs and see how solar generation,
                        battery storage, and smarter energy usage reduce your expenses.
                    </p>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-secondary shadow-sm">
                    <CalendarDays className="h-4 w-4" />
                    Billing Cycle
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                          <div
                              key={i}
                              className="rounded-2xl border border-border bg-surface p-5 shadow-sm animate-pulse"
                          >
                              <div className="flex items-start justify-between">
                                  <div className="h-10 w-10 rounded-xl bg-border" />
                                  <div className="h-5 w-16 rounded-full bg-border" />
                              </div>
                              <div className="mt-4 space-y-2">
                                  <div className="h-3 w-28 rounded bg-border" />
                                  <div className="h-7 w-20 rounded bg-border" />
                                  <div className="h-3 w-24 rounded bg-border" />
                              </div>
                          </div>
                      ))
                    : stats.map((stat) => {
                          const Icon = stat.icon;
                          return (
                              <div
                                  key={stat.label}
                                  className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                              >
                                  <div className="flex items-start justify-between">
                                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                          <Icon className="h-5 w-5" />
                                      </div>

                                      <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600">
                                          <ArrowDownRight className="h-3.5 w-3.5" />
                                          {stat.trendText}
                                      </div>
                                  </div>

                                  <p className="mt-5 text-sm font-medium text-text-secondary">
                                      {stat.label}
                                  </p>

                                  <p className="mt-1 text-2xl font-bold text-text">
                                      {stat.value}
                                  </p>

                                  <p className="mt-2 text-xs text-text-muted">
                                      {stat.description}
                                  </p>
                              </div>
                          );
                      })}
            </div>

            {/* Cost Overview Grid */}
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                {/* Cost Trend Chart */}
                <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-text">
                                Electricity Cost Trend
                            </h2>
                            <p className="mt-1 text-sm text-text-secondary">
                                Estimated monthly electricity expenditure
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-2xl font-bold text-text">
                                {formatCurrency(currentMonth.cost)}
                            </p>

                            {monthlyReductionPercentage > 0 && (
                                <div className="mt-1 flex items-center justify-end gap-1 text-xs font-medium text-emerald-600">
                                    <TrendingDown className="h-3.5 w-3.5" />
                                    {monthlyReductionPercentage.toFixed(0)}% vs last period
                                </div>
                            )}
                        </div>
                    </div>

                    {monthlyCostData.length === 0 ? (
                        <div className="mt-8 flex h-64 items-center justify-center rounded-xl border border-dashed border-border text-sm text-text-muted">
                            No monthly cost trend history recorded yet.
                        </div>
                    ) : (
                        <div className="mt-8 flex h-64 items-end gap-2 sm:gap-4">
                            {monthlyCostData.map((item) => {
                                const height = (item.cost / highestCost) * 100;
                                const isCurrent = item.month === currentMonth.month;

                                return (
                                    <div
                                        key={item.month}
                                        className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                                    >
                                        <div className="flex h-full w-full items-end">
                                            <div
                                                title={`₹${item.cost.toLocaleString("en-IN")}`}
                                                className={`group relative w-full rounded-t-lg transition-all duration-500 hover:opacity-80 ${
                                                    isCurrent ? "bg-primary" : "bg-primary/20"
                                                }`}
                                                style={{
                                                    height: `${Math.max(height, 8)}%`,
                                                }}
                                            >
                                                <div className="absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-text px-2 py-1 text-[10px] text-surface group-hover:block">
                                                    {formatCurrency(item.cost)}
                                                </div>
                                            </div>
                                        </div>

                                        <span className="text-xs text-text-muted">
                                            {item.month}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Savings Summary */}
                <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                    <div>
                        <h2 className="text-lg font-semibold text-text">Savings Summary</h2>
                        <p className="mt-1 text-sm text-text-secondary">
                            How UrjaSathi is reducing your energy costs
                        </p>
                    </div>

                    <div className="mt-6">
                        <div className="flex items-center justify-between rounded-2xl bg-primary/5 p-5">
                            <div>
                                <p className="text-sm text-text-secondary">Total savings this period</p>
                                <p className="mt-1 text-3xl font-bold text-text">
                                    {totalSavingsStr}
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <PiggyBank className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-text-secondary">Cost reduction</span>
                                <span className="text-sm font-semibold text-text">
                                    {costReductionPct}%
                                </span>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary/10">
                                <div
                                    className="h-full rounded-full bg-primary transition-all duration-700"
                                    style={{ width: `${Math.min(100, Math.max(0, costReductionPct))}%` }}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                            <div>
                                <p className="text-xs text-text-muted">Without optimization</p>
                                <p className="mt-1 font-semibold text-text">
                                    {formatCurrency(unoptimizedCost)}
                                </p>
                            </div>

                            <ArrowDownRight className="h-5 w-5 text-emerald-600" />

                            <div className="text-right">
                                <p className="text-xs text-text-muted">With UrjaSathi</p>
                                <p className="mt-1 font-semibold text-primary">
                                    {estimatedBillStr}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Energy Cost Breakdown */}
            <section className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                <div>
                    <h2 className="text-lg font-semibold text-text">Energy Cost Breakdown</h2>
                    <p className="mt-1 text-sm text-text-secondary">
                        Contribution of different energy sources
                    </p>
                </div>

                <div className="mt-6 space-y-5">
                    {costBreakdown.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.label}>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon className="h-4 w-4" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="truncate text-sm font-medium text-text">
                                                {item.label}
                                            </p>
                                            <p className="shrink-0 text-sm font-semibold text-text">
                                                {formatCurrency(item.value)}
                                            </p>
                                        </div>

                                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary/10">
                                            <div
                                                className="h-full rounded-full bg-primary transition-all duration-700"
                                                style={{ width: `${Math.min(100, Math.max(0, item.percentage))}%` }}
                                            />
                                        </div>
                                    </div>

                                    <span className="hidden w-10 text-right text-xs text-text-muted sm:block">
                                        {item.percentage}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Savings Sources */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">
                {/* Solar Savings */}
                <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <SunMedium className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-text">Solar Generation Savings</h3>
                            <p className="mt-1 text-sm leading-5 text-text-secondary">
                                Solar energy directly lowers your dependence on grid electricity.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-end justify-between">
                        <div>
                            <p className="text-xs text-text-muted">Estimated savings</p>
                            <p className="mt-1 text-2xl font-bold text-text">
                                {solarSavingsStr}
                            </p>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                            <ArrowDownRight className="h-4 w-4" />
                            {totalSavingsNum > 0
                                ? `${Math.round((solarSavingsNum / totalSavingsNum) * 100)}% of total`
                                : "Active"}
                        </div>
                    </div>
                </section>

                {/* Battery Savings */}
                <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <BatteryCharging className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-text">Battery Optimization Savings</h3>
                            <p className="mt-1 text-sm leading-5 text-text-secondary">
                                Stored energy used to avoid high peak-demand tariff rates.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-end justify-between">
                        <div>
                            <p className="text-xs text-text-muted">Estimated savings</p>
                            <p className="mt-1 text-2xl font-bold text-text">
                                {batterySavingsStr}
                            </p>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                            <ArrowDownRight className="h-4 w-4" />
                            Peak tariff avoided
                        </div>
                    </div>
                </section>
            </div>

            {/* Cost Optimization Insight */}
            <section className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Lightbulb className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-text">Cost Optimization Opportunity</h2>
                        <p className="mt-1 text-sm leading-6 text-text-secondary">
                            Your energy profile benefits from discharging stored solar battery capacity
                            during evening peak tariff hours. Increasing load scheduling during daytime
                            generation hours will further minimize your monthly electricity bill.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}