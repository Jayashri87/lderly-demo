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

type FamilyEvent = {
  id: number;
  actor: string;
  title: string;
  time: string;
  reactions: number;
};

type ApprovalItem = {
  id: number;
  title: string;
  approved: number;
  total: number;
  status: "pending" | "approved" | "hold";
};

export default function App() {
  const [activeTab, setActiveTab] = React.useState("today");
  const [parentStatus, setParentStatus] = React.useState<any>(null);
  const [journey, setJourney] = React.useState<any>(null);
  const [feed, setFeed] = React.useState<any[]>([]);
  const [realRoute, setRealRoute] = React.useState<any[]>([]);
  const [realEta, setRealEta] = React.useState(3);
  const [routeIndex, setRouteIndex] = React.useState(0);
  const [proofDone, setProofDone] = React.useState(false);

  const [familyEvents] = React.useState<FamilyEvent[]>([
    {
      id: 1,
      actor: "Caretaker",
      title: "Mom completed breakfast and morning medication",
      time: "8:45 AM",
      reactions: 3,
    },
    {
      id: 2,
      actor: "Doctor",
      title: "BP stable after consultation",
      time: "11:20 AM",
      reactions: 2,
    },
  ]);

  const [approvals, setApprovals] = React.useState<ApprovalItem[]>([
    {
      id: 1,
      title: "Approve Sunday companion outing",
      approved: 1,
      total: 3,
      status: "pending",
    },
  ]);

  const expenseSplit = [
    { name: "Rahul", share: "₹800" },
    { name: "Megha", share: "₹800" },
    { name: "Anita", share: "₹800" },
  ];

  React.useEffect(() => {
    async function loadData() {
      const parent = await getParentStatus();
      const journeyData = await getJourneyData();
      const controlData = await getControlData();
      const feedData = await getFeedData();

      setParentStatus(parent);
      setJourney(journeyData);
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
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        {[
          [Moon, "Sleep", "7h good"],
          [Droplets, "Hydration", "Strong"],
          [Footprints, "Movement", "1,248 steps"],
          [Pill, "Medication", "On time"],
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
      <div className="rounded-3xl bg-black text-white p-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <p className="font-medium">Family Governance Room</p>
        </div>
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
            <span className="text-xs">{event.reactions} reactions</span>
          </div>
        </div>
      ))}

      {approvals.map((item) => (
        <div key={item.id} className="rounded-3xl bg-amber-50 border border-amber-100 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <p className="font-medium">{item.title}</p>
          </div>

          <p className="text-xs text-zinc-600 mt-2">
            {item.approved}/{item.total} approvals
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={() =>
                setApprovals((prev) =>
                  prev.map((a) =>
                    a.id === item.id
                      ? {
                          ...a,
                          approved: Math.min(a.total, a.approved + 1),
                          status:
                            a.approved + 1 >= a.total ? "approved" : "pending",
                        }
                      : a
                  )
                )
              }
              className="rounded-2xl bg-black text-white py-2 text-sm"
            >
              Approve
            </button>

            <button
              onClick={() =>
                setApprovals((prev) =>
                  prev.map((a) =>
                    a.id === item.id ? { ...a, status: "hold" } : a
                  )
                )
              }
              className="rounded-2xl bg-zinc-200 py-2 text-sm"
            >
              Hold
            </button>
          </div>
        </div>
      ))}

      <div className={`${card} p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <IndianRupee className="w-4 h-4" />
          <p className="font-medium">Expense split</p>
        </div>

        <div className="space-y-2">
          {expenseSplit.map((member) => (
            <div
              key={member.name}
              className="flex justify-between text-sm text-zinc-600"
            >
              <span>{member.name}</span>
              <span>{member.share}</span>
            </div>
          ))}
        </div>
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

        <button className="fixed bottom-24 right-6 rounded-full bg-red-500 text-white p-4 shadow-2xl animate-pulse">
          <ShieldAlert className="w-6 h-6" />
        </button>

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