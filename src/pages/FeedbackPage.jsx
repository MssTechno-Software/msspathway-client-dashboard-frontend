import {
  RefreshCw,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function FeedbackPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="min-h-16 border-b border-[#d5c2bf] flex items-center px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold uppercase">
          <span
            onClick={() => navigate("/interview-modes")}
            className="cursor-pointer hover:text-[#3b6934]"
          >
            Interview Modes
          </span>

          <span>›</span>

          <span
            onClick={() => navigate("/self-introduction")}
            className="cursor-pointer hover:text-[#3b6934]"
          >
            Self Introduction
          </span>

          <span>›</span>

          <span className="text-[#3b6934]">
            Feedback
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-12 py-6 lg:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">

          {/* LEFT SIDE */}
          <div className="xl:col-span-7 flex flex-col">

            <div className="bg-gray-50 border border-[#d5c2bf] rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col xl:min-h-162.5">

              {/* Score Card */}
              <div className="shadow-sm rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">

                <div>
                  <p className="uppercase font-bold text-[#514441] text-md mb-3">
                    Overall Score
                  </p>

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={32}
                      className="text-[#3b6934]"
                    />

                    <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-bold text-[#3b6934]">
                      85 <span className="text-[28px] text-[#514441]">/100</span>
                    </h2>
                  </div>
                </div>

                <button 
                  onClick={() => 
                    navigate("/self-introduction",
                      {
                        state: {retry : true},
                      }
                    )
                  }
                  className="w-full sm:w-auto border border-[#3b6934] text-[#3b6934] px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-bold uppercase flex items-center justify-center gap-2 hover:bg-[#3b6934]/5 transition">
                  <RefreshCw size={18} />
                  Retry Question
                </button>
              </div>

              {/* Feedback */}
              <div className="flex-1 mt-5 rounded-xl p-4 sm:p-6 lg:p-8 bg-white shadow-sm">

                {/* Strengths */}
                <h3 className="text-[#3b6934] font-bold uppercase flex items-center gap-2 mb-6 text-sm sm:text-base">
                  <TrendingUp size={18} />
                  Comprehensive Strengths
                </h3>

                <ul className="space-y-4 sm:space-y-5 text-[#0b1c30] text-sm sm:text-base lg:text-lg">
                  <li>
                    • Clear articulation and professional tone throughout the response.
                  </li>

                  <li>
                    • Relevant executive experience mentioned, specifically focusing on leadership milestones.
                  </li>

                  <li>
                    • Strong use of industry-specific terminology which demonstrates domain expertise.
                  </li>

                  <li>
                    • Excellent pacing and vocal clarity maintained during the entire session.
                  </li>

                  <li>
                    • Effective structuring of the narrative from early career to current leadership roles.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="xl:col-span-5">

            <div className="bg-white border border-[#d5c2bf] rounded-xl shadow-sm p-4 sm:p-6 flex flex-col xl:min-h-162.5">

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#3b6934]"></span>

                <span className="uppercase font-bold text-[15px] tracking-wide text-[#514441]">
                  Live Transcription
                </span>
              </div>

              {/* Scrollable Area */}
              <div className="flex-1 overflow-y-auto pr-2">

                {/* AI Prompt */}
                <div className="bg-[#f1f4f9] border-l-4 border-[#3b6934] p-4 mb-8">
                  <p className="italic text-[#514441] text-sm sm:text-base leading-7 sm:leading-8">
                    AI: Tell us about your professional background
                    and the key milestones that have shaped your
                    career.
                  </p>
                </div>

                {/* Transcript */}
                <div className="space-y-8">
                  <p className="text-[#0b1c30] text-sm sm:text-base lg:text-lg leading-7 lg:leading-10">
                    Vertical scaling, or scaling up, involves adding
                    more power—like CPU, RAM, or storage—to an
                    existing server. The main advantage is simplicity,
                    as it doesn't require changes to the application
                    architecture...
                  </p>

                  <p className="text-[#3b6934] text-lg">
                    Throughout my fifteen-year career in technology
                    leadership, I've focused on building resilient
                    systems and high-performing teams.
                  </p>
                </div>
              </div>

              {/* Bottom Divider */}
              <div className="mt-6 border-t border-[#d5c2bf] pt-6"></div>

            </div>
          </div>
        </div>
        {/* Next Question */}
        <button className="mt-6 w-full bg-[#3b6934] hover:bg-[#2f5a29] text-white py-4 sm:py-5 rounded-lg flex items-center justify-center gap-3 font-bold uppercase transition">
          <ArrowRight size={20} />
          Next Question
        </button>
      </div>
    </div>
  );
}

export default FeedbackPage;