import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline:
    "Full-stack developer who builds event platforms that actually scale — from leaderboards and scoring to Stripe billing and PDF exports.",
  bio: "I build production apps that solve real operational problems — role-based dashboards, payment automation, and data-heavy platforms. My approach is straightforward: understand the business need, build something that works, and ship it fast.",
  approach: [
    {
      title: "Understand the System",
      description:
        "Deep-dive into the existing codebase, Airtable schema, and user roles to map the full picture.",
    },
    {
      title: "Build Incrementally",
      description:
        "Milestone-based delivery — billing module first, then reports/PDFs, then polish. Regular check-ins.",
    },
    {
      title: "Ship Production-Ready",
      description:
        "Code hardening, mobile testing, accessibility review, and Vercel deployment pipeline.",
    },
    {
      title: "Iterate & Refine",
      description:
        "Post-launch monitoring, bug fixes, and performance optimization based on real usage.",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    },
    {
      name: "Backend & APIs",
      skills: ["Airtable API", "Stripe", "Clerk Auth", "Next.js API Routes"],
    },
    {
      name: "Tools & Infra",
      skills: ["Vercel", "PDF Generation", "QR Codes", "Webhooks"],
    },
  ],
};

export const heroStats = [
  { value: "24+", label: "Projects Shipped" },
  { value: "15+", label: "Industries" },
  { value: "< 48hr", label: "Demo Turnaround" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "fleet-saas",
    title: "Fleet Maintenance SaaS",
    description:
      "6-module SaaS covering the full maintenance lifecycle — asset registry, work orders, inspections, parts inventory, and analytics dashboard.",
    tech: ["Next.js", "Recharts", "TypeScript", "shadcn/ui"],
    outcome:
      "Multi-module platform architecture with complex data relationships — similar complexity to admin/judge/team/public role structure.",
    relevance: "Multi-module SaaS, role-based access, complex data relationships",
  },
  {
    id: "payguard",
    title: "PayGuard — Transaction Monitor",
    description:
      "Compliance monitoring dashboard with transaction flagging, multi-account linking, and alert delivery tracking.",
    tech: ["Next.js", "Stripe", "TypeScript", "Recharts"],
    outcome:
      "Payment processing pipeline with webhook-driven state changes — directly relevant to Stripe billing integration.",
    relevance: "Stripe integration, webhook flows, payment monitoring",
    liveUrl: "https://payment-monitor.vercel.app",
  },
  {
    id: "lead-crm",
    title: "Lead Intake CRM",
    description:
      "End-to-end lead flow — public intake form to scored pipeline with configurable automation rules and enable/disable toggles.",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    outcome:
      "Role-based access control with automation rules engine — applicable to admin/judge permission boundaries.",
    relevance: "Role-based access, form workflows, automation rules",
  },
  {
    id: "dealer-hub",
    title: "DealerHub — Automotive SaaS",
    description:
      "Full dealership ops platform — inventory, leads, appraisals, and reconditioning pipeline all in one place.",
    tech: ["Next.js", "TypeScript", "shadcn/ui", "Recharts"],
    outcome:
      "Multi-tenant dashboard with separate views per role — inventory manager, sales team, and admin each see different data.",
    relevance: "Multi-tenant, role-based dashboards, complex workflows",
    liveUrl: "https://dealer-platform-neon.vercel.app",
  },
];
