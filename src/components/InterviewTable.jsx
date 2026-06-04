import { ExternalLink, FileText } from "lucide-react";

function InterviewTable({ interviews }) {
  return (
    <div className="bg-white border border-[#dee2e6] rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-[#dee2e6] flex items-center gap-3">
        <div className="w-10 h-10 shrink-0 bg-green-50 rounded-lg flex items-center justify-center">
          <FileText
            size={20}
            strokeWidth={2}
            className="text-[#2d5a27] shrink-0"
          />
        </div>

        <h2 className="text-[20px] leading-[28px] font-bold text-[#230804]">
          Recently Completed Interviews
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f8f9fa]">
              <th className="px-6 py-4 text-left text-[11px] uppercase tracking-widest font-bold text-[#6c757d]">
                Date
              </th>
              <th className="px-6 py-4 text-left text-[11px] uppercase tracking-widest font-bold text-[#6c757d]">
                Mode
              </th>
              <th className="px-6 py-4 text-left text-[11px] uppercase tracking-widest font-bold text-[#6c757d]">
                Score
              </th>
              <th className="px-6 py-4 text-right text-[11px] uppercase tracking-widest font-bold text-[#6c757d]">
                Insights
              </th>
            </tr>
          </thead>

          <tbody>
            {interviews.map((item) => (
              <tr
                key={item.date}
                className="border-t border-[#dee2e6] hover:bg-[#f8f9fa] transition-colors"
              >
                <td className="px-6 py-5 font-semibold text-[#230804] text-[16px]">
                  {item.date}
                </td>

                <td className="px-6 py-5 text-[#6c757d] text-[16px]">
                  {item.mode}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`
                      px-3 py-1 text-xs font-bold border rounded-sm
                      ${
                        item.score >= 70
                          ? "bg-green-50 text-[#2d5a27] border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }
                    `}
                  >
                    {item.score}/100
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  <a
                    href={item.insights_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#2d5a27] font-bold text-sm hover:underline"
                  >
                    View Insights
                    <ExternalLink size={14} className="shrink-0" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InterviewTable;
