import { ChartColumnIncreasing } from "lucide-react";
function AnalyticsPanel({ analytics }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-11 h-11 bg-green-50 rounded flex items-center justify-center">
          <ChartColumnIncreasing
            size={22}
            strokeWidth={2}
            className="text-green-700"
          />
        </div>

        <h2 className="font-bold text-xl">
          Performance Analytics
        </h2>
      </div>
      {Object.entries(analytics).map(
        ([key, value]) => (
          <div
            key={key}
            className="mb-6 last:mb-3"
          >
            <div className="flex justify-between mb-2">
              <span className="uppercase text-xs">
                {key.replaceAll("_", " ")}
              </span>

              <span>{value}%</span>
            </div>

            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-green-700 rounded"
                style={{
                  width: `${value}%`,
                }}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}
export default AnalyticsPanel;