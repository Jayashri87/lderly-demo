import { db } from "../firebase";
import { ref, onValue, set } from "firebase/database";

export type CareJourney = {
  status: "idle" | "requested" | "enroute" | "arrived" | "completed";
  eta: number;
  caretakerName: string;
  summary: string;
};

export type LocationData = {
  latitude: number;
  longitude: number;
  lastUpdated: number;
};

export type LocationMap = {
  caretaker: LocationData;
  user: LocationData;
};

export const JourneyService = {
  subscribe(callback: (data: CareJourney | null) => void) {
    const journeyRef = ref(db, "journey/current");

    return onValue(journeyRef, (snapshot) => {
      callback(snapshot.val());
    });
  },

  subscribeToLocations(callback: (locations: LocationMap | null) => void) {
    const locationRef = ref(db, "journey/current/location");

    return onValue(locationRef, (snapshot) => {
      callback(snapshot.val());
    });
  },

  requestService() {
    set(ref(db, "journey/current"), {
      status: "requested",
      eta: 15,
      caretakerName: "Assigning...",
      summary: "Emergency requested",
      updatedAt: Date.now(),
      location: {
        caretaker: {
          latitude: 12.9716,
          longitude: 77.5946,
          lastUpdated: Date.now(),
        },
        user: {
          latitude: 12.9352,
          longitude: 77.6245,
          lastUpdated: Date.now(),
        },
      },
    });
  },

  updateStatus(status: CareJourney["status"]) {
    const dataMap = {
      requested: {
        eta: 15,
        caretakerName: "Assigning...",
        summary: "Request received",
      },
      enroute: {
        eta: 10,
        caretakerName: "Ravi",
        summary: "Caretaker on the way",
      },
      arrived: {
        eta: 0,
        caretakerName: "Ravi",
        summary: "Caretaker has arrived",
      },
      completed: {
        eta: 0,
        caretakerName: "Ravi",
        summary: "Visit completed",
      },
      idle: {
        eta: 0,
        caretakerName: "",
        summary: "Safe & stable",
      },
    };

    const config = dataMap[status];

    set(ref(db, "journey/current"), {
      status,
      ...config,
      updatedAt: Date.now(),
      location: {
        caretaker: {
          latitude: 12.9716,
          longitude: 77.5946,
          lastUpdated: Date.now(),
        },
        user: {
          latitude: 12.9352,
          longitude: 77.6245,
          lastUpdated: Date.now(),
        },
      },
    });
  },

  updateCaretakerLocation(latitude: number, longitude: number) {
    set(ref(db, "journey/current/location/caretaker"), {
      latitude,
      longitude,
      lastUpdated: Date.now(),
    });
  },

  updateUserLocation(latitude: number, longitude: number) {
    set(ref(db, "journey/current/location/user"), {
      latitude,
      longitude,
      lastUpdated: Date.now(),
    });
  },
};
