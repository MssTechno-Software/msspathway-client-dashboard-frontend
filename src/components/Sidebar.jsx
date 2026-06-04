import {
  User,
  LayoutDashboard,
  MessageSquare,
  Calendar,
  ClipboardCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    icon: User,
    label: "My Profile",
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
  },
  {
    icon: MessageSquare,
    label: "Interview Modes",
  },
  {
    icon: Calendar,
    label: "Scheduled for you",
  },
  {
    icon: ClipboardCheck,
    label: "Scorecards",
  },
];

function Sidebar({ openSidebar, setOpenSidebar }) {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen
        bg-[#301E0F] text-white flex flex-col
        transition-all duration-300
        ${openSidebar ? "w-64" : "w-20"}
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setOpenSidebar(!openSidebar)}
        className="
          absolute top-5 -right-4
          w-8 h-8 rounded-full
          bg-green-800 text-white
          flex items-center justify-center
          shadow-lg cursor-pointer
        "
      >
        {openSidebar ? (
          <ChevronLeft size={20} />
        ) : (
          <ChevronRight size={20} />
        )}
      </button>

      {/* Logo Section */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img
            src="/title_mss_logo.png"
            alt="logo"
            className="w-12 h-12 rounded"
          />

          {openSidebar && (
            <div>
              <h2 className="font-bold text-xl">
                MSS Techno
              </h2>

              <p className="text-xs text-gray-300">
                Client Dashboard
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`
                w-full
                flex items-center gap-4
                px-4 py-3
                rounded-xl
                transition-all duration-200
                font-semibold

                ${
                  item.active
                    ? "bg-green-800 text-white"
                    : "hover:bg-white/10"
                }
              `}
            >
              <Icon size={20} />

              {openSidebar && (
                <span>{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="
            w-full
            flex justify-center items-center gap-4
            px-4 py-3
            rounded-xl
            bg-green-800
            hover:bg-green-700
            transition-all duration-200
            cursor-pointer
          "
        >
          <LogOut size={20} />

          {openSidebar && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;