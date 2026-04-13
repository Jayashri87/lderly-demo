import * as React from "react";
import {
  Home,
  MapPinned,
  Bell,
  Settings,
  ShieldAlert,
  TrendingUp,
  MessageCircle,
  Users,
  Wallet,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  getParentStatus,
  getJourneyData,
  getControlData,
  getFeedData,
} from "./services/firebase/liveData";

export default function App() {
  const [activeTab, setActiveTab] = React.useState("today");
  const [parentStatus, setParentStatus] = React.useState<any>(null);
  const [journey, setJourney] = React.useState<any>(null);
  const [control, setControl] = React.useState<any>(null);
  const [feed, setFeed] = React.useState<any[]>([]);
  const [eta, setEta] = React.useState(3);

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
      setEta(parseInt(journeyData?.eta || "3"));
    }

    loadData();
  }, []);

  const TodayScreen = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <section className="relative rounded-[36px] overflow-hidden shadow-2xl h-72">
        <img
          src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Parent"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-4 right-4 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-xs font-medium"
        >
          ● Live safe
        </motion.div>
        <div className="absolute bottom-5 left-5 text-white">
          <p className="text-sm opacity-90">Seen {parentStatus?.lastSeen}</p>
          <h1 className="text-3xl font-semibold mt-1">
            {parentStatus?.name || "Mom"} is safe 💚
          </h1>
          <p className="text-sm opacity-80 mt-1">Priya checked in • BP normal</p>
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">7-Day Wellness Trend</h2>
          <TrendingUp className="w-5 h-5 text-zinc-400" />
        </div>
        <div className="mt-4 flex items-end gap-2 h-24">
          {[92, 88, 90, 94, 93, 95, 96].map((score, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${score}%` }}
              transition={{ delay: i * 0.06 }}
              className="flex-1 rounded-t-xl bg-black"
            />
          ))}
        </div>
      </section>
    </motion.div>
  );

  const JourneyScreen = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="relative h-[420px] rounded-[36px] overflow-hidden shadow-2xl">
        {journey && (
          <MapContainer
            center={[journey.lat, journey.lng]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[journey.lat, journey.lng]}>
              <Popup>{journey.caretakerName}</Popup>
            </Marker>
          </MapContainer>
        )}

        <motion.div
          drag="x"
          dragConstraints={{ left: -40, right: 40 }}
          className="absolute top-4 left-4 rounded-3xl bg-white/90 backdrop-blur px-4 py-3 shadow-lg cursor-grab"
        >
          <p className="font-semibold text-sm">
            {journey?.caretakerName} • {journey?.rating}★
          </p>
          <p className="text-xs text-zinc-500">Arriving in {eta} mins</p>
        </motion.div>

        <motion.a
          whileTap={{ scale: 0.96 }}
          onClick={() => setEta((e) => Math.max(1, e - 1))}
          href="https://wa.me/919999999999?text=Hi%20Priya,%20how%20is%20mom%20doing%20now%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 rounded-2xl bg-green-500 text-white px-4 py-3 text-sm shadow-xl flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </motion.a>

        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="absolute bottom-0 left-0 right-0 rounded-t-[32px] bg-white/95 backdrop-blur p-4 shadow-2xl"
        >
          <p className="text-xs text-zinc-500">Live journey progress</p>
          <div className="mt-2 h-2 rounded-full bg-zinc-200 overflow-hidden">
            <motion.div
              className="h-full bg-black rounded-full"
              initial={{ width: "35%" }}
              animate={{ width: `${100 - eta * 15}%` }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const FeedScreen = () => (
    <div className="space-y-3">
      {feed.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ scale: 1.01 }}
          className="rounded-[28px] bg-white p-5 shadow-lg"
        >
          <p className="font-medium text-sm">{item.title}</p>
          <p className="text-xs text-zinc-500 mt-1">{item.subtitle}</p>
          <span className="text-xs text-zinc-400">{item.time}</span>
        </motion.div>
      ))}
    </div>
  );

  const ControlScreen = () => (
    <div className="space-y-4">
      <div className="flex gap-3 overflow-x-auto">
        <motion.div whileHover={{ y: -2 }} className="rounded-2xl bg-black text-white px-4 py-3 min-w-[140px]">
          <p className="text-xs opacity-70">ARPU</p>
          <p className="text-xl font-semibold">₹{control?.arpu}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="rounded-2xl bg-white border px-4 py-3 min-w-[140px]">
          <p className="text-xs text-zinc-500">Upgrades</p>
          <p className="text-xl font-semibold">{control?.upgrades}</p>
        </motion.div>
      </div>

      <div className="rounded-[28px] border border-orange-100 bg-orange-50 p-5">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-orange-600" />
          <div>
            <p className="font-semibold">Family Network</p>
            <p className="text-xs text-zinc-500 mt-1">
              Add sibling, spouse, doctor, emergency contact
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { key: "today", label: "Today", icon: Home },
    { key: "care", label: "Journey", icon: MapPinned },
    { key: "updates", label: "Feed", icon: Bell },
    { key: "control", label: "Control", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "today": return <TodayScreen />;
      case "care": return <JourneyScreen />;
      case "updates": return <FeedScreen />;
      case "control": return <ControlScreen />;
      default: return <TodayScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] flex justify-center p-4">
      <div className="w-full max-w-md pb-28">
        {renderContent()}

        <div className="fixed bottom-24 right-6">
          <button className="rounded-full bg-red-500 text-white p-4 shadow-2xl animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </button>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4">
          <div className="max-w-md mx-auto grid grid-cols-4 gap-2 rounded-3xl bg-white p-2 shadow-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-2xl py-2 flex flex-col items-center gap-1 ${
                    active ? "bg-black text-white" : "text-zinc-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}