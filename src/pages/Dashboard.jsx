import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import InterviewTable from "../components/InterviewTable";
import AnalyticsPanel from "../components/AnalyticsPanel";

import { getDashboardData } from "../api/dashboardApi";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(true);

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
    <div className="flex min-h-screen bg-[#f8f9fa] text-[#212529]">
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <main
        className={`
          flex-1 min-h-screen px-12 py-10 transition-all duration-300
          ${openSidebar ? "ml-64" : "ml-20"}
        `}
      >
        <header className="mb-10">
          <h1 className="text-[32px] leading-[40px] font-bold tracking-[-0.01em] text-[#230804]">
            Welcome back, Revanth
          </h1>

          <p className="mt-2 text-[18px] leading-[28px] text-[#6c757d]">
            Practice. Analyze. Improve. Repeat...
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <StatCard
            title="Total Interviews Completed"
            value={data.total_interviews_completed}
            message="Keep up the good work!"
            type="interviews"
          />

          <StatCard
            title="Average Performance Score"
            value={`${data.average_performance_score}%`}
            message={data.performance_message}
            type="performance"
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <InterviewTable
              interviews={data.recently_completed_interviews}
            />
          </div>

          <div className="lg:col-span-4">
            <AnalyticsPanel
              analytics={data.performance_analytics}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
