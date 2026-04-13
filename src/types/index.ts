import { Timestamp } from "firebase/firestore";

export type Role = "family" | "caretaker" | "admin" | "senior";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  cityZone?: string;
  photoURL?: string;
  notificationToken?: string;
  timezone?: string; // For NRI children
  createdAt: Timestamp;
}

export interface ParentProfile {
  id: string;
  familyUid: string;
  name: string;
  age: number;
  address: string;
  location?: { lat: number; lng: number };
  healthProfile: {
    bloodGroup?: string;
    allergies?: string[];
    conditions?: string[];
    medications?: Medication[];
  };
  wellnessScore: number;
  lonelinessScore: number;
  fallRisk: "low" | "medium" | "high";
  moodHistory: { date: string; score: number }[];
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[]; // HH:mm
  confirmed?: boolean;
}

export interface Visit {
  id: string;
  parentId: string;
  caretakerId: string;
  familyUid: string;
  scheduledAt: Timestamp;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  checkInTime?: Timestamp;
  checkOutTime?: Timestamp;
  notes?: string;
  mood?: number;
  photoUrl?: string;
  voiceNoteUrl?: string;
  aiSummary?: string;
  medsConfirmed?: boolean;
  location?: { lat: number; lng: number };
}

export interface SOSAlert {
  id: string;
  parentId: string;
  triggeredBy: string;
  timestamp: Timestamp;
  status: "active" | "resolved";
  location: { lat: number; lng: number };
  resolutionNotes?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  billingCycle: "weekly" | "monthly" | "yearly";
}
