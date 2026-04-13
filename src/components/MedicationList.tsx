import * as React from "react";
import { Pill, Clock, Plus, Trash2, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";
import { motion } from "motion/react";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  notes?: string;
}

interface MedicationListProps {
  medications: Medication[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}

export const MedicationList = ({ medications, onAdd, onDelete }: MedicationListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-900">Medications</h2>
        <Button onClick={onAdd} className="rounded-full w-14 h-14 p-0 shadow-lg">
          <Plus className="w-8 h-8" />
        </Button>
      </div>

      {medications.length === 0 ? (
        <Card className="border-dashed border-2 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-slate-200 p-4 rounded-full mb-4">
              <Pill className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">No medications yet</h3>
            <p className="text-slate-500 max-w-[200px] mt-2">
              Add your first medication to stay on track.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {medications.map((med, index) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group hover:border-blue-200 transition-colors">
                <CardContent className="p-5 flex items-center gap-5">
                  <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                    <Pill className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">{med.name}</h3>
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                      <span>{med.dosage}</span>
                      <span>•</span>
                      <span>{med.frequency}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {med.times.map((time) => (
                        <div key={time} className="bg-slate-100 px-3 py-1 rounded-lg flex items-center gap-1.5 text-sm font-bold text-slate-600">
                          <Clock className="w-4 h-4" />
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(med.id)}
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
