import type { Crime, CrimeType } from "@/lib/crime-data";
import {
  Shield,
  Flame,
  Package,
  Hammer,
  Car,
  AlertCircle,
  Pill,
  CreditCard,
  Landmark,
  Clock,
  Eye,
  CheckCircle2,
  Ban,
  type LucideIcon,
} from "lucide-react";


export type AdminTag =
  | "verified"
  | "fake"
  | "under_review"
  | "inaccurate"
  | "duplicate"
  | "sensitive";

export const ADMIN_TAG_LABELS: Record<AdminTag, string> = {
  verified: "Verified",
  fake: "Fake",
  under_review: "Under Review",
  inaccurate: "Inaccurate",
  duplicate: "Duplicate",
  sensitive: "Sensitive",
};


export interface FlaggedIncident {
  id: string;
  crimeId: string;
  tag: AdminTag;
  flaggedAt: Date;
  adminNote: string;
  submitterIP: string;
  ipBlocked: boolean;
}
// Ai generated dummy data
export const MOCK_FLAGS: FlaggedIncident[] = [
  { id: "flag-1", crimeId: "crime-1", tag: "under_review", flaggedAt: new Date("2026-02-28T10:00:00Z"), adminNote: "Bribery report needs source verification before publishing.", submitterIP: "103.108.22.41", ipBlocked: false },
  { id: "flag-2", crimeId: "crime-3", tag: "inaccurate", flaggedAt: new Date("2026-02-28T09:30:00Z"), adminNote: "Location coordinates don't match the described area. Needs correction.", submitterIP: "103.108.22.87", ipBlocked: false },
  { id: "flag-3", crimeId: "crime-5", tag: "duplicate", flaggedAt: new Date("2026-02-28T08:15:00Z"), adminNote: "Same incident already exists as crime-4. Merging data.", submitterIP: "45.64.128.12", ipBlocked: false },
  { id: "flag-4", crimeId: "crime-6", tag: "fake", flaggedAt: new Date("2026-02-28T07:00:00Z"), adminNote: "Embezzlement claim has no credible backing. Marking as fake.", submitterIP: "103.230.11.55", ipBlocked: true },
  { id: "flag-5", crimeId: "crime-8", tag: "verified", flaggedAt: new Date("2026-02-27T22:00:00Z"), adminNote: "Severity confirmed as critical after cross-checking with police records.", submitterIP: "114.130.44.22", ipBlocked: false },
  { id: "flag-6", crimeId: "crime-14", tag: "fake", flaggedAt: new Date("2026-02-27T20:30:00Z"), adminNote: "Auto-generated spam content. IP flagged for blocking.", submitterIP: "185.220.101.33", ipBlocked: true },
  { id: "flag-7", crimeId: "crime-2", tag: "under_review", flaggedAt: new Date("2026-02-28T11:00:00Z"), adminNote: "Witness accounts conflict. Needs further investigation.", submitterIP: "103.108.22.99", ipBlocked: false },
  { id: "flag-8", crimeId: "crime-10", tag: "sensitive", flaggedAt: new Date("2026-02-27T18:00:00Z"), adminNote: "Contains identifiable personal data. Redaction required before public display.", submitterIP: "103.48.16.78", ipBlocked: false },
];


export interface BlockedIP {
  ip: string;
  reason: string;
  blockedAt: Date;
  incidentCount: number;
}

export const MOCK_BLOCKED_IPS: BlockedIP[] = [
  { ip: "103.230.11.55", reason: "Submitted fabricated corruption report", blockedAt: new Date("2026-02-28T07:05:00Z"), incidentCount: 3 },
  { ip: "185.220.101.33", reason: "Automated spam submissions detected", blockedAt: new Date("2026-02-27T20:35:00Z"), incidentCount: 12 },
  { ip: "45.33.32.156", reason: "Repeated false homicide reports", blockedAt: new Date("2026-02-26T14:00:00Z"), incidentCount: 5 },
  { ip: "198.51.100.22", reason: "Abusive content in submissions", blockedAt: new Date("2026-02-25T09:30:00Z"), incidentCount: 2 },
];


export interface ActivityEntry {
  id: string;
  action: "tagged" | "edited" | "deleted" | "blocked_ip" | "unblocked_ip" | "verified" | "restored";
  target: string;
  detail: string;
  timestamp: Date;
}

export const MOCK_ACTIVITY: ActivityEntry[] = [
  { id: "act-1", action: "tagged", target: "crime-6", detail: "Tagged as Fake — no credible evidence", timestamp: new Date("2026-02-28T07:02:00Z") },
  { id: "act-2", action: "blocked_ip", target: "185.220.101.33", detail: "Blocked for automated spam submissions", timestamp: new Date("2026-02-27T20:35:00Z") },
  { id: "act-3", action: "verified", target: "crime-8", detail: "Verified severity as critical", timestamp: new Date("2026-02-27T22:05:00Z") },
  { id: "act-4", action: "edited", target: "crime-3", detail: "Corrected location from Dhanmondi to Mohammadpur", timestamp: new Date("2026-02-28T09:45:00Z") },
  { id: "act-5", action: "deleted", target: "crime-14", detail: "Removed — confirmed spam content", timestamp: new Date("2026-02-27T20:40:00Z") },
  { id: "act-6", action: "blocked_ip", target: "103.230.11.55", detail: "Blocked for fabricated corruption report", timestamp: new Date("2026-02-28T07:05:00Z") },
  { id: "act-7", action: "tagged", target: "crime-10", detail: "Tagged as Sensitive — requires data redaction", timestamp: new Date("2026-02-27T18:10:00Z") },
  { id: "act-8", action: "restored", target: "crime-12", detail: "Restored after review — report was valid", timestamp: new Date("2026-02-27T23:30:00Z") },
];


export const CRIME_TYPE_ICONS: Record<CrimeType, LucideIcon> = {
  assault: Flame,
  robbery: Shield,
  burglary: Package,
  vandalism: Hammer,
  theft: Car,
  homicide: AlertCircle,
  drug_offense: Pill,
  fraud: CreditCard,
  corruption: Landmark,
};

export const TAG_STATUS_CONFIG: Record<AdminTag, { icon: LucideIcon }> = {
  verified: { icon: CheckCircle2 },
  fake: { icon: Ban },
  under_review: { icon: Clock },
  inaccurate: { icon: Eye },
  duplicate: { icon: Eye },
  sensitive: { icon: Eye },
};
