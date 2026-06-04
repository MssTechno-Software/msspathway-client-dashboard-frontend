import { Briefcase, TrendingUp } from "lucide-react";

function StatCard({
  title,
  value,
  message,
  type = "interviews",
}) {
  return (
    <div
      className="bg-white rounded-lg border-l-4 border-l-green-800 p-8"
    >
      <div className="flex items-start gap-6">
        {/* Icon */}
        <div
          className="w-18 h-18 rounded-2xl flex items-center justify-center bg-green-50"
        >
          {type === "performance" ? (
            <TrendingUp
              size={38}
              strokeWidth={2.5}
              className="text-green-800"
            />
          ) : (
            <Briefcase
              size={38}
              strokeWidth={2.5}
              className="text-green-800"
            />
          )}
        </div>

        {/* Content */}
        <div>
          <p className="uppercase text-xs tracking-[4px] text-gray-500 font-semibold">
            {title}
          </p>

          <h2
            className="mt-3 text-5xl font-light"
          >
            {value}
          </h2>

          <p className="mt-4 text-green-800 font-medium">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;