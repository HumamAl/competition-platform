"use client";

import type { ReactNode } from "react";
import { ChallengeList } from "./challenge-list";
import { VizPaymentFlow } from "./viz-payment-flow";
import { VizRoleArchitecture } from "./viz-role-architecture";
import { VizPdfBeforeAfter } from "./viz-pdf-before-after";
import { VizMobileKpi } from "./viz-mobile-kpi";

interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "payment-webhook-pipeline": <VizPaymentFlow />,
    "multi-role-dashboard": <VizRoleArchitecture />,
    "pdf-qr-generation": <VizPdfBeforeAfter />,
    "mobile-event-experience": <VizMobileKpi />,
  };

  return <ChallengeList challenges={challenges} visualizations={visualizations} />;
}
