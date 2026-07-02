import React from "react";
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";

const ListView = ({
  interviews = [],
  pagination = {},
  onPageChange,
  onPageSizeChange,
  onStartInterview,
}) => {
  return (
    <div className="bg-white shadow border border-gray-200 rounded-lg">

      <div className="flex justify-between items-center p-6 border-b border-gray-200">

        <div>
          <h2 className="text-[20px] font-bold text-[#230804]">
            Active Schedule
          </h2>
        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr className="text-[12px] font-semibold uppercase tracking-widest text-[#514441]">

              <th className="px-6 py-4 text-left">Interview Type</th>

              <th className="px-6 py-4 text-left">Duration</th>

              <th className="px-6 py-4 text-left">Deadline Date</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {interviews.length === 0 ? (

              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  No Interviews Found
                </td>
              </tr>

            ) : (
              interviews.map((item, index) => (
                <tr
                  key={`${item.interview_id}-${index}`}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5">

                    <h3 className="text-[12px] font-extrabold uppercase text-blue-800">
                      {item.title}
                    </h3>

                    <p className="text-[14px] text-[#514441]">
                      {item.company_name || item.mode || item.interview_source}
                    </p>
                  </td>

                  <td className="text-[14px] text-[#0b1c30] px-6 py-5">

                    {item.duration_minutes} mins

                  </td>

                  <td className="px-6 py-5 text-left">

                    {item.deadline_date}

                  </td>

                  <td className="px-6 py-5 text-left">

                    <StatusBadge status={item.status} />

                  </td>

                  <td className="px-6 py-5 text-left">

                    <button
                      onClick={() =>
                        onStartInterview(item)
                      }
                      disabled={
                        item.status.toLowerCase() === "completed"
                      }
                      className={`px-5 py-2 rounded text-white text-[11px] font-semibold transition
                        ${item.status.toLowerCase() ===
                          "completed"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-700 hover:bg-green-800"
                        }`}
                    >
                      START INTERVIEW
                    </button>

                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      <div className="p-5 border-t border-gray-200">

        <Pagination
          page={pagination?.page || 1}
          totalPages={pagination?.total_pages || 1}
          pageSize={pagination?.page_size || 10}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />

      </div>

    </div>
  );
};

export default ListView;