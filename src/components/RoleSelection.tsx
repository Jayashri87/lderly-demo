import * as React from "react";
import { motion } from "motion/react";
import { User, Heart, ShieldCheck } from "lucide-react";
import { Button } from "./ui/Button";

interface RoleSelectionProps {
  onSelect: (role: "family" | "caretaker" | "admin" | "senior") => void;
}

export function RoleSelection({ onSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-brand-warm flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-serif font-bold text-brand-teal mb-4">Welcome to LDERLY</h1>
        <p className="text-xl text-brand-teal/60 font-medium">Choose your role to continue</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <RoleCard 
          title="Family Member"
          description="I want to book care for my loved ones"
          icon={<Heart className="w-8 h-8" />}
          onClick={() => onSelect("family")}
          delay={0.1}
        />
        <RoleCard 
          title="Senior Citizen"
          description="I need assistance and companionship"
          icon={<Heart className="w-8 h-8" />}
          onClick={() => onSelect("senior")}
          delay={0.15}
        />
        <RoleCard 
          title="Caretaker"
          description="I am here to provide care"
          icon={<User className="w-8 h-8" />}
          onClick={() => onSelect("caretaker")}
          delay={0.2}
        />
        <RoleCard 
          title="Operations"
          description="I manage the care services"
          icon={<ShieldCheck className="w-8 h-8" />}
          onClick={() => onSelect("admin")}
          delay={0.3}
        />
      </div>
    </div>
  );
}


function RoleCard({ title, description, icon, onClick, delay }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  onClick: () => void;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      onClick={onClick}
      className="premium-card p-8 flex flex-col items-center text-center hover:border-brand-gold transition-all group active:scale-95"
    >
      <div className="w-16 h-16 bg-brand-beige rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-serif font-bold text-brand-teal mb-2">{title}</h3>
      <p className="text-brand-teal/50 leading-relaxed">{description}</p>
    </motion.button>
  );
}
