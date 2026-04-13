import * as React from "react";
import { Calendar, MapPin, Plus, Trash2, Clock } from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";
import { motion } from "motion/react";
import { format } from "date-fns";

export interface Appointment {
  id: string;
  title: string;
  doctor: string;
  date: Date;
  location: string;
  notes?: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}

export const AppointmentList = ({ appointments, onAdd, onDelete }: AppointmentListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-900">Visits</h2>
        <Button onClick={onAdd} className="rounded-full w-14 h-14 p-0 shadow-lg">
          <Plus className="w-8 h-8" />
        </Button>
      </div>

      {appointments.length === 0 ? (
        <Card className="border-dashed border-2 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-slate-200 p-4 rounded-full mb-4">
              <Calendar className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">No visits scheduled</h3>
            <p className="text-slate-500 max-w-[200px] mt-2">
              Keep track of your doctor appointments here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {appointments.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group hover:border-blue-200 transition-colors">
                <CardContent className="p-5 flex items-start gap-5">
                  <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900">{app.title}</h3>
                      <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-black">
                        {format(app.date, "MMM d")}
                      </div>
                    </div>
                    <p className="text-slate-600 font-bold mt-1">Dr. {app.doctor}</p>
                    <div className="flex items-center gap-4 mt-3 text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-5 h-5" />
                        {format(app.date, "h:mm a")}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-5 h-5" />
                        {app.location}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(app.id)}
                    className="text-slate-300 hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-6 h-6" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
