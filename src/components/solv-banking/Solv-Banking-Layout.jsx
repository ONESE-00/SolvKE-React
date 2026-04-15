import { Outlet } from "react-router-dom";
import { SolvSideBar } from "../common/Solv_Sidebar";
import * as React from "react";
// import { Solv_TopBar } from "../common/Solv_topBar";

const sidebarConfig = [
  {
    title: "Configurations",
    icon: "Settings",
    submenu: [
      { path: "/admin/configurations/subsidiary", title: "Subsidiary" },
      { path: "/admin/configurations/glconfigs/currency", title: "Currency" },
    ],
  },
  // {
  //   path: "/solv-banking",
  //   title: "Users",
  //   icon: "Users",
  // },
  {
    path: "/solv-banking/account",
    title: "Account",
    icon: "Shield",
  },
  {
    path: "/solv-banking/profile",
    title: "Profile",
    icon: "Key",
  },
];

export const SolvBankingContext = React.createContext("Solv Banking")

export default function SolvBankingLayout() {

   return (
    <div className="flex h-screen bg-[#f8faf6]">
      <SolvSideBar items={sidebarConfig} />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
  // return (
  //   <div className="flex h-screen bg-[#f8faf6]">
      
  //     {/* Sidebar */}
  //     <SolvSideBar items={sidebarConfig} />

  //     {/* Main Content Area */}
  //     <div className="flex flex-1 flex-col overflow-hidden">
        
  //       {/* Top Navigation */}
  //       <Solv_TopBar />

  //       {/* Page Content */}
  //       <main className="flex-1 overflow-auto p-6">
  //         <Outlet />
  //       </main>

  //     </div>
  //   </div>
  // );
}