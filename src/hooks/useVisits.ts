import { useState, useEffect } from "react";
import { where, orderBy, QueryConstraint } from "firebase/firestore";
import { FirestoreService } from "../services/firebase/firestore";
import { Visit } from "../types";

export function useVisits(role: string, uid: string) {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const constraints: QueryConstraint[] = [];
    if (role === "family") {
      constraints.push(where("familyUid", "==", uid));
    } else if (role === "caretaker") {
      constraints.push(where("caretakerId", "==", uid));
    }
    constraints.push(orderBy("scheduledAt", "desc"));

    const unsubscribe = FirestoreService.subscribeToQuery<Visit>(
      "visits",
      constraints,
      (data) => {
        setVisits(data);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [role, uid]);

  return { visits, loading };
}
