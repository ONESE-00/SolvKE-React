// SolvSidebar.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import { ChevronDown, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";

// mock user
const user = {
  name: "John Doe",
  email: "john@acme.com",
  avatar: "https://i.pravatar.cc/40",
};

function HeaderContent() {
  const { state } = useSidebar();

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded bg-primary" />
        {state === "expanded" && (
          <span className="text-sm font-semibold">Solv</span>
        )}
      </div>

      <SidebarTrigger />
    </div>
  );
}

function FooterContent() {
  const { state } = useSidebar();

  return (
    <div className="flex items-center justify-between px-2 py-2">
      <div className="flex items-center gap-2">
        <img
          src={user.avatar}
          alt="avatar"
          className="h-8 w-8 rounded-full"
        />

        {state === "expanded" && (
          <div className="text-xs">
            <div className="font-medium">{user.name}</div>
            <div className="text-muted-foreground">{user.email}</div>
          </div>
        )}
      </div>

      {state === "expanded" && (
        <LogOut size={16} className="cursor-pointer opacity-70 hover:opacity-100" />
      )}
    </div>
  );
}

export function SolvSideBar({ items }) {
  const location = useLocation();
  const [open, setOpen] = useState({});

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const renderMenu = (items) => {
    return items?.map((item) => {
      const hasChildren = item.submenu?.length > 0;
      const isOpen = open[item.path];

      const Icon = item.icon ? Icons[item.icon] : null;

      return (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton
            asChild
            isActive={isActive(item.path)}
            tooltip={item.title}
            className="text-[13px] font-medium justify-start group-data-[collapsible=icon]:justify-center"
            onClick={() => hasChildren && toggle(item.path)}
          >
            <Link to={item.path} className="flex items-center gap-2 w-full">
              {Icon && <Icon size={16} />}

              {/* Hide label when collapsed */}
              <span className="group-data-[collapsible=icon]:hidden">
                {item.title}
              </span>

              {hasChildren && (
                <ChevronDown
                  className={`ml-auto transition-transform group-data-[collapsible=icon]:hidden ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  size={14}
                />
              )}
            </Link>
          </SidebarMenuButton>

          {hasChildren && isOpen && (
            <SidebarMenuSub>
              {item.submenu.map((sub) => (
                <SidebarMenuSubItem key={sub.path}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={isActive(sub.path)}
                    className="text-[12.5px] font-medium"
                  >
                    <Link to={sub.path}>{sub.title}</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      );
    });
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        {/* Header */}
        <SidebarHeader className="sticky top-0 z-10 bg-sidebar border-b">
          <HeaderContent />
        </SidebarHeader>

        {/* Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>{renderMenu(items)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="sticky bottom-0 bg-sidebar border-t">
          <FooterContent />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
