import * as React from "react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Pill, Clock, Plus, X } from "lucide-react";

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (med: any) => void;
}

export const AddMedicationModal = ({ isOpen, onClose, onAdd }: AddMedicationModalProps) => {
  const [name, setName] = React.useState("");
  const [dosage, setDosage] = React.useState("");
  const [frequency, setFrequency] = React.useState("Once daily");
  const [times, setTimes] = React.useState<string[]>(["08:00"]);

  const handleAddTime = () => setTimes([...times, "12:00"]);
  const handleRemoveTime = (index: number) => setTimes(times.filter((_, i) => i !== index));
  const handleTimeChange = (index: number, val: string) => {
    const newTimes = [...times];
    newTimes[index] = val;
    setTimes(newTimes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, dosage, frequency, times });
    setName("");
    setDosage("");
    setFrequency("Once daily");
    setTimes(["08:00"]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Medication">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Medication Name"
          placeholder="e.g. Aspirin"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Dosage"
          placeholder="e.g. 500mg"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          required
        />
        
        <div className="space-y-2">
          <label className="text-lg font-semibold text-slate-700 block ml-1">Frequency</label>
          <select
            className="w-full px-4 py-3 text-lg rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option>Once daily</option>
            <option>Twice daily</option>
            <option>Three times daily</option>
            <option>As needed</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-lg font-semibold text-slate-700 block ml-1">Reminder Times</label>
          {times.map((time, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(index, e.target.value)}
              />
              {times.length > 1 && (
                <Button variant="ghost" type="button" onClick={() => handleRemoveTime(index)} className="text-red-500">
                  <X className="w-6 h-6" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" type="button" onClick={handleAddTime} className="w-full border-dashed">
            <Plus className="w-5 h-5 mr-2" /> Add another time
          </Button>
        </div>

        <Button type="submit" className="w-full py-4 text-xl font-black rounded-2xl shadow-xl shadow-blue-100">
          Save Medication
        </Button>
      </form>
    </Modal>
  );
};
