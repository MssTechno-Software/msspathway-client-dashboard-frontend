import {
  Presentation,
  BrainCircuit,
  TerminalSquare,
} from "lucide-react";
import ModeCard from "../components/ModeCard";

function InterviewModes() {
  return (
    <div className="min-h-screen bg-[#FDFDFF] px-12 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[48px] font-bold text-[#230804]">
          Choose Interview Mode
        </h1>

        <p className="text-xl text-[#514441] max-w-4xl leading-relaxed">
          Select a specialized environment to begin your session.
          Each mode is powered by custom AI agents tailored for
          specific evaluation criteria.
        </p>
      </div>

      {/* Title */}
      <div className="flex items-center gap-4 mb-8">
        <h3 className="uppercase tracking-[4px] text-xs font-bold text-gray-500">
          Featured Assessment Modes
        </h3>

        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Cards */}
      <div className="grid lg:grid-cols-3 gap-8">
        <ModeCard
          icon={
            <span className="material-symbols-outlined text-[32px]">
              record_voice_over
            </span>
          }
          title="Self-Introduction Evaluation"
          description="Pitch yourself to AI scouts and receive deep impact scores on communication and presence."
        />

        <ModeCard
          icon={
            <span className="material-symbols-outlined text-[32px]">
              psychology
            </span>
          }
          title="Topic-Specific Theory"
          description="Deep dive into your specific area of expertise and niche domain skills with domain-expert AI."
        />

        <ModeCard
          icon={
            <span className="material-symbols-outlined text-[32px]">
              terminal
            </span>
          }
          title="Code Interview"
          description="Solve algorithmic challenges in a real-time environment with live intelligent execution feedback."
        />
      </div>

      {/* Executive Summary */}
      <div className="mt-10 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b border-gray-200 flex justify-between items-center">
          <h4 className="uppercase tracking-widest text-sm font-bold text-gray-500">
            Executive Summary
          </h4>
        </div>

        <div className="grid md:grid-cols-4 gap-10 p-10">
          <div>
            <p className="text-xs uppercase text-gray-500 font-bold">
              Total Interviews
            </p>

            <div className="flex items-end gap-2 mt-2">
              <h3 className="text-4xl font-bold">24</h3>
              <span className="text-green-700 font-semibold">
                +2 this week
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-500 font-bold">
              Avg. Impact Score
            </p>

            <h3 className="text-4xl font-bold text-green-700 mt-2">
              82%
            </h3>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-500 font-bold">
              Skills Verified
            </p>

            <h3 className="text-4xl font-bold mt-2">
              12
              <span className="text-base text-gray-500">
                {" "}
                /18 Target
              </span>
            </h3>
          </div>

          <div className="bg-[#230804] text-white p-5 rounded-xl">
            <p className="uppercase text-xs text-white/60 font-bold">
              Next Session
            </p>

            <h3 className="text-3xl font-bold mt-2">
              Today, 2PM
            </h3>

            <p className="text-white/80 mt-2">Infosys</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InterviewModes;