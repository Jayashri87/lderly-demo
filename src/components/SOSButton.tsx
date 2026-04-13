import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Phone, ShieldAlert, X } from "lucide-react";
import { Button } from "./ui/Button";

export function SOSButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-red-600/40 z-40 active:scale-90 transition-transform"
      >
        <AlertTriangle className="w-8 h-8" />
      </button>

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
              className="bg-white w-full max-w-sm rounded-[48px] p-8 relative z-10 text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-red-600" />
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-brand-teal/20 hover:text-brand-teal transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center text-red-600 mx-auto mb-6">
                <ShieldAlert className="w-10 h-10" />
              </div>

              <h2 className="text-3xl font-serif font-bold text-brand-teal mb-2">Emergency SOS</h2>
              <p className="text-brand-teal/50 font-medium mb-8 leading-relaxed">
                This will immediately alert our 24/7 response team and your family members.
              </p>

              <div className="space-y-4">
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-3xl text-xl font-bold shadow-xl shadow-red-600/20"
                  onClick={() => {
                    alert("SOS Triggered! Response team notified.");
                    setIsOpen(false);
                  }}
                >
                  Confirm Emergency
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full py-6 rounded-3xl text-brand-teal font-bold border-brand-teal/10"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-brand-beige flex items-center justify-center gap-2 text-brand-teal/40">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-widest">Direct Line: +91 80 1234 5678</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
