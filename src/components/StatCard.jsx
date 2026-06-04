function StatCard({ title, value, message, type = "interviews" }) {
  return (
    <div className="bg-white border border-[#dee2e6] rounded-xl shadow-sm p-8">
      <div className="flex items-start gap-6">
        <div
          className={`
            w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center
            ${type === "performance" ? "bg-[#eff4ff]" : "bg-green-50"}
          `}
        >
          {type === "performance" ? (
            <span
              className="material-symbols-outlined text-[#3b6934] text-[36px] leading-none"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              monitoring
            </span>
          ) : (
            <span
              className="material-symbols-outlined text-[#2d5a27] text-[36px] leading-none"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              work
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#6c757d] mb-1">
            {title}
          </span>

          <h2 className="text-[64px] leading-none font-bold text-[#230804]">
            {value}
          </h2>

          <p
            className={`
              mt-2 text-sm font-semibold
              ${type === "performance" ? "text-[#3b6934]" : "text-[#2d5a27]"}
            `}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
