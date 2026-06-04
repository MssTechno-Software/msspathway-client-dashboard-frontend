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
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f5f6f7]">
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <main
        className={`
          flex-1 p-12 transition-all duration-300
          ${openSidebar ? "ml-64" : "ml-20"}
        `}
      >
        <h1 className="text-4xl font-bold">
          Welcome back, Revanth
        </h1>

        <p className="mt-4 text-gray-500 text-lg">
          Practice. Analyze. Improve.
          Repeat...
        </p>

        <div className="grid grid-cols-2 gap-6 mt-10">
          <StatCard
            title="Total Interviews Completed"
            value={
              data.total_interviews_completed
            }
            message="Keep up the good work!"
            type="interviews"
          />

          <StatCard
            title="Average Performance Score"
            value={`${data.average_performance_score}%`}
            message={
              data.performance_message
            }
            type="performance"
          />
        </div>

        <div className="grid grid-cols-4 gap-6 mt-10">

          <div className="col-span-3">
            <InterviewTable
              interviews={
                data.recently_completed_interviews
              }
            />
          </div>
          <div className="col-span-1">
            <AnalyticsPanel
              analytics={
                data.performance_analytics
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
}