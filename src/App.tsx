import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Heart,
  Phone,
  UserRound,
  ArrowRight,
  MapPinned,
  Users,
  ShieldCheck,
} from "lucide-react";
import { JourneyService, CareJourney } from "./services/journeyService";

export default function App() {
  const [activeTab, setActiveTab] = useState("today");
  const [medicineConfirmed, setMedicineConfirmed] = useState(false);
  const [journey, setJourney] = useState<CareJourney | null>(null);

  useEffect(() => {
    const unsubscribe = JourneyService.subscribe((data) => {
      setJourney(data);
      if (data?.status === "completed") {
        setMedicineConfirmed(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const tabs = useMemo(
    () => [
      { key: "today", label: "Today", icon: "🏠" },
      { key: "journey", label: "Journey", icon: "🗺️" },
      { key: "circle", label: "Circle", icon: "❤️" },
      { key: "control", label: "Support", icon: "📞" },
    ],
    []
  );

  const renderContent = () => {
    switch (activeTab) {
      case "journey":
        return (
          <section className="mt-6 space-y-5">
            <div className="rounded-[28px] bg-white border border-[#EEE6DA] shadow-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPinned className="w-5 h-5 text-[#2E7D6B]" />
                <p className="font-semibold text-[#1F2937]">Live caretaker route</p>
              </div>
              <div className="h-64 rounded-[24px] bg-gradient-to-br from-[#DCEBFA] to-[#D8F1EC] relative overflow-hidden">
                <div className="absolute inset-6 border-4 border-white/60 rounded-[20px]" />
                <div className="absolute top-8 left-10 h-3 w-3 rounded-full bg-[#2E7D6B]" />
                <div className="absolute bottom-10 right-12 h-4 w-4 rounded-full bg-[#EF4444]" />
                <div className="absolute left-16 top-16 right-16 bottom-16 border-2 border-dashed border-white/70 rounded-[40px]" />
                <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 px-3 py-2 text-sm text-[#1F2937] shadow">
                  ETA {journey?.eta ?? 18} mins • {journey?.summary ?? "Live tracking"}
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold text-[#1F2937]">
                  {journey?.status === "en_route"
                    ? "Caretaker on the way"
                    : journey?.status === "arrived"
                    ? "Caretaker arrived"
                    : journey?.status === "completed"
                    ? "Visit completed"
                    : "Visit scheduled"}
                </p>
              </div>
            </div>
          </section>
        );
      case "circle":
        return (
          <section className="mt-6 space-y-4">
            <div className="rounded-[28px] bg-[#F7E7E7] border border-[#FDE8D8] shadow-xl p-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-[#F49B8A] text-white flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#1F2937]">Rahul checked in</p>
                  <p className="text-sm text-[#6B7280]">{journey?.summary ?? "Voice note + Sunday visit planned"}</p>
                </div>
              </div>
            </div>
          </section>
        );
      case "control":
        return (
          <section className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              ["Doctor callback", "< 10 mins"],
              ["Medicine refill", "2 hrs"],
              ["Meal support", "45 mins"],
              ["Mood companion", "instant"],
            ].map(([title, sla]) => (
              <button key={title} className="rounded-[24px] bg-white border border-[#EEE6DA] shadow-md p-5 text-left">
                <p className="font-semibold text-[#1F2937]">{title}</p>
                <p className="text-sm text-[#6B7280] mt-1">SLA {sla}</p>
              </button>
            ))}
          </section>
        );
      default:
        return (
          <section className="mt-6">
            <div className="rounded-[28px] bg-white border border-[#EEE6DA] shadow-md p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280]">What matters now</p>
                  <p className="text-xl font-semibold text-[#1F2937] mt-1">
                    {journey?.status === "completed"
                      ? "Visit completed successfully"
                      : `Caretaker arriving in ${journey?.eta ?? 18} mins`}
                  </p>
                </div>
                <ShieldCheck className="w-6 h-6 text-[#2E7D6B]" />
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex justify-center p-4 md:p-6">
      <div className="relative w-full max-w-md md:max-w-2xl xl:max-w-5xl overflow-hidden rounded-[40px] bg-gradient-to-b from-[#FFFFFF] to-[#F6EFE6] shadow-2xl border border-[#EEE6DA] p-4 pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#DDE9DD_0,transparent_35%),radial-gradient(circle_at_20%_40%,#F7E7E7_0,transparent_30%)] opacity-90" />

        <div className="relative z-10">
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-[#EEE6DA]">
                <UserRound className="w-5 h-5 text-[#1F2937]" />
              </div>
              <div>
                <p className="text-xs text-[#6B7280]">LDERLY • Live Care OS</p>
                <p className="font-semibold text-[#1F2937]">Is mom okay right now?</p>
              </div>
            </div>
            <button className="h-11 w-11 rounded-2xl bg-white/90 shadow-lg flex items-center justify-center border border-[#EEE6DA]">
              <Bell className="w-5 h-5 text-[#1F2937]" />
            </button>
          </header>

          <section className="rounded-[32px] p-5 bg-gradient-to-br from-[#1F2937] to-[#374151] text-white shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-white/70">Live status</p>
                <h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold leading-tight mt-1">
                  {journey?.status === "completed" ? "Visit completed" : "Mom is calm and safe"}
                </h1>
              </div>
              <div className="h-14 w-14 rounded-3xl bg-white/10 flex items-center justify-center shadow-inner">
                <Heart className="w-6 h-6" />
              </div>
            </div>
            <button
              onClick={async () => {
                setMedicineConfirmed(true);
                await JourneyService.updateStatus("completed");
              }}
              className={`mt-4 w-full rounded-2xl py-3 flex items-center justify-center gap-2 font-semibold ${
                medicineConfirmed ? "bg-[#DDE9DD] text-[#1F2937]" : "bg-white text-[#1F2937]"
              }`}
            >
              {medicineConfirmed ? "Medicine confirmed ✅" : "Confirm 8 PM medicine"}
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

        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[min(92vw,420px)] md:w-[min(80vw,720px)] px-3">
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

        <a
          href="tel:+919916960524"
          className="absolute right-4 bottom-32 h-14 px-4 rounded-3xl bg-[#EF4444] text-white shadow-xl flex items-center justify-center gap-2 opacity-95"
        >
          <Phone className="w-5 h-5" />
          <span className="text-sm font-medium">Customer Care</span>
        </a>
      </div>
    </div>
  );
}
