"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  UserRound,
} from "lucide-react";
import { JourneyService, CareJourney } from "../services/journeyService";
import LiveMap from "../components/LiveMap";

export default function App() {
  const [activeTab, setActiveTab] = useState("today");
  const [journey, setJourney] = useState<CareJourney | null>(null);

  useEffect(() => {
    // Initialize default data on first load
    JourneyService.updateStatus("idle");

    const unsub = JourneyService.subscribe((data) => {
      setJourney(data);
    });

    return () => unsub();
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
            <LiveMap />
            <div className="rounded-xl bg-white p-4 shadow">
              <p className="font-semibold">Live Journey</p>
              <p>{journey?.summary || "No active journey"}</p>
              <p>ETA: {journey?.eta || 0} mins</p>
              <p>Caretaker: {journey?.caretakerName || "-"}</p>
            </div>
          </section>
        );

      case "control":
        return (
          <section className="mt-6 grid grid-cols-2 gap-4">
            {["Doctor", "Medicine", "Meal", "Companion"].map((item) => (
              <button
                key={item}
                onClick={() => JourneyService.requestService()}
                className="rounded-xl bg-white shadow p-4"
              >
                {item}
              </button>
            ))}
          </section>
        );

      default:
        return (
          <section className="mt-6 space-y-4">
            <div className="rounded-xl bg-white p-5 shadow">
              <p className="text-sm text-gray-600">Live status</p>
              <p className="text-lg font-semibold">
                {journey?.summary || "Safe & stable"}
              </p>
            </div>

            <button
              onClick={() => JourneyService.requestService()}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold"
            >
              🚨 Request Emergency Help
            </button>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-4">

        <header className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <UserRound />
            <div>
              <p className="text-xs text-gray-500">LDERLY</p>
              <p className="font-semibold">Is mom okay right now?</p>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 grid grid-cols-4 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="p-2 bg-gray-100 rounded text-sm"
            >
              <div>{tab.icon}</div>
              <div>{tab.label}</div>
            </button>
          ))}
        </div>

        <a
          href="tel:+919916960524"
          className="fixed bottom-5 right-5 bg-red-500 text-white p-3 rounded-full"
        >
          <Phone />
        </a>
      </div>
    </div>
  );
}