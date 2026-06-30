import {
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiSearch,
    FiMapPin,
} from "react-icons/fi";

function ScoreCardPage() {
    const scorecards = [
        {
            date: "Oct 20, 2023",
            mode: "COMPANY BASED",
            score: 85,
        },
        {
            date: "Oct 15, 2023",
            mode: "SELF-INTRODUCTION",
            score: 74,
        },
        {
            date: "Oct 12, 2023",
            mode: "COMPANY-BASED",
            score: 81,
        },
        {
            date: "Oct 08, 2023",
            mode: "RESUME-BASED",
            score: 64,
        },
    ];

    return (
        <div className="bg-[#f8f8f8] min-h-screen p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-5xl font-bold text-[#1c0d05]">Scorecards</h1>

                <p className="text-gray-600 mt-2 leading-7 max-w-xl">
                    Review comprehensive interview performance metrics, AI-driven
                    candidate scoring, and detailed evaluation history.
                </p>
            </div>

            {/* Filters */}
            <div className="flex justify-end items-center gap-3 mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="FROM  dd-mm-yyyy"
                        className="w-44 h-10 border border-gray-200 rounded px-3 pr-10 text-sm outline-none bg-white"
                    />
                    <FiCalendar className="absolute right-3 top-3 text-gray-500" />
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="TO  dd-mm-yyyy"
                        className="w-44 h-10 border border-gray-200 rounded px-3 pr-10 text-sm outline-none bg-white"
                    />
                    <FiCalendar className="absolute right-3 top-3 text-gray-500" />
                </div>

                <button className="bg-[#2e5d2d] text-white h-10 px-6 rounded font-medium flex items-center gap-2 hover:bg-[#214b20]">
                    <FiSearch />
                    Search
                </button>

                <button className="h-10 px-5 border border-gray-200 rounded bg-white font-medium hover:bg-gray-50">
                    Clear
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                {/* Top */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-[#230804]">
                        Recent Scorecards
                    </h2>
                </div>

                {/* Table */}
                <table className="w-full">
                    <thead className="text-sm uppercase tracking-wide text-gray-500">
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-4 px-6">Submitted Date</th>
                            <th className="text-left">Interview Mode</th>
                            <th className="text-left">Performance Score</th>
                            <th className="text-left">AI Insights</th>
                        </tr>
                    </thead>

                    <tbody>
                        {scorecards.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 last:border-none hover:bg-gray-50"
                            >
                                <td className="px-6 py-7 text-gray-700">{item.date}</td>

                                <td>
                                    <span className="bg-gray-100 px-4 py-1 rounded-full text-[11px] font-semibold">
                                        {item.mode}
                                    </span>
                                </td>

                                <td>
                                    <div className="w-40">
                                        <div className="w-full h-2 bg-gray-200 rounded-full">
                                            <div
                                                className="h-2 rounded-full bg-[#2f6c2f]"
                                                style={{ width: `${item.score}%` }}
                                            ></div>
                                        </div>

                                        <p className="mt-2 text-sm font-semibold text-[#2f6c2f]">
                                            {item.score}/100
                                        </p>
                                    </div>
                                </td>

                                <td>
                                    <button className="text-[#2f6c2f] font-semibold text-sm flex items-center gap-2 hover:underline">
                                        <FiMapPin />
                                        VIEW INSIGHTS & FEEDBACK
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Footer */}
                <div className="flex justify-between items-center px-6 py-5 border-t">

                    <div className="flex items-center gap-3 text-sm">
                        <button className="w-9 h-9 rounded bg-[#2e5d2d] text-white font-semibold">
                            1
                        </button>

                        <button className="hover:text-green-700">2</button>

                        <button className="hover:text-green-700">3</button>

                        <span>...</span>

                        <button className="hover:text-green-700">12</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScoreCardPage;