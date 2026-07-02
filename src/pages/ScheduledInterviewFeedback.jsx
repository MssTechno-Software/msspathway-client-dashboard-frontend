// import {
//     RefreshCw,
//     ArrowRight,
//     CheckCircle,
//     TrendingUp,
//     Lightbulb,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useState } from "react";
// import { Check } from "lucide-react";
// import { FiLoader } from "react-icons/fi";

// function TheoryFeedbackPage() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const feedbackData = location.state?.feedbackData;
//     const transcript = location.state?.transcript;
//     const question = location.state?.question;
//     const currentQuestionIndex = location.state?.currentQuestionIndex;
//     const questions = location.state?.questions;
//     const [loading, setLoading] = useState(false);
//     const client_id = location.state?.client_id;
//     return (
//         <div className="bg-white min-h-screen">
//             {/*Loader*/}
//             {loading && (
//                 <div className="fixed inset-0 bg-black/40 z-9999 flex items-center justify-center">
//                     <div className="p-6 flex flex-col items-center gap-3">
//                         <FiLoader className="animate-spin text-4xl text-green-800" />

//                         <p className="text-gray-800 font-medium">
//                             Please wait...
//                         </p>
//                     </div>
//                 </div>
//             )}
//             <div className="h-auto min-h-16 border-b border-[#d5c2bf] flex items-center px-4 sm:px-6 lg:px-12 py-4">
//                 <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold uppercase text-[#514441]">
//                     <span
//                         onClick={() => navigate("/scheduled-interview")}
//                         className="cursor-pointer hover:text-[#3b6934]"
//                     >
//                         Scheduled Interviews
//                     </span>
//                     <span>›</span>
//                     <span
//                         onClick={() => navigate("/scheduled-interview-mode", { state: { interview_id, client_id: clientId } })}
//                         className="cursor-pointer hover:text-[#3b6934]"
//                     >
//                         Interview Mode
//                     </span>
//                     <span>›</span>
//                     <span className="text-[#3b6934]">Feedback</span>
//                 </div>
//             </div>

//             {/* Question Stepper */}
//             <div className="px-4 sm:px-6 lg:px-12 mt-6">
//                 <div className="bg-white border border-[#e7dbd6] rounded-xl px-5 py-4 shadow-sm">

//                     <div className="flex items-center">

//                         {/* Previous */}
//                         <button
//                             className="w-8 h-8 rounded-full flex items-center justify-center text-[#6b5f5b] hover:bg-gray-100 transition"
//                         >
//                             &#8249;
//                         </button>

//                         {/* Steps */}
//                         <div className="flex-1 flex items-center px-3">

//                             {questions?.map((_, index) => (
//                                 <div
//                                     key={index}
//                                     className="flex items-center flex-1 last:flex-none"
//                                 >
//                                     <div
//                                         className={`
//                                             relative z-10
//                                             w-7.5 h-7.5 rounded-xl
//                                             flex items-center justify-center
//                                             text-xs font-semibold
//                                             transition-all duration-300
//                                             ${questions[index]?.attempted_status === "completed"
//                                                 ? "bg-[#3b6934] text-white"
//                                                 : questions[index]?.attempted_status === "current"
//                                                     ? "bg-green-100 border-2 border-[#3b6934] text-[#3b6934]"
//                                                     : questions[index]?.attempted_status === "skipped"
//                                                         ? "bg-red-100 border-2 border-red-500 text-red-500"
//                                                         : "bg-white border border-[#dddddd] text-[#bcbcbc]"
//                                             }
//                                         `}
//                                     >
//                                         {index + 1}
//                                         {questions[index]?.attempted_status === "completed" && (
//                                             <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#3b6934] flex items-center justify-center shadow-sm">
//                                                 <Check
//                                                     size={10}
//                                                     strokeWidth={3}
//                                                     className="text-[#3b6934]"
//                                                 />
//                                             </div>
//                                         )}
//                                     </div>

//                                     {index !== questions.length - 1 && (
//                                         <div className="flex-1 px-3">
//                                             <div className="relative h-0.5 bg-[#ececec]">
//                                                 <div
//                                                     className={`absolute left-0 top-0 h-full transition-all duration-300 ${index < currentQuestionIndex
//                                                         ? "w-full bg-[#97b78c]"
//                                                         : "w-0"
//                                                         }`}
//                                                 />
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}

