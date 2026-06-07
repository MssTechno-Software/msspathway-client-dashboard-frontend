import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-[#212529]">
      {/* Sidebar */}
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      {/* Page Content */}
      <main
        className={`
          flex-1 min-h-screen
          transition-all duration-300
          ${openSidebar ? "ml-64" : "ml-20"}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}