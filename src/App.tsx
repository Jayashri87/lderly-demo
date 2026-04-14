import * as React from "react";
import {
  Home,
  MapPinned,
  Settings,
  ShieldAlert,
  Users,
  Stethoscope,
  FlaskConical,
  HeartHandshake,
  Pill,
  Siren,
  Ambulance,
  AlertTriangle,
  X,
  Heart,
  Clock3,
  HelpingHand,
  UserRoundCheck,
  Phone,
  Image as ImageIcon,
  Sparkles,
  BellRing,
  Utensils,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import {
  getParentStatus,
  getJourneyData,
} from "./services/firebase/liveData";
import { getRoute } from "./services/maps/openRouteService";

type Role = "parent" | "family" | null;

export default function App() {
  const [role, setRole] = React.useState<Role>(null);
  const [activeTab, setActiveTab] = React.useState("today");
  const [showSOS, setShowSOS] = React.useState(false);
  const [crisisLevel, setCrisisLevel] = React.useState<
    "watch" | "urgent" | "critical"
  >("watch");

  const [parentStatus, setParentStatus] = React.useState<any>(null);
  const [journey, setJourney] = React.useState<any>(null);
  const [realRoute, setRealRoute] = React.useState<any[]>([]);
  const [routeIndex, setRouteIndex] = React.useState(0);
  const [loadingRole, setLoadingRole] = React.useState(true);

  React.useEffect(() => {
    async function bootstrapRole() {
      try {
        const cachedRole = localStorage.getItem("lderly-role");
        if (cachedRole) setRole(cachedRole as Role);

        const user = auth.currentUser;
        if (!user) {
          setLoadingRole(false);
          return;
        }

        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists() && snap.data()?.role) {
          const savedRole = snap.data().role as Role;
          setRole(savedRole);
          localStorage.setItem("lderly-role", savedRole);
        }
      } finally {
        setLoadingRole(false);
      }
    }

    bootstrapRole();
  }, []);

  React.useEffect(() => {
    async function loadData() {
      const parent = await getParentStatus();
      const journeyData = await getJourneyData();

      setParentStatus(parent);
      setJourney(journeyData);

      const destination: [number, number] = [
        journeyData.lat + 0.004,
        journeyData.lng + 0.004,
      ];

      const routeData = await getRoute(
        [journeyData.lat, journeyData.lng],
        destination
      );

      setRealRoute(routeData.coordinates);
    }

    loadData();
  }, []);

  React.useEffect(() => {
    if (!realRoute.length) return;
    const timer = setInterval(() => {
      setRouteIndex((prev) =>
        prev < realRoute.length - 1 ? prev + 1 : prev
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [realRoute]);

  async function selectRole(newRole: Role) {
    setRole(newRole);
    localStorage.setItem("lderly-role", newRole as string);

    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid);
    await setDoc(
      ref,
      {
        role: newRole,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  }

  const card = "rounded-[30px] bg-white/95 backdrop-blur-xl shadow-xl";

  // Existing screens unchanged...
  // KEEP your current SeniorTodayScreen, CareCircleTodayScreen,
  // SeniorJourneyScreen, CareCircleJourneyScreen,
  // SeniorLoveWallScreen, CareCircleScreen exactly same from previous sprint

  const SeniorControlScreen = () => (
    <div className="space-y-4">
      {[
        [BellRing, "Call Care Circle", "Notify Rahul / neighbors instantly"],
        [Pill, "Medicine refill", "Ask for refill support"],
        [Stethoscope, "Doctor help", "Need doctor consultation"],
        [HeartHandshake, "Companion visit", "Request a visit today"],
        [Utensils, "Food & hydration", "Need meal / water help"],
        [Sparkles, "Feeling low", "Ask for comfort call"],
      ].map(([Icon, title, subtitle]: any) => (
        <div key={title} className={`${card} p-5`}>
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-sm text-zinc-500">{subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const CareCircleControlScreen = () => (
    <div className="space-y-4">
      <div className="flex gap-3 overflow-x-auto">
        {[
          [Stethoscope, "Doctor Consult"],
          [FlaskConical, "Lab Pickup"],
          [HeartHandshake, "Companion Outing"],
        ].map(([Icon, label]: any) => (
          <div key={label} className={`${card} p-5 min-w-[220px]`}>
            <Icon className="w-5 h-5 mb-2" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );

  // IMPORTANT:
  // keep all your other existing screen components from the previous sprint here
  // unchanged (Today, Journey, Circle, SOS, RoleSelector, etc.)

  // --- only renderContent control branch changes below ---
  const renderControl = () => {
    return role === "parent" ? (
      <SeniorControlScreen />
    ) : (
      <CareCircleControlScreen />
    );
  };

  // 👇 KEEP THE REST OF YOUR RETURN BLOCK EXACTLY SAME
  // only change the control case inside renderContent:
  //
  // case "control":
  //   return renderControl();
}