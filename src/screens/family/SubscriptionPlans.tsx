import * as React from "react";
import { motion } from "motion/react";
import { Check, ShieldCheck, Star, Zap } from "lucide-react";
import { Button } from "../../components/ui/Button";

export function SubscriptionPlans() {
  return (
    <div className="p-6 pb-24 bg-brand-warm min-h-screen">
      <header className="mb-12 pt-8 text-center">
        <h1 className="text-4xl font-serif font-bold text-brand-teal mb-4">Care Plans</h1>
        <p className="text-brand-teal/50 font-medium">Choose a subscription that fits your family's needs.</p>
      </header>

      <div className="space-y-8">
        <PlanCard 
          name="Essential"
          price="₹4,999"
          period="monthly"
          features={["2 Companionship visits/week", "Medicine reminders", "SOS Support", "Weekly AI Updates"]}
          icon={<Zap className="w-6 h-6" />}
          color="bg-brand-teal"
        />
        <PlanCard 
          name="Premium"
          price="₹9,999"
          period="monthly"
          features={["Daily visits", "Hospital escort add-on", "Doctor coordination", "Daily AI Wellness reports", "Priority SOS response"]}
          icon={<Star className="w-6 h-6" />}
          color="bg-brand-gold"
          recommended
        />
        <PlanCard 
          name="NRI Concierge"
          price="₹19,999"
          period="monthly"
          features={["24/7 Dedicated Care Manager", "Timezone-friendly updates", "Full medical coordination", "Home maintenance help", "Festival special visits"]}
          icon={<ShieldCheck className="w-6 h-6" />}
          color="bg-brand-teal"
        />
      </div>
    </div>
  );
}

function PlanCard({ name, price, period, features, icon, color, recommended }: { 
  name: string; 
  price: string; 
  period: string; 
  features: string[]; 
  icon: React.ReactNode; 
  color: string;
  recommended?: boolean;
}) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`premium-card p-8 relative overflow-hidden ${recommended ? 'ring-2 ring-brand-gold' : ''}`}
    >
      {recommended && (
        <div className="absolute top-0 right-0 bg-brand-gold text-white px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest">
          Recommended
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-xl`}>
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-serif font-bold text-brand-teal">{name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-serif font-bold text-brand-teal">{price}</span>
            <span className="text-xs text-brand-teal/40 font-medium lowercase">/{period}</span>
          </div>
        </div>
      </div>

      <ul className="space-y-4 mb-10">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-brand-teal/70 font-medium">
            <Check className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Button className={`w-full py-6 rounded-3xl text-xl font-bold shadow-xl ${recommended ? 'bg-brand-gold text-white' : 'bg-brand-teal text-white'}`}>
        Select Plan
      </Button>
    </motion.div>
  );
}
