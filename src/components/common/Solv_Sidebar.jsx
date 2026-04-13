import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from "../ui/sidebar"

export function SolvSideBar({ config, items }) {
  const location = useLocation();
  const [open, setOpen] = useState({});

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const renderMenu = (items, depth = 0) => {
    return items?.map((item) => {
      const hasChildren = item.submenu?.length > 0;
      const isOpen = open[item.path];

      return (
        <SidebarMenuItem key={item.path}>
          <div className="flex flex-col">
            <SidebarMenuButton
              onClick={() => hasChildren && toggle(item.path)}
              className={`flex justify-between items-center
                ${isActive(item.path) ? "bg-primary/10 text-primary" : ""}
              `}
            >
              <Link to={item.path} className="flex-1">
                {item.title}
              </Link>

              {hasChildren && (
                <ChevronDown
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  size={16}
                />
              )}
            </SidebarMenuButton>

            {hasChildren && isOpen && (
              <div className="ml-4 mt-1 space-y-1">
                {renderMenu(item.submenu, depth + 1)}
              </div>
            )}
          </div>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <SidebarProvider>
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenu(items)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </SidebarProvider>
  );
}
