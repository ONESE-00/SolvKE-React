import { Outlet } from "react-router-dom";
import { SolvSideBar } from "../common/Solv_Sidebar";

const sidebarConfig = [
  {
    path: "/admin/configurations",
    title: "Configurations",
    icon: "Settings",
    submenu: [
      { path: "/admin/configurations/subsidiary", title: "Subsidiary" },
      { path: "/admin/configurations/glconfigs/currency", title: "Currency" },
    ],
  },
  {
    path: "/solv-banking",
    title: "Users",
    icon: "Users",
  },
  {
    path: "/solv-banking/account",
    title: "Roles",
    icon: "Shield",
  },
  {
    path: "/solv-bankings",
    title: "Access Policies",
    icon: "Key",
  },
];

export default function SolvBankingLayout() {
  return (
    <div className="flex h-screen bg-[#f8faf6]">
      <SolvSideBar items={sidebarConfig} />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}