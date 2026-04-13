import * as React from "react";
import { Suspense, lazy } from "react";
import { SOSFloatingButton } from "./components/common/HealthTrendChart";
import { VisitBooking } from "./components/VisitBooking";
import { User as FirebaseUser } from "firebase/auth";
import { UserProfile } from "./types";
import { Language } from "./utils/i18n";

const FamilyDashboard = lazy(() => import("./screens/family/FamilyDashboard"));
const SubscriptionPlans = lazy(() => import("./screens/family/SubscriptionPlans"));
const SeniorScreen = lazy(() => import("./screens/senior/SeniorScreen"));

export default function App() {
  const [user] = React.useState<FirebaseUser | null>({
    uid: "test123",
    displayName: "Jayanth",
    email: "test@lderly.com",
  } as FirebaseUser);

  const [profile] = React.useState<UserProfile | null>({
    uid: "test123",
    role: "family",
    name: "Jayanth",
    email: "test@lderly.com",
  } as UserProfile);

  const [activeTab, setActiveTab] = React.useState("home");
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [language] = React.useState<Language>("en");

  const renderContent = () => {
    if (!profile) return null;
    if (profile.role === "senior") return <SeniorScreen lang={language} />;

    switch (activeTab) {
      case "home":
        return (
          <FamilyDashboard
            onBookVisit={() => setIsBookingOpen(true)}
            lang={language}
          />
        );
      case "plans":
        return <SubscriptionPlans />;
      case "chat":
        return (
          <div className="p-6 pt-24">
            <h1 className="text-3xl font-bold mb-4">Family Chat</h1>
            <p className="text-zinc-500">
              Care manager messaging and WhatsApp sync flow goes here.
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="p-6 pt-24">
            <h1 className="text-3xl font-bold mb-4">Profile & Settings</h1>
            <p className="text-zinc-500">
              User preferences, billing, language, and emergency contacts.
            </p>
          </div>
        );
      default:
        return (
          <FamilyDashboard
            onBookVisit={() => setIsBookingOpen(true)}
            lang={language}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-warm">
      <main className="max-w-md mx-auto min-h-screen relative pb-28">
        <Suspense fallback={<div className="p-6">Loading...</div>}>
          {renderContent()}
        </Suspense>

        {profile && <SOSFloatingButton userId={profile.uid} />}

        <VisitBooking
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          onBook={(data) => console.log("Booking:", data)}
        />

        <nav className="fixed bottom-0 left-0 right-0 p-4 z-50">
          <div className="max-w-md mx-auto bg-white rounded-3xl p-2 flex justify-around shadow-xl">
            <button onClick={() => setActiveTab("home")}>Home</button>
            <button onClick={() => setActiveTab("plans")}>Plans</button>
            <button onClick={() => setActiveTab("chat")}>Chat</button>
            <button onClick={() => setActiveTab("settings")}>Profile</button>
          </div>
        </nav>
      </main>
    </div>
  );
}