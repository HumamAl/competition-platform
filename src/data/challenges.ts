export interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most competition platforms bolt together off-the-shelf tools — a payment form here, a spreadsheet for scores there — and spend the whole event manually chasing confirmations and printing stat sheets at midnight.",
  differentApproach:
    "I build around an automated event backbone: Stripe webhooks drive instant access provisioning, Airtable acts as the live data layer for all roles, and every report generates itself from real data so your staff runs the event instead of managing tools.",
  accentWord: "automated event backbone",
};

export const challenges: Challenge[] = [
  {
    id: "payment-webhook-pipeline",
    title: "Automated Payment-to-Access Pipeline",
    description:
      "When a team pays via Stripe, three things must happen instantly: the Airtable record updates, dashboard access activates, and a confirmation email fires. Without automation, staff manually verify each payment — delaying teams by hours.",
    outcome:
      "Automates registration from payment to access in under 30 seconds, eliminating all manual payment verification before events.",
  },
  {
    id: "multi-role-dashboard",
    title: "Role-Based Dashboard Architecture",
    description:
      "Admins, judges, teams, and the public each need a completely different view of the same underlying data. Without proper RBAC, sensitive data leaks between roles or features break for users with limited access.",
    outcome:
      "Each role sees exactly the right data — no over-exposure, no missing features — with zero custom login logic required.",
  },
  {
    id: "pdf-qr-generation",
    title: "One-Click PDF and QR Code Generation",
    description:
      "Stat sheets, report cards, and event badges are currently assembled manually in Google Docs — copying scores row by row, prone to errors, and consuming 4+ hours per event. Teams need accurate documents the moment scoring closes.",
    outcome:
      "Eliminates 4+ hours of manual report preparation per event — every document generates instantly from live Airtable data.",
  },
  {
    id: "mobile-event-experience",
    title: "Mobile-First Judge Scoring Experience",
    description:
      "Judges at live events score from their phones. A desktop-first interface forces pinch-zooming and misclicks under time pressure — slowing throughput and introducing scoring errors that require correction later.",
    outcome:
      "Cuts judge scoring time from 8 minutes to 2 minutes per team, eliminating paper forms and manual data entry after the event.",
  },
];
