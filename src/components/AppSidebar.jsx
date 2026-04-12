import {
  Activity,
  ArrowLeftRight,
  CreditCard,
  Landmark,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { Button } from "./ui/Button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/Sidebar";

const menuItems = [
  {
    label: "Overview",
    icon: Landmark,
    active: true,
  },
  {
    label: "Transfers",
    icon: ArrowLeftRight,
  },
  {
    label: "Cards",
    icon: CreditCard,
  },
  {
    label: "Activity",
    icon: Activity,
  },
];

export function AppSidebar({ authenticated, user, onLogout }) {
  return (
    <Sidebar className="fixed inset-y-0 left-0 z-40 hidden w-[252px] flex-col overflow-hidden lg:flex">
      <SidebarHeader className="bg-slate-950 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-sm font-bold text-slate-950">
            SK
          </div>
          <div>
            <p className="font-display text-[11px] uppercase tracking-[0.28em] text-secondary">
              SolvKE
            </p>
            <h1 className="mt-1 font-display text-base font-bold">
              Urban banking OS
            </h1>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="space-y-5">
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={item.active} type="button">
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="rounded-3xl bg-slate-950 px-4 py-4 text-white">
          <div className="flex items-center gap-2 text-secondary">
            <ShieldCheck className="size-4" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
              Secure mode
            </span>
          </div>
          <p className="mt-3 font-display text-lg font-bold leading-tight">
            {authenticated && user
              ? `${user.firstName}, your banking session is protected.`
              : "Protected access for daily money movement."}
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Designed for fast transfers, bill payments, and card controls with a
            sharp, tech-forward layout.
          </p>
        </div>
      </SidebarContent>

      <SidebarFooter className="space-y-4">
        {authenticated && user ? (
          <>
            <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Signed in
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-950">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-center"
              onClick={onLogout}
            >
              <LogOut className="size-4" />
              Log out
            </Button>
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-4 py-4 text-sm text-slate-600">
            Sign in to unlock transfers, payment controls, and live account
            activity.
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
