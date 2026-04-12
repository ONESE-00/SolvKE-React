import { Bell, ChevronRight, Search } from "lucide-react";

function getFormattedDate() {
  return new Intl.DateTimeFormat("en-KE", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export function TopBar({ authenticated, user, onLogout }) {
  const displayDate = getFormattedDate();

  return (
    <header className="glass-panel fixed inset-x-0 top-0 z-30 border-b border-slate-200/80 px-4 py-4 lg:left-[252px] lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            <span>Banking workspace</span>
            <ChevronRight className="size-3.5" />
            <span className="text-secondary">Overview</span>
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold text-primary">
            {authenticated
              ? "Control cashflow from a sharper command center."
              : "Sign in to enter the SolvKE digital branch."}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            {authenticated
              ? "Track balance, trigger account actions, and monitor recent movement from one responsive workspace."
              : "A compact online banking experience with secure access, responsive layouts, and a strong urban-tech visual system."}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500">
            <Search className="size-4" />
            <span>{authenticated ? "Search transactions" : displayDate}</span>
          </div>
          {authenticated && user ? (
            <>
              <div className="flex items-center gap-3 rounded-xl bg-slate-950 px-4 py-2.5 text-white">
                <Bell className="size-4 text-secondary" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Active profile
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm text-slate-300">
              Secure access with account number and password
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
