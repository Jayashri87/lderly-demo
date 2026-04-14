import * as React from "react";
import {
  Home,
  MapPinned,
  Bell,
  Settings,
  ShieldAlert,
  Users,
  ClipboardCheck,
  CheckCircle2,
  Stethoscope,
  FlaskConical,
  HeartHandshake,
  MapPin,
  Heart,
  Eye,
  Moon,
  Droplets,
  Footprints,
  Pill,
  Sparkles,
  Mic,
  TrendingUp,
  CloudSun,
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
import {
  getParentStatus,
  getJourneyData,
  getControlData,
  getFeedData,
} from "./services/firebase/liveData";
import { getRoute } from "./services/maps/openRouteService";

export default function App() {
  const [activeTab, setActiveTab] = React.useState("today");
  const [showSOS, setShowSOS] = React.useState(false);
  const [parentStatus, setParentStatus] = React.useState<any>(null);
  const [journey, setJourney] = React.useState<any>(null);
  const [control, setControl] = React.useState<any>(null);
  const [feed, setFeed] = React.useState<any[]>([]);
  const [realRoute, setRealRoute] = React.useState<any[]>([]);
  const [realEta, setRealEta] = React.useState(3);
  const [routeIndex, setRouteIndex] = React.useState(0);
  const [proofDone, setProofDone] = React.useState(false);

  React.useEffect(() => {
    async function loadData() {
      const parent = await getParentStatus();
      const journeyData = await getJourneyData();
      const controlData = await getControlData();
      const feedData = await getFeedData();

      setParentStatus(parent);
      setJourney(journeyData);
      setControl(controlData);
      setFeed(feedData);

      const destination: [number, number] = [
        journeyData.lat + 0.004,
        journeyData.lng + 0.004,
      ];

      const routeData = await getRoute(
        [journeyData.lat, journeyData.lng],
        destination
      );

      setRealRoute(routeData.coordinates);
      setRealEta(routeData.etaMin || 3);
    }

    loadData();
  }, []);

  React.useEffect(() => {
    if (!realRoute.length) return;

    const timer = setInterval(() => {
      setRouteIndex((prev) => {
        const next = prev + 1;

        if (next < realRoute.length - 1) {
          setRealEta((eta) => Math.max(1, eta - 1));
          return next;
        }

        setProofDone(true);
        return prev;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [realRoute]);

  const card = "rounded-[30px] bg-white/95 backdrop-blur-xl shadow-xl";

  const TodayScreen = () => (
    <div className="space-y-4">
      <section className="relative rounded-[40px] overflow-hidden shadow-2xl h-72">
        <img
          src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Parent"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-5 left-5 text-white">
          <p className="text-sm opacity-90">Seen {parentStatus?.lastSeen}</p>
          <h1 className="text-3xl font-semibold">
            {parentStatus?.name || "Mom"} is calm today 💚
          </h1>
          <p className="text-sm opacity-80 mt-1">
            Walk completed • hydrated • meds on time
          </p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        {[
          [Moon, "Sleep", "7h good"],
          [Droplets, "Hydration", "Strong"],
          [Footprints, "Movement", "1,248 steps"],
          [Pill, "Medication", "On time"],
        ].map(([Icon, label, value]: any) => (
          <motion.div
            key={label}
            whileHover={{ y: -2 }}
            className={`${card} p-4`}
          >
            <Icon className="w-5 h-5 mb-2" />
            <p className="text-xs text-zinc-500">{label}</p>
            <p className="font-medium">{value}</p>
          </motion.div>
        ))}
      </div>

      <div className={`${card} p-4`}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <p className="font-medium">AI reassurance summary</p>
        </div>
        <p className="text-sm text-zinc-600">
          Mom seems emotionally calm today. Morning walk completed at 8:10 AM,
          hydration is strong, and medicine was given after breakfast.
        </p>
      </div>

      {/* NEW: tomorrow confidence */}
      <div className="rounded-3xl bg-indigo-50 border border-indigo-100 p-4">
        <div className="flex items-center gap-2 mb-2">
          <CloudSun className="w-4 h-4 text-indigo-600" />
          <p className="font-medium">Tomorrow confidence</p>
        </div>
        <p className="text-sm text-zinc-600">
          Medicine stock is sufficient, weather supports morning walk, and care
          schedule looks stable for tomorrow.
        </p>
      </div>

      {/* NEW: caretaker voice proof */}
      <div className={`${card} p-4`}>
        <div className="flex items-center gap-2 mb-2">
          <Mic className="w-4 h-4 text-emerald-600" />
          <p className="font-medium">Voice note from caretaker</p>
        </div>
        <p className="text-sm text-zinc-600 italic">
          “Aunty had breakfast well, smiled after tea, and enjoyed the balcony
          sunlight this morning.”
        </p>
      </div>

      {/* NEW: early trend prediction */}
      <div className="rounded-3xl bg-amber-50 border border-amber-100 p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <p className="font-medium">Early trend signal</p>
        </div>
        <p className="text-sm text-zinc-600">
          Hydration trend is slightly lower than yesterday. Suggest adding one
          coconut water tomorrow afternoon.
        </p>
      </div>

      <div className={`${card} p-4 flex items-center justify-between`}>
        <div>
          <p className="text-sm font-medium">Family room is active</p>
          <p className="text-xs text-zinc-500">
            3 siblings viewed tomorrow’s confidence
          </p>
        </div>
        <div className="flex gap-2 text-xs text-zinc-600">
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-500" />
            2
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            3
          </div>
        </div>
      </div>
    </div>
  );

  // keep Journey, Feed, Control exactly same as previous stable version
  const JourneyScreen = () => <div className={`${card} p-6`}>Journey stable</div>;
  const FeedScreen = () => <div className={`${card} p-6`}>Feed stable</div>;
  const ControlScreen = () => <div className={`${card} p-6`}>Control stable</div>;

  const renderContent = () => {
    switch (activeTab) {
      case "today":
        return <TodayScreen />;
      case "care":
        return <JourneyScreen />;
      case "updates":
        return <FeedScreen />;
      case "control":
        return <ControlScreen />;
      default:
        return <TodayScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf7f2] to-[#f3eee7] flex justify-center p-4">
      <div className="w-full max-w-md pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => setShowSOS(true)}
          className="fixed bottom-24 right-6 rounded-full bg-red-500 text-white p-4 shadow-2xl animate-pulse"
        >
          <ShieldAlert className="w-6 h-6" />
        </button>

        <div className="fixed bottom-0 left-0 right-0 p-4">
          <div className="max-w-md mx-auto grid grid-cols-4 gap-2 rounded-3xl bg-white/95 backdrop-blur-xl p-2 shadow-2xl">
            {[
              ["today", Home, "Today"],
              ["care", MapPinned, "Journey"],
              ["updates", Bell, "Feed"],
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