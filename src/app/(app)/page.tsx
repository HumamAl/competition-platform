"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  Users,
  DollarSign,
  Star,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Info,
  CalendarDays,
} from "lucide-react";
import {
  dashboardStats,
  revenueData,
  eventCategories,
  recentActivity,
  events,
} from "@/data/mock-data";
import { formatCurrency, formatNumber, formatRelativeDate } from "@/lib/formatters";
import type { EventStatus } from "@/lib/types";

// ---- Tooltip types ----
interface TooltipEntry {
  color?: string;
  name?: string | number;
  value?: number | string | (number | string)[];
}
interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
}

// Custom tooltip for revenue/registrations chart
const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-background p-3 shadow-sm">
      <p className="text-sm font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm text-muted-foreground">
          <span
            className="inline-block w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name === "revenue"
            ? `Revenue: ${formatCurrency(Number(entry.value))}`
            : `Registrations: ${entry.value}`}
        </p>
      ))}
    </div>
  );
};

// Custom tooltip for category bar chart
const CategoryTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-background p-3 shadow-sm">
      <p className="text-sm font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm text-muted-foreground">
          <span
            className="inline-block w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name === "count"
            ? `Events: ${entry.value}`
            : `Revenue: ${formatCurrency(Number(entry.value))}`}
        </p>
      ))}
    </div>
  );
};

// Activity icon map
const activityIconMap: Record<string, React.ReactNode> = {
  success: <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "var(--success)" }} />,
  warning: <AlertTriangle className="w-3.5 h-3.5" style={{ color: "var(--warning)" }} />,
  info: <Info className="w-3.5 h-3.5 text-primary" />,
};
const activityDotClass: Record<string, string> = {
  success: "bg-[var(--success)]",
  warning: "bg-[var(--warning)]",
  info: "bg-primary",
};

// Event status badge style
function eventStatusStyle(status: EventStatus): React.CSSProperties {
  if (status === "active")
    return {
      backgroundColor: "color-mix(in oklch, var(--success) 15%, transparent)",
      color: "var(--success)",
    };
  if (status === "upcoming")
    return {
      backgroundColor: "color-mix(in oklch, var(--primary) 12%, transparent)",
      color: "var(--primary)",
    };
  if (status === "completed")
    return {
      backgroundColor: "color-mix(in oklch, var(--muted-foreground) 12%, transparent)",
      color: "var(--muted-foreground)",
    };
  return {
    backgroundColor: "color-mix(in oklch, var(--destructive) 12%, transparent)",
    color: "var(--destructive)",
  };
}

