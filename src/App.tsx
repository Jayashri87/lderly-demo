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
  Mic,
  CheckCircle2,
  Stethoscope,
  MapPin,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { getParentStatus } from "./services/firebase/liveData";

type Role = "parent" | "family" | null;

export default function App() {
  const [role, setRole] = React.useState<Role>(null);
  const [activeTab, setActiveTab] = React.useState("today");
  const [showSOS, setShowSOS] = React.useState(false);
  const [loadingRole, setLoadingRole] = React.useState(true);
  const [parentStatus, setParentStatus] = React.useState<any>(null);

  const [selectedHelp, setSelectedHelp] = React.useState<string | null>(null);
  const [requestSent, setRequestSent] = React.useState(false);

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

        const snap = await getDoc(doc(db, "users", user.uid));
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
    getParentStatus().then(setParentStatus);
  }, []);

  async function selectRole(newRole: Role) {
    setRole(newRole);
    localStorage.setItem("lderly-role", newRole as string);

    const user = auth.currentUser;
    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid),
      { role: newRole, updatedAt: new Date().toISOString() },
      { merge: true }
    );
  }

  const card = "rounded-[30px] bg-white/95 backdrop-blur-xl shadow-xl";

  const SeniorTodayScreen = () => (
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

  const SeniorJourneyScreen = () => (
    <div className="space-y-4">
      <div className={`${card} p-5`}>
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5" />
          <div>
            <p className="font-medium">Caretaker arrived</p>
            <p className="text-sm text-zinc-500">Reached home at 6:20 PM</p>
          </div>
        </div>
      </div>

      <div className={`${card} p-5`}>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          <div>
            <p className="font-medium">Medicine completed</p>
            <p className="text-sm text-zinc-500">
              BP tablet and dinner support done ❤️
            </p>
          </div>
        </div>
      </div>

      <div className={`${card} p-5`}>
        <p className="font-medium">Next visit tomorrow at 9 AM</p>
      </div>
    </div>
  );

  const CareCircleJourneyScreen = () => (
    <div className="space-y-4">
      <div className={`${card} p-5`}>
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5" />
          <div>
            <p className="font-medium">Arrived 6:20 PM</p>
            <p className="text-sm text-zinc-500">Visit duration 38 mins</p>
          </div>
        </div>
      </div>

      <div className={`${card} p-5`}>
        <div className="flex items-center gap-3">
          <ClipboardList className="w-5 h-5" />
          <div>
            <p className="font-medium">Visit summary</p>
            <p className="text-sm text-zinc-500">
              Medicine given, hydration normal, mood stable
            </p>
          </div>
        </div>
      </div>

      <div className={`${card} p-5`}>
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" />
          <div>
            <p className="font-medium">Escalation</p>
            <p className="text-sm text-zinc-500">No escalation required</p>
          </div>
        </div>
      </div>
    </div>
  );

  const SeniorLoveWallScreen = () => (
    <div className="space-y-4">
      {[
        [Mic, "Voice note from Rahul", "See you Sunday ❤️"],
        [ImageIcon, "Grandchild memory", "School photo added today"],
        [Sparkles, "Comfort reflection", "Tomorrow is another beautiful day"],
        [Heart, "Gratitude", "One thing that made you smile today"],
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

  const CareCircleScreen = () => (
    <div className={`${card} p-5`}>
      <p className="font-medium">Crisis continuity active</p>
      <p className="text-sm text-zinc-500">Ambulance + escalation ready</p>
    </div>
  );

  const SeniorControlScreen = () => {
    const helpOptions = [
      "Doctor help",
      "Medicine refill",
      "Food & hydration",
      "Feeling low",
    ];

    if (requestSent) {
      return (
        <div className="space-y-4">
          <div className={`${card} p-5`}>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <p className="font-medium">{selectedHelp} request sent</p>
                <p className="text-sm text-zinc-500">
                  Callback in 10 mins. Rahul notified ❤️
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setRequestSent(false);
              setSelectedHelp(null);
            }}
            className="w-full rounded-3xl bg-black text-white py-4"
          >
            Send another request
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {helpOptions.map((option) => (
          <button
            key={option}
            onClick={() => {
              setSelectedHelp(option);
              setRequestSent(true);
            }}
            className={`${card} p-5 w-full text-left`}
          >
            <div className="flex items-center gap-3">
              <Stethoscope className="w-5 h-5" />
              <div>
                <p className="font-medium">{option}</p>
                <p className="text-sm text-zinc-500">
                  Tap to notify Care Circle
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const CareCircleControlScreen = () => (
    <div className={`${card} p-5`}>
      <p className="font-medium">Doctor + lab + companion ops ready</p>
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
                onClick={() => {
                  setActiveTab(key);
                  setRequestSent(false);
                  setSelectedHelp(null);
                }}
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