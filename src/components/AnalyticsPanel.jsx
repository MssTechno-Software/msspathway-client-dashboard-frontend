function AnalyticsPanel({ analytics }) {
  return (
    <div className="bg-white border border-[#dee2e6] p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 shrink-0 bg-[#eff4ff] rounded-lg flex items-center justify-center">
          <span
            className="material-symbols-outlined text-[#3b6934] text-[24px] leading-none"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            bar_chart
          </span>
        </div>

        <h2 className="text-[20px] leading-7 font-bold text-[#230804]">
          Performance Analytics
        </h2>
      </div>

      <div className="flex flex-col justify-between flex-1">
        {Object.entries(analytics).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between mb-3">
              <span className="uppercase text-[10px] tracking-wider font-bold text-[#6c757d]">
                {key.replaceAll("_", " ")}
              </span>

              <span className="font-bold text-[#230804] text-sm">
                {value}%
              </span>
            </div>

            <div className="w-full h-2 bg-[#e9ecef] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2d5a27] rounded-full"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalyticsPanel;
