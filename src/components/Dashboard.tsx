import * as React from "react";
import { Pill, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { motion } from "motion/react";
import { format, isToday, isTomorrow, addHours, isAfter } from "date-fns";
import { Medication } from "./MedicationList";
import { Appointment } from "./AppointmentList";

interface DashboardProps {
  medications: Medication[];
  appointments: Appointment[];
  onTakeMedication: (id: string) => void;
}

export const Dashboard = ({ medications, appointments, onTakeMedication }: DashboardProps) => {
  const today = new Date();

  // Simple logic to find next medication doses
  const upcomingMeds = medications.flatMap(med => 
    med.times.map(time => {
      const [hours, minutes] = time.split(':').map(Number);
      const doseTime = new Date();
      doseTime.setHours(hours, minutes, 0, 0);
      return { ...med, scheduledTime: doseTime };
    })
  ).filter(med => isAfter(med.scheduledTime, today))
   .sort((a, b) => a.scheduledTime.getTime() - b.scheduledTime.getTime())
   .slice(0, 3);

  const nextAppointment = appointments
    .filter(app => isAfter(app.date, today))
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-black text-slate-900">Good Morning!</h2>
          <div className="text-right">
            <p className="text-slate-500 font-bold">{format(today, "EEEE")}</p>
            <p className="text-slate-900 font-black">{format(today, "MMMM d")}</p>
          </div>
        </div>

        <Card className="bg-blue-600 text-white border-none shadow-blue-200 shadow-xl overflow-visible relative">
          <div className="absolute -top-4 -right-4 bg-yellow-400 p-3 rounded-2xl shadow-lg rotate-12">
            <Clock className="w-8 h-8 text-blue-900" />
          </div>
          <CardContent className="p-8">
            <h3 className="text-xl font-bold opacity-90">Next Medication</h3>
            {upcomingMeds.length > 0 ? (
              <div className="mt-4">
                <p className="text-5xl font-black">{format(upcomingMeds[0].scheduledTime, "h:mm")}</p>
                <p className="text-xl font-bold mt-1 opacity-90">{format(upcomingMeds[0].scheduledTime, "a")}</p>
                <div className="mt-6 flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <div className="bg-white p-2 rounded-xl text-blue-600">
                    <Pill className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xl font-black">{upcomingMeds[0].name}</p>
                    <p className="font-bold opacity-80">{upcomingMeds[0].dosage}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => onTakeMedication(upcomingMeds[0].id)}
                  className="w-full mt-6 bg-white text-blue-600 hover:bg-blue-50 py-4 text-xl font-black rounded-2xl"
                >
                  I took it!
                </Button>
              </div>
            ) : (
              <p className="mt-4 text-xl font-bold opacity-80">All done for now!</p>
            )}
          </CardContent>
        </Card>
      </section>

      {nextAppointment && (
        <section>
          <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Next Visit
          </h3>
          <Card className="bg-white border-2 border-blue-100">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
                <Calendar className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <p className="text-blue-600 font-black uppercase text-sm tracking-widest">
                  {isToday(nextAppointment.date) ? "Today" : isTomorrow(nextAppointment.date) ? "Tomorrow" : format(nextAppointment.date, "EEEE")}
                </p>
                <h4 className="text-2xl font-black text-slate-900">{nextAppointment.title}</h4>
                <p className="text-slate-600 font-bold">Dr. {nextAppointment.doctor} • {format(nextAppointment.date, "h:mm a")}</p>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      <section>
        <h3 className="text-xl font-black text-slate-900 mb-4">Coming Up Later</h3>
        <div className="space-y-3">
          {upcomingMeds.slice(1).map((med, i) => (
            <div key={i}>
              <Card className="bg-slate-100 border-none">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-xl text-slate-400">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{med.name}</p>
                      <p className="text-sm font-bold text-slate-500">{med.dosage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900">{format(med.scheduledTime, "h:mm a")}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          {upcomingMeds.length <= 1 && (
            <div className="text-center py-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-400 font-bold">No other meds for today</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
