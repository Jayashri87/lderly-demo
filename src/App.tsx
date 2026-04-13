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
  CheckCircle2,
} from "lucide-react";
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
    }

    loadData();
  }, []);

  const TodayScreen = () => (
    <div className="space-y-4">
      <section className="rounded-[32px] bg-white p-5 shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=1200"
          alt="Parent"
          className="w-full h-48 object-cover rounded-3xl"
        />
        <div className="mt-4">
          <p className="text-sm text-zinc-500">
            Seen {parentStatus?.lastSeen} · Safe: {parentStatus?.safe ? "Yes" : "No"}
          </p>
          <h1 className="text-3xl font-bold mt-1">
            {parentStatus?.name || "Parent"} is safe 💚
          </h1>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">7-Day Wellness Trend</h2>
          <TrendingUp className="w-5 h-5 text-zinc-400" />
        </div>
        <div className="mt-4 flex items-end gap-2 h-24">
          {[92, 88, 90, 94, 93, 95, 96].map((score, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-xl bg-black"
              style={{ height: `${score}%` }}
            />
          ))}
        </div>
      </section>
    </div>
  );

  const JourneyScreen = () => (
    <div className="space-y-4">
      <section className="rounded-[32px] bg-white p-5 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
            alt="Caretaker"
            className="w-14 h-14 rounded-2xl object-cover"
          />
          <div>
            <p className="font-semibold">
              {journey?.caretakerName} · Verified Caretaker
            </p>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {journey?.rating} · Arriving in {journey?.eta}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl overflow-hidden shadow-lg">
        {journey && (
          <MapContainer
            center={[journey.lat, journey.lng]}
            zoom={13}
            style={{ height: "220px", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[journey.lat, journey.lng]}>
              <Popup>{journey.caretakerName} arriving in {journey.eta}</Popup>
            </Marker>
          </MapContainer>
        )}
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Live Care Journey</h2>
        <div className="space-y-3">
          {[
            "Caretaker assigned",
            "En route",
            "Checked in",
            "Medicines done",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <p className="text-sm text-zinc-700">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const FeedScreen = () => (
    <div className="space-y-4">
      {feed.map((item) => (
        <div key={item.id} className="rounded-3xl bg-white p-5 shadow-lg">
          <p className="text-sm font-semibold">{item.title}</p>
          <p className="text-xs text-zinc-500 mt-1">{item.subtitle}</p>
          <span className="text-[10px] text-zinc-400">{item.time}</span>
        </div>
      ))}

      <a
        href="https://wa.me/919999999999?text=Hi%20Priya,%20how%20is%20mom%20doing%20now%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-3xl bg-green-500 text-white p-5 flex items-center gap-3 shadow-lg"
      >
        <MessageCircle className="w-5 h-5" />
        Chat with caretaker on WhatsApp
      </a>
    </div>
  );

  const ControlScreen = () => (
    <div className="space-y-4">
      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-white p-4 shadow-lg">
          <Wallet className="w-5 h-5 mb-2" />
          <p className="text-xs text-zinc-500">ARPU Today</p>
          <p className="text-2xl font-bold">₹{control?.arpu}</p>
        </div>
        <div className="rounded-3xl bg-white p-4 shadow-lg">
          <ArrowUpRight className="w-5 h-5 mb-2" />
          <p className="text-xs text-zinc-500">Upgrades</p>
          <p className="text-2xl font-bold">{control?.upgrades}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-orange-100 bg-orange-50 p-5">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-orange-600" />
          <div>
            <p className="font-semibold">Family Network</p>
            <p className="text-xs text-zinc-500 mt-1">
              Add sibling, spouse, doctor, emergency contact
            </p>
          </div>
        </div>
      </section>
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
    <div className="min-h-screen bg-zinc-100 flex justify-center">
      <div className="w-full max-w-md min-h-screen p-4 pb-32">
        {renderContent()}

        <div className="fixed bottom-24 right-6">
          <button className="rounded-full bg-red-500 text-white p-4 shadow-2xl animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </button>
          <p className="text-[10px] text-zinc-500 mt-2 text-center">
            Alerts family + doctor
          </p>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 p-4">
          <div className="max-w-md mx-auto grid grid-cols-4 rounded-3xl bg-white p-2 shadow-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-col items-center gap-1 rounded-2xl py-2 ${
                    active ? "bg-black text-white" : "text-zinc-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[11px] font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
