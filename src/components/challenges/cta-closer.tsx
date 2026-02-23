"use client";

import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaCloserProps {
  headline?: string;
  subtext?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export function CtaCloser({
  headline = "Ready to discuss the approach? Let's talk.",
  subtext = "Let's walk through how these solutions apply to your specific competition setup.",
  buttonLabel = "Let's Talk",
  buttonHref = "/proposal",
}: CtaCloserProps) {
  return (
    <div className="rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-8 md:p-10 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{headline}</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {subtext}
          </p>
        </div>

        <Button size="lg" className="mt-2" asChild>
          <a href={buttonHref}>
            {buttonLabel}
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>

        <p className="text-xs text-muted-foreground mt-2">
          Available to start within 48 hours
        </p>
      </div>
    </div>
  );
}
