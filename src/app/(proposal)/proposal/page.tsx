import { profile, portfolioProjects, heroStats } from "@/data/proposal";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ExternalLink, ArrowRight } from "lucide-react";

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Section 1 — Hero (Dark Panel) */}
        <div
          className="rounded-lg mx-4 mt-6 p-8 md:p-12 text-center"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 250))" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-6 border border-white/10">
            <Sparkles className="w-3 h-3" />
            Built this demo for your project
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-white">
            <span className="font-light">Hi, I&#39;m </span>
            {profile.name}
          </h1>

          <p className="text-sm md:text-base text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 — Proof of Work */}
        <div className="px-4 md:px-6 mt-10">
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
            Proof of Work
          </p>
          <h2 className="text-2xl font-bold tracking-tight">Relevant Projects</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Similar platforms I&#39;ve built — multi-module SaaS, payment integrations, role-based access
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {portfolioProjects.map((project) => (
              <div key={project.id} className="linear-card p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-sm">{project.title}</h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors duration-100 shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                {project.outcome && (
                  <p className="text-xs text-[color:var(--success)] font-medium leading-relaxed">
                    {project.outcome}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] rounded-md bg-primary/8 text-primary font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 — How I Work */}
        <div className="px-4 md:px-6 mt-10">
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
            Process
          </p>
          <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {profile.approach.map((step, i) => (
              <div key={i} className="linear-card p-5 flex gap-4">
                <div className="shrink-0">
                  <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 — Skills Grid */}
        <div className="px-4 md:px-6 mt-10">
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
            Tech Stack
          </p>
          <h2 className="text-2xl font-bold tracking-tight">Relevant Skills</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {profile.skillCategories.map((category) => (
              <div key={category.name} className="linear-card p-4">
                <h3 className="text-sm font-medium mb-3">{category.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5 — CTA (Dark Panel) */}
        <div
          className="rounded-lg mx-4 mt-10 mb-6 p-8 md:p-12 text-center"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 250))" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Let&#39;s build this together
          </h2>
          <p className="text-sm text-white/60 mt-3 max-w-md mx-auto leading-relaxed">
            Available to start immediately. 2-3 month engagement works perfectly.
            Milestone-based delivery with regular check-ins — just how you described it.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[color:var(--section-dark)] text-sm font-medium">
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </div>
          <p className="text-sm text-white/40 mt-6">— Humam</p>
        </div>
      </div>
    </div>
  );
}
