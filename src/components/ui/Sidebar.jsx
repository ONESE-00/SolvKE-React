import { cn } from "../../lib/utils";

function Sidebar({ className, children, ...props }) {
  return (
    <aside
      className={cn(
        "glass-panel border-r border-slate-200/80 text-slate-900",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

function SidebarHeader({ className, ...props }) {
  return <div className={cn("border-b border-slate-200/80 p-4", className)} {...props} />;
}

function SidebarContent({ className, ...props }) {
  return <div className={cn("flex-1 p-4", className)} {...props} />;
}

function SidebarFooter({ className, ...props }) {
  return <div className={cn("border-t border-slate-200/80 p-4", className)} {...props} />;
}

function SidebarGroup({ className, ...props }) {
  return <section className={cn("space-y-3", className)} {...props} />;
}

function SidebarGroupLabel({ className, ...props }) {
  return (
    <p
      className={cn(
        "px-3 text-xs font-medium uppercase tracking-[0.22em] text-slate-400",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }) {
  return <div className={cn("space-y-1.5", className)} {...props} />;
}

function SidebarMenu({ className, ...props }) {
  return <div className={cn("space-y-1.5", className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }) {
  return <div className={cn(className)} {...props} />;
}

function SidebarMenuButton({
  className,
  isActive = false,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition",
        isActive
          ? "bg-primary text-white shadow-[0_14px_30px_rgba(30,58,138,0.22)]"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function SidebarInset({ className, ...props }) {
  return <div className={cn("min-w-0", className)} {...props} />;
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
};
