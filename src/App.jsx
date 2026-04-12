import { useState } from "react";
import { toast } from "sonner";
import { AppSidebar } from "./components/AppSidebar";
import { LoginPanel } from "./components/LoginPanel";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./components/Dashboard";
import { SidebarInset } from "./components/ui/Sidebar";
import { bankApi } from "./services/bankApi";

const initialSession = {
  authenticated: false,
  profile: null,
};

export default function App() {
  const [session, setSession] = useState(initialSession);

  const handleLogin = async (credentials) => {
    const response = await bankApi.login(credentials);
    setSession({
      authenticated: true,
      profile: response,
    });
    toast.success(
      `Welcome back, ${response.user.firstName}. Your banking dashboard is ready.`,
    );
  };

  const handleLogout = () => {
    setSession(initialSession);
    toast.info("You have been signed out of SolvKE Banking.");
  };

  const handleProfileChange = (updater) => {
    setSession((current) => ({
      ...current,
      profile: updater(current.profile),
    }));
  };

  return (
    <div className="app-shell min-h-screen bg-slate-50 text-ink">
      <AppSidebar
        authenticated={session.authenticated}
        user={session.profile?.user}
        onLogout={handleLogout}
      />

      <TopBar
        authenticated={session.authenticated}
        user={session.profile?.user}
        onLogout={handleLogout}
      />

      <SidebarInset className="px-4 pb-6 pt-32 sm:px-6 lg:ml-[252px] lg:px-8">
        <main>
          {session.authenticated ? (
            <Dashboard
              profile={session.profile}
              onProfileChange={handleProfileChange}
            />
          ) : (
            <LoginPanel onLogin={handleLogin} />
          )}
        </main>
      </SidebarInset>
    </div>
  );
}
