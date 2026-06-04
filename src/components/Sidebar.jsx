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

const menuItems = [
  { icon: User, label: "My Profile" },
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: MessageSquare, label: "Interview Modes" },
  { icon: Calendar, label: "Scheduled for you" },
  { icon: ClipboardCheck, label: "Scorecards" },
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
        bg-[#230804] text-white flex flex-col
        p-4 gap-2
        transition-all duration-300
        ${openSidebar ? "w-64" : "w-20"}
      `}
    >
      <button
        onClick={() => setOpenSidebar(!openSidebar)}
        className="
          absolute top-5 -right-4
          w-8 h-8 rounded-full
          bg-[#2d5a27] text-white
          flex items-center justify-center
          shadow-lg cursor-pointer
        "
      >
        {openSidebar ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className="mb-6 px-2">
        <div className="flex items-center gap-3">
          <img
            src="/title_mss_logo.png"
            alt="logo"
            className="w-10 h-10 object-contain rounded"
          />

          {openSidebar && (
            <div>
              <h2 className="text-[20px] leading-[28px] font-bold text-white">
                MSS Techno
              </h2>

              <p className="text-[12px] leading-[16px] uppercase tracking-[0.05em] text-white/60">
                Client Dashboard
              </p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`
                w-full flex items-center
                ${openSidebar ? "justify-start gap-3" : "justify-center"}
                px-4 py-3 rounded
                text-[12px] leading-[16px] uppercase tracking-[0.05em]
                transition-all duration-150 active:scale-95 cursor-pointer
                ${
                  item.active
                    ? "bg-[#2d5a27] text-white font-bold shadow-sm"
                    : "text-white/80 hover:bg-white/10 font-semibold"
                }
              `}
            >
              <Icon size={22} />

              {openSidebar && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center
            ${openSidebar ? "justify-start gap-3" : "justify-center"}
            px-4 py-3 rounded
            bg-[#2d5a27] hover:bg-[#23501e]
            text-[12px] leading-[16px] uppercase tracking-[0.05em]
            font-bold transition-all duration-150 active:scale-95 cursor-pointer
          `}
        >
          <LogOut size={22} />

          {openSidebar && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
