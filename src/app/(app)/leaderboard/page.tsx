"use client";

import { useState, useMemo } from "react";
import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { scores, events } from "@/data/mock-data";
import type { ScoreEntry } from "@/lib/types";

const MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

// Deduplicate scores: keep highest total per team per event
function getLeaderboardEntries(eventId: string): ScoreEntry[] {
  const filtered = scores.filter((s) => s.eventId === eventId);
  // Group by teamId, keep highest score
  const best = new Map<string, ScoreEntry>();
  for (const s of filtered) {
    const existing = best.get(s.teamId);
    if (!existing || s.totalScore > existing.totalScore) {
      best.set(s.teamId, s);
    }
  }
  return Array.from(best.values()).sort((a, b) => b.totalScore - a.totalScore);
}

// Only events that have scores
const scoredEventIds = Array.from(new Set(scores.map((s) => s.eventId)));
const scoredEvents = events.filter((e) => scoredEventIds.includes(e.id));

export default function LeaderboardPage() {
  const [selectedEventId, setSelectedEventId] = useState<string>(
    scoredEvents[0]?.id ?? ""
  );

  const entries = useMemo(
    () => getLeaderboardEntries(selectedEventId),
    [selectedEventId]
  );

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  return (
    <div className="space-y-6 animate-tab-fade p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Competition scores and rankings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedEventId} onValueChange={setSelectedEventId}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              {scoredEvents.map((evt) => (
                <SelectItem key={evt.id} value={evt.id}>
                  {evt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Event context */}
      {selectedEvent && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">{selectedEvent.name}</span>
          <span>&middot;</span>
          <span>{selectedEvent.category}</span>
          <span>&middot;</span>
          <span>{entries.length} ranked team{entries.length !== 1 ? "s" : ""}</span>
        </div>
      )}

      {/* Top 3 Summary Cards */}
      {entries.length >= 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {entries.slice(0, 3).map((entry, i) => (
            <Card
              key={entry.id}
              className={cn(
                "linear-card p-4 animate-fade-in",
                i === 0 && "border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10"
              )}
              style={{ animationDelay: `${i * 80}ms`, animationDuration: "200ms" }}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{MEDAL[i + 1]}</span>
                <span className="font-mono text-lg font-bold tabular-nums text-primary">
                  {entry.totalScore.toFixed(1)}
                </span>
              </div>
              <p className="font-semibold text-sm leading-tight">{entry.teamName}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{entry.round}</p>
              <div className="mt-3 grid grid-cols-3 gap-1 text-center">
                <div>
                  <p className="font-mono text-xs font-medium">{entry.technicalScore}</p>
                  <p className="text-[10px] text-muted-foreground">Tech</p>
                </div>
                <div>
                  <p className="font-mono text-xs font-medium">{entry.presentationScore}</p>
                  <p className="text-[10px] text-muted-foreground">Pres.</p>
                </div>
                <div>
                  <p className="font-mono text-xs font-medium">{entry.innovationScore}</p>
                  <p className="text-[10px] text-muted-foreground">Innov.</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Full Rankings Table */}
      <Card className="linear-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide w-16">
                  Rank
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Team Name
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Judge
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Round
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide text-right">
                  Technical
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide text-right">
                  Presentation
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide text-right">
                  Innovation
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide text-right">
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No scores recorded for this event yet.
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry, index) => {
                  const rank = index + 1;
                  const isTopThree = rank <= 3;
                  return (
                    <TableRow
                      key={entry.id}
                      className={cn(
                        "table-row-hover",
                        isTopThree && "bg-primary/5"
                      )}
                    >
                      <TableCell className="py-2 px-3 font-mono text-sm font-bold">
                        {MEDAL[rank] ? (
                          <span className="flex items-center gap-1.5">
                            {MEDAL[rank]}
                            <span className="text-muted-foreground text-xs">#{rank}</span>
                          </span>
                        ) : (
                          <span className="text-muted-foreground">#{rank}</span>
                        )}
                      </TableCell>
                      <TableCell className="py-2 px-3 font-medium text-sm">
                        {entry.teamName}
                      </TableCell>
                      <TableCell className="py-2 px-3 text-sm text-muted-foreground">
                        {entry.judgeName}
                      </TableCell>
                      <TableCell className="py-2 px-3 text-sm text-muted-foreground">
                        {entry.round}
                      </TableCell>
                      <TableCell className="py-2 px-3 text-right font-mono text-sm tabular-nums">
                        {entry.technicalScore}
                      </TableCell>
                      <TableCell className="py-2 px-3 text-right font-mono text-sm tabular-nums">
                        {entry.presentationScore}
                      </TableCell>
                      <TableCell className="py-2 px-3 text-right font-mono text-sm tabular-nums">
                        {entry.innovationScore}
                      </TableCell>
                      <TableCell className="py-2 px-3 text-right font-mono text-sm tabular-nums font-bold text-primary">
                        {entry.totalScore.toFixed(1)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
