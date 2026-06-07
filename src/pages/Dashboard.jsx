import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import InterviewTable from "../components/InterviewTable";
import AnalyticsPanel from "../components/AnalyticsPanel";

import { getDashboardData } from "../api/dashboardApi";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboardData().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f8f9fa] text-[#212529]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#212529] px-6 md:px-10 xl:px-12 py-8 md:py-10">
      {/* Header */}
      <header className="mb-8 md:mb-10">
        <h1 className="text-[28px] md:text-[32px] leading-tight font-bold tracking-[-0.01em] text-[#230804]">
          Welcome back, Revanth
        </h1>

        <p className="mt-2 text-[16px] md:text-[18px] text-[#6c757d]">
          Practice. Analyze. Improve. Repeat...
        </p>
      </header>

      {/* Stat Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <StatCard
          title="Total Interviews Completed"
          value={data.total_interviews_completed}
          message="Keep up the good work! ❤"
          type="interviews"
        />

        <StatCard
          title="Average Performance Score"
          value={`${data.average_performance_score}%`}
          message="You're performing great! ✨"
          type="performance"
        />
      </section>

      {/* Table + Analytics */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8">
          <InterviewTable
            interviews={data.recently_completed_interviews}
          />
        </div>

        <div className="xl:col-span-4">
          <AnalyticsPanel
            analytics={data.performance_analytics}
          />
        </div>
      </section>
    </div>
  );
}
