import { Outlet } from "react-router-dom";
import { SolvSideBar } from "../common/Solv_Sidebar";

const sidebarConfig = [
  {
    path: "/admin/configurations",
    title: "Configurations",
    submenu: [
      {
        path: "/admin/configurations/subsidiary",
        title: "Subsidiary",
      },
      {
        path: "/admin/configurations/glconfigs/currency",
        title: "Currency",
      },
      {
        path: "/admin/configurations/module-types",
        title: "Module Types",
      },
      {
        path: "/admin/configurations/gl-maintenance",
        title: "GL Maintenance",
      },
      {
        path: "/admin/configurations/file-configs",
        title: "File Configurations",
      },
    ],
  },
  {
    path: "/solv-banking",
    title: "Users",
  },
  {
    path: "/solv-banking/account",
    title: "Roles",
  },
  {
    path: "/solv-bankings",
    title: "Access Policies",
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