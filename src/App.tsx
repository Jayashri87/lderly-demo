import React, { useMemo, useState } from "react";
import { Bell, Heart, ShieldAlert, Sparkles, UserRound } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("today");

  const tabs = useMemo(
    () => [
      { key: "today", label: "Today", icon: "🏠" },
      { key: "journey", label: "Journey", icon: "🗺️" },
      { key: "circle", label: "Circle", icon: "❤️" },
      { key: "control", label: "Control", icon: "🆘" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex justify-center p-4 md:p-6">
      <div className="relative w-full max-w-md overflow-hidden rounded-[40px] bg-gradient-to-b from-[#FFFFFF] to-[#F6EFE6] shadow-2xl border border-[#EEE6DA] p-4 pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#DDE9DD_0,transparent_35%),radial-gradient(circle_at_20%_40%,#F7E7E7_0,transparent_30%)] opacity-90" />

        <div className="relative z-10">
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-[#EEE6DA]">
                <UserRound className="w-5 h-5 text-[#1F2937]" />
              </div>
              <div>
                <p className="text-xs text-[#6B7280]">Care Circle • Live</p>
                <p className="font-semibold text-[#1F2937]">
                  Good evening, Jayanth
                </p>
              </div>
            </div>
            <button className="h-11 w-11 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg flex items-center justify-center border border-[#EEE6DA]">
              <Bell className="w-5 h-5 text-[#1F2937]" />
            </button>
          </header>

          <section className="rounded-[32px] p-5 bg-gradient-to-br from-[#1F2937] to-[#374151] text-white shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-white/70">Today’s reassurance</p>
                <h1 className="text-2xl font-semibold leading-tight mt-1">
                  Mom is calm, meds due at 8 PM
                </h1>
              </div>
              <div className="h-14 w-14 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-inner">
                <Heart className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#DDE9DD]/20 p-3 backdrop-blur-xl border border-white/10">
                <p className="text-xs text-white/70">Caretaker ETA</p>
                <p className="font-semibold mt-1">18 mins</p>
              </div>
              <div className="rounded-2xl bg-[#DCEBFA]/20 p-3 backdrop-blur-xl border border-white/10">
                <p className="text-xs text-white/70">Family check-in</p>
                <p className="font-semibold mt-1">8:00 PM</p>
              </div>
            </div>
          </section>

          <section className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-[#1F2937]">Care timeline</h2>
              <span className="text-xs px-3 py-1 rounded-full bg-[#D8F1EC] text-[#2E7D6B] shadow-sm">
                Live
              </span>
            </div>

            <div className="space-y-3">
              {[
                ["Visit scheduled", "Tomorrow 9:00 AM", "🗓️", "#DDE9DD"],
                ["Caretaker en route", "Tracking active", "🚶", "#D8F1EC"],
                [
                  "Medicine completed",
                  "Dinner + BP tablet done",
                  "✅",
                  "#DCEBFA",
                ],
              ].map(([title, sub, emoji, bg]) => (
                <div
                  key={title}
                  className="rounded-[28px] bg-white/90 backdrop-blur-2xl border border-[#EEE6DA] shadow-lg p-4 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center text-xl shadow-sm"
                      style={{ backgroundColor: bg as string }}
                    >
                      {emoji}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F2937]">{title}</p>
                      <p className="text-sm text-[#6B7280]">{sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-5 rounded-[28px] bg-[#F7E7E7] border border-[#FDE8D8] shadow-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[#F49B8A] text-white flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-[#1F2937]">
                  Voice note from Rahul
                </p>
                <p className="text-sm text-[#6B7280]">
                  See you Sunday, Amma ❤️
                </p>
              </div>
            </div>
          </section>

          <section className="mt-5 grid grid-cols-3 gap-3">
            {[
              ["Medicine", "8 PM", "#DDE9DD"],
              ["Visit", "18 min", "#D8F1EC"],
              ["Family", "1 note", "#FDE8D8"],
            ].map(([label, value, bg]) => (
              <button
                key={label}
                className="rounded-[24px] p-3 text-left shadow-md border border-[#EEE6DA]"
                style={{ backgroundColor: bg as string }}
              >
                <p className="text-xs text-[#6B7280]">{label}</p>
                <p className="font-semibold text-[#1F2937] mt-1">{value}</p>
              </button>
            ))}
          </section>
        </div>

        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[min(92vw,420px)] px-3">
          <div className="grid grid-cols-4 gap-2 rounded-[30px] bg-white/85 backdrop-blur-2xl border border-[#EEE6DA] shadow-2xl p-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-2xl py-3 flex flex-col items-center gap-1 transition-all ${
                  activeTab === tab.key
                    ? "bg-[#1F2937] text-white shadow-lg"
                    : "text-[#6B7280] hover:bg-[#F6EFE6]"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-[11px] font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button className="absolute right-4 bottom-28 h-16 w-16 rounded-3xl bg-[#EF4444] text-white shadow-2xl flex items-center justify-center">
          <ShieldAlert className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}