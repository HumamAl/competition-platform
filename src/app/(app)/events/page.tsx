"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, Download, Plus } from "lucide-react";
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
import { events } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { CompetitionEvent, EventStatus, RegistrationStatus } from "@/lib/types";

type SortKey = "name" | "startDate" | "status" | "totalRevenue" | "registeredTeams";

function EventStatusBadge({ status }: { status: EventStatus }) {
  const config: Record<EventStatus, { label: string; className: string }> = {
    upcoming: { label: "Upcoming", className: "text-primary bg-primary/10" },
    active: { label: "Active", className: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    completed: { label: "Completed", className: "text-muted-foreground bg-muted" },
    cancelled: { label: "Cancelled", className: "text-destructive bg-destructive/10" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium border-0 rounded-full", c.className)}>
      {c.label}
    </Badge>
  );
}

function RegistrationBadge({ status }: { status: RegistrationStatus }) {
  const config: Record<RegistrationStatus, { label: string; className: string }> = {
    open: { label: "Open", className: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    closed: { label: "Closed", className: "text-muted-foreground bg-muted" },
    waitlist: { label: "Waitlist", className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium border-0 rounded-full", c.className)}>
      {c.label}
    </Badge>
  );
}

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("startDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    return events
      .filter((evt) => {
        const matchesSearch =
          search === "" ||
          evt.name.toLowerCase().includes(search.toLowerCase()) ||
          evt.category.toLowerCase().includes(search.toLowerCase()) ||
          evt.location.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || evt.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let aVal: string | number = a[sortKey];
        let bVal: string | number = b[sortKey];
        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, statusFilter, sortKey, sortDir]);

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
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage competition events and registrations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1.5" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            New Event
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} event{filtered.length !== 1 ? "s" : ""}
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
                    Name <SortIcon col="name" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Category
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => handleSort("startDate")}
                >
                  <div className="flex items-center gap-1">
                    Date <SortIcon col="startDate" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Location
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status <SortIcon col="status" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Reg. Status
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none text-right"
                  onClick={() => handleSort("registeredTeams")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Teams <SortIcon col="registeredTeams" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none text-right"
                  onClick={() => handleSort("totalRevenue")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Revenue <SortIcon col="totalRevenue" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No events found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((evt: CompetitionEvent) => (
                  <TableRow key={evt.id} className="table-row-hover">
                    <TableCell className="py-2 px-3 font-medium text-sm max-w-[220px]">
                      <span className="truncate block">{evt.name}</span>
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm text-muted-foreground">
                      {evt.category}
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm font-mono text-muted-foreground whitespace-nowrap">
                      {formatDate(evt.startDate)}
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm text-muted-foreground max-w-[160px]">
                      <span className="truncate block">{evt.location}</span>
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <EventStatusBadge status={evt.status} />
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <RegistrationBadge status={evt.registrationStatus} />
                    </TableCell>
                    <TableCell className="py-2 px-3 text-right">
                      <span className="font-mono text-sm tabular-nums">
                        {evt.registeredTeams}
                        <span className="text-muted-foreground">/{evt.maxTeams}</span>
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-3 text-right font-mono text-sm tabular-nums">
                      {formatCurrency(evt.totalRevenue)}
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
