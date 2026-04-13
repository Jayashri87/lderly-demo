import * as React from "react";
import { Home, MapPinned, Bell, Settings, ShieldAlert, Pill, Footprints, Smile } from "lucide-react";

const careEvents = [
  { icon: Pill, text: "Morning medicines completed", time: "8:30 AM" },
  { icon: Footprints, text: "Walk completed · 1,240 steps", time: "9:10 AM" },
  { icon: Smile, text: "Mood calm and engaged", time: "9:25 AM" },
];

export default function App() {
  const [activeTab, setActiveTab] = React.useState("today");

  const renderToday = () => (
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
          <h2 className="text-xl font-semibold">Care Story</h2>
          <span className="text-xs text-zinc-400">Today</span>
        </div>
        <div className="mt-4 space-y-3">
          {careEvents.map((event) => {
            const Icon = event.icon;
            return (
              <div key={event.text} className="flex items-center justify-between rounded-2xl bg-zinc-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 shadow-sm"><Icon className="w-4 h-4" /></div>
                  <p className="text-sm font-medium text-zinc-700">{event.text}</p>
                </div>
                <span className="text-xs text-zinc-400">{event.time}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-emerald-700">AI Confidence</p>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">92%</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-zinc-700">
          Dad had a calm morning, completed his walk, and is socially engaged. No risk signals detected.
        </p>
      </section>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "today":
        return renderToday();
      case "care":
        return <div className="rounded-3xl bg-white p-6 shadow-lg">Live care journey, ETA, check-in, and proof timeline.</div>;
      case "updates":
        return <div className="rounded-3xl bg-white p-6 shadow-lg">Daily reassurance feed, photos, and visit summaries.</div>;
      case "control":
        return <div className="rounded-3xl bg-white p-6 shadow-lg">Billing, doctors, emergency contacts, concierge, and preferences.</div>;
      default:
        return renderToday();
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
                  className={`flex flex-col items-center gap-1 rounded-2xl py-2 ${active ? "bg-black text-white" : "text-zinc-500"}`}
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
