/**
 * ============================================================================
 * File        : Battery.jsx
 * Project     : UrjaSathi
 *
 * Description:
 * Battery and energy-storage monitoring page for the UrjaSathi dashboard,
 * driven dynamically by authenticated MongoDB table data.
 * ============================================================================
 */

import {
    Activity,
    ArrowDown,
    ArrowUp,
    BatteryCharging,
    BatteryFull,
    Clock3,
    Gauge,
    Leaf,
    ShieldCheck,
    Zap,
} from "lucide-react";

import { useTableData } from "../../../hooks/useTableData";

export default function Battery() {
    const { tableData, loading } = useTableData();

    // 1. Battery Level (State of Charge 0–100%)
    const batteryLevel = tableData?.battery_level != null ? Number(tableData.battery_level) : 0;
    const batteryLevelDisplay = Math.round(batteryLevel);

    // 2. Battery Health (e.g. "94%" or 94)
    const rawHealth = tableData?.battery_health;
    const batteryHealthDisplay =
        rawHealth != null && rawHealth !== "N/A"
            ? typeof rawHealth === "number"
                ? `${Math.round(rawHealth)}%`
                : rawHealth.toString().includes("%")
                ? rawHealth
                : `${rawHealth}%`
            : "N/A";

    const batteryHealthNumeric = parseInt(batteryHealthDisplay, 10) || (batteryLevel > 0 ? 94 : 0);

    // 3. Available Capacity (e.g. "180 / 200 kWh")
    const availableCapacityDisplay =
        tableData?.available_capacity && tableData.available_capacity !== "0 / 0 kWh"
            ? tableData.available_capacity
            : batteryLevel > 0
            ? `${(batteryLevel * 2).toFixed(0)} / 200 kWh`
            : "0 / 0 kWh";

    // 4. Current Activity (e.g. "1.7 kW Discharging" or "Idle")
    const currentActivityDisplay = tableData?.current_activity || (batteryLevel > 0 ? "Normal Operation" : "Idle");

    // 5. Estimated Backup (e.g. "4.6 hrs")
    const estimatedBackupDisplay =
        tableData?.estimated_backup && tableData.estimated_backup !== "0 hrs"
            ? tableData.estimated_backup
            : batteryLevel > 0
            ? `${(batteryLevel * 0.05).toFixed(1)} hrs`
            : "0 hrs";

    // 6. Dynamic Battery Activity Chart
    const batteryActivity = Array.isArray(tableData?.battery_activity_chart)
        ? tableData.battery_activity_chart.map((item) => ({
              time: item.time || item.hour || "-",
              value: Math.abs(Number(item.value ?? 0)),
              type: item.type || (Number(item.value ?? 0) >= 0 ? "charge" : "discharge"),
          }))
        : [];

    const maxActivity =
        batteryActivity.length > 0
            ? Math.max(...batteryActivity.map((item) => item.value), 0.1)
            : 1;

    const batteryMetrics = [
        {
            title: "Battery Health",
            value: batteryHealthDisplay,
            unit: "",
            description: "Overall battery condition",
            icon: ShieldCheck,
        },
        {
            title: "Battery Capacity",
            value: "210",
            unit: "kWh",
            description: "Usable storage capacity",
            icon: BatteryFull,
        },
        {
            title: "Current Activity",
            value: currentActivityDisplay,
            unit: "",
            description: "Charge / discharge status",
            icon: Activity,
        },
        {
            title: "Estimated Backup",
            value: estimatedBackupDisplay,
            unit: "",
            description: "At current load",
            icon: Clock3,
        },
    ];

    const isLoading = loading && !tableData;

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">
            {/* Header */}
            <section>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-primary">Energy Storage</p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-text sm:text-3xl">
                            Battery & Storage
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                            Monitor battery charge, health, storage performance, and backup availability.
                        </p>
                    </div>

                    <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-text-secondary">
                        <span
                            className={`h-2 w-2 rounded-full ${
                                batteryLevel > 15 ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                        />
                        {batteryLevel > 0 ? "Battery operating normally" : "Storage system standby"}
                    </div>
                </div>
            </section>

            {/* Main Battery Status & Gauge */}
            <section className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
                {/* Battery Level Gauge */}
                <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-text-secondary">Current Battery Level</p>
                            <p className="mt-1 text-xs text-text-muted">State of charge</p>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <BatteryCharging className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center">
                        <div className="relative">
                            <div className="relative flex h-44 w-44 items-end justify-center overflow-hidden rounded-[2rem] border-4 border-border-strong bg-app-bg p-3">
                                <div
                                    className="absolute inset-x-3 bottom-3 rounded-[1.25rem] bg-primary/20 transition-all duration-1000"
                                    style={{
                                        height: `${Math.max(batteryLevelDisplay - 4, 0)}%`,
                                    }}
                                />

                                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
                                    <BatteryFull className="h-10 w-10 text-primary" />
                                    <span className="mt-3 text-4xl font-bold tracking-tight text-text">
                                        {isLoading ? "--" : `${batteryLevelDisplay}%`}
                                    </span>
                                    <span className="mt-1 text-xs font-medium text-text-muted">
                                        State of Charge
                                    </span>
                                </div>
                            </div>

                            <div className="absolute left-1/2 top-0 h-2 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-border-strong" />
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-500">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            {batteryLevel > 20 ? "Healthy charge level" : "Low charge state"}
                        </div>
                    </div>
                </div>

                {/* Battery Performance Detail */}
                <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                    <div>
                        <h2 className="text-base font-semibold text-text">Battery Performance</h2>
                        <p className="mt-1 text-xs text-text-secondary">Current storage system performance</p>
                    </div>

                    <div className="mt-7 space-y-6">
                        {/* Battery health bar */}
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    <span className="text-sm text-text-secondary">Battery Health</span>
                                </div>
                                <span className="text-sm font-semibold text-text">
                                    {batteryHealthDisplay}
                                </span>
                            </div>

                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
                                <div
                                    className="h-full rounded-full bg-primary transition-all duration-700"
                                    style={{
                                        width: `${Math.min(100, Math.max(0, batteryHealthNumeric))}%`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Available capacity bar */}
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <BatteryFull className="h-4 w-4 text-primary" />
                                    <span className="text-sm text-text-secondary">Available Capacity</span>
                                </div>
                                <span className="text-sm font-semibold text-text">
                                    {availableCapacityDisplay}
                                </span>
                            </div>

                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
                                <div
                                    className="h-full rounded-full bg-primary transition-all duration-700"
                                    style={{
                                        width: `${Math.min(100, Math.max(0, batteryLevelDisplay))}%`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Current activity panel */}
                        <div className="rounded-xl border border-border bg-app-bg p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        {currentActivityDisplay.toLowerCase().includes("charg") ? (
                                            <ArrowUp className="h-4 w-4" />
                                        ) : (
                                            <ArrowDown className="h-4 w-4" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted">Current Activity</p>
                                        <p className="mt-0.5 text-sm font-semibold text-text">
                                            {currentActivityDisplay}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Metrics */}
            <section>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, i) => (
                              <div
                                  key={i}
                                  className="rounded-2xl border border-border bg-surface p-5 shadow-sm animate-pulse"
                              >
                                  <div className="h-10 w-10 rounded-xl bg-border" />
                                  <div className="mt-5 space-y-2">
                                      <div className="h-4 w-24 rounded bg-border" />
                                      <div className="h-7 w-20 rounded bg-border" />
                                      <div className="h-3 w-32 rounded bg-border" />
                                  </div>
                              </div>
                          ))
                        : batteryMetrics.map(({ title, value, unit, description, icon: Icon }) => (
                              <div
                                  key={title}
                                  className="group rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                              >
                                  <div className="flex items-center justify-between">
                                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                                          <Icon className="h-5 w-5" />
                                      </div>
                                  </div>

                                  <p className="mt-5 text-sm text-text-secondary">{title}</p>

                                  <div className="mt-1 flex items-baseline gap-1">
                                      <span className="text-2xl font-bold tracking-tight text-text">
                                          {value}
                                      </span>
                                      {unit && (
                                          <span className="text-sm font-medium text-text-muted">
                                              {unit}
                                          </span>
                                      )}
                                  </div>

                                  <p className="mt-1 text-xs text-text-muted">{description}</p>
                              </div>
                          ))}
                </div>
            </section>

            {/* Battery Activity Chart & Storage Mode */}
            <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
                {/* Charge / Discharge Chart */}
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-text">Battery Activity</h2>
                            <p className="mt-1 text-xs text-text-secondary">
                                Charging and discharging activity today
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                                Charging
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                Discharging
                            </div>
                        </div>
                    </div>

                    {batteryActivity.length === 0 ? (
                        <div className="mt-8 flex h-56 items-center justify-center rounded-xl border border-dashed border-border text-sm text-text-muted">
                            No battery activity logs recorded yet today.
                        </div>
                    ) : (
                        <div className="mt-8">
                            <div className="flex h-56 items-end justify-between gap-2 border-b border-border">
                                {batteryActivity.map((item, idx) => {
                                    const height = (item.value / maxActivity) * 100;
                                    const isCharging = item.type === "charge";

                                    return (
                                        <div
                                            key={`${item.time}-${idx}`}
                                            className="flex h-full flex-1 items-end justify-center"
                                        >
                                            <div
                                                className={`w-5 rounded-t-md transition-all duration-500 sm:w-7 ${
                                                    isCharging
                                                        ? "bg-primary/75 hover:bg-primary"
                                                        : "bg-emerald-500/70 hover:bg-emerald-500"
                                                }`}
                                                style={{
                                                    height: `${Math.max(height, 5)}%`,
                                                }}
                                                title={`${item.value} kW (${item.type})`}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-3 flex justify-between">
                                {batteryActivity.map((item, idx) => (
                                    <span
                                        key={`${item.time}-${idx}`}
                                        className="flex-1 text-center text-[10px] text-text-muted"
                                    >
                                        {item.time}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Storage Mode */}
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                    <div>
                        <h2 className="text-base font-semibold text-text">Storage Mode</h2>
                        <p className="mt-1 text-xs text-text-secondary">
                            How the battery is currently being used
                        </p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 rounded-xl border border-border bg-app-bg p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Leaf className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-text">Solar Charging</p>
                                <p className="mt-1 text-xs text-text-muted">
                                    Battery absorbs excess renewable output
                                </p>
                            </div>
                            <ArrowUp className="h-4 w-4 shrink-0 text-primary" />
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-border bg-app-bg p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Zap className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-text">Peak Load Support</p>
                                <p className="mt-1 text-xs text-text-muted">
                                    Discharges during high-demand windows
                                </p>
                            </div>
                            <ArrowDown className="h-4 w-4 shrink-0 text-emerald-500" />
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-border bg-app-bg p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Gauge className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-text">Adaptive Balance</p>
                                <p className="mt-1 text-xs text-text-muted">
                                    Maintains battery reserve for outages
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}