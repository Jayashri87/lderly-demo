import * as React from "react";
import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
  loading?: boolean;
}

export function StatCard({ title, value, icon, trend, color = "text-brand-gold", loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="premium-card p-5 animate-pulse bg-white">
        <div className="w-10 h-10 bg-brand-beige rounded-xl mb-4" />
        <div className="h-3 w-20 bg-brand-beige rounded mb-2" />
        <div className="h-6 w-12 bg-brand-beige rounded" />
      </div>
    );
  }

  return (
    <div className="premium-card p-5 bg-white">
      <div className={`w-10 h-10 bg-brand-beige rounded-xl flex items-center justify-center mb-4 ${color}`}>
        {icon}
      </div>
      <p className="text-[10px] font-black text-brand-teal/30 uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-serif font-bold text-brand-teal">{value}</h3>
        {trend && <span className="text-[10px] font-black text-green-500">{trend}</span>}
      </div>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-brand-beige rounded-2xl ${className}`} />;
}
