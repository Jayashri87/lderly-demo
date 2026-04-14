import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Heart,
  ShieldAlert,
  Sparkles,
  UserRound,
  ArrowRight,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("today");
  const [medicineConfirmed, setMedicineConfirmed] = useState(false);

  const tabs = useMemo(
    () => [
      { key: "today", label: "Today", icon: "🏠" },
      { key: "journey", label: "Journey", icon: "🗺️" },
      { key: "circle", label: "Circle", icon: "❤️" },
      { key: "control", label: "Control", icon: "🆘" },
    ],
    []
  );

  const renderContent = () => {
    if (activeTab === "journey") {
      const steps = [
        ["Visit scheduled", "Tomorrow 9:00 AM"],
        ["Caretaker en route", "Tracking active"],
        [
          medicineConfirmed ? "Medicine confirmed" : "Medicine pending",
          medicineConfirmed
            ? "Dinner + BP tablet done"
            : "Waiting for confirmation",
        ],
      ];

      return (
        <section className="mt-5">
          <h2 className="font-semibold text-[#1F2937] mb-4">
            Live care journey
          </h2>
          <div className="space-y-4">
            {steps.map(([title, sub], idx) => (
              <div key={title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-4 w-4 rounded-full ${
                      idx === 1
                        ? "bg-[#2E7D6B] ring-4 ring-[#D8F1EC]"
                        : "bg-[#D8F1EC]"
                    } border-2 border-white shadow`}
                  />
                  {idx < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-[#D8F1EC] mt-1" />
                  )}
                </div>
                <div className="flex-1 rounded-[24px] bg-white border border-[#EEE6DA] shadow-md p-4">
                  <p className="font-semibold text-[#1F2937]">{title}</p>
                  <p className="text-sm text-[#6B7280]">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === "circle") {
      return (
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
      );
    }

    if (activeTab === "control") {
      return (
        <section className="mt-5 grid grid-cols-2 gap-3">
          {["Doctor", "Medicine", "Meal", "Mood"].map((item) => (
            <button
              key={item}
              className="rounded-[24px] bg-white border border-[#EEE6DA] shadow-md p-4 text-left"
            >
              <p className="font-semibold text-[#1F2937]">{item}</p>
              <p className="text-sm text-[#6B7280]">Immediate support</p>
            </button>
          ))}
        </section>
      );
    }

    return (
      <>
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
            ["Medicine", medicineConfirmed ? "Done" : "8 PM", "#DDE9DD"],
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
      </>
    );
  };

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
            <button className="h-11 w-11 rounded-2xl bg-white/90 shadow-lg flex items-center justify-center border border-[#EEE6DA]">
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
              <div className="h-14 w-14 rounded-3xl bg-white/10 flex items-center justify-center shadow-inner">
                <Heart className="w-6 h-6" />
              </div>
            </div>

            <button
              onClick={() => setMedicineConfirmed(true)}
              className={`mt-4 w-full rounded-2xl py-3 flex items-center justify-center gap-2 font-semibold ${
                medicineConfirmed
                  ? "bg-[#DDE9DD] text-[#1F2937]"
                  : "bg-white text-[#1F2937]"
              }`}
            >
              {medicineConfirmed
                ? "Medicine confirmed ✅"
                : "Confirm 8 PM medicine"}
              {!medicineConfirmed && <ArrowRight className="w-4 h-4" />}
            </button>
          </section>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
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

        <button className="absolute right-4 bottom-32 h-14 w-14 rounded-3xl bg-[#EF4444] text-white shadow-xl flex items-center justify-center opacity-95">
          <ShieldAlert className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}