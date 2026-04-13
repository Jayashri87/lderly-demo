import * as React from "react";
import {
  Home,
  MapPinned,
  Bell,
  Settings,
  ShieldAlert,
  Pill,
  Footprints,
  Smile,
  Camera,
  Clock3,
  User,
  CheckCircle2,
  Mic,
  AlertTriangle,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

const careEvents = [
  { icon: Pill, text: "Morning medicines completed", time: "8:30 AM" },
  { icon: Footprints, text: "Walk completed · 1,240 steps", time: "9:10 AM" },
  { icon: Smile, text: "Mood calm and engaged", time: "9:25 AM" },
];

const checkpoints = [
  "Caretaker assigned",
  "En route",
  "Checked in",
  "Medicines done",
  "Walk completed",
  "Photo proof uploaded",
  "AI summary sent",
];

const feedItems = [
  { icon: Pill, title: "Medicine confirmed", subtitle: "Blister pack photo uploaded · 8:30 AM" },
  { icon: Camera, title: "Proof of care", subtitle: "Smiling parent snapshot shared" },
  { icon: Smile, title: "Mood update", subtitle: "Calm and socially engaged" },
  { icon: AlertTriangle, title: "AI risk alert", subtitle: "Loneliness mild · recommend evening call" },
];

export default function App() {
  const [activeTab, setActiveTab] = React.useState("today");

  const TodayScreen = () => (
    <div className="space-y-4">
      <section className="rounded-[32px] bg-black text-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-60">Today’s reassurance</p>
            <h1 className="text-4xl font-bold mt-2">Mom is safe 💚</h1>
            <p className="text-sm opacity-70 mt-2">Last checked 2 mins ago</p>
          </div>
          <span className="text-xs bg-white/10 rounded-full px-3 py-1">ETA 14 min</span>
        </div>
        <button className="mt-5 w-full rounded-2xl bg-white text-black py-4 font-semibold">
          Track Live Care
        </button>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Medicine Loop</h2>
          <span className="text-xs text-emerald-600 font-semibold">7 day streak</span>
        </div>
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl bg-zinc-50 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Next dose due</p>
              <p className="text-xs text-zinc-500">Vitamin D · 8:00 PM</p>
            </div>
            <div className="rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs">Due soon</div>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Refill reminder</p>
              <p className="text-xs text-zinc-500">Blood pressure meds · 2 days left</p>
            </div>
            <Pill className="w-4 h-4 text-zinc-500" />
          </div>

          <div className="rounded-2xl bg-red-50 border border-red-100 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-red-700">Missed dose alert</p>
              <p className="text-xs text-zinc-500">Caregiver notified · escalation in 20 mins</p>
            </div>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tomorrow Schedule</h2>
          <CalendarDays className="w-5 h-5 text-zinc-400" />
        </div>
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-700">
            8:00 AM · Morning medicine + BP check
          </div>
          <div className="rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-700">
            11:00 AM · Caretaker revisit
          </div>
          <div className="rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-700">
            7:00 PM · Evening reassurance call
          </div>
        </div>
      </section>
    </div>
  );

  const JourneyScreen = () => (
    <div className="space-y-4">
      <section className="rounded-[32px] bg-white p-5 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-zinc-100 p-3"><User className="w-6 h-6" /></div>
          <div>
            <p className="font-semibold">Priya · Verified Caretaker</p>
            <p className="text-sm text-zinc-500">Arriving in 14 mins</p>
          </div>
          <div className="ml-auto rounded-full bg-black text-white px-3 py-1 text-xs flex items-center gap-1">
            <Clock3 className="w-3 h-3" /> ETA
          </div>
        </div>
      </section>
      <section className="rounded-3xl bg-white p-5 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Live Care Journey</h2>
        <div className="space-y-3">
          {checkpoints.map((item, idx) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className={`w-5 h-5 ${idx < 4 ? "text-emerald-600" : "text-zinc-300"}`} />
              <p className="text-sm text-zinc-700">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const FeedScreen = () => (
    <div className="space-y-4">
      {feedItems.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="rounded-3xl bg-white p-5 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-zinc-100 p-2"><Icon className="w-4 h-4" /></div>
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-zinc-500 mt-1">{item.subtitle}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const ControlScreen = () => (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      Billing, concierge upgrades, emergency contacts, doctor preferences, and admin controls.
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "today": return <TodayScreen />;
      case "care": return <JourneyScreen />;
      case "updates": return <FeedScreen />;
      case "control": return <ControlScreen />;
      default: return <TodayScreen />;
    }
  };

  const tabs = [
    { key: "today", label: "Today", icon: Home },
    { key: "care", label: "Journey", icon: MapPinned },
    { key: "updates", label: "Feed", icon: Bell },
    { key: "control", label: "Control", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center">
      <div className="w-full max-w-md min-h-screen p-4 pb-28">
        {renderContent()}
        <button className="fixed bottom-24 right-6 rounded-full bg-red-500 text-white p-4 shadow-2xl animate-pulse">
          <ShieldAlert className="w-6 h-6" />
        </button>
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