import { RefreshCw, ArrowRight, CheckCircle } from "lucide-react";

function FeedbackPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="h-auto min-h-16 border-b border-[#d5c2bf] flex items-center px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold uppercase text-[#514441]">
          <span>Interview Modes</span>
          <span>›</span>
          <span className="text-[#3b6934]">Self Introduction</span>
          <span>›</span>
          <span>Feedback</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* LEFT SECTION */}
          <div className="xl:col-span-7 space-y-6">

            {/* Score Card */}
            <div className="bg-white border border-[#d5c2bf] rounded-xl p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                <div>
                  <p className="uppercase font-bold text-[#514441] mb-2">
                    Overall Score
                  </p>

                  <div className="flex items-center gap-2">
                    <CheckCircle
                      size={32}
                      className="text-[#3b6934]"
                    />

                    <h2 className="text-3xl font-bold text-[#3b6934]">
                      85
                      <span className="text-xl text-[#514441]">
                        /100
                      </span>
                    </h2>
                  </div>
                </div>

                <button className="border border-[#3b6934] text-[#3b6934] px-6 py-3 rounded-lg font-bold uppercase flex items-center gap-2 hover:bg-[#3b6934]/5">
                  <RefreshCw size={18} />
                  Retry Question
                </button>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-white border border-[#d5c2bf] rounded-xl p-6">
              <h3 className="text-[#3b6934] font-bold uppercase mb-6">
                ↗ Comprehensive Strengths
              </h3>

              <ul className="space-y-4 text-[#0b1c30]">
                <li>
                  • Clear articulation and professional tone
                  throughout the response.
                </li>

                <li>
                  • Relevant executive experience mentioned,
                  specifically focusing on leadership milestones.
                </li>

                <li>
                  • Strong use of industry-specific terminology
                  which demonstrates domain expertise.
                </li>

                <li>
                  • Excellent pacing and vocal clarity maintained
                  during the entire session.
                </li>

                <li>
                  • Effective structuring of the narrative from
                  early career to current leadership roles.
                </li>
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-white border border-[#d5c2bf] rounded-xl p-6">
              <h3 className="text-[#d97706] font-bold uppercase mb-6">
                Strategic Improvements
              </h3>

              <ul className="space-y-4 text-[#0b1c30]">
                <li>
                  • Add more measurable achievements and
                  quantified impact.
                </li>

                <li>
                  • Highlight leadership outcomes with
                  real-world examples.
                </li>

                <li>
                  • Mention future aspirations to provide a
                  complete career narrative.
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="xl:col-span-5">
            <div className="bg-white border border-[#d5c2bf] rounded-xl shadow-sm min-h-[650px] flex flex-col p-6">

              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#3b6934]"></span>

                <span className="uppercase font-bold text-[15px] tracking-wide text-[#514441]">
                  Live Transcription
                </span>
              </div>

              <div className="bg-[#f1f4f9] border-l-4 border-[#3b6934] rounded-lg p-4 mb-8">
                <p className="italic text-[#514441] text-[16px] leading-8">
                  AI: Tell us about your professional
                  background and the key milestones that have
                  shaped your career.
                </p>
              </div>

              <div className="space-y-8">
                <p className="text-[#0b1c30] text-base sm:text-lg leading-8">
                  Vertical scaling, or scaling up, involves
                  adding more power—like CPU, RAM, or storage—
                  to an existing server. The main advantage is
                  simplicity, as it doesn't require changes to
                  the application architecture...
                </p>

                <p className="text-[#3b6934] text-base sm:text-lg leading-8">
                  Throughout my fifteen-year career in
                  technology leadership, I've focused on
                  building resilient systems and
                  high-performing teams...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Question */}
        <button className="w-full mt-6 bg-[#3b6934] hover:bg-[#2f5a29] text-white py-4 rounded-lg flex items-center justify-center gap-2 font-bold uppercase">
          <ArrowRight size={18} />
          Next Question
        </button>
      </div>
    </div>
  );
}

export default FeedbackPage;