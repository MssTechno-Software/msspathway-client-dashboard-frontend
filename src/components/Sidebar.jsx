import { ChevronLeft, ChevronRight } from "lucide-react";

const menuItems = [
  { icon: "person", label: "My Profile" },
  { icon: "home", label: "Dashboard", active: true },
  { icon: "video_chat", label: "Interview Modes" },
  { icon: "calendar_today", label: "Scheduled for you" },
  { icon: "fact_check", label: "Scorecards" },
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
          bg-green-800 text-white
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
            className="w-10 h-10 object-contain rounded shrink-0"
          />

          {openSidebar && (
            <div>
              <h2 className="text-[20px] leading-7 font-bold text-white">
                MSS Techno
              </h2>

              <p className="text-[12px] leading-4 tracking-wider text-white/60">
                Client Dashboard
              </p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`
              w-full flex items-center
              ${openSidebar ? "justify-start gap-3" : "justify-center"}
              px-4 py-3 rounded-xl
              text-[12px] leading-4 uppercase tracking-wider
              transition-all duration-150 active:scale-95 cursor-pointer
              ${
                item.active
                  ? "bg-green-800 text-white font-bold shadow-sm"
                  : "text-white/80 hover:bg-white/10 font-semibold"
              }
            `}
          >
            <span
              className="material-symbols-outlined shrink-0 text-[24px] leading-none"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {item.icon}
            </span>

            {openSidebar && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="pt-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center justify-center
            px-4 py-3 rounded-xl
            bg-green-800 hover:bg-green-700
            text-[12px] leading-4 uppercase tracking-wider 
            font-bold transition-all duration-150 active:scale-95 cursor-pointer`}
        >
          <span
            className="material-symbols-outlined shrink-0 text-[12px] leading-none"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            logout
          </span>

          {openSidebar && <span>Logout</span>}
        </button>
        <p className="mt-4 text-sm text-white/60 text-center">
          &copy; {new Date().getFullYear()} version 1.0.0
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
