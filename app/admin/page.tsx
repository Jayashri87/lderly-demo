"use client";

import { JourneyService } from "../../services/journeyService";

export default function AdminPage() {
  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">LDERLY ADMIN</h1>

        <button
          onClick={() => JourneyService.updateStatus("requested")}
          className="w-full bg-yellow-500 text-white py-3 rounded-lg"
        >
          Requested
        </button>

        <button
          onClick={() => JourneyService.updateStatus("enroute")}
          className="w-full bg-blue-500 text-white py-3 rounded-lg"
        >
          Enroute
        </button>

        <button
          onClick={() => JourneyService.updateStatus("arrived")}
          className="w-full bg-green-500 text-white py-3 rounded-lg"
        >
          Arrived
        </button>

        <button
          onClick={() => JourneyService.updateStatus("completed")}
          className="w-full bg-purple-500 text-white py-3 rounded-lg"
        >
          Completed
        </button>

        <button
          onClick={() => JourneyService.updateStatus("idle")}
          className="w-full bg-gray-500 text-white py-3 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
