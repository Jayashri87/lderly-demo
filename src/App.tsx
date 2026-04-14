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
  Moon,
  Droplets,
  Footprints,
  Pill,
  MessageCircleHeart,
  CheckCircle2,
  IndianRupee,
  FileText,
  ClipboardPlus,
  Siren,
  Ambulance,
  AlertTriangle,
  X,
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
} from "./services/firebase/liveData";
import { getRoute } from "./services/maps/openRouteService";

type FamilyEvent = {
  id: number;
  actor: string;
  title: string;
  time: string;
  reactions: number;
};

export default function App() {
  const [activeTab, setActiveTab] = React.useState("today");
  const [showSOS, setShowSOS] = React.useState(false);
  const [crisisLevel, setCrisisLevel] = React.useState<
    "watch" | "urgent" | "critical"
  >("watch");

  const [parentStatus, setParentStatus] = React.useState<any>(null);
  const [journey, setJourney] = React.useState<any>(null);
  const [realRoute, setRealRoute] = React.useState<any[]>([]);
  const [realEta, setRealEta] = React.useState(3);
  const [routeIndex, setRouteIndex] = React.useState(0);

  const familyEvents: FamilyEvent[] = [
    {
      id: 1,
      actor: "Doctor",
      title: "BP dropped slightly after evening walk",
      time: "6:10 PM",
      reactions: 4,
    },
    {
      id: 2,
      actor: "Caretaker",
      title: "Mom feels dizzy and resting in bedroom",
      time: "6:18 PM",
      reactions: 5,
    },
  ];

  const doctorNotes = [
    {
      id: 1,
      doctor: "Dr. Mehta",
      note: "Watch BP tonight. Escalate if dizziness continues.",
      prescription: "Hydration + BP tablet after dinner",
      followUp: "Immediate if symptoms worsen",
    },
  ];

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
      setRealEta(routeData.etaMin || 3);
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
            {parentStatus?.name || "Mom"} needs attention tonight 🧡
          </h1>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        {[
          [Moon, "Sleep", "Light"],
          [Droplets, "Hydration", "Needs support"],
          [Footprints, "Movement", "Low"],
          [Pill, "Medication", "Scheduled"],
        ].map(([Icon, label, value]: any) => (
          <div key={label} className={`${card} p-4`}>
            <Icon className="w-5 h-5 mb-2" />
            <p className="text-xs text-zinc-500">{label}</p>
            <p className="font-medium">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const JourneyScreen = () => {
    const currentPos =
      realRoute.length > 0
        ? realRoute[routeIndex]
        : journey
        ? [journey.lat, journey.lng]
        : [12.9716, 77.5946];

    const destination = journey
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
            <Popup>Parent Home</Popup>
          </Marker>
          <Polyline positions={realRoute} />
          <Circle center={destination as any} radius={80} />
        </MapContainer>
      </div>
    );
  };

  const FamilyScreen = () => (
    <div className="space-y-4">
      <div className="rounded-3xl bg-red-50 border border-red-100 p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <p className="font-medium">
            Crisis level: {crisisLevel.toUpperCase()}
          </p>
        </div>
        <p className="text-sm text-zinc-600 mt-2">
          Family broadcast active. Doctor note continuity preserved.
        </p>
      </div>

      {familyEvents.map((event) => (
        <div key={event.id} className={`${card} p-4`}>
          <div className="flex justify-between">
            <p className="font-medium">{event.actor}</p>
            <p className="text-xs text-zinc-500">{event.time}</p>
          </div>
          <p className="text-sm text-zinc-600 mt-2">{event.title}</p>
          <div className="flex items-center gap-2 mt-3 text-pink-600">
            <MessageCircleHeart className="w-4 h-4" />
            <span className="text-xs">{event.reactions} sibling reactions</span>
          </div>
        </div>
      ))}

      {doctorNotes.map((note) => (
        <div key={note.id} className="rounded-3xl bg-blue-50 border border-blue-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <p className="font-medium">{note.doctor}</p>
          </div>
          <p className="text-sm text-zinc-700">{note.note}</p>
          <p className="text-sm text-zinc-600 mt-2">{note.prescription}</p>
          <p className="text-xs text-zinc-500 mt-1">{note.followUp}</p>
        </div>
      ))}

      <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-4">
        <div className="flex items-center gap-2">
          <Ambulance className="w-4 h-4 text-emerald-600" />
          <p className="font-medium">Ambulance dispatch ready</p>
        </div>
        <p className="text-sm text-zinc-600 mt-2">
          Nearest verified hospital partner can be triggered after family approval.
        </p>
      </div>
    </div>
  );

  const ControlScreen = () => (
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

        <p className="text-sm text-zinc-600 mt-4">
          Alert siblings, caretaker, and prepare ambulance-ready dispatch.
        </p>

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
          Confirm family broadcast
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "today":
        return <TodayScreen />;
      case "care":
        return <JourneyScreen />;
      case "family":
        return <FamilyScreen />;
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
          <motion.div key={activeTab}>{renderContent()}</motion.div>
        </AnimatePresence>

        <button
          onClick={() => setShowSOS(true)}
          className="fixed bottom-24 right-6 rounded-full bg-red-500 text-white p-4 shadow-2xl animate-pulse"
        >
          <ShieldAlert className="w-6 h-6" />
        </button>

        {showSOS && <SOSModal />}

        <div className="fixed bottom-0 left-0 right-0 p-4">
          <div className="max-w-md mx-auto grid grid-cols-4 gap-2 rounded-3xl bg-white/95 p-2 shadow-2xl">
            {[
              ["today", Home, "Today"],
              ["care", MapPinned, "Journey"],
              ["family", Users, "Family"],
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