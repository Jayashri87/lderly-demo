import * as React from "react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { format } from "date-fns";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (app: any) => void;
}

export const AddAppointmentModal = ({ isOpen, onClose, onAdd }: AddAppointmentModalProps) => {
  const [title, setTitle] = React.useState("");
  const [doctor, setDoctor] = React.useState("");
  const [date, setDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = React.useState("10:00");
  const [location, setLocation] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentDate = new Date(`${date}T${time}`);
    onAdd({ title, doctor, date: appointmentDate, location });
    setTitle("");
    setDoctor("");
    setLocation("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Visit">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="What's it for?"
          placeholder="e.g. Annual Checkup"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          label="Doctor's Name"
          placeholder="e.g. Dr. Smith"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Input
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <Input
          label="Location"
          placeholder="e.g. City Hospital"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button type="submit" className="w-full py-4 text-xl font-black rounded-2xl shadow-xl shadow-blue-100">
          Save Visit
        </Button>
      </form>
    </Modal>
  );
};
