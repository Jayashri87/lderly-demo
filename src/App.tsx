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
  Image as ImageIcon,
  Sparkles,
  Mic,
  CheckCircle2,
  Stethoscope,
  Ambulance,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
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
  const [persistedRequest, setPersistedRequest] = React.useState<any>(null);

  const [sosEscalated, setSosEscalated] = React.useState(false);

  React.useEffect(() => {
    async function bootstrap() {
      try {
        const cachedRole = localStorage.getItem("lderly-role");
        if (cachedRole) setRole(cachedRole as Role);

        const user = auth.currentUser;
        if (user) {
          const snap = await getDoc(doc(db, "users", user.uid));
          if (snap.exists() && snap.data()?.role) {
            const savedRole = snap.data().role as Role;
            setRole(savedRole);
            localStorage.setItem("lderly-role", savedRole);

            const q = query(
              collection(db, "help_requests"),
              where("userId", "==", user.uid),
              orderBy("createdAt", "desc"),
              limit(1)
            );

            const reqSnap = await getDocs(q);
            if (!reqSnap.empty) {
              const latest = reqSnap.docs[0].data();
              setPersistedRequest(latest);
              setRequestSent(true);
              setSelectedHelp(latest.requestType);
            }
          }
        }

        const parent = await getParentStatus();
        setParentStatus(parent);
      } finally {
        setLoadingRole(false);
      }
    }

    bootstrap();
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

  async function sendHelpRequest(type: string) {
    const user = auth.currentUser;
    if (!user) return;

    const payload = {
      userId: user.uid,
      role,
      requestType: type,
      createdAt: new Date().toISOString(),
      status: "pending",
      eta: "10 mins",
      responder: "Dr. Ananya",
    };

    await addDoc(collection(db, "help_requests"), payload);

    setSelectedHelp(type);
    setPersistedRequest(payload);
    setRequestSent(true);
  }

  function switchRole() {
    const nextRole = role === "parent" ? "family" : "parent";
    selectRole(nextRole);
    setActiveTab("today");
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

  const StableScreen = ({ text }: { text: string }) => (
    <div className={`${card} p-5`}>{text}</div>
  );

  const SeniorControlScreen = () => {
    const helpOptions = [
      "Doctor help",
      "Medicine refill",
      "Food & hydration",
      "Feeling low",
    ];

    if (requestSent && persistedRequest) {
      return (
        <div className="space-y-4">
          <div className={`${card} p-5`}>
            <p className="font-medium">
              {persistedRequest.requestType} request active
            </p>
            <p className="text-sm text-zinc-500">
              {persistedRequest.responder} • ETA {persistedRequest.eta}
            </p>
          </div>

          <button
            onClick={switchRole}
            className="w-full rounded-3xl bg-zinc-100 py-4"
          >
            🔁 Switch to Care Circle
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {helpOptions.map((option) => (
          <button
            key={option}
            onClick={() => sendHelpRequest(option)}
            className={`${card} p-5 w-full text-left`}
          >
            <div className="flex items-center gap-3">
              <Stethoscope className="w-5 h-5" />
              <div>
                <p className="font-medium">{option}</p>
                <p className="text-sm text-zinc-500">
                  Persistent Firestore logging enabled
                </p>
              </div>
            </div>
          </button>
        ))}

        <button
          onClick={switchRole}
          className="w-full rounded-3xl bg-zinc-100 py-4"
        >
          🔁 Switch to Care Circle
        </button>
      </div>
    );
  };

  const CareCircleControlScreen = () => (
    <div className="space-y-4">
      <div className={`${card} p-5`}>
        <p className="font-medium">Ops panel ready</p>
      </div>
      <button
        onClick={switchRole}
        className="w-full rounded-3xl bg-zinc-100 py-4"
      >
        🔁 Switch to Senior
      </button>
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

        <button
          onClick={() => {
            setSosEscalated(true);
            setShowSOS(false);
          }}
          className="mt-4 w-full rounded-2xl bg-red-500 text-white py-3"
        >
          Confirm ambulance escalation
        </button>
      </div>
    </div>
  );

  if (loadingRole) return <div>Loading...</div>;

  const renderContent = () => {
    switch (activeTab) {
      case "today":
        return role === "parent" ? <SeniorTodayScreen /> : <CareCircleTodayScreen />;
      case "care":
        return <StableScreen text="Journey stable" />;
      case "family":
        return <StableScreen text="Love wall stable" />;
      case "control":
        return role === "parent" ? <SeniorControlScreen /> : <CareCircleControlScreen />;
      default:
        return role === "parent" ? <SeniorTodayScreen /> : <CareCircleTodayScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf7f2] to-[#f3eee7] flex justify-center p-4">
      <div className="w-full max-w-md pb-28">
        {sosEscalated && (
          <div className="mb-4 rounded-3xl bg-red-50 border border-red-100 p-4">
            <div className="flex items-center gap-3">
              <Ambulance className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium">Ambulance escalation active</p>
                <p className="text-sm text-zinc-500">
                  ETA 8 mins • Rahul notified • tracking started
                </p>
              </div>
            </div>
          </div>
        )}

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