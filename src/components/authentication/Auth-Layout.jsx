import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="absolute inset-0 auth-layout-background" />
      <div className="absolute inset-0 bg-grid bg-[size:72px_72px] opacity-[0.18]" />
      <div className="absolute left-[-10%] top-[-8%] h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-8%] h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="absolute left-6 top-6 hidden rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur md:block">
          SolvKE Banking
        </div>

        <div className="w-full max-w-md flex items-center justify-center h-screen bg-red">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
