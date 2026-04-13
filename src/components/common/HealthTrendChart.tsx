import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X, ShieldAlert, Phone } from "lucide-react";
import { SOSQueueService } from "../../services/sosQueue";

export function SOSFloatingButton({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleTrigger = async () => {
    // Get current location
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      await SOSQueueService.triggerSOS(userId, location);
      alert("SOS Triggered! Response team notified.");
      setIsOpen(false);
    }, (err) => {
      console.error("Location access denied", err);
      SOSQueueService.triggerSOS(userId, { lat: 0, lng: 0 });
      setIsOpen(false);
    });
  };

  return (
    <>
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-red-600/40 z-40"
      >
        <AlertTriangle className="w-8 h-8" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-brand-teal/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[48px] p-8 relative z-10 text-center"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-brand-teal/20 hover:text-brand-teal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center text-red-600 mx-auto mb-6">
                <ShieldAlert className="w-10 h-10" />
              </div>

              <h2 className="text-3xl font-serif font-bold text-brand-teal mb-2">Emergency SOS</h2>
              <p className="text-brand-teal/50 font-medium mb-8">
                Confirming will alert our 24/7 response team and your family.
              </p>

              <div className="space-y-4">
                <button 
                  className="w-full bg-red-600 text-white py-6 rounded-3xl text-xl font-bold shadow-xl"
                  onClick={handleTrigger}
                >
                  Confirm Emergency
                </button>
                <button 
                  className="w-full py-6 rounded-3xl text-brand-teal font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export function HealthTrendChart({ data }: { data: number[] }) {
  return (
    <div className="premium-card p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-black text-brand-teal/30 uppercase tracking-widest mb-1">Weekly Trend</p>
          <h3 className="text-2xl font-serif font-bold text-brand-teal">Wellness Score</h3>
        </div>
        <div className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
          +12% Up
        </div>
      </div>
      <div className="flex items-end gap-2 h-32">
        {data.map((h, i) => (
          <motion.div 
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.05 }}
            className="flex-1 bg-brand-gold/20 rounded-t-lg relative group"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-teal text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {h}%
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-[10px] font-black text-brand-teal/20 uppercase tracking-widest">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
}
