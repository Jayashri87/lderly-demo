import * as React from "react";
import { motion } from "motion/react";
import { Bell, ChevronLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  variant?: "teal" | "gold" | "warm";
}

export function Header({ 
  title, 
  subtitle, 
  showBack, 
  onBack, 
  rightElement,
  variant = "teal" 
}: HeaderProps) {
  const bgClass = {
    teal: "bg-brand-teal text-brand-warm",
    gold: "bg-brand-gold text-white",
    warm: "bg-brand-warm text-brand-teal",
  }[variant];

  return (
    <header className={`p-6 pt-12 rounded-b-[48px] mb-8 shadow-xl ${bgClass}`}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          {showBack && (
            <button 
              onClick={onBack}
              className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-serif font-bold leading-tight">{title}</h1>
            {subtitle && <p className="opacity-70 font-medium text-sm">{subtitle}</p>}
          </div>
        </div>
        {rightElement || (
          <button className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md relative">
            <Bell className="w-6 h-6" />
            <div className="absolute top-3 right-3 w-2 h-2 bg-brand-gold rounded-full" />
          </button>
        )}
      </div>
    </header>
  );
}
