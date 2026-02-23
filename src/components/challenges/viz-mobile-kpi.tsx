import { ArrowRight, Smartphone, Clock } from "lucide-react";

const kpis = [
  {
    id: "usability",
    icon: Smartphone,
    label: "Mobile Usability Score",
    before: { value: "42", label: "Current" },
    after: { value: "95", label: "Target" },
    improvement: "+53 points",
    unit: "/100",
  },
  {
    id: "scoring-time",
    icon: Clock,
    label: "Judge Scoring Time",
    before: { value: "8 min", label: "Per team now" },
    after: { value: "2 min", label: "Per team after" },
    improvement: "75% faster",
    unit: "",
  },
];

export function VizMobileKpi() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
        Mobile Optimization Impact
      </p>
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className="rounded-lg border border-border/60 bg-card p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              {kpi.label}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* Before */}
            <div className="text-center flex-1">
              <p className="text-2xl font-bold text-muted-foreground">
                {kpi.before.value}
                {kpi.unit}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {kpi.before.label}
              </p>
            </div>

            {/* Arrow + badge */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor:
                    "color-mix(in oklch, var(--success) 10%, transparent)",
                  color: "var(--success)",
                }}
              >
                {kpi.improvement}
              </span>
            </div>

            {/* After */}
            <div className="text-center flex-1">
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--success)" }}
              >
                {kpi.after.value}
                {kpi.unit}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {kpi.after.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
