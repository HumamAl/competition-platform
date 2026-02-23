"use client";

import { useState, useMemo } from "react";
import { Search, Download, ChevronUp, ChevronDown, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
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
import { invoices } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { Invoice, InvoiceStatus } from "@/lib/types";

type SortKey = "invoiceNumber" | "teamName" | "amount" | "issuedDate" | "dueDate" | "status";

function InvoiceStatusBadge({ status }: { status: InvoiceStatus | string }) {
  const config: Record<string, { label: string; className: string }> = {
    paid: { label: "Paid", className: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    pending: { label: "Pending", className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
    overdue: { label: "Overdue", className: "text-destructive bg-destructive/10" },
    draft: { label: "Draft", className: "text-muted-foreground bg-muted" },
    sent: { label: "Sent", className: "text-primary bg-primary/10" },
    cancelled: { label: "Cancelled", className: "text-muted-foreground bg-muted" },
  };
  const c = config[status] ?? { label: status, className: "text-muted-foreground bg-muted" };
  return (
    <Badge variant="outline" className={cn("text-xs font-medium border-0 rounded-full", c.className)}>
      {c.label}
    </Badge>
  );
}

// Compute summary stats from all invoices
function computeStats(allInvoices: Invoice[]) {
  const totalInvoiced = allInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const collected = allInvoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const outstanding = allInvoices
    .filter((inv) => (inv.status as string) === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);
  return { totalInvoiced, collected, outstanding };
}

export default function BillingPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("issuedDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const stats = useMemo(() => computeStats(invoices), []);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    return invoices
      .filter((inv) => {
        const matchesSearch =
          search === "" ||
          inv.teamName.toLowerCase().includes(search.toLowerCase()) ||
          inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
          inv.eventName.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || inv.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const aVal = a[sortKey] ?? "";
        const bVal = b[sortKey] ?? "";
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
          <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Invoices and payment tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="linear-card p-4 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 animate-fade-in" style={{ animationDelay: "0ms", animationDuration: "200ms" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Total Invoiced
              </p>
              <p className="text-2xl font-bold mt-1 font-mono tabular-nums bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {formatCurrency(stats.totalInvoiced)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {invoices.length} invoice{invoices.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="linear-card p-4 bg-gradient-to-br from-[color:var(--success)]/5 to-[color:var(--success)]/10 border border-[color:var(--success)]/20 animate-fade-in" style={{ animationDelay: "80ms", animationDuration: "200ms" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Collected
              </p>
              <p className="text-2xl font-bold mt-1 font-mono tabular-nums text-[color:var(--success)]">
                {formatCurrency(stats.collected)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {invoices.filter((i) => i.status === "paid").length} paid
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[color:var(--success)]/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[color:var(--success)]" />
            </div>
          </div>
        </Card>

        <Card className="linear-card p-4 bg-gradient-to-br from-[color:var(--warning)]/5 to-[color:var(--warning)]/10 border border-[color:var(--warning)]/20 animate-fade-in" style={{ animationDelay: "160ms", animationDuration: "200ms" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Outstanding
              </p>
              <p className="text-2xl font-bold mt-1 font-mono tabular-nums text-[color:var(--warning)]">
                {formatCurrency(stats.outstanding)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {invoices.filter((i) => (i.status as string) === "pending" || i.status === "overdue").length} unpaid
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[color:var(--warning)]/10 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-[color:var(--warning)]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by team or invoice number..."
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
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} invoice{filtered.length !== 1 ? "s" : ""}
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
                  onClick={() => handleSort("invoiceNumber")}
                >
                  <div className="flex items-center gap-1">
                    Invoice # <SortIcon col="invoiceNumber" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => handleSort("teamName")}
                >
                  <div className="flex items-center gap-1">
                    Team <SortIcon col="teamName" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Event
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide text-right cursor-pointer select-none"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Amount <SortIcon col="amount" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status <SortIcon col="status" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => handleSort("issuedDate")}
                >
                  <div className="flex items-center gap-1">
                    Issued <SortIcon col="issuedDate" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => handleSort("dueDate")}
                >
                  <div className="flex items-center gap-1">
                    Due <SortIcon col="dueDate" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Paid Date
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
                    No invoices found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((inv: Invoice) => (
                  <TableRow
                    key={inv.id}
                    className={cn(
                      "table-row-hover",
                      inv.status === "overdue" && "bg-destructive/5"
                    )}
                  >
                    <TableCell className="py-2 px-3 font-mono text-sm font-medium">
                      {inv.invoiceNumber}
                    </TableCell>
                    <TableCell className="py-2 px-3 font-medium text-sm">
                      {inv.teamName}
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm text-muted-foreground max-w-[160px]">
                      <span className="truncate block text-xs">{inv.eventName}</span>
                    </TableCell>
                    <TableCell className="py-2 px-3 text-right font-mono text-sm tabular-nums font-medium">
                      {formatCurrency(inv.amount)}
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <InvoiceStatusBadge status={inv.status} />
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm font-mono text-muted-foreground whitespace-nowrap">
                      {formatDate(inv.issuedDate)}
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm font-mono text-muted-foreground whitespace-nowrap">
                      {formatDate(inv.dueDate)}
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm font-mono text-muted-foreground whitespace-nowrap">
                      {inv.paidDate ? formatDate(inv.paidDate) : (
                        <span className="text-muted-foreground/50">—</span>
                      )}
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
