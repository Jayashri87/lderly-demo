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

  // 🚗 moving caretaker simulation on real route
  React.useEffect(() => {
    if (!realRoute.length) return;

    const timer = setInterval(() => {
      setRouteIndex((prev) => {
        const next = prev + 1;

        if (next < realRoute.length - 1) {
          setRealEta((eta) => Math.max(1, eta - 1));
          return next;
        }

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
            {parentStatus?.name || "Mom"} is safe 💚
          </h1>
        </div>
      </section>
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

    const arrived =
      realRoute.length > 0 && routeIndex >= realRoute.length - 2;

    return (
      <div className="space-y-4">
        <div className="rounded-full bg-black text-white px-4 py-2 text-xs inline-flex items-center gap-2">
          <Users className="w-4 h-4" />
          4 family members tracking live
        </div>

        <div className={`${card} p-4`}>
          <div className="flex items-center justify-between text-[10px] text-zinc-500">
            {["Accepted", "En route", "Arrived", "Task", "Proof", "Done"].map(
              (step, i) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      i <= (arrived ? 2 : 1) ? "bg-black" : "bg-zinc-300"
                    }`}
                  />
                  <span className="mt-2">{step}</span>
                </div>
              )
            )}
          </div>
        </div>

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

          <motion.div
            key={realEta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 left-4 rounded-3xl bg-white/90 backdrop-blur-xl px-4 py-3 shadow-lg"
          >
            {journey?.caretakerName} •{" "}
            {arrived ? "Arrived" : `${realEta} mins`} • High confidence
          </motion.div>

          <div className="absolute top-20 left-4 rounded-2xl bg-white/90 px-4 py-2 shadow-lg text-xs flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            Destination locked • Parent Home
          </div>

          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            className="absolute bottom-0 left-0 right-0 rounded-t-[36px] bg-white/95 backdrop-blur-xl p-4 shadow-2xl"
          >
            <p className="font-medium">
              {arrived
                ? "Caretaker arrived • Uploading proof"
                : "Live route to parent home"}
            </p>

            <div className="mt-2 h-2 rounded-full bg-zinc-200 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-black to-zinc-400"
                animate={{
                  width: arrived
                    ? "100%"
                    : `${(routeIndex / realRoute.length) * 100}%`,
                }}
              />
            </div>

            <div className="mt-4 rounded-2xl bg-zinc-50 p-3 flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {arrived
                ? "Medicine started ✓ Hydration next"
                : "Arrival proof ready → medicine photo + hydration log"}
            </div>
          </motion.div>
        </div>

        <div className={`${card} p-4 flex items-center gap-3`}>
          <ClipboardCheck className="w-5 h-5 text-sky-600" />
          Care workflow: arrival → meds → hydration → walk → upload proof
        </div>
      </div>
    );
  };

  const FeedScreen = () => (
    <div className="space-y-3">
      {feed.map((item) => (
        <div
          key={item.id}
          className="rounded-[30px] overflow-hidden bg-white shadow-xl"
        >
          <div className="relative h-48">
            <img
              src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=1200"
              className="w-full h-full object-cover"
              alt="care proof"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-medium text-sm">{item.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ControlScreen = () => (
    <div className="space-y-4">
      <div className="flex gap-3 overflow-x-auto">
        {[
          [Stethoscope, "Doctor Consult", "from-white to-zinc-100"],
          [FlaskConical, "Lab Pickup", "from-violet-50 to-white"],
          [HeartHandshake, "Companion Outing", "from-amber-50 to-white"],
        ].map(([Icon, label, tone]: any) => (
          <div
            key={label}
            className={`rounded-[30px] bg-gradient-to-br ${tone} p-5 shadow-xl min-w-[220px]`}
          >
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