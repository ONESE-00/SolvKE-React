import { Button } from "./ui/Button";

export function Header({ authenticated, user, onLogout }) {
  return (
    <header className="glass-panel rounded-[28px] border border-white/60 px-5 py-4 shadow-panel sm:px-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.35em] text-secondary">
            SolvKE Banking
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold text-primary sm:text-3xl">
            Internet banking for fast daily money movement
          </h1>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          {authenticated && user ? (
            <>
              <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Logged in as
                </p>
                <p className="mt-1 font-semibold">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <Button variant="ghost" onClick={onLogout}>
                Log out
              </Button>
            </>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              Secure access with account number and password
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
