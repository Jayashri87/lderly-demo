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
  AlertTriangle,
  CalendarDays,
  TrendingUp,
  Brain,
} from "lucide-react";

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

const trendData = [
  { day: "M", score: 92 },
  { day: "T", score: 88 },
  { day: "W", score: 90 },
  { day: "T", score: 94 },
  { day: "F", score: 93 },
  { day: "S", score: 95 },
  { day: "S", score: 96 },
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
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-lg">
        <h2 className="text-xl font-semibold">AI Risk Intelligence</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Fall Risk: Low
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            Loneliness: Mild
          </span>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
            Adherence: Strong
          </span>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            Mood: Positive
          </span>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">7-Day Wellness Trend</h2>
          <TrendingUp className="w-5 h-5 text-zinc-400" />
        </div>
        <div className="mt-4 flex items-end justify-between gap-2 h-24">
          {trendData.map((item) => (
            <div key={item.day} className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-full rounded-t-xl bg-black"
                style={{ height: `${item.score}%` }}
              />
              <span className="text-[10px] text-zinc-500">{item.day}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <Brain className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-zinc-800">AI Recommendation</p>
            <p className="text-xs text-zinc-500 mt-1">
              Recommend adding 2 evening companion calls this week.
            </p>
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