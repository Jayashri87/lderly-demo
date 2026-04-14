import * as React from "react";
import {
  Home,
  MapPinned,
  Settings,
  ShieldAlert,
  Users,
  Siren,
  X,
  Heart,
  Clock3,
  HelpingHand,
  Pill,
  TrendingUp,
  Eye,
  Phone,
  Image as ImageIcon,
  Sparkles,
  BellRing,
  Utensils,
  Mic,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [loadingRole, setLoadingRole] = React.useState(true);

  const [parentStatus, setParentStatus] = React.useState<any>(null);

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
      setParentStatus(parent);
    }
    loadData();
  }, []);

  async function selectRole(newRole: Role) {
    setRole(newRole);
    localStorage.setItem("lderly-role", newRole as string);

    const user = auth.currentUser;
    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid),
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
      <div className="grid grid-cols-2 gap-3">
        <div className={`${card} p-4`}>
          <Pill className="w-5 h-5 mb-2" />
          <p className="text-xs text-zinc-500">Medicine</p>
          <p className="font-medium">BP tablet after dinner</p>
        </div>
        <div className={`${card} p-4`}>
          <Heart className="w-5 h-5 mb-2" />
          <p className="text-xs text-zinc-500">Care Circle</p>
          <p className="font-medium">Rahul will call at 8 PM</p>
        </div>
        <div className={`${card} p-4`}>
          <Clock3 className="w-5 h-5 mb-2" />
          <p className="text-xs text-zinc-500">Who is coming</p>
          <p className="font-medium">Caretaker in 20 mins</p>
        </div>
        <div className={`${card} p-4`}>
          <HelpingHand className="w-5 h-5 mb-2" />
          <p className="text-xs text-zinc-500">Need help</p>
          <p className="font-medium">Tap Control anytime</p>
        </div>
      </div>
    </div>
  );

  const CareCircleTodayScreen = () => (
    <div className="grid grid-cols-2 gap-3">
      <div className={`${card} p-4`}>
        <Eye className="w-5 h-5 mb-2" />
        <p className="text-xs text-zinc-500">Seen</p>
        <p className="font-medium">{parentStatus?.lastSeen || "2 mins ago"}</p>
      </div>
      <div className={`${card} p-4`}>
        <TrendingUp className="w-5 h-5 mb-2" />
        <p className="text-xs text-zinc-500">Tomorrow</p>
        <p className="font-medium">Low risk predicted</p>
      </div>
    </div>
  );

  const SeniorLoveWallScreen = () => (
    <div className="space-y-4">
      <div className={`${card} p-5`}>
        <div className="flex items-center gap-3">
          <Mic className="w-5 h-5" />
          <div>
            <p className="font-medium">Voice note from Rahul</p>
            <p className="text-sm text-zinc-500">“See you Sunday ❤️”</p>
          </div>
        </div>
      </div>

      <div className={`${card} p-5`}>
        <div className="flex items-center gap-3">
          <ImageIcon className="w-5 h-5" />
          <div>
            <p className="font-medium">Grandchild memory</p>
            <p className="text-sm text-zinc-500">School photo added today</p>
          </div>
        </div>
      </div>

      <div className={`${card} p-5`}>
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5" />
          <div>
            <p className="font-medium">Comfort reflection</p>
            <p className="text-sm text-zinc-500">
              Tomorrow is another beautiful day
            </p>
          </div>
        </div>
      </div>

      <div className={`${card} p-5`}>
        <div className="flex items-center gap-3">
          <Heart className="w-5 h-5" />
          <div>
            <p className="font-medium">Gratitude</p>
            <p className="text-sm text-zinc-500">
              One thing that made you smile today
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const CareCircleScreen = () => (
    <div className={`${card} p-5`}>
      <p className="font-medium">Crisis continuity active</p>
      <p className="text-sm text-zinc-500">Ambulance + escalation ready</p>
    </div>
  );

  const StablePlaceholder = ({ label }: { label: string }) => (
    <div className={`${card} p-5`}>{label}</div>
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
      </div>
    </div>
  );

  const RoleSelector = () => (
    <div className="min-h-screen flex items-center justify-center gap-4">
      <button onClick={() => selectRole("parent")}>Senior</button>
      <button onClick={() => selectRole("family")}>Care Circle</button>
    </div>
  );

  if (loadingRole) return <div>Loading...</div>;
  if (!role) return <RoleSelector />;

  const renderContent = () => {
    switch (activeTab) {
      case "today":
        return role === "parent" ? <SeniorTodayScreen /> : <CareCircleTodayScreen />;
      case "care":
        return <StablePlaceholder label="Journey stable" />;
      case "family":
        return role === "parent" ? <SeniorLoveWallScreen /> : <CareCircleScreen />;
      case "control":
        return <StablePlaceholder label="Control stable" />;
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