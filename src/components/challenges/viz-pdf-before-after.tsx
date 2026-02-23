import { X, Check } from "lucide-react";

const beforeItems = [
  "Open Google Docs template manually",
  "Copy scores from spreadsheet row by row",
  "Format participant names, fix typos",
  "Export as PDF, rename each file",
  "Print or email separately per team",
  "4+ hours of work per event",
];

const afterItems = [
  "Scores stored live in Airtable",
  "One click generates all stat sheets",
  "QR codes link to real-time leaderboard",
  "PDF batch exported with correct names",
  "Distributed automatically via email",
  "Done in under 2 minutes",
];

export function VizPdfBeforeAfter() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Before */}
      <div
        className="rounded-lg p-4 space-y-2"
        style={{
          backgroundColor: "color-mix(in oklch, var(--destructive) 8%, transparent)",
          borderColor: "color-mix(in oklch, var(--destructive) 15%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <p className="text-xs font-mono tracking-widest uppercase text-[color:var(--destructive)] mb-3">
          Before
        </p>
        <ul className="space-y-1.5">
          {beforeItems.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs text-[color:var(--destructive)]"
            >
              <X className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* After */}
      <div
        className="rounded-lg p-4 space-y-2"
        style={{
          backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
          borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <p className="text-xs font-mono tracking-widest uppercase text-[color:var(--success)] mb-3">
          After
        </p>
        <ul className="space-y-1.5">
          {afterItems.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs text-[color:var(--success)]"
            >
              <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