export default function DashboardPage() {
  const [chartView, setChartView] = useState<"revenue" | "registrations">("revenue");
  const [eventFilter, setEventFilter] = useState<"all" | EventStatus>("all");

  const filteredEvents = events.filter((e) =>
    eventFilter === "all" ? true : e.status === eventFilter
  );

  const stats = [
    {
      title: "Total Events",
      value: formatNumber(dashboardStats.totalEvents),
      description: `+${dashboardStats.eventsChange}% from last season`,
      icon: CalendarDays,
      change: dashboardStats.eventsChange,
    },
    {
      title: "Active Teams",
      value: formatNumber(dashboardStats.activeTeams),
      description: `+${dashboardStats.teamsChange}% this month`,
      icon: Users,
      change: dashboardStats.teamsChange,
    },
    {
      title: "Total Revenue",
      value: formatCurrency(dashboardStats.totalRevenue),
      description: `+${dashboardStats.revenueChange}% year over year`,
      icon: DollarSign,
      change: dashboardStats.revenueChange,
    },
    {
      title: "Avg Score",
      value: dashboardStats.avgScore.toFixed(1),
      description: `${dashboardStats.scoreChange > 0 ? "+" : ""}${dashboardStats.scoreChange}% vs. last season`,
      icon: Star,
      change: dashboardStats.scoreChange,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Season overview — competition metrics at a glance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg animate-fade-in transition-all duration-150 hover:border-primary/30"
            style={{
              animationDelay: `${index * 80}ms`,
              animationDuration: "200ms",
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-primary/70" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {stat.change > 0 ? (
                  <TrendingUp
                    className="w-3 h-3"
                    style={{ color: "var(--success)" }}
                  />
                ) : (
                  <TrendingDown
                    className="w-3 h-3"
                    style={{ color: "var(--destructive)" }}
                  />
                )}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Chart — Revenue / Registrations toggle */}
        <Card className="linear-card p-0 lg:col-span-2">
          <CardHeader className="px-6 pt-6 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">
                  {chartView === "revenue" ? "Monthly Revenue" : "Monthly Registrations"}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {chartView === "revenue"
                    ? "Revenue collected per month (Sep–Feb)"
                    : "Teams registered per month (Sep–Feb)"}
                </p>
              </div>
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  variant={chartView === "revenue" ? "default" : "outline"}
                  onClick={() => setChartView("revenue")}
                  className="h-7 text-xs px-3"
                >
                  Revenue
                </Button>
                <Button
                  size="sm"
                  variant={chartView === "registrations" ? "default" : "outline"}
                  onClick={() => setChartView("registrations")}
                  className="h-7 text-xs px-3"
                >
                  Registrations
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="fillPrimary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="fillChart2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  strokeOpacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={
                    chartView === "revenue"
                      ? (v: number) => `$${(v / 1000).toFixed(0)}k`
                      : undefined
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                {chartView === "revenue" ? (
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    fill="url(#fillPrimary)"
                    dot={false}
                    activeDot={{ r: 4, fill: "var(--primary)" }}
                  />
                ) : (
                  <Area
                    type="monotone"
                    dataKey="registrations"
                    stroke="var(--chart-2)"
                    strokeWidth={2}
                    fill="url(#fillChart2)"
                    dot={false}
                    activeDot={{ r: 4, fill: "var(--chart-2)" }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution — Horizontal Bar */}
        <Card className="linear-card p-0">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="text-lg font-semibold">By Category</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">
              Events per competition type
            </p>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={eventCategories}
                layout="vertical"
                margin={{ left: 8, right: 16 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  strokeOpacity={0.5}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  width={72}
                />
                <Tooltip content={<CategoryTooltip />} />
                <Bar dataKey="count" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Events Table + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Events Table */}
        <Card className="linear-card lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-lg font-semibold">Events</CardTitle>
              <div className="flex gap-1.5">
                {(["all", "active", "upcoming", "completed"] as const).map((f) => (
                  <Button
                    key={f}
                    size="sm"
                    variant={eventFilter === f ? "default" : "outline"}
                    onClick={() => setEventFilter(f)}
                    className="h-7 text-xs px-3 capitalize"
                  >
                    {f}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground pl-6">
                    Event
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground text-right">
                    Teams
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground text-right pr-6">
                    Revenue
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.slice(0, 8).map((event) => (
                  <TableRow key={event.id} className="table-row-hover">
                    <TableCell className="pl-6">
                      <div>
                        <p className="font-medium text-sm leading-tight">
                          {event.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {event.category}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="rounded-full text-xs capitalize"
                        style={eventStatusStyle(event.status)}
                      >
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm tabular-nums text-right">
                      {event.registeredTeams}/{event.maxTeams}
                    </TableCell>
                    <TableCell className="font-mono text-sm tabular-nums text-right pr-6">
                      {formatCurrency(event.totalRevenue)}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredEvents.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-sm text-muted-foreground py-8"
                    >
                      No events match this filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="linear-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <p className="text-sm text-muted-foreground">Latest platform events</p>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-border/60">
              {recentActivity.map((item) => (
                <li key={item.id} className="flex items-start gap-3 px-6 py-3">
                  <span className="mt-0.5 shrink-0">
                    {activityIconMap[item.status]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug">{item.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono tabular-nums">
                      {formatRelativeDate(item.timestamp)}
                    </p>
                  </div>
                  <span
                    className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${activityDotClass[item.status]}`}
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
