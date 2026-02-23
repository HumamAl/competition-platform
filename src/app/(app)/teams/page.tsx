"use client";

import { useState, useMemo } from "react";
import { Search, Download, UserPlus, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { teams, events } from "@/data/mock-data";
import { formatDate } from "@/lib/formatters";
import type { Team, TeamStatus, PaymentStatus } from "@/lib/types";

type SortKey = "name" | "organization" | "registrationDate" | "memberCount";

function TeamStatusBadge({ status }: { status: TeamStatus }) {
  const config: Record<TeamStatus, { label: string; className: string }> = {
    registered: { label: "Registered", className: "text-primary bg-primary/10" },
    "checked-in": { label: "Checked In", className: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    competing: { label: "Competing", className: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    eliminated: { label: "Eliminated", className: "text-destructive bg-destructive/10" },
    placed: { label: "Placed", className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
  };
  const c = config[status] ?? { label: status, className: "text-muted-foreground bg-muted" };
  return (
    <Badge variant="outline" className={cn("text-xs font-medium border-0 rounded-full", c.className)}>
      {c.label}
    </Badge>
  );
}

function PaymentBadge({ status }: { status: PaymentStatus }) {
  const config: Record<PaymentStatus, { label: string; className: string }> = {
    paid: { label: "Paid", className: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    pending: { label: "Pending", className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
    overdue: { label: "Overdue", className: "text-destructive bg-destructive/10" },
    refunded: { label: "Refunded", className: "text-muted-foreground bg-muted" },
  };
  const c = config[status] ?? { label: status, className: "text-muted-foreground bg-muted" };
  return (
    <Badge variant="outline" className={cn("text-xs font-medium border-0 rounded-full", c.className)}>
      {c.label}
    </Badge>
  );
}

// Build event name lookup
const eventNameMap = new Map(events.map((e) => [e.id, e.name]));

export default function TeamsPage() {
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("registrationDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    return teams
      .filter((team) => {
        const matchesSearch =
          search === "" ||
          team.name.toLowerCase().includes(search.toLowerCase()) ||
          team.organization.toLowerCase().includes(search.toLowerCase()) ||
          team.captainName.toLowerCase().includes(search.toLowerCase());
        const matchesPayment =
          paymentFilter === "all" || team.paymentStatus === paymentFilter;
        return matchesSearch && matchesPayment;
      })
      .sort((a, b) => {
        const aVal = a[sortKey] ?? "";
        const bVal = b[sortKey] ?? "";
        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, paymentFilter, sortKey, sortDir]);

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  }

  return (
    <div className="space-y-6 animate-tab-fade p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Team registration and management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1.5" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="w-4 h-4 mr-1.5" />
            Add Team
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search teams or organizations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} team{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <Card className="linear-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Team <SortIcon col="name" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => handleSort("organization")}
                >
                  <div className="flex items-center gap-1">
                    Organization <SortIcon col="organization" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Event
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Captain
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide text-right cursor-pointer select-none"
                  onClick={() => handleSort("memberCount")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Members <SortIcon col="memberCount" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Division
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Payment
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => handleSort("registrationDate")}
                >
                  <div className="flex items-center gap-1">
                    Registered <SortIcon col="registrationDate" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No teams found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((team: Team) => (
                  <TableRow key={team.id} className="table-row-hover">
                    <TableCell className="py-2 px-3 font-medium text-sm">
                      {team.name}
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm text-muted-foreground">
                      {team.organization}
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm text-muted-foreground max-w-[160px]">
                      <span className="truncate block text-xs">
                        {eventNameMap.get(team.eventId) ?? team.eventId}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm text-muted-foreground whitespace-nowrap">
                      {team.captainName}
                    </TableCell>
                    <TableCell className="py-2 px-3 text-right font-mono text-sm tabular-nums">
                      {team.memberCount}
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm text-muted-foreground">
                      {team.division}
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <TeamStatusBadge status={team.status} />
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <PaymentBadge status={team.paymentStatus} />
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm font-mono text-muted-foreground whitespace-nowrap">
                      {formatDate(team.registrationDate)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
