import {Mic, SkipForward, CheckCircle, Timer} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BeginAssessmentModal from "../components/BeginAssessmentModal";
import { useNavigate } from "react-router-dom";

function SelfIntroductionQuestion() {
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.showBeginAssessmentModal) {
            setShowModal(true);
        }
    }, [location]);
    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="h-auto min-h-16 border-b border-[#d5c2bf] flex items-center px-4 sm:px-6 lg:px-12 py-4">
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold uppercase text-[#514441]">
                    <span>Interview Modes</span>
                    <span>›</span>
                    <span className="text-[#3b6934]">
                        Self Introduction
                    </span>
                    <span>›</span>
                    <span>Question 1</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* LEFT SECTION */}
                    <div className="xl:col-span-7">
                        {/* Interview Card */}
                        <div className="bg-white border border-[#d5c2bf] rounded-xl shadow-sm min-h-125 lg:min-h-162.5  flex flex-col items-center justify-center relative overflow-hidden">

                            {/* Avatar */}
                            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-[#bcf1ad] p-1 bg-white">
                                <img
                                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
                                    alt="AI Interviewer"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>

                            {/* Waveform */}
                            <div className="flex items-center gap-1 mt-12">
                                {[15, 20, 25, 15, 20, 25, 15, 20].map(
                                    (h, i) => (
                                        <div
                                            key={i}
                                            className="w-1 bg-[#3b6934] rounded-full animate-pulse"
                                            style={{
                                                height: `${h}px`,
                                            }}
                                        />
                                    )
                                )}
                            </div>

                            {/* Timer */}
                            <div className="mt-12 flex flex-col items-center">
                                <div className="flex flex-wrap justify-center items-center gap-2 mb-1 text-center">
                                    <Timer
                                        size={18}
                                        className="text-[#3b6934]"
                                    />

                                    <span className="uppercase font-bold tracking-wider text-[#514441]">
                                        Question Time Remaining:
                                    </span>

                                    <span className="font-bold text-[#3b6934]">
                                        01:45
                                    </span>
                                </div>

                                <div className="w-32 h-1 bg-[#f1f4f9] rounded-full overflow-hidden">
                                    <div className="w-[45%] h-full bg-[#3b6934]" />
                                </div>
                            </div>

                            {/* Question */}
                            <div className="text-center mt-8 lg:mt-10 px-4 sm:px-8 lg:px-12">
                                <p className="uppercase tracking-[4px] text-[#3b6934] font-bold mb-2">
                                    Interviewer AI Active
                                </p>

                                <h2 className="text-xl sm:text-2xl lg:text-[28px] leading-8 sm:leading-10 font-bold">
                                    Tell us about your professional
                                    background and the key milestones
                                    that have shaped your career.
                                </h2>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button className="flex-1 bg-[#3b6934] hover:bg-[#2f5a29] text-white py-4 rounded-lg flex items-center justify-center gap-2 font-bold uppercase">
                                <Mic size={18} />
                                Speak Now
                            </button>

                            <button className="w-full flex-1 border-2 border-[#3b6934] text-[#3b6934] py-4 rounded-lg flex items-center justify-center gap-2 font-bold uppercase hover:bg-[#3b6934]/5">
                                <SkipForward size={18} />
                                Skip Question
                            </button>

                            <button 
                                onClick={() => navigate("/feedback")}
                                className="w-full flex-1 bg-[#3b6934] hover:bg-[#2f5a29] text-white py-4 rounded-lg flex items-center justify-center gap-2 font-bold uppercase">
                                <CheckCircle size={18} />
                                Submit Answer
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="xl:col-span-5">
                        <div className="bg-white border border-[#d5c2bf] rounded-xl shadow-sm h-162.5 flex flex-col p-6">

                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#3b6934] animate-pulse"></span>

                                <span className="uppercase font-bold text-[15px] tracking-wide text-[#514441]">
                                    Live Transcription
                                </span>
                            </div>

                            {/* Scroll Area */}
                            <div className="flex-1 overflow-y-auto pr-2">

                                {/* AI Prompt */}
                                <div className="bg-[#f1f4f9] border-l-4 border-[#3b6934] rounded-lg p-4 mb-8">
                                    <p className="italic text-[#514441] text-[16px] leading-8">
                                        AI: Tell us about your professional
                                        background and the key milestones
                                        that have shaped your career.
                                    </p>
                                </div>

                                {/* Transcript */}
                                <div className="space-y-8">
                                    <p className="text-[#0b1c30] text-base sm:text-lg leading-7 sm:leading-9">
                                        Vertical scaling, or scaling up,
                                        involves adding more power—like CPU,
                                        RAM, or storage—to an existing
                                        server. The main advantage is
                                        simplicity, as it doesn't require
                                        changes to the application
                                        architecture...
                                    </p>

                                    <p className="text-[#3b6934] text-base sm:text-lg leading-7 sm:leading-9 border-b border-[#bcf1ad] pb-3">
                                        Throughout my fifteen-year career
                                        in technology leadership, I've
                                        focused on building resilient
                                        systems and high-performing teams.
                                        A major milestone was...

                                        <span className="inline-block w-0.5 h-6 bg-[#3b6934] ml-1 animate-pulse align-middle"></span>
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Divider */}
                            <div className="mt-6 border-t border-[#d5c2bf] pt-6"></div>
                        </div>
                    </div>
                </div>
            </div>
            <BeginAssessmentModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onProceed={() => {
                    setShowModal(false);
                    console.log("Interview Started");
                }}
            />
        </div>
    );
}

export default SelfIntroductionQuestion;