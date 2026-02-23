"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "App", href: "/" },
  { label: "My Approach", href: "/challenges" },
  { label: "Proposal", href: "/proposal" },
];

export function TabNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border/60 backdrop-blur-xl bg-background/90 sticky top-0 z-50">
      <div className="flex">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/" || (!pathname.startsWith("/challenges") && !pathname.startsWith("/proposal"))
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "px-5 py-3 text-sm font-medium border-b-2 transition-colors duration-100",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground/80"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
