import { ChartColumnIncreasing } from "lucide-react";

function AnalyticsPanel({ analytics }) {
  return (
    <div className="bg-white border border-[#dee2e6] rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 shrink-0 bg-[#eff4ff] rounded-lg flex items-center justify-center">
          <ChartColumnIncreasing
            size={20}
            strokeWidth={2}
            className="text-[#3b6934] shrink-0"
          />
        </div>

        <h2 className="text-[20px] leading-[28px] font-bold text-[#230804]">
          Performance Analytics
        </h2>
      </div>

      <div className="flex flex-col gap-8">
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
