import * as React from "react";
import { User, LogOut, Shield, Bell, Phone } from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";

interface ProfileProps {
  user: {
    name: string;
    email: string;
    photoURL?: string;
  } | null;
  onLogout: () => void;
}

export const Profile = ({ user, onLogout }: ProfileProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black text-slate-900">My Profile</h2>

      <section className="flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden mb-4">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <User className="w-16 h-16 text-blue-600" />
          )}
        </div>
        <h3 className="text-2xl font-black text-slate-900">{user?.name || "Guest User"}</h3>
        <p className="text-slate-500 font-bold">{user?.email || "Not signed in"}</p>
      </section>

      <div className="grid gap-4">
        <Card className="hover:bg-slate-50 cursor-pointer transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-2xl text-green-600">
              <Phone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-black text-slate-900">Emergency Contact</p>
              <p className="text-sm font-bold text-slate-500">Daughter: 555-0123</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-slate-50 cursor-pointer transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
              <Bell className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-black text-slate-900">Notifications</p>
              <p className="text-sm font-bold text-slate-500">Enabled for all reminders</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-slate-50 cursor-pointer transition-colors">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-2xl text-purple-600">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-black text-slate-900">Privacy & Security</p>
              <p className="text-sm font-bold text-slate-500">Manage your data</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button variant="outline" className="w-full py-4 text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200" onClick={onLogout}>
        <LogOut className="w-6 h-6 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};
