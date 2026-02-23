import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// Competition Platform Types

export type EventStatus = "upcoming" | "active" | "completed" | "cancelled";
export type RegistrationStatus = "open" | "closed" | "waitlist";
export type PaymentStatus = "paid" | "pending" | "overdue" | "refunded";
export type TeamStatus = "registered" | "checked-in" | "competing" | "eliminated" | "placed";
export type JudgeRole = "head-judge" | "panel-judge" | "field-judge";
export type InvoiceStatus = "draft" | "sent" | "paid" | "pending" | "overdue" | "cancelled";

export interface CompetitionEvent {
  id: string;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  status: EventStatus;
  registrationStatus: RegistrationStatus;
  maxTeams: number;
  registeredTeams: number;
  entryFee: number;
  totalRevenue: number;
  judgeCount: number;
}

export interface Team {
  id: string;
  name: string;
  organization: string;
  eventId: string;
  captainName: string;
  captainEmail: string;
  memberCount: number;
  status: TeamStatus;
  registrationDate: string;
  paymentStatus: PaymentStatus;
  totalScore: number | null;
  rank: number | null;
  division: string;
}

export interface Judge {
  id: string;
  name: string;
  email: string;
  role: JudgeRole;
  assignedEvents: string[];
  scoredTeams: number;
  avgRating: number;
  specialization: string;
}

export interface ScoreEntry {
  id: string;
  teamId: string;
  teamName: string;
  eventId: string;
  judgeId: string;
  judgeName: string;
  round: string;
  technicalScore: number;
  presentationScore: number;
  innovationScore: number;
  totalScore: number;
  timestamp: string;
  notes: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  teamId: string;
  teamName: string;
  eventId: string;
  eventName: string;
  amount: number;
  status: InvoiceStatus;
  issuedDate: string;
  dueDate: string;
  paidDate: string | null;
  paymentMethod: string | null;
  description: string;
}

export interface DashboardStats {
  totalEvents: number;
  activeTeams: number;
  totalRevenue: number;
  avgScore: number;
  eventsChange: number;
  teamsChange: number;
  revenueChange: number;
  scoreChange: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  registrations: number;
}

export interface EventCategoryData {
  category: string;
  count: number;
  revenue: number;
}

export interface RecentActivity {
  id: string;
  type: "registration" | "payment" | "score" | "event";
  description: string;
  timestamp: string;
  status: "success" | "warning" | "info";
}
