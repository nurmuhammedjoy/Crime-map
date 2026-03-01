export type CrimeType =
  | "assault"
  | "robbery"
  | "burglary"
  | "vandalism"
  | "theft"
  | "homicide"
  | "drug_offense"
  | "fraud"
  | "corruption";

export type PoliticalParty = "BNP" | "Jamaat" | "Awami League" | "Independent";

export interface CrimeSource {
  newsArticleUrl?: string;
  videoEvidenceUrl?: string;
  audioEvidenceUrl?: string;
}

export interface PeopleInvolved {
  suspect?: string;
  others?: string;
}

export interface Crime {
  id: string;
  type: CrimeType;
  title: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: Date;
  status: "active" | "investigating" | "resolved";
  reportedBy: string;
  party?: PoliticalParty;
  source?: CrimeSource;
  peopleInvolved?: PeopleInvolved;
}
// ai generated dummy data
export const STATIC_CRIMES: Crime[] = [
  { id: "crime-1", type: "corruption", title: "Corruption", description: "Bribery allegation reported at local government office", location: "Motijheel, Dhaka", lat: 23.7271, lng: 90.4209, severity: "critical", timestamp: new Date("2026-02-28T08:00:00Z"), status: "active", reportedBy: "Officer A. Rahman", party: "Awami League", source: { newsArticleUrl: "https://bdnews24.com/corruption-motijheel-2026", videoEvidenceUrl: "https://youtube.com/watch?v=abc123", audioEvidenceUrl: "https://drive.google.com/audio/corruption-rec-001" }, peopleInvolved: { suspect: "Kamal Uddin", others: "Rahim Mia, Jamal Hossain" } },
  { id: "crime-2", type: "robbery", title: "Robbery", description: "Armed robbery at convenience store, suspect fled on foot", location: "Gulshan, Dhaka", lat: 23.7925, lng: 90.4078, severity: "high", timestamp: new Date("2026-02-28T07:30:00Z"), status: "investigating", reportedBy: "Officer B. Hossain", source: { newsArticleUrl: "https://thedailystar.net/gulshan-robbery-report", videoEvidenceUrl: "https://youtube.com/watch?v=def456" }, peopleInvolved: { suspect: "Unknown male, ~30 years", others: "Store owner Rafiq Ahmed" } },
  { id: "crime-3", type: "assault", title: "Assault", description: "Physical altercation reported near bus station", location: "Dhanmondi, Dhaka", lat: 23.7461, lng: 90.3742, severity: "medium", timestamp: new Date("2026-02-28T06:45:00Z"), status: "active", reportedBy: "Officer C. Ahmed", source: { newsArticleUrl: "https://prothomalo.com/dhanmondi-assault-feb2026", audioEvidenceUrl: "https://drive.google.com/audio/assault-witness-001" }, peopleInvolved: { suspect: "Faruk Hasan", others: "Victim: Aminul Islam" } },
  { id: "crime-4", type: "theft", title: "Theft", description: "Vehicle theft reported in parking area", location: "Uttara, Dhaka", lat: 23.8759, lng: 90.3795, severity: "low", timestamp: new Date("2026-02-28T06:00:00Z"), status: "resolved", reportedBy: "Officer D. Begum", source: { newsArticleUrl: "https://dhakatribune.com/uttara-vehicle-theft" }, peopleInvolved: { suspect: "Shahidul Alam", others: "Vehicle owner: Nasima Akter" } },
  { id: "crime-5", type: "fraud", title: "Fraud", description: "Online scam targeting elderly residents", location: "Mirpur, Dhaka", lat: 23.8042, lng: 90.3687, severity: "high", timestamp: new Date("2026-02-28T05:15:00Z"), status: "investigating", reportedBy: "Officer E. Islam", source: { newsArticleUrl: "https://bdnews24.com/mirpur-online-scam", videoEvidenceUrl: "https://youtube.com/watch?v=ghi789" }, peopleInvolved: { suspect: "Online alias 'TechSupport BD'", others: "12 elderly victims reported" } },
  { id: "crime-6", type: "corruption", title: "Corruption", description: "Embezzlement under investigation at municipal office", location: "Chittagong Port Area", lat: 22.3569, lng: 91.7832, severity: "critical", timestamp: new Date("2026-02-28T04:30:00Z"), status: "active", reportedBy: "Officer F. Rahman", party: "BNP", source: { newsArticleUrl: "https://thedailystar.net/chittagong-embezzlement", videoEvidenceUrl: "https://youtube.com/watch?v=jkl012", audioEvidenceUrl: "https://drive.google.com/audio/ctg-whistleblower" }, peopleInvolved: { suspect: "Mizanur Rahman", others: "Accountant Selina Begum" } },
  { id: "crime-7", type: "vandalism", title: "Vandalism", description: "Graffiti on public property and damaged signage", location: "Sylhet City Center", lat: 24.8949, lng: 91.8687, severity: "low", timestamp: new Date("2026-02-28T03:45:00Z"), status: "resolved", reportedBy: "Officer G. Hossain", source: { videoEvidenceUrl: "https://youtube.com/watch?v=mno345" }, peopleInvolved: { suspect: "Unidentified group of youths" } },
  { id: "crime-8", type: "homicide", title: "Homicide", description: "Fatal incident under investigation, scene secured", location: "Rajshahi University Area", lat: 24.3636, lng: 88.6241, severity: "critical", timestamp: new Date("2026-02-28T03:00:00Z"), status: "investigating", reportedBy: "Officer H. Ahmed", source: { newsArticleUrl: "https://prothomalo.com/rajshahi-homicide-investigation", videoEvidenceUrl: "https://youtube.com/watch?v=pqr678", audioEvidenceUrl: "https://drive.google.com/audio/rajshahi-911-call" }, peopleInvolved: { suspect: "Under investigation", others: "Victim: Abul Kalam, Witness: Shafiqul Islam" } },
  { id: "crime-9", type: "drug_offense", title: "Drug Offense", description: "Controlled substances seized during routine check", location: "Khulna Division HQ", lat: 22.8456, lng: 89.5403, severity: "high", timestamp: new Date("2026-02-28T02:15:00Z"), status: "active", reportedBy: "Officer I. Begum", source: { newsArticleUrl: "https://dhakatribune.com/khulna-drug-bust", videoEvidenceUrl: "https://youtube.com/watch?v=stu901" }, peopleInvolved: { suspect: "Babul Mia, Liton Sheikh", others: "RAB informant (anonymous)" } },
  { id: "crime-10", type: "burglary", title: "Burglary", description: "Forced entry through rear window of residential property", location: "Barisal Riverfront", lat: 22.701, lng: 90.3535, severity: "medium", timestamp: new Date("2026-02-28T01:30:00Z"), status: "investigating", reportedBy: "Officer J. Islam", source: { newsArticleUrl: "https://bdnews24.com/barisal-burglary-report" }, peopleInvolved: { suspect: "Unknown", others: "Homeowner: Hasina Khatun" } },
  { id: "crime-11", type: "corruption", title: "Corruption", description: "Public fund misuse suspected in development project", location: "Rangpur Town Hall", lat: 25.7439, lng: 89.2752, severity: "high", timestamp: new Date("2026-02-27T23:00:00Z"), status: "active", reportedBy: "Officer K. Rahman", party: "Jamaat", source: { newsArticleUrl: "https://thedailystar.net/rangpur-fund-misuse", audioEvidenceUrl: "https://drive.google.com/audio/rangpur-leak" }, peopleInvolved: { suspect: "Councillor Nurul Haque", others: "Contractor: Shamsul Alam" } },
  { id: "crime-12", type: "assault", title: "Assault", description: "Multiple witnesses present at altercation near market", location: "Comilla Cantonment", lat: 23.4607, lng: 91.1809, severity: "medium", timestamp: new Date("2026-02-27T22:00:00Z"), status: "resolved", reportedBy: "Officer L. Hossain", source: { videoEvidenceUrl: "https://youtube.com/watch?v=vwx234" }, peopleInvolved: { suspect: "Masum Billah", others: "Victim: Shahjalal Uddin, 3 witnesses" } },
  { id: "crime-13", type: "robbery", title: "Robbery", description: "Suspect demanded cash from shopkeeper at knifepoint", location: "Narayanganj Industrial Zone", lat: 23.6238, lng: 90.5, severity: "high", timestamp: new Date("2026-02-27T21:00:00Z"), status: "investigating", reportedBy: "Officer M. Ahmed", source: { newsArticleUrl: "https://prothomalo.com/narayanganj-knifepoint-robbery", videoEvidenceUrl: "https://youtube.com/watch?v=yza567" }, peopleInvolved: { suspect: "Male, ~25 years, scar on left cheek", others: "Shopkeeper: Abdul Mannan" } },
  { id: "crime-14", type: "fraud", title: "Fraud", description: "Identity theft reported, financial accounts compromised", location: "Cox's Bazar Beach Road", lat: 21.4272, lng: 92.0058, severity: "medium", timestamp: new Date("2026-02-27T20:00:00Z"), status: "active", reportedBy: "Officer N. Begum", source: { newsArticleUrl: "https://dhakatribune.com/coxs-bazar-identity-theft" }, peopleInvolved: { suspect: "Cyber crime unit tracking", others: "5 victims filed reports" } },
  { id: "crime-15", type: "theft", title: "Theft", description: "Pickpocket incident at transit station", location: "Gazipur Chowrasta", lat: 24.0023, lng: 90.4203, severity: "low", timestamp: new Date("2026-02-27T19:00:00Z"), status: "resolved", reportedBy: "Officer O. Islam", source: { videoEvidenceUrl: "https://youtube.com/watch?v=bcd890" }, peopleInvolved: { suspect: "Juvenile suspect apprehended", others: "Victim: Tourist from Sylhet" } },
  { id: "crime-16", type: "corruption", title: "Corruption", description: "Government contract fraud under investigation", location: "Motijheel, Dhaka", lat: 23.7271, lng: 90.4209, severity: "critical", timestamp: new Date("2026-02-27T18:00:00Z"), status: "investigating", reportedBy: "Officer P. Rahman", party: "Independent", source: { newsArticleUrl: "https://bdnews24.com/govt-contract-fraud-dhaka", videoEvidenceUrl: "https://youtube.com/watch?v=efg123", audioEvidenceUrl: "https://drive.google.com/audio/contract-fraud-tape" }, peopleInvolved: { suspect: "Contractor Zahirul Islam", others: "Govt. official (name withheld)" } },
  { id: "crime-17", type: "vandalism", title: "Vandalism", description: "Vehicle windows smashed in commercial district", location: "Gulshan, Dhaka", lat: 23.7925, lng: 90.4078, severity: "low", timestamp: new Date("2026-02-27T17:00:00Z"), status: "resolved", reportedBy: "Officer Q. Hossain", source: { videoEvidenceUrl: "https://youtube.com/watch?v=hij456" }, peopleInvolved: { others: "4 vehicle owners affected" } },
  { id: "crime-18", type: "drug_offense", title: "Drug Offense", description: "Suspected distribution activity in residential area", location: "Dhanmondi, Dhaka", lat: 23.7461, lng: 90.3742, severity: "high", timestamp: new Date("2026-02-27T16:00:00Z"), status: "active", reportedBy: "Officer R. Ahmed", source: { newsArticleUrl: "https://thedailystar.net/dhanmondi-drug-distribution", audioEvidenceUrl: "https://drive.google.com/audio/drug-tip-off" }, peopleInvolved: { suspect: "Rony Mia, Sohel Rana", others: "Anonymous tipster" } },
  { id: "crime-19", type: "burglary", title: "Burglary", description: "Commercial property targeted overnight", location: "Uttara, Dhaka", lat: 23.8759, lng: 90.3795, severity: "medium", timestamp: new Date("2026-02-27T15:00:00Z"), status: "investigating", reportedBy: "Officer S. Begum", source: { newsArticleUrl: "https://prothomalo.com/uttara-commercial-burglary", videoEvidenceUrl: "https://youtube.com/watch?v=klm789" }, peopleInvolved: { suspect: "2 suspects seen on CCTV", others: "Shop owner: Monir Hossain" } },
  { id: "crime-20", type: "homicide", title: "Homicide", description: "Victim found unresponsive, authorities on scene", location: "Mirpur, Dhaka", lat: 23.8042, lng: 90.3687, severity: "critical", timestamp: new Date("2026-02-27T14:00:00Z"), status: "active", reportedBy: "Officer T. Islam", source: { newsArticleUrl: "https://dhakatribune.com/mirpur-homicide-feb2026", videoEvidenceUrl: "https://youtube.com/watch?v=nop012", audioEvidenceUrl: "https://drive.google.com/audio/mirpur-emergency-call" }, peopleInvolved: { suspect: "Person of interest detained", others: "Victim: Anwar Hossain, Family notified" } },
];

export function formatTimeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export const CRIME_TYPE_COLORS: Record<CrimeType, string> = {
  assault: "#ffffff",
  robbery: "#e0e0e0",
  burglary: "#c0c0c0",
  vandalism: "#a0a0a0",
  theft: "#808080",
  homicide: "#404040",
  drug_offense: "#606060",
  fraud: "#909090",
  corruption: "#ff4444",
};

export const SEVERITY_COLORS: Record<Crime["severity"], string> = {
  low: "#6b7280",
  medium: "#9ca3af",
  high: "#d1d5db",
  critical: "#ffffff",
};

export const PARTY_COLORS: Record<PoliticalParty, string> = {
  "BNP": "#3b82f6",
  "Jamaat": "#22c55e",
  "Awami League": "#ef4444",
  "Independent": "#9ca3af",
};
