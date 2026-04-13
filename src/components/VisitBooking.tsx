import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, MapPin, User, ChevronRight, X, Check } from "lucide-react";
import { Button } from "./ui/Button";

interface VisitBookingProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: (data: any) => void;
}

export function VisitBooking({ isOpen, onClose, onBook }: VisitBookingProps) {
  const [step, setStep] = React.useState(1);
  const [type, setType] = React.useState<string | null>(null);

  const plans = [
    { id: "comp", title: "Companionship", price: "₹499", icon: "☕", desc: "Walks, talks, and engagement" },
    { id: "hosp", title: "Hospital Escort", price: "₹899", icon: "🏥", desc: "Doctor visits & pharmacy help" },
    { id: "well", title: "Wellness Check", price: "₹299", icon: "🧘", desc: "Quick health & mood check" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-teal/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-brand-warm w-full max-w-md rounded-t-[48px] p-8 relative z-10 shadow-2xl"
          >
            <div className="w-12 h-1.5 bg-brand-teal/10 rounded-full mx-auto mb-8" />
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-brand-teal">
                {step === 1 ? "Select Service" : "Confirm Details"}
              </h2>
              <button onClick={onClose} className="p-2 bg-brand-beige rounded-full text-brand-teal/40"><X className="w-5 h-5" /></button>
            </div>

            {step === 1 ? (
              <div className="space-y-4 mb-8">
                {plans.map((plan) => (
                  <button 
                    key={plan.id}
                    onClick={() => { setType(plan.id); setStep(2); }}
                    className={`w-full premium-card p-6 flex items-center gap-4 text-left transition-all hover:border-brand-gold group ${type === plan.id ? 'border-brand-gold ring-2 ring-brand-gold/10' : ''}`}
                  >
                    <div className="w-14 h-14 bg-brand-beige rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {plan.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-brand-teal">{plan.title}</h3>
                        <span className="text-brand-gold font-bold">{plan.price}</span>
                      </div>
                      <p className="text-sm text-brand-teal/50 font-medium">{plan.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6 mb-8">
                <div className="premium-card p-6 bg-brand-beige/30 border-dashed border-2 border-brand-gold/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-brand-gold" />
                    <span className="font-bold text-brand-teal">Tomorrow, April 14th</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-brand-gold" />
                    <span className="font-bold text-brand-teal">2:00 PM - 4:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                    <span className="font-bold text-brand-teal">Indiranagar, Bangalore</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <Check className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-green-700">Caretaker Anjali S. is available</p>
                </div>

                <Button 
                  className="w-full bg-brand-teal text-white py-6 rounded-3xl text-xl font-bold shadow-xl shadow-brand-teal/20"
                  onClick={() => {
                    onBook({ type, date: new Date() });
                    onClose();
                  }}
                >
                  Pay & Confirm Visit
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
