import * as React from "react";
import { motion } from "motion/react";
import { Phone, Heart, AlertTriangle, Settings } from "lucide-react";
import { useTranslation, Language } from "../../utils/i18n";

export default function SeniorScreen({ lang = "en" }: { lang?: Language }) {
  const { t } = useTranslation(lang);
  const [isAccessibilityMode, setIsAccessibilityMode] = React.useState(false);

  return (
    <div className={`min-h-screen ${isAccessibilityMode ? 'bg-black text-white' : 'bg-brand-warm text-brand-teal'} p-6 flex flex-col transition-colors duration-500`}>
      <header className="mb-12 pt-8 flex justify-between items-start">
        <div>
          <h1 className={`${isAccessibilityMode ? 'text-6xl' : 'text-5xl'} font-serif font-bold mb-2`}>
            {t('namaste')}, Ramesh
          </h1>
          <p className={`${isAccessibilityMode ? 'text-3xl' : 'text-2xl'} opacity-70 font-medium`}>
            Have a wonderful day!
          </p>
        </div>
        <button 
          onClick={() => setIsAccessibilityMode(!isAccessibilityMode)}
          className={`p-4 rounded-2xl ${isAccessibilityMode ? 'bg-white text-black' : 'bg-brand-teal text-white'}`}
        >
          <Settings className="w-8 h-8" />
        </button>
      </header>

      <div className="grid grid-cols-1 gap-8 flex-1">
        <BigButton 
          title={t('call_family')} 
          icon={<Phone className="w-16 h-16" />} 
          color={isAccessibilityMode ? "bg-blue-600" : "bg-brand-teal"}
          onClick={() => alert("Calling Jayanth...")}
          isLarge={isAccessibilityMode}
        />
        <BigButton 
          title={t('i_need_help')} 
          icon={<AlertTriangle className="w-16 h-16" />} 
          color="bg-red-600"
          onClick={() => alert("SOS Triggered!")}
          isLarge={isAccessibilityMode}
        />
        <BigButton 
          title={t('my_health')} 
          icon={<Heart className="w-16 h-16" />} 
          color={isAccessibilityMode ? "bg-green-600" : "bg-brand-gold"}
          onClick={() => {}}
          isLarge={isAccessibilityMode}
        />
      </div>

      <div className={`mt-12 p-10 rounded-[48px] text-center ${isAccessibilityMode ? 'bg-white/10 border-2 border-white' : 'bg-brand-beige/50'}`}>
        <p className={`${isAccessibilityMode ? 'text-4xl' : 'text-2xl'} font-serif font-bold mb-2`}>{t('next_visit')}</p>
        <p className={`${isAccessibilityMode ? 'text-3xl' : 'text-xl'} opacity-70`}>Anjali is coming at 2:00 PM</p>
      </div>
    </div>
  );
}

function BigButton({ title, icon, color, onClick, isLarge }: { title: string; icon: React.ReactNode; color: string; onClick: () => void; isLarge?: boolean }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${color} text-white p-12 rounded-[64px] shadow-2xl flex items-center justify-between group`}
    >
      <span className={`${isLarge ? 'text-5xl' : 'text-4xl'} font-serif font-bold`}>{title}</span>
      <div className={`${isLarge ? 'w-24 h-24' : 'w-20 h-20'} bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
    </motion.button>
  );
}
