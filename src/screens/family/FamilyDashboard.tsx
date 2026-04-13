import * as React from "react";
import { motion } from "motion/react";
import { Activity, ShieldCheck, Calendar, Phone, TrendingUp, Heart, Bell } from "lucide-react";
import { Header } from "../../components/common/Header";
import { StatCard } from "../../components/common/StatCard";
import { HealthTrendChart } from "../../components/common/HealthTrendChart";
import { ParentProfileCard } from "../../components/common/VisitTimeline";
import { TrackingMap } from "../../components/common/TrackingMap";
import { useTranslation, Language } from "../../utils/i18n";

interface FamilyDashboardProps {
  onBookVisit: () => void;
  lang?: Language;
}

export default function FamilyDashboard({ onBookVisit, lang = "en" }: FamilyDashboardProps) {
  const { t } = useTranslation(lang);

  return (
    <div className="pb-24">
      <Header 
        title={`${t('namaste')}, Jayanth`} 
        subtitle="Your parents are in safe hands."
        variant="teal"
      />

      <div className="px-6 -mt-16 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            title={t('wellness_score')} 
            value="88%" 
            icon={<Activity className="w-5 h-5" />} 
            trend="+4%"
          />
          <StatCard 
            title="Trust Score" 
            value="96%" 
            icon={<ShieldCheck className="w-5 h-5" />} 
          />
        </div>
      </div>

      {/* Live Tracking */}
      <section className="px-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-serif font-bold text-brand-teal">Live Tracking</h2>
          <span className="text-[10px] font-black text-green-500 uppercase tracking-widest animate-pulse">Live</span>
        </div>
        <TrackingMap />
      </section>

      {/* Quick Actions */}
      <section className="px-6 mb-8">
        <h2 className="text-2xl font-serif font-bold text-brand-teal mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <ActionCard 
            title={t('book_visit')} 
            icon={<Calendar className="w-6 h-6" />} 
            color="bg-brand-gold"
            onClick={onBookVisit}
          />
          <ActionCard 
            title={t('emergency_sos')} 
            icon={<Phone className="w-6 h-6" />} 
            color="bg-red-500"
            onClick={() => {}}
          />
        </div>
      </section>

      {/* Health Trends */}
      <section className="px-6 mb-8">
        <h2 className="text-2xl font-serif font-bold text-brand-teal mb-4">Weekly Trends</h2>
        <HealthTrendChart data={[40, 60, 45, 80, 70, 85, 90]} />
      </section>

      {/* Parent Profiles */}
      <section className="px-6 mb-8">
        <h2 className="text-2xl font-serif font-bold text-brand-teal mb-4">Parent Profiles</h2>
        <div className="space-y-4">
          <ParentProfileCard name="Ramesh Kumar" age={72} status="At Home" wellnessScore={88} />
          <ParentProfileCard name="Savitri Devi" age={68} status="At Home" wellnessScore={92} />
        </div>
      </section>
    </div>
  );
}

function ActionCard({ title, icon, color, onClick }: { title: string; icon: React.ReactNode; color: string; onClick: () => void }) {
  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      onClick={onClick} 
      className="premium-card p-6 flex flex-col items-center gap-3 bg-white active:scale-95 transition-all"
    >
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-gold/20`}>
        {icon}
      </div>
      <span className="font-bold text-brand-teal">{title}</span>
    </motion.button>
  );
}
