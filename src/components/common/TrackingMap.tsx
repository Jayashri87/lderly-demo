import * as React from "react";
import { motion } from "motion/react";
import { MapPin, Navigation } from "lucide-react";

interface TrackingMapProps {
  caretakerLocation?: { lat: number; lng: number };
  parentLocation?: { lat: number; lng: number };
}

export function TrackingMap({ caretakerLocation, parentLocation }: TrackingMapProps) {
  return (
    <div className="relative w-full h-64 bg-brand-beige rounded-[32px] overflow-hidden border border-brand-gold/10">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 opacity-20" style={{ 
        backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)", 
        backgroundSize: "20px 20px" 
      }} />
      
      {/* Parent Marker */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-12 h-12 bg-brand-teal rounded-full flex items-center justify-center text-white shadow-xl">
          <MapPin className="w-6 h-6" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-brand-teal">
          Parent Home
        </div>
      </motion.div>

      {/* Caretaker Marker */}
      <motion.div 
        animate={{ 
          x: [0, 20, -10, 0],
          y: [0, -30, 10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/3 left-1/4"
      >
        <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-white shadow-xl">
          <Navigation className="w-5 h-5 rotate-45" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-brand-gold">
          Caretaker
        </div>
      </motion.div>

      <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-2xl flex items-center justify-between">
        <span className="text-xs font-bold text-brand-teal">Arriving in 8 mins</span>
        <button className="text-[10px] font-black text-brand-gold uppercase tracking-widest">View Full Map</button>
      </div>
    </div>
  );
}