//                         </div>

//                         {/* Next */}
//                         <button
//                             className="w-8 h-8 rounded-full flex items-center justify-center text-[#756965] hover:bg-gray-100 disabled:opacity-40"
//                         >
//                             &#8250;
//                         </button>

//                     </div>

//                 </div>
//             </div>

//             {/* Content */}
//             <div className="px-4 sm:px-6 lg:px-12 py-6 lg:py-12">
//                 <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">

//                     {/* LEFT SIDE */}
//                     <div className="xl:col-span-7 flex flex-col">

//                         <div className="bg-gray-50 border border-[#d5c2bf] rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col xl:min-h-162.5">

//                             {/* Score Card */}
//                             <div className="shadow-sm rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">

//                                 <div>
//                                     <p className="uppercase font-bold text-[#514441] text-md mb-3">
//                                         Overall Score
//                                     </p>

//                                     <div className="flex items-center gap-3">
//                                         <CheckCircle
//                                             size={32}
//                                             className="text-[#3b6934]"
//                                         />
//                                         <span className="text-2xl font-bold text-[#3b6934]">
//                                             {feedbackData.overall_score}/100
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <button
//                                     onClick={() => {
//                                         setLoading(true);
//                                         setTimeout(() => {
//                                             navigate("/scheduled-ai-interview", {
//                                                 state: {
//                                                     questions,
//                                                     currentQuestionIndex,
//                                                     client_id,
//                                                 },
//                                             });
//                                         }, 500);
//                                     }}
//                                     className="w-full sm:w-auto border border-[#3b6934] text-[#3b6934] px-4 sm:px-8 py-3 sm:py-4 rounded-lg font-bold uppercase flex items-center justify-center gap-2 hover:bg-[#3b6934]/5 transition">
//                                     <RefreshCw size={18} />
//                                     Retry Question
//                                 </button>
//                             </div>

//                             {/* Feedback */}
//                             <div className="flex-1 mt-5 rounded-xl p-4 sm:p-6 lg:p-8 bg-white shadow-sm">

//                                 {/* Strengths */}
//                                 <h3 className="text-[#3b6934] font-bold uppercase flex items-center gap-2 mb-6 text-sm sm:text-base">
//                                     <TrendingUp size={18} />
//                                     Comprehensive Strengths
//                                 </h3>

//                                 <ul>
//                                     {feedbackData?.comprehensive_strengths?.map((item, index) => (
//                                         <li key={index}>• {item}</li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             {/* Improvement Areas */}
//                             <div className="mt-6">
//                                 <h3 className="text-red-600 font-bold uppercase flex items-center gap-2 mb-4">
//                                     <Lightbulb size={18} />
//                                     Improvement Areas
//                                 </h3>

//                                 <ul className="space-y-3 text-[#0b1c30]">
//                                     {feedbackData?.strategic_improvements?.map((item, index) => (
//                                         <li key={index}>• {item}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT SIDE */}
//                     <div className="xl:col-span-5">

//                         <div className="bg-white border border-[#d5c2bf] rounded-xl shadow-sm p-4 sm:p-6 flex flex-col xl:min-h-162.5">

//                             {/* Header */}
//                             <div className="flex items-center gap-3 mb-6">
//                                 <span className="w-2 h-2 rounded-full bg-[#3b6934]"></span>

//                                 <span className="uppercase font-bold text-[15px] tracking-wide text-[#514441]">
//                                     Live Transcription
//                                 </span>
//                             </div>

//                             {/* Scrollable Area */}
//                             <div className="flex-1 overflow-y-auto pr-2">

//                                 {/* AI Prompt */}
//                                 <div className="bg-[#f1f4f9] border-l-4 border-[#3b6934] p-4 mb-8">
//                                     <p className="italic text-[#514441] text-sm sm:text-base leading-7 sm:leading-8">
//                                         AI: {question}
//                                     </p>
//                                 </div>

