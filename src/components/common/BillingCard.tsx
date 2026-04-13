import * as React from "react";
import { Check, CreditCard, Package } from "lucide-react";

interface BillingCardProps {
  planName: string;
  price: string;
  nextBilling: string;
  status: "active" | "past_due" | "canceled";
  onManage: () => void;
}

export function BillingCard({ planName, price, nextBilling, status, onManage }: BillingCardProps) {
  return (
    <div className="premium-card p-6 bg-white border-brand-gold/10">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-beige rounded-2xl flex items-center justify-center text-brand-gold">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-brand-teal">{planName}</h3>
            <p className="text-brand-teal/40 font-medium text-sm">Current Plan</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-brand-beige/30 rounded-2xl">
          <p className="text-[10px] font-black text-brand-teal/30 uppercase tracking-widest mb-1">Price</p>
          <p className="text-lg font-serif font-bold text-brand-teal">{price}</p>
        </div>
        <div className="p-4 bg-brand-beige/30 rounded-2xl">
          <p className="text-[10px] font-black text-brand-teal/30 uppercase tracking-widest mb-1">Next Bill</p>
          <p className="text-lg font-serif font-bold text-brand-teal">{nextBilling}</p>
        </div>
      </div>

      <button 
        onClick={onManage}
        className="w-full flex items-center justify-center gap-2 py-4 bg-brand-teal text-white rounded-2xl font-bold shadow-lg shadow-brand-teal/10 active:scale-95 transition-all"
      >
        <CreditCard className="w-5 h-5" />
        Manage Subscription
      </button>
    </div>
  );
}

export function EmptyState({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-20 h-20 bg-brand-beige rounded-[32px] flex items-center justify-center text-brand-gold/40 mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-serif font-bold text-brand-teal mb-2">{title}</h3>
      <p className="text-brand-teal/40 font-medium max-w-xs">{description}</p>
    </div>
  );
}
