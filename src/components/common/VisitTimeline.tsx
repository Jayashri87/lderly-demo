import * as React from "react";
import { motion } from "motion/react";
import { CheckCircle2, Clock, MapPin } from "lucide-react";

interface VisitTimelineItem {
  id: string;
  title: string;
  time: string;
  status: "completed" | "upcoming" | "in-progress";
  caretaker?: string;
}

export function VisitTimeline({ items }: { items: VisitTimelineItem[] }) {
  return (
    <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-gold/10">
      {items.map((item, index) => (
        <motion.div 
          key={item.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex gap-6 relative"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
            item.status === 'completed' ? 'bg-green-500 text-white' : 
            item.status === 'in-progress' ? 'bg-brand-gold text-white animate-pulse' : 
            'bg-brand-beige text-brand-gold'
          }`}>
            {item.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
          </div>
          <div className="flex-1 pb-6">
            <div className="premium-card p-4 bg-white">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-brand-teal">{item.title}</h4>
                <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest">{item.time}</span>
              </div>
              {item.caretaker && (
                <p className="text-xs text-brand-teal/50 font-medium">Caretaker: {item.caretaker}</p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ParentProfileCard({ name, age, status, wellnessScore }: { name: string; age: number; status: string; wellnessScore: number }) {
  return (
    <div className="premium-card p-5 flex items-center gap-4 bg-white">
      <div className="w-16 h-16 bg-brand-beige rounded-full flex items-center justify-center text-2xl font-serif font-bold text-brand-gold relative">
        {name[0]}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-serif font-bold text-brand-teal">{name}</h3>
        <p className="text-brand-teal/40 font-medium text-sm">{age} years • {status}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-black text-brand-teal/30 uppercase tracking-widest mb-1">Wellness</p>
        <p className="text-xl font-serif font-bold text-brand-gold">{wellnessScore}%</p>
      </div>
    </div>
  );
}
