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
  const [crisisLevel, setCrisisLevel] =
    React.useState<"watch" | "urgent" | "critical">("watch");

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
      } catch (error) {
        console.error(error);
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
    }, 2500);

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

  const SeniorTodayScreen = () => (
    <div className="space-y-4">
      <section className="relative rounded-[40px] overflow-hidden shadow-2xl h-72">
        <img
          src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Senior"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-5 left-5 text-white">
          <p className="text-sm opacity-90">Good evening</p>
          <h1 className="text-3xl font-semibold">
            Your evening is calm and supported ❤️
          </h1>
        </div>
      </section>
    </div>
  );

  const CareCircleTodayScreen = () => (
    <div className="space-y-4">
      <section className="relative rounded-[40px] overflow-hidden shadow-2xl h-72">
        <img
          src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Senior"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-5 left-5 text-white">
          <p className="text-sm opacity-90">Seen {parentStatus?.lastSeen}</p>
          <h1 className="text-3xl font-semibold">
            {parentStatus?.name || "Senior"} needs attention tonight 🧡
          </h1>
        </div>
      </section>
    </div>
  );

  const SeniorJourneyScreen = () => (
    <div className="space-y-4">
      {[
        ["Caretaker", "Arriving in 20 mins"],
        ["Doctor", "Consult at 7 PM"],
        ["Rahul", "Video call tonight"],
        ["Companion", "Outing tomorrow"],
      ].map(([title, sub]) => (
        <div key={title} className={`${card} p-5`}>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-zinc-500">{sub}</p>
        </div>
      ))}
    </div>
  );

  const CareCircleJourneyScreen = () => {
    const currentPos =
      realRoute.length > 0
        ? realRoute[routeIndex]
        : [12.9716, 77.5946];

    const destination =
      journey
        ? [journey.lat + 0.004, journey.lng + 0.004]
        : [12.9756, 77.5986];

    return (
      <div className="relative h-[440px] rounded-[40px] overflow-hidden shadow-2xl">
        <MapContainer center={currentPos as any} zoom={14} style={{ height: "100%" }}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={currentPos as any}>
            <Popup>{journey?.caretakerName || "Caretaker"}</Popup>
          </Marker>
          <Marker position={destination as any}>
            <Popup>Senior Home</Popup>
          </Marker>
          <Polyline positions={realRoute} />
          <Circle center={destination as any} radius={80} />
        </MapContainer>
      </div>
    );
  };

  const SeniorLoveWallScreen = () => (
    <div className="space-y-4">
      <div className={`${card} p-5`}>
        <p className="font-medium">Rahul sent love ❤️</p>
      </div>
      <div className={`${card} p-5`}>
        <p className="font-medium">Voice note waiting</p>
      </div>
      <div className={`${card} p-5`}>
        <p className="font-medium">Memory photo</p>
      </div>
    </div>
  );

  const CareCircleScreen = () => (
    <div className="space-y-4">
      <div className="rounded-3xl bg-red-50 border border-red-100 p-4">
        <p className="font-medium">
          Crisis level: {crisisLevel.toUpperCase()}
        </p>
      </div>
      <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-4">
        <p className="font-medium">Ambulance dispatch ready</p>
      </div>
    </div>
  );

  const SeniorControlScreen = () => (
    <div className="space-y-4">
      {[
        [BellRing, "Call Care Circle"],
        [Pill, "Medicine refill"],
        [Stethoscope, "Doctor help"],
        [HeartHandshake, "Companion visit"],
        [Utensils, "Food & hydration"],
        [Sparkles, "Feeling low"],
      ].map(([Icon, title]: any) => (
        <div key={title} className={`${card} p-5`}>
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <p className="font-medium">{title}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const CareCircleControlScreen = () => (
    <div className="space-y-4">
      <div className={`${card} p-5`}>
        <p className="font-medium">Doctor Consult</p>
      </div>
    </div>
  );

  const SOSModal = () => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-[30px] p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Siren className="w-5 h-5 text-red-600" />
            <p className="font-semibold">Emergency escalation</p>
          </div>
          <button onClick={() => setShowSOS(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {["watch", "urgent", "critical"].map((level) => (
            <button
              key={level}
              onClick={() => setCrisisLevel(level as any)}
              className={`rounded-2xl py-2 text-sm ${
                crisisLevel === level
                  ? "bg-red-500 text-white"
                  : "bg-zinc-100"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowSOS(false)}
          className="mt-4 w-full rounded-2xl bg-black text-white py-3"
        >
          Confirm Care Circle broadcast
        </button>
      </div>
    </div>
  );

  const RoleSelector = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#faf7f2] to-[#f3eee7] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="rounded-[40px] bg-white p-6 shadow-2xl">
          <h1 className="text-2xl font-semibold">Continue as</h1>
          <div className="space-y-3 mt-6">
            <button
              onClick={() => selectRole("parent")}
              className="w-full rounded-3xl bg-black text-white py-4"
            >
              👴 Senior
            </button>
            <button
              onClick={() => selectRole("family")}
              className="w-full rounded-3xl bg-zinc-100 py-4"
            >
              🤝 Care Circle
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loadingRole) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!role) return <RoleSelector />;

  const renderContent = () => {
    switch (activeTab) {
      case "today":
        return role === "parent" ? <SeniorTodayScreen /> : <CareCircleTodayScreen />;
      case "care":
        return role === "parent" ? <SeniorJourneyScreen /> : <CareCircleJourneyScreen />;
      case "family":
        return role === "parent" ? <SeniorLoveWallScreen /> : <CareCircleScreen />;
      case "control":
        return role === "parent" ? <SeniorControlScreen /> : <CareCircleControlScreen />;
      default:
        return role === "parent" ? <SeniorTodayScreen /> : <CareCircleTodayScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf7f2] to-[#f3eee7] flex justify-center p-4">
      <div className="w-full max-w-md pb-28">
        <AnimatePresence mode="wait">
          <motion.div key={`${role}-${activeTab}`}>{renderContent()}</motion.div>
        </AnimatePresence>

        <button
          onClick={() => setShowSOS(true)}
          className="fixed bottom-24 right-6 rounded-full bg-red-500 text-white p-4 shadow-2xl"
        >
          <ShieldAlert className="w-6 h-6" />
        </button>

        {showSOS && <SOSModal />}

        <div className="fixed bottom-0 left-0 right-0 p-4">
          <div className="max-w-md mx-auto grid grid-cols-4 gap-2 rounded-3xl bg-white/95 p-2 shadow-2xl">
            {[
              ["today", Home, "Today"],
              ["care", MapPinned, "Journey"],
              ["family", Users, "Circle"],
              ["control", Settings, "Control"],
            ].map(([key, Icon, label]: any) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`rounded-2xl py-2 flex flex-col items-center gap-1 ${
                  activeTab === key ? "bg-black text-white" : "text-zinc-500"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}