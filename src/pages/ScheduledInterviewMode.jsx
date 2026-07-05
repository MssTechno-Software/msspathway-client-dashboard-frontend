import React from "react";
import { useLocation } from "react-router-dom";
import {
    ChevronRight,
    Clock3,
    ShieldCheck,
    CircleCheck,
    ArrowRight,
    Info,
    FileText,
} from "lucide-react";
import { FiLoader } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../config/api";

function ScheduledInterviewMode() {
    const { state } = useLocation();
    const interview = state?.interview;
    const preStartData = state?.preStartData;
    const pageTitle = preStartData?.page_title?.trim() || "Interview";
    const isCompanyInterview = pageTitle.toLowerCase().includes("company");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState({
        show: false,
        message: "",
        type: "", // success | error
    });
    const clientId =
        state?.client_id ??
        localStorage.getItem("client_id");

    const activeAssessmentMode =
        preStartData?.assessment_mode?.label || "--";

    const activeDuration =
        preStartData?.duration?.label || "--";

    const focusAreas =
        preStartData?.question_focus_areas || [];

    const focusTags =
        preStartData?.question_focus_areas?.map(area => area.title) || [];

    /*start interview*/
    console.log({ clientId, interviewId: interview.interview_id });
    const handleStartInterview = async () => {
        try {
            setLoading(true);
            console.log(clientId);
            console.log(interview.interview_id);
            const response = await axios.post(
                `${BASE_URL}/api/clients/${clientId}/interviews/${interview.interview_id}/generate-questions`
            );

            console.log("Generate Questions Response:", response.data);
            navigate("/scheduled-ai-interview", {
                state: {
                    ...response.data,
                    interview_id: interview.interview_id,
                    client_id: clientId,
                    preStartData,
                    interview,
                },
            });

        } catch (err) {
            console.error(err);

            setPopup({
                show: true,
                type: "error",
                message:
                    err?.response?.data?.message ||
                    err?.response?.data?.error ||
                    err?.response?.data?.detail ||
                    "Failed to start the interview. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#f8f9ff] px-12 py-8 font-sans antialiased text-[#0b1c30]">
            {/*Loader*/}
            {loading && (
                <div className="fixed inset-0 bg-black/40 z-9999 flex items-center justify-center">
                    <div className="p-6 flex flex-col items-center gap-3">
                        <FiLoader className="animate-spin text-4xl text-green-800" />

                        <p className="text-gray-800 font-medium">
                            Please wait...
                        </p>
                    </div>
                </div>
            )}
            <div className="w-full max-w-full flex flex-col pt-2">

                {isCompanyInterview ? (
                    <>
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 font-bold text-[12px] tracking-[0.05em] text-[#514441] mb-10 uppercase">
                            <Link
                                to="/scheduled-Interview"
                                className="text-[#514441] hover:text-[#154212] transition-colors"
                            >
                                Scheduled for You
                            </Link>

                            <ChevronRight className="w-3.5 h-3.5 text-[#514441]" />
                            <span className="text-[#154212]">{pageTitle}</span>
                        </div>
                        <div className="max-w-[800px] mx-auto flex flex-col">
                            {/* Page Title */}
                            <h2 className="text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-[#0b1c30] text-left mb-10 font-sans">
                                {pageTitle}
                            </h2>

                            {/* Main Card */}
                            <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-xl p-6 shadow-sm w-full">
                                <div className="grid md:grid-cols-2 gap-6 items-start">
                                    {/* Left Column */}
                                    <div className="flex flex-col gap-6">
                                        {/* Assessment Mode Box */}
                                        <div className="p-3 bg-[#f8f9ff] border border-[#e5e7eb] rounded-lg flex flex-col gap-1">
                                            <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#514441] uppercase">
                                                Assessment Mode
                                            </p>
                                            <div className="flex items-center gap-1.5">
                                                <ShieldCheck className="w-5 h-5 text-[#154212]" />
                                                <span className="text-[20px] leading-[28px] font-semibold text-[#0b1c30] font-sans">{activeAssessmentMode}</span>
                                            </div>
                                        </div>

                                        {/* Duration Box */}
                                        <div className="p-3 bg-[#f8f9ff] border border-[#e5e7eb] rounded-lg flex flex-col gap-1">
                                            <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#514441] uppercase">
                                                Duration
                                            </p>
                                            <div className="flex items-center gap-1.5">
                                                <Clock3 className="w-5 h-5 text-[#154212]" />
                                                <span className="text-[20px] leading-[28px] font-semibold text-[#0b1c30] font-sans">{activeDuration}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="p-6 bg-[#f0f2f5] border border-[#e5e7eb] rounded-lg h-full flex flex-col gap-4">
                                        <h4 className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#514441] uppercase">
                                            Question Focus Areas
                                        </h4>
                                        <ul className="space-y-3">
                                            {focusAreas.map((area, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <CircleCheck className="w-5 h-5 text-[#154212] flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-[16px] leading-[24px] font-bold text-[#0b1c30] font-sans">{area.title}</p>
                                                        <p className="text-[14px] leading-[20px] font-normal text-[#514441] font-sans">{area.description}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Warning Text */}
                            <div className="mt-10 flex flex-col items-center w-full">
                                <div className="text-center w-full max-w-2xl mb-16 flex flex-col items-center">
                                    <p className="text-[14px] leading-[20px] font-normal text-[#514441] italic mb-6">
                                        {preStartData?.consent_text}
                                    </p>
                                    <button
                                        onClick={handleStartInterview}
                                        className="bg-[#2d5a27] text-white px-16 py-3 rounded-lg text-[24px] leading-[32px] font-semibold shadow-lg hover:brightness-110 active:scale-95 transition-all w-full md:w-auto min-w-[320px]"
                                    >
                                        START INTERVIEW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // Resume-Based 
                    <>
                        {/* Breadcrumb - Full Width */}
                        <div className="flex items-center gap-2 font-bold text-[12px] tracking-[0.05em] text-[#514441] mb-10 uppercase">
                            <Link
                                to="/scheduled-Interview"
                                className="text-[#514441] hover:text-[#154212] transition-colors"
                            >
                                Scheduled for You
                            </Link>

                            <ChevronRight className="w-3.5 h-3.5 text-[#514441]" />
                            <span className="text-[#154212]">{pageTitle}</span>
                        </div>

                        {/* Main Content */}
                        <div className="max-w-[1200px] mx-auto flex flex-col">

                            {/* Page Title */}
                            <h2 className="text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-[#0b1c30] text-center mb-10">
                                {pageTitle}
                            </h2>

                            {/* Main Card */}
                            <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 shadow-sm w-full flex flex-col gap-6">

                                {/* Metadata */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[12px] uppercase tracking-[0.05em] font-semibold text-[#514441]">
                                            Assessment Mode
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-[#154212]" />
                                            <span className="text-[20px] font-semibold">
                                                {activeAssessmentMode}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <p className="text-[12px] uppercase tracking-[0.05em] font-semibold text-[#514441]">
                                            Duration
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <Clock3 className="w-5 h-5 text-[#154212]" />
                                            <span className="text-[20px] font-semibold">
                                                {activeDuration}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Question Focus */}
                                <div className="p-6 bg-[#f0f2f5] border border-[#e5e7eb] rounded-lg">
                                    <h4 className="text-[12px] uppercase tracking-[0.05em] font-semibold text-[#514441] mb-4">
                                        Question Focus
                                    </h4>

                                    <div className="flex flex-wrap gap-2">
                                        {focusTags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-white border border-[#e5e7eb] px-4 py-2 rounded-full text-[14px] font-semibold"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-[#e5e7eb]"></div>

                                {/* Info */}
                                <div className="flex gap-3 items-start">
                                    <span className="p-1 rounded-full bg-[#ffdad6] text-[#ba1a1a]">
                                        <Info className="w-4 h-4" />
                                    </span>

                                    <p className="text-sm text-[#514441]">
                                        {preStartData?.info_note}
                                    </p>
                                </div>
                            </div>

                            {/* Button */}
                            <button
                                onClick={handleStartInterview}
                                className="w-full mt-6 bg-[#2d5a27] text-white py-4 rounded-lg text-[24px] font-semibold flex items-center justify-center gap-2 cursor-pointer"
                            >
                                START INTERVIEW
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {/* Footer */}
                            <p className="text-center text-[10px] uppercase tracking-widest text-[#64748B] mt-4">
                                {preStartData?.consent_text}
                            </p>

                        </div>
                    </>
                )}

            </div>
            {/* Popup */}
            {popup.show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">

                        <p
                            className={`text-lg font-semibold mb-4 ${popup.type === "success"
                                ? "text-green-700"
                                : "text-red-600"
                                }`}
                        >
                            {popup.message}
                        </p>

                        <button
                            onClick={() =>
                                setPopup({
                                    show: false,
                                    message: "",
                                    type: "",
                                })
                            }
                            className="px-5 py-2 bg-green-800 text-white rounded-full hover:bg-green-700"
                        >
                            OK
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}
export default ScheduledInterviewMode;