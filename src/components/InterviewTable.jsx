import { ExternalLink, FileText } from "lucide-react";
function InterviewTable({ interviews }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      <div className="p-6 border-b border-gray-200 flex items-center gap-4">
        <div className="w-11 h-11 bg-green-50 rounded flex items-center justify-center">
          <FileText
            size={22}
            strokeWidth={2}
            className="text-green-700"
          />
        </div>

        <h2 className="font-bold text-xl">
          Recently Completed Interviews
        </h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 uppercase bg-gray-50">
            <th className="p-4">Date</th>
            <th className="p-4">Mode</th>
            <th className="p-4">Score</th>
            <th className="p-4">Insights</th>
          </tr>
        </thead>

        <tbody>
          {interviews.map((item) => (
            <tr
              key={item.date}
              className="border-t border-gray-200"
            >
              <td className="p-4.5 font-bold">{item.date}</td>

              <td className="p-4.5">
                {item.mode}
              </td>

              <td className="p-4.5">
                <span
                  className={`px-3 py-1 rounded border border-gray-200
                  ${item.score >= 70
                      ? "bg-green-50 text-green-800 border-green-200 rounded-full"
                      : "bg-red-50 text-red-800 border-red-200 rounded-full"
                    }`}
                >
                  {item.score}/100
                </span>
              </td>

              <td className="p-4.5">
                <a
                  href={item.insights_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-800 font-medium flex items-center gap-1 hover:underline"
                >
                  View Insights
                  <ExternalLink size={16} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default InterviewTable;