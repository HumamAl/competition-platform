import {
  Shield,
  Gavel,
  Users,
  Globe,
  Database,
  ArrowDown,
} from "lucide-react";

const roles = [
  {
    id: "admin",
    label: "Admin",
    description: "Full control: events, teams, payments, reports",
    icon: Shield,
    type: "frontend" as const,
  },
  {
    id: "judge",
    label: "Judge",
    description: "Assigned events only — score entry, no team data",
    icon: Gavel,
    type: "backend" as const,
  },
  {
    id: "team",
    label: "Team",
    description: "Own scores, standings, event schedule",
    icon: Users,
    type: "external" as const,
  },
  {
    id: "public",
    label: "Public",
    description: "Live leaderboards and event results only",
    icon: Globe,
    type: "external" as const,
  },
];

const typeStyles: Record<string, string> = {
  frontend: "bg-primary/10 border-primary/30",
  backend: "bg-accent/20 border-border/60",
  external: "bg-muted border-border/60",
  database: "bg-primary/5 border-primary/20",
};

export function VizRoleArchitecture() {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/30 p-4 space-y-4">
      <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
        Role-Based Access Model
      </p>

      {/* Four roles side by side */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {roles.map((role) => (
          <div
            key={role.id}
            className={[
              "flex flex-col items-center gap-1 rounded-lg border px-3 py-3 text-center",
              typeStyles[role.type],
            ].join(" ")}
          >
            <role.icon
              className={[
                "h-4 w-4",
                role.type === "frontend" ? "text-primary" : "text-muted-foreground",
              ].join(" ")}
            />
            <span className="text-xs font-semibold">{role.label}</span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              {role.description}
            </span>
          </div>
        ))}
      </div>

      {/* Arrow down */}
      <div className="flex justify-center">
        <ArrowDown className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Shared Airtable layer */}
      <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
        <Database className="h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="text-xs font-semibold text-primary">
            Airtable — Single Source of Truth
          </p>
          <p className="text-[10px] text-muted-foreground">
            All roles read from the same live records — access filtered server-side per role
          </p>
        </div>
      </div>
    </div>
  );
}
