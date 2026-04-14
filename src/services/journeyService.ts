import {
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export type JourneyStatus =
  | "scheduled"
  | "en_route"
  | "arrived"
  | "in_progress"
  | "completed"
  | "summary_sent";

export interface CareJourney {
  serviceType: string;
  status: JourneyStatus;
  eta: number;
  assignedTo: string;
  startedAt: any;
  completedAt: any;
  summary: string;
}

const journeyRef = doc(db, "care_journeys", "current");

export const JourneyService = {
  subscribe(callback: (journey: CareJourney | null) => void) {
    return onSnapshot(journeyRef, (snapshot) => {
      if (!snapshot.exists()) {
        callback(null);
        return;
      }

      callback(snapshot.data() as CareJourney);
    });
  },

  async updateStatus(status: JourneyStatus) {
    await updateDoc(journeyRef, {
      status,
      ...(status === "completed"
        ? {
            completedAt: serverTimestamp(),
            summary: "Visit completed successfully",
          }
        : {}),
    });
  },

  async createDefault() {
    await setDoc(journeyRef, {
      serviceType: "caretaker_visit",
      status: "scheduled",
      eta: 18,
      assignedTo: "caretaker_001",
      startedAt: serverTimestamp(),
      completedAt: null,
      summary: "Awaiting visit",
    });
  },
};