//                                 {/* Transcript */}
//                                 <div className="space-y-8">
//                                     <p className="text-[#0b1c30] text-sm sm:text-base lg:text-lg leading-7 lg:leading-10">
//                                         {transcript}
//                                     </p>
//                                 </div>
//                             </div>

//                             {/* Bottom Divider */}
//                             <div className="mt-6 border-t border-[#d5c2bf] pt-6"></div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     );
// }

// export default TheoryFeedbackPage;

import React, { useState } from 'react';
import {
    Brain,
    ClipboardCheck,
    TrendingUp,
    Quote,
    Target,
    Flag,
    BadgeCheck,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Check,
    AlertTriangle,
    ArrowLeft,
    Search,
    Bell,
    HelpCircle,
    Clock,
    Globe,
    FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ScheduledInterviewFeedback({ data = null }) {
    const navigate = useNavigate();
    const location = useLocation();
    const scorecard = location.state?.scorecard;
    console.log("Scorecard:", scorecard);
    // View state: 'overall' or 'question'
    const [viewMode, setViewMode] = useState('overall');
    const [selectedQuestionId, setSelectedQuestionId] = useState(1);
    const technicalMetrics = scorecard?.soft_skills
        ? [
            {
                name: "Confidence",
                score: scorecard.soft_skills.scores.confidence,
            },
            {
                name: "Clarity",
                score: scorecard.soft_skills.scores.clarity,
            },
            {
                name: "Leadership",
                score: scorecard.soft_skills.scores.leadership_potential,
            },
            {
                name: "Problem Solving",
                score: scorecard.soft_skills.scores.problem_solving,
            },
            {
                name: "Empathy",
                score: scorecard.soft_skills.scores.empathy,
            },
        ]
        : [];
    // Dynamic calculations for overall score SVG circular progress
    const circleRadius = 58;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const scorePercent = Math.min(
        Math.max(scorecard?.performance_score || 0, 0),
        100
    );
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

    // Find active question detail
    const question = scorecard?.questions_detail?.find(
        q => q.question_number === selectedQuestionId
    );

    return (
        <div className="w-full min-h-screen bg-[#f8f9fa] text-[#212529] ">

            {/* Global Topbar */}
            <header className="w-full bg-white border-b border-[#dee2e6] px-6 py-3 flex items-center justify-between ">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            if (viewMode === "question") {
                                setViewMode("overall");
                            } else {
                                navigate("/scorecards");
                            }
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                    </button>
                    <h1 className="text-lg font-bold text-[#230804] font-sans tracking-tight">
                        Feedback
                    </h1>
                </div>
            </header>

            {/* Main content  */}
            <main className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-6">

                {/*  Dynamic Question Stepper */}
                <div className="w-full bg-white border border-[#dee2e6] p-4 rounded-xl shadow-sm mb-6 flex items-center justify-between">
                    <button
                        onClick={handlePrevStep}
                        disabled={selectedQuestionId === 1 && viewMode === 'question'}
                        className={`transition-colors ${selectedQuestionId === 1 && viewMode === 'question' ? 'text-[#dee2e6] cursor-not-allowed' : 'text-[#adb5bd] hover:text-[#2d5a27]'}`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex-1 flex items-center justify-center gap-3 md:gap-4 overflow-x-auto py-1">
                        {scorecard?.question_stepper?.map((step, idx) => {
                            const isSelected =
                                step.question_number === selectedQuestionId &&
                                viewMode === "question";
                            const isCompleted = step.status === 'completed';
                            const isSkipped = step.status === 'skipped';

                            return (
                                <React.Fragment key={step.question_number}>
                                    <button
                                        onClick={() => handleStepClick(step.question_number)}
                                        className="relative cursor-pointer shrink-0 focus:outline-none"
                                    >
                                        {/* Selected State: White circle with green border */}
                                        {isSelected ? (
                                            <div className="w-8 h-8 rounded-full border-2 border-[#2d5a27] bg-white flex items-center justify-center text-[#2d5a27] text-sm font-bold">
                                                {step.question_number}
                                            </div>
                                        ) : isCompleted ? (
                                            /* Completed State: Green circle with completed icon */
                                            <>
                                                <div className="w-8 h-8 rounded-full bg-[#2d5a27] flex items-center justify-center text-white text-sm font-bold">
                                                    {step.question_number}
                                                </div>
                                                <div className="absolute -top-1 -right-1 bg-white rounded-full">
                                                    <CheckCircle2 className="w-4 h-4 text-[#2d5a27] fill-white" />
                                                </div>
                                            </>
                                        ) : isSkipped ? (
                                            /* Skipped State: Gray circle with skipped state badge */
                                            <>
                                                <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-400 flex items-center justify-center text-gray-600 text-sm font-bold">
                                                    {step.question_number}
                                                </div>
                                                <div className="absolute -top-1 -right-1 bg-white rounded-full border border-gray-300 w-4 h-4 flex items-center justify-center text-[10px] text-gray-500 font-bold leading-none">
                                                    -
                                                </div>
                                            </>
                                        ) : (
                                            /* Not Answered / Upcoming State: Default gray circle */
                                            <div className="w-8 h-8 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-bold">
                                                {step.question_number}
                                            </div>
                                        )}
                                    </button>
                                    {idx < (scorecard?.question_stepper?.length || 0) - 1 && (
                                        <div className="h-px w-6 md:w-8 bg-gray-200 shrink-0" />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <button
                        onClick={handleNextStep}
                        disabled={selectedQuestionId === (scorecard?.question_stepper?.length || 0)}
                        className={`transition-colors ${selectedQuestionId === (scorecard?.question_stepper?.length || 0) &&
                            viewMode === "question"
                            ? "text-[#dee2e6] cursor-not-allowed"
                            : "text-[#adb5bd] hover:text-[#2d5a27]"
                            }`}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

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
                                    <span className="absolute text-[48px] leading-14 font-bold text-white">{scorecard?.performance_score}</span>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    {/* Radar Chart SVG */}
                                    <div className="relative w-full max-w-75 aspect-square mx-auto flex items-center justify-center">
                                        <svg className="w-full h-full" viewBox="-30 -20  260 240">
                                            {/* Radial Grid lines (Pentagons) */}
                                            <polygon
                                                points="100,30 166.6,78.4 141.2,156.6 58.8,156.6 33.4,78.4"
                                                fill="none"
                                                stroke="#dee2e6"
                                                strokeWidth="1"
                                                strokeDasharray="3 3"
                                            />
                                            <polygon
                                                points="100,53.3 144.4,85.6 127.5,137.8 72.5,137.8 55.6,85.6"
                                                fill="none"
                                                stroke="#dee2e6"
                                                strokeWidth="1"
                                                strokeDasharray="3 3"
                                            />
                                            <polygon
                                                points="100,76.7 122.2,92.8 113.7,118.9 86.3,118.9 77.8,92.8"
                                                fill="none"
                                                stroke="#dee2e6"
                                                strokeWidth="1"
                                                strokeDasharray="3 3"
                                            />

                                            {/* Spoke lines */}
                                            <line x1="100" y1="100" x2="100" y2="30" stroke="#dee2e6" strokeWidth="1" />
                                            <line x1="100" y1="100" x2="166.6" y2="78.4" stroke="#dee2e6" strokeWidth="1" />
                                            <line x1="100" y1="100" x2="141.2" y2="156.6" stroke="#dee2e6" strokeWidth="1" />
                                            <line x1="100" y1="100" x2="58.8" y2="156.6" stroke="#dee2e6" strokeWidth="1" />
                                            <line x1="100" y1="100" x2="33.4" y2="78.4" stroke="#dee2e6" strokeWidth="1" />

                                            {/* Candidate Score Pentagon Shape */}
                                            <polygon
                                                points={radarPolygonPoints}
                                                fill="rgba(45, 90, 39, 0.1)"
                                                stroke="#2d5a27"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                            />

                                            {/* Grid Labels */}
                                            <text x="100" y="18" textAnchor="middle" className="fill-[#6c757d] text-[8px] font-bold tracking-wider uppercase font-sans">
                                                Technical Accuracy
                                            </text>
                                            <text x="150" y="78" textAnchor="start" className="fill-[#6c757d] text-[8px] font-bold tracking-wider uppercase font-sans">
                                                <tspan x="170" dy="0">Problem</tspan>
                                                <tspan x="170" dy="10">Solving</tspan>
                                            </text>
                                            <text x="146" y="168" textAnchor="start" className="fill-[#6c757d] text-[8px] font-bold tracking-wider uppercase font-sans">
                                                Communication
                                            </text>
                                            <text x="54" y="168" textAnchor="end" className="fill-[#6c757d] text-[8px] font-bold tracking-wider uppercase font-sans">
                                                Role Relevance
                                            </text>
                                            <text x="28" y="78" textAnchor="end" className="fill-[#6c757d] text-[8px] font-bold tracking-wider uppercase font-sans">
                                                Confidence
                                            </text>
                                        </svg>
                                    </div>

                                    {/* Metrics list on the right */}
                                    <div className="space-y-5">
                                        {technicalMetrics?.map((metric) => (
                                            <div key={metric.name} className="space-y-1.5">
                                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[10px]">
                                                    <span className="text-[#6c757d]">{metric.name}</span>
                                                    <span className="text-[#230804]">{metric.score}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-[#f1f3f5] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#2d5a27] rounded-full transition-all duration-500"
                                                        style={{ width: `${metric.score}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
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
                                            {scorecard.executive_summary}
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
                                                {scorecard?.key_strengths?.map((strength, index) => (
                                                    <li key={index} className="flex items-start gap-2.5">
                                                        <span className="text-[#2d5a27] font-bold mt-0.5">•</span>
                                                        <span>{strength}</span>
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
                                                {scorecard?.development_areas?.map((dev, index) => (
                                                    <li key={index} className="flex items-start gap-2.5">
                                                        <span className="text-[#6c757d] font-bold mt-0.5">•</span>
                                                        <span>{dev}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Interview Highlights */}
                            <section className="col-span-12 lg:col-span-5 bg-white border border-[#dee2e6] p-6 rounded-xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md flex flex-col">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded bg-[#f8f9fa] flex items-center justify-center border border-[#dee2e6]/50">
                                        <Quote className="w-5 h-5 text-[#2d5a27] fill-[#2d5a27]" />
                                    </div>
                                    <h4 className="text-xl font-bold text-[#230804]">Interview Highlights</h4>
                                </div>

                                {/* Scrollable list */}
                                <div className="space-y-6 overflow-y-auto max-h-95 pr-2 flex-1 scrollbar-thin">
                                    {scorecard?.interview_highlights?.map((highlight, index) => {
                                        const isTech = highlight.tag === "TECH_FORWARD";
                                        const isCommunication = highlight.tag === "COMMUNICATION";

                                        return (
                                            <div key={index} className={`relative pl-5 border-l-[3px] ${isTech ? "border-[#2d5a27]" : "border-[#dee2e6]"
                                                }`}>
                                                <p className="italic text-[#212529] text-[15px] leading-relaxed mb-3">
                                                    "{highlight.quote}"
                                                </p>
                                                <div className={`inline-flex items-center bg-opacity-10 px-3 py-1.5 rounded-full border ${isCommunication
                                                    ? "bg-[#2d5a27]/10 border-[#2d5a27]/20 text-[#2d5a27]"
                                                    : "bg-[#f1f3f5] border-[#dee2e6] text-[#6c757d]"
                                                    }`}>
                                                    {isTech ? (
                                                        <BadgeCheck className="w-3.5 h-3.5 mr-1 text-[#2d5a27]" />
                                                    ) : isTech ? (
                                                        <Sparkles className="w-3.5 h-3.5 mr-1 text-[#6c757d]" />
                                                    ) : (
                                                        <Target className="w-3.5 h-3.5 mr-1 text-[#6c757d]" />
                                                    )}
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">
                                                        {highlight.tag}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
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
                                            Candidate Response
                                        </span>

                                        <div className="bg-[#f8f9fa] border border-[#dee2e6]/60 p-4 rounded-lg text-sm text-[#212529] leading-relaxed max-h-45 overflow-y-auto scrollbar-thin">
                                            "{question.candidate_response}"
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
                                            {question.ideal_answer_summary}
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
                                                {question.comprehensive_strengths?.map((pt, index) => (
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