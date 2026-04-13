import * as React from "react";
import { motion } from "motion/react";
import { Users, Map, AlertCircle, TrendingUp, ShieldAlert, Activity, PieChart } from "lucide-react";
import { Header } from "../../components/common/Header";
import { StatCard } from "../../components/common/StatCard";

export default function AdminDispatch() {
  return (
    <div className="pb-24 bg-brand-warm min-h-screen">
      <Header 
        title="Ops Control" 
        subtitle="Bangalore City Operations"
        variant="teal"
      />

      <div className="px-6 -mt-16 space-y-8">
        {/* Critical Alerts */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-serif font-bold text-red-600">Active SOS</h2>
          </div>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-600 text-white p-6 rounded-[32px] shadow-xl shadow-red-200 flex items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-serif font-bold">Ramesh Kumar</h3>
              <p className="opacity-80 text-sm font-medium">Triggered 4 mins ago • Indiranagar</p>
            </div>
            <button className="bg-white text-red-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest">Respond</button>
          </motion.div>
        </section>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="Active Visits" value="42" icon={<Map className="w-5 h-5" />} trend="+12%" />
          <StatCard title="SOS Alerts" value="0" icon={<AlertCircle className="w-5 h-5" />} color="text-green-500" />
          <StatCard title="New Requests" value="18" icon={<Activity className="w-5 h-5" />} trend="+5" />
          <StatCard title="Revenue" value="₹4.2L" icon={<TrendingUp className="w-5 h-5" />} trend="+18%" />
        </div>

        {/* Performance Chart */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-teal mb-4">Service Performance</h2>
          <div className="premium-card p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-brand-gold" />
                <span className="font-bold text-brand-teal">Visit Completion Rate</span>
              </div>
              <span className="text-2xl font-serif font-bold text-brand-teal">94.2%</span>
            </div>
            <div className="w-full h-4 bg-brand-beige rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "94.2%" }}
                className="h-full bg-brand-gold"
              />
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-black text-brand-teal/30 uppercase tracking-widest">
              <span>Target: 90%</span>
              <span className="text-green-500">Exceeding</span>
            </div>
          </div>
        </section>

        {/* Live Dispatch */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-brand-teal mb-4">Live Dispatch</h2>
          <div className="space-y-4">
            <DispatchRow caretaker="Anjali S." senior="Savitri Devi" status="In Progress" time="Started 1:15 PM" />
            <DispatchRow caretaker="Rahul M." senior="George V." status="Check-in Pending" time="Scheduled 2:00 PM" />
          </div>
        </section>
      </div>
    </div>
  );
}

function DispatchRow({ caretaker, senior, status, time }: { caretaker: string; senior: string; status: string; time: string }) {
  return (
    <div className="premium-card p-5 bg-white flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-brand-beige rounded-xl flex items-center justify-center text-brand-gold font-bold">
          {caretaker[0]}
        </div>
        <div>
          <h4 className="font-bold text-brand-teal">{caretaker} → {senior}</h4>
          <p className="text-xs text-brand-teal/40 font-medium">{time}</p>
        </div>
      </div>
      <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest bg-brand-beige px-2 py-1 rounded-md">
        {status}
      </span>
    </div>
  );
}
