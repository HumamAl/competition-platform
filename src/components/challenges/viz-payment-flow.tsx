import {
  CreditCard,
  Webhook,
  Database,
  ShieldCheck,
  Mail,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    id: "stripe",
    label: "Stripe Payment",
    description: "Team pays entry fee",
    icon: CreditCard,
    highlight: false,
  },
  {
    id: "webhook",
    label: "Webhook Fired",
    description: "Instant event trigger",
    icon: Webhook,
    highlight: true,
  },
  {
    id: "airtable",
    label: "Airtable Updated",
    description: "Record created/linked",
    icon: Database,
    highlight: false,
  },
  {
    id: "access",
    label: "Access Activated",
    description: "Dashboard unlocked",
    icon: ShieldCheck,
    highlight: false,
  },
  {
    id: "email",
    label: "Confirmation Sent",
    description: "Team notified instantly",
    icon: Mail,
    highlight: false,
  },
];

export function VizPaymentFlow() {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
      <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-4">
        Payment Pipeline
      </p>
      {/* Desktop: horizontal */}
      <div className="hidden sm:flex flex-wrap items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <div
              className={[
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg border text-center",
                step.highlight
                  ? "border-primary bg-primary/10"
                  : "border-border/60 bg-card",
              ].join(" ")}
            >
              <step.icon
                className={[
                  "h-4 w-4",
                  step.highlight ? "text-primary" : "text-muted-foreground",
                ].join(" ")}
              />
              <span className="text-xs font-medium leading-tight whitespace-nowrap">
                {step.label}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight whitespace-nowrap">
                {step.description}
              </span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
            )}
          </div>
        ))}
      </div>
      {/* Mobile: vertical */}
      <div className="flex sm:hidden flex-col gap-2">
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-col items-start gap-1">
            <div
              className={[
                "flex items-center gap-2 px-3 py-2 rounded-lg border w-full",
                step.highlight
                  ? "border-primary bg-primary/10"
                  : "border-border/60 bg-card",
              ].join(" ")}
            >
              <step.icon
                className={[
                  "h-4 w-4 shrink-0",
                  step.highlight ? "text-primary" : "text-muted-foreground",
                ].join(" ")}
              />
              <div>
                <p className="text-xs font-medium">{step.label}</p>
                <p className="text-[10px] text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <ArrowDown className="h-4 w-4 text-muted-foreground ml-3" />
            )}
          </div>
        ))}
      </div>
      <div
        className="mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium"
        style={{
          backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
          borderColor: "color-mix(in oklch, var(--success) 20%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
          color: "var(--success)",
        }}
      >
        Total time: under 30 seconds, end to end
      </div>
    </div>
  );
}
