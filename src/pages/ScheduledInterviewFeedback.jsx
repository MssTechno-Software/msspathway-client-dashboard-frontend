import React, { useState } from 'react';
import { Brain, ClipboardCheck, TrendingUp, Quote, Target, Flag, BadgeCheck, Sparkles, ChevronLeft, ChevronRight, CheckCircle2, Check, AlertTriangle, ArrowLeft, Search, Bell, HelpCircle, Clock, Globe, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

function ScheduledInterviewFeedback({ data = null }) {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(false);
    const scorecard = location.state?.scorecard;
    console.log("Scorecard:", scorecard);
    const interviewType = state?.preStartData?.interview_type || "";
    const pageTitle = interviewType
        .replace(/_/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
    const questions = scorecard?.question_stepper || [];
    // View state: 'overall' or 'question'
    const [viewMode, setViewMode] = useState('overall');
    const [selectedQuestionId, setSelectedQuestionId] = useState(1);
    const currentQuestionIndex = selectedQuestionId - 1;
    // Dynamic calculations for overall score SVG circular progress
    const circleRadius = 58;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const scorePercent = scorecard?.percentage || 0;
    const strokeDashoffset = circleCircumference - (scorePercent / 100) * circleCircumference;

    // Dynamic coordinates plotting for custom SVG radar chart (regular pentagon)
    const centerX = 100;
    const centerY = 100;
    const maxRadarRadius = 70;
    const pentagonAngles = [
        -Math.PI / 2,        // Top Axis (Technical Accuracy)
        -Math.PI / 10,       // Top-Right Axis (Problem Solving)
        3 * Math.PI / 10,    // Bottom-Right Axis (Communication)
        7 * Math.PI / 10,    // Bottom-Left Axis (Role Relevance)
        11 * Math.PI / 10,   // Top-Left Axis (Confidence)
    ];

    const radarPolygonPoints = technicalMetrics
        .map((metric, index) => {
            const angleIndex = index % 5;
            const scoreRatio = metric.score / 100;
            const currentRadius = maxRadarRadius * scoreRatio;

            const x =
                centerX +
                currentRadius * Math.cos(pentagonAngles[angleIndex]);

            const y =
                centerY +
                currentRadius * Math.sin(pentagonAngles[angleIndex]);

            return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");
    // Stepper Click handler
    const handleStepClick = (stepId) => {
        setSelectedQuestionId(stepId);
        setViewMode('question');
    };

    // Navigation handlers
    const handlePrevStep = () => {
        if (selectedQuestionId > 1) {
            const prev = selectedQuestionId - 1;
            setSelectedQuestionId(prev);
            setViewMode('question');
        }
    };

    const handleNextStep = () => {
        if (selectedQuestionId < (scorecard?.question_stepper?.length || 0)) {
            const next = selectedQuestionId + 1;
            setSelectedQuestionId(next);
            setViewMode('question');
        }
    };

    const question = scorecard?.question_stepper?.find(
        q => q.question_number === selectedQuestionId
    );

    return (
        <div className="w-full min-h-screen bg-[#f8f9fa] text-[#212529] ">

            {/*loader*/}
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

            {/* Breadcrumb */}
            <div className="h-auto min-h-16 border-b border-[#d5c2bf] flex items-center px-4 sm:px-6 lg:px-12 py-4">
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold uppercase text-[#514441]">
                    <span
                        onClick={() => navigate("/scheduled-interview")}
                        className="cursor-pointer hover:text-[#3b6934]"
                    >
                        Scheduled Interviews
                    </span>
                    <span>›</span>
                    <span
                        onClick={() =>
                            navigate("/scheduled-interview-mode", {
                                state: {
                                    interview: state?.interview,
                                    preStartData: state?.preStartData,
                                },
                            })
                        }
                        className="cursor-pointer hover:text-[#3b6934]"
                    >
                        {pageTitle}
                    </span>

                    <span>›</span>

                    <span className="text-[#3b6934]">
                        Question-Level Feedback
                    </span>
                </div>
            </div>
            <div className="border border-gray-300 p-4 mb-6">
                {/* Question Stepper */}
                <div className="px-4 sm:px-6 lg:px-12 mt-6">
                    <div className="bg-white border border-[#e7dbd6] rounded-xl px-5 py-4 shadow-sm">

                        <div className="flex items-center">

                            {/* Previous */}
                            <button
                                onClick={handlePrevStep}
                                disabled={selectedQuestionId === 1}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-[#6b5f5b] hover:bg-gray-100 transition cursor-pointer"
                            >
                                &#8249;
                            </button>

                            {/* Steps */}
                            <div className="flex-1 flex items-center px-3">

                                {questions?.map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center flex-1 last:flex-none"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleStepClick(index + 1)}
                                            className={`
                                                        relative z-10
                                                        w-7.5 h-7.5 rounded-xl
                                                        flex items-center justify-center
                                                        text-xs font-semibold
                                                        transition-all duration-300
                                                        cursor-pointer
                                                        ${questions[index]?.attempted_status === "completed"
                                                    ? "bg-[#3b6934] text-white"
                                                    : questions[index]?.attempted_status === "current"
                                                        ? "bg-green-100 border-2 border-[#3b6934] text-[#3b6934]"
                                                        : questions[index]?.attempted_status === "skipped"
                                                            ? "bg-red-100 border-2 border-red-500 text-red-500"
                                                            : "bg-white border border-[#dddddd] text-[#bcbcbc]"
                                                }
                                                        `}
                                        >
                                            {index + 1}
                                            {questions[index]?.attempted_status === "completed" && (
                                                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#3b6934] flex items-center justify-center shadow-sm">
                                                    <Check
                                                        size={10}
                                                        strokeWidth={3}
                                                        className="text-[#3b6934]"
                                                    />
                                                </div>
                                            )}
                                        </button>

                                        {index !== questions.length - 1 && (
                                            <div className="flex-1 px-3">
                                                <div className="relative h-0.5 bg-[#ececec]">
                                                    <div
                                                        className={`absolute left-0 top-0 h-full transition-all duration-300 ${index < currentQuestionIndex
                                                            ? "w-full bg-[#97b78c]"
                                                            : "w-0"
                                                            }`}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                            </div>

                            {/* Next */}
                            <button
                                onClick={handleNextStep}
                                disabled={selectedQuestionId === questions.length}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-[#756965] hover:bg-gray-100 disabled:opacity-40"
                            >
                                &#8250;
                            </button>

                        </div>

                    </div>
                </div>
            </div>

            {/* Main content  */}
            <main className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-6">

                {/* Switchable Views */}
                {viewMode === 'overall' ? (

                    //  Overall Report Bento Grid 
                    <div>
                        <h2 className="text-[28px] md:text-[32px] leading-10 font-bold text-[#230804] mb-8 font-sans tracking-tight">
                            Interview Performance Report
                        </h2>

                        <div className="grid grid-cols-12 gap-6">

                            {/* Overall AI Score Widget */}
                            <section className="col-span-12 lg:col-span-4 border border-[#dee2e6] p-6 rounded-xl flex flex-col items-center justify-center text-center bg-[#2d5a27] shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
                                <span className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">
                                    OVERALL PERFORMANCE SCORE
                                </span>
                                <div className="relative flex items-center justify-center w-32 h-32">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            className="text-white/20"
                                            cx="64"
                                            cy="64"
                                            fill="transparent"
                                            r={circleRadius}
                                            stroke="currentColor"
                                            strokeWidth="8"
                                        />
                                        <circle
                                            className="text-white"
                                            cx="64"
                                            cy="64"
                                            fill="transparent"
                                            r={circleRadius}
                                            stroke="currentColor"
                                            strokeDasharray={circleCircumference}
                                            strokeDashoffset={strokeDashoffset}
                                            strokeLinecap="round"
                                            strokeWidth="8"
                                        />
                                    </svg>
                                    <span className="absolute text-[48px] leading-14 font-bold text-white">{scorecard?.final_score}</span>
                                </div>
                            </section>

                            {/* Technical Analysis Bento Card */}
                            <section className="col-span-12 lg:col-span-8 bg-white border border-[#dee2e6] p-6 rounded-xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-[#f8f9fa] flex items-center justify-center border border-[#dee2e6]/50">
                                            <Brain className="w-5 h-5 text-[#2d5a27]" />
                                        </div>
                                        <h4 className="text-xl font-bold text-[#230804]">Technical Analysis</h4>
                                    </div>
                                    <span className="text-[#6c757d] text-xs font-bold uppercase tracking-wider">
                                        AI-Technical Evaluation v1.0
                                    </span>
                                </div>
                            </section>

                            {/* Detailed Feedback */}
                            <section className="col-span-12 lg:col-span-7 bg-white border border-[#dee2e6] p-6 rounded-xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded bg-[#f8f9fa] flex items-center justify-center border border-[#dee2e6]/50">
                                        <ClipboardCheck className="w-5 h-5 text-[#2d5a27]" />
                                    </div>
                                    <h4 className="text-xl font-bold text-[#230804]">Detailed Feedback</h4>
                                </div>

                                <div className="space-y-6">
                                    {/* Executive Summary Box */}
                                    <div className="bg-[#f8f9fa] p-5 rounded-lg border border-[#dee2e6]">
                                        <h5 className="text-[11px] font-bold text-[#2d5a27] uppercase tracking-widest mb-2.5">
                                            Executive Summary
                                        </h5>
                                        <p className="text-[#212529] text-[15px] leading-relaxed">
                                            {scorecard?.overall_feedback}
                                        </p>
                                    </div>
                                    {/* Key Strengths & Development Areas Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                        {/* Key Strengths */}
                                        <div>
                                            <h5 className="text-[11px] font-bold text-[#2d5a27] uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-[#2d5a27]" />
                                                Key Strengths
                                            </h5>
                                            <ul className="space-y-3.5 text-sm text-[#212529]">
                                                {scorecard?.per_question_summary?.flatMap(q => q.points_covered || []).map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2.5">
                                                        <span className="text-[#2d5a27] font-bold mt-0.5">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Development Areas */}
                                        <div>
                                            <h5 className="text-[11px] font-bold text-[#6c757d] uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <Flag className="w-4 h-4 text-[#6c757d]" />
                                                Development Areas
                                            </h5>
                                            <ul className="space-y-3.5 text-sm text-[#212529]">
                                                {scorecard?.per_question_summary?.flatMap(q => q.points_missed || []).map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2.5">
                                                        <span className="text-[#6c757d] font-bold mt-0.5">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                ) : (

                    // Question-Level Feedback Screen
                    question && (
                        <div>
                            {/* Selected Question Header Title */}
                            <h2 className="text-[28px] md:text-[32px] leading-10 font-bold text-[#230804] mb-8 font-sans tracking-tight">
                                Question {question.question_number}
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                                {/* Column 1: Question Summary */}
                                <section className="bg-white border border-[#dee2e6] rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-95">
                                    <div>
                                        <div className="flex items-center gap-2 mb-6">
                                            <FileText className="w-5 h-5 text-[#2d5a27]" />
                                            <h4 className="text-[16px] font-bold text-[#230804] uppercase tracking-wider font-sans">
                                                Question Summary
                                            </h4>
                                        </div>
                                        <p className="text-[#212529] font-medium italic text-[15px] leading-relaxed">
                                            "{question.question_text}"
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-[#dee2e6]/70 mt-6">
                                        <span className="text-[#6c757d] text-[10px] font-bold uppercase tracking-widest block mb-1">
                                            Question Score
                                        </span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-[36px] font-bold text-[#2d5a27] leading-none">
                                                {question.score_obtained}
                                            </span>
                                            <span className="text-[#6c757d] text-xs font-bold font-sans uppercase">
                                                /100
                                            </span>
                                        </div>
                                    </div>
                                </section>

                                {/* Column 2: Technical Analysis  */}
                                <section className="bg-white border border-[#dee2e6] rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-95">
                                    <div>
                                        <div className="flex items-center gap-2 mb-6">
                                            <Brain className="w-5 h-5 text-[#2d5a27]" />
                                            <h4 className="text-[16px] font-bold text-[#230804] uppercase tracking-wider font-sans">
                                                Technical Analysis
                                            </h4>
                                        </div>

                                        <span className="text-[#6c757d] text-[10px] font-bold uppercase tracking-widest block mb-2">
                                            AI Feedback
                                        </span>

                                        <div className="bg-[#f8f9fa] border border-[#dee2e6]/60 p-4 rounded-lg text-sm text-[#212529] leading-relaxed max-h-45 overflow-y-auto scrollbar-thin">
                                            "{question.evaluator_note}"
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#dee2e6]/70">
                                        <div className="bg-[#f8f9fa] border border-[#dee2e6]/80 rounded px-2.5 py-1 flex items-center gap-1.5 text-[#6c757d]">
                                            <FileText className="w-3.5 h-3.5" />
                                            <span className="text-[9px] font-bold uppercase tracking-wider">
                                                {question.category}
                                            </span>
                                        </div>

                                    </div>
                                </section>

                                {/* Column 3: Ideal Answer */}
                                <section className="bg-white border border-[#dee2e6] rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-95">
                                    <div>
                                        <div className="flex items-center gap-2 mb-6">
                                            <ClipboardCheck className="w-5 h-5 text-[#2d5a27]" />
                                            <h4 className="text-[16px] font-bold text-[#230804] uppercase tracking-wider font-sans">
                                                Ideal Answer
                                            </h4>
                                        </div>

                                        <span className="text-[#6c757d] text-[10px] font-bold uppercase tracking-widest block mb-2">
                                            Ideal Response
                                        </span>

                                        <div className="bg-[#f8f9fa] border border-[#dee2e6]/60 p-4 rounded-lg text-sm text-[#212529] leading-relaxed max-h-40 overflow-y-auto scrollbar-thin mb-4">
                                            <ul>
                                                {question.points_missed?.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-[#6c757d] text-[10px] font-bold uppercase tracking-widest block mb-2">
                                            Key Components
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {question.ideal_key_components?.map((comp, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-[#2d5a27]/10 text-[#2d5a27] border border-[#2d5a27]/20 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase font-sans"
                                                >
                                                    {comp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                            </div>

                            {/* Bottom Wide Section: Detailed Feedback */}
                            <section className="bg-white border border-[#dee2e6] rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <ClipboardCheck className="w-5 h-5 text-[#2d5a27]" />
                                    <h4 className="text-[16px] font-bold text-[#230804] uppercase tracking-wider font-sans">
                                        Detailed Feedback
                                    </h4>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                    {/* Summary / Assessment */}
                                    <div className="lg:col-span-1 bg-[#f8f9fa] p-5 rounded-lg border border-[#dee2e6]">
                                        <h5 className="text-[11px] font-bold text-[#2d5a27] uppercase tracking-widest mb-2.5">
                                            AI Review Feedback
                                        </h5>
                                        <p className="text-[#212529] text-[14px] leading-relaxed">
                                            {question.evaluator_note}
                                        </p>
                                    </div>

                                    {/* Checklist */}
                                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Correct points */}
                                        <div>
                                            <h5 className="text-[11px] font-bold text-[#2d5a27] uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-[#2d5a27]" />
                                                Key Points Covered
                                            </h5>
                                            <ul className="space-y-2.5 text-sm text-[#212529]">
                                                {question.points_covered?.map((pt, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-[#2d5a27] font-bold mt-0.5">
                                                            <Check className="w-4 h-4 text-[#2d5a27] stroke-3" />
                                                        </span>
                                                        <span>{pt}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Missed points */}
                                        <div>
                                            <h5 className="text-[11px] font-bold text-[#6c757d] uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <Flag className="w-4 h-4 text-[#6c757d]" />
                                                Missed Opportunities
                                            </h5>
                                            <ul className="space-y-2.5 text-sm text-[#212529]">
                                                {question.strategic_improvements?.map((pt, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-[#6c757d] font-bold mt-0.5">
                                                            <AlertTriangle className="w-4 h-4 text-[#6c757d]" />
                                                        </span>
                                                        <span>{pt}</span>
                                                    </li>
                                                ))}
                                                {(question?.strategic_improvements?.length || 0) === 0 && (
                                                    <span className="text-[#2d5a27] text-xs italic font-semibold">Perfect alignment. No points missed!</span>
                                                )}
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </section>

                        </div>
                    )
                )}

            </main>

        </div>
    );
}
export default ScheduledInterviewFeedback;