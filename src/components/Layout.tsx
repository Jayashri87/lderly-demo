import * as React from "react";
import { motion } from "motion/react";
import { Heart, Calendar, Pill, Settings, User } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout = ({ children, activeTab, onTabChange }: LayoutProps) => {
  const tabs = [
    { id: "dashboard", label: "Today", icon: Heart },
    { id: "meds", label: "Meds", icon: Pill },
    { id: "appointments", label: "Visits", icon: Calendar },
    { id: "profile", label: "Me", icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">CareCompanion</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Settings className="w-6 h-6 text-slate-500" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 z-40">
        <div className="max-w-2xl mx-auto flex justify-around items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all",
                  isActive ? "text-blue-600 bg-blue-50" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                <Icon className={cn("w-7 h-7", isActive && "fill-current")} />
                <span className="text-xs font-bold uppercase tracking-wider">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
