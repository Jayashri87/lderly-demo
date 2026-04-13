import * as React from "react";
import { motion } from "motion/react";
import { Camera, CheckCircle2, Mic, AlertCircle, ChevronRight, Clock } from "lucide-react";
import { Header } from "../../components/common/Header";
import { Button } from "../../components/ui/Button";
import { AnalyticsService } from "../../services/analytics";

export default function CaretakerWorkflow() {
  const [status, setStatus] = React.useState<"idle" | "checked-in" | "completed">("idle");
  const [isOptimistic, setIsOptimistic] = React.useState(false);

  const handleCheckIn = async () => {
    // Optimistic UI update
    setIsOptimistic(true);
    setStatus("checked-in");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      AnalyticsService.logEvent("caretaker_check_in", { time: new Date().toISOString() });
    } catch (error) {
      // Revert on failure
      setStatus("idle");
      alert("Check-in failed. Please try again.");
    } finally {
      setIsOptimistic(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-warm pb-24">
      <Header 
        title="Active Visit" 
        subtitle="Ramesh Kumar • Indiranagar"
        variant="gold"
      />

      <div className="px-6 -mt-16 space-y-6">
        <div className="premium-card p-6 bg-white shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${status === 'checked-in' ? 'bg-green-500 animate-pulse' : 'bg-brand-teal/20'}`} />
              <span className="font-bold text-brand-teal uppercase tracking-widest text-[10px]">
                {status === 'idle' ? 'Ready to Start' : status === 'checked-in' ? 'In Progress' : 'Completed'}
              </span>
            </div>
            {status === 'checked-in' && (
              <div className="flex items-center gap-2 text-brand-gold font-bold">
                <Clock className="w-4 h-4" />
                <span>1:12:45</span>
              </div>
            )}
          </div>

          {status === 'idle' ? (
            <Button 
              className="w-full bg-brand-teal text-white py-6 rounded-3xl text-xl font-bold shadow-xl shadow-brand-teal/20"
              onClick={handleCheckIn}
              loading={isOptimistic}
            >
              Check In (GPS Verified)
            </Button>
          ) : status === 'checked-in' ? (
            <div className="space-y-6">
              <div className="p-4 bg-brand-beige/30 rounded-2xl border border-brand-gold/10">
                <p className="text-[10px] font-black text-brand-teal/40 uppercase tracking-widest mb-4">Task Checklist</p>
                <div className="space-y-3">
                  <TaskItem label="Morning Medication" checked={true} />
                  <TaskItem label="Blood Pressure Check" checked={false} />
                  <TaskItem label="Light Exercise / Walk" checked={false} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="premium-card p-4 flex flex-col items-center gap-2 bg-brand-beige/20 border-dashed border-2 border-brand-gold/20">
                  <Camera className="w-6 h-6 text-brand-gold" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Photo Proof</span>
                </button>
                <button className="premium-card p-4 flex flex-col items-center gap-2 bg-brand-beige/20 border-dashed border-2 border-brand-gold/20">
                  <Mic className="w-6 h-6 text-brand-gold" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Voice Note</span>
                </button>
              </div>

              <Button 
                className="w-full bg-brand-teal text-white py-6 rounded-3xl text-xl font-bold"
                onClick={() => {
                  setStatus("completed");
                  AnalyticsService.trackVisitCompleted("visit_123", "caretaker_456");
                }}
              >
                Complete Visit
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-teal">Visit Completed</h3>
              <p className="text-brand-teal/50 mb-6">Summary sent to family.</p>
              <Button variant="outline" className="w-full rounded-2xl" onClick={() => setStatus("idle")}>
                Back to Schedule
              </Button>
            </div>
          )}
        </div>

        <button className="w-full bg-red-50 border-2 border-red-100 p-6 rounded-[32px] flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-red-600">Incident Reporting</h3>
              <p className="text-sm text-red-400 font-medium">Escalate to Ops Team</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-red-300" />
        </button>
      </div>
    </div>
  );
}

function TaskItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-brand-gold/5">
      <span className={`font-medium ${checked ? 'text-brand-teal/30 line-through' : 'text-brand-teal'}`}>{label}</span>
      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${checked ? 'bg-brand-gold border-brand-gold text-white' : 'border-brand-gold/20'}`}>
        {checked && <CheckCircle2 className="w-4 h-4" />}
      </div>
    </div>
  );
}
