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

const defaultMockScorecard = {
    overall_score: 70,
    score_summary: "Helena Rosales is ranked top 5% of candidates for this tier.",
    technical_metrics: [
        { name: 'Technical Accuracy', score: 90 },
        { name: 'Problem Solving', score: 85 },
        { name: 'Communication', score: 88 },
        { name: 'Role Relevance', score: 92 },
        { name: 'Confidence', score: 95 }
    ],
    executive_summary: "Helena demonstrates exceptional strategic thinking and a unique ability to bridge the gap between high-level operational logistics and human-centric leadership. Her responses reflect a candidate with mature judgment, particularly in high-pressure crisis scenarios, making her a strong contender for senior leadership roles.",
    key_strengths: [
        "High emotional intelligence in stakeholder management.",
        "Proven track record of leveraging AI for operational efficiency.",
        "Strong focus on long-term sustainability and workforce trust."
    ],
    development_areas: [
        "Opportunity to refine granular financial modeling specifics.",
        "Could further articulate international expansion strategies."
    ],
    interview_highlights: [
        {
            quote: "When we faced the 2021 port congestion, my first priority wasn't the cargo, it was the stakeholders' trust. Transparency is the only currency in a crisis.",
            tag: "High Emotional Intelligence",
            tag_type: "emotional"
        },
        {
            quote: "I believe AI should augment the workforce, not replace it. We used predictive modeling to reduce staff burnout by 22%.",
            tag: "Tech Forward",
            tag_type: "tech"
        },
        {
            quote: "Success in logistics is about the last mile, not the first thousand. If the customer doesn't have it, we haven't done our job.",
            tag: "Customer-Centric",
            tag_type: "customer"
        }
    ],
    stepper_questions: [
        { id: 1, status: 'completed' },
        { id: 2, status: 'completed' },
        { id: 3, status: 'completed' },
        { id: 4, status: 'skipped' },
        { id: 5, status: 'completed' },
        { id: 6, status: 'not_answered' },
        { id: 7, status: 'completed' },
        { id: 8, status: 'completed' }
    ],
    questions_detail: [
        {
            id: 1,
            title: "Stakeholder Trust Management",
            question_text: "How do you manage stakeholder trust during a major supply chain disruption?",
            candidate_answer: "I prioritize open and transparent communication with all key partners immediately, sharing what we know and what we are doing to solve the issue, rather than trying to hide failures.",
            ideal_answer: "Provide proactive updates, establish a single source of truth, explain remediation steps, and offer realistic timelines for resolution.",
            question_score: 95,
            duration: "02:15",
            language: "ENGLISH",
            key_components: ["Transparency", "Stakeholder Mgmt", "Crisis Resolution"],
            correct_points: [
                "Immediate and proactive outreach.",
                "Establishing a single channel of truth.",
                "Honest timeline estimation."
            ],
            missing_points: [
                "Articulating precise risk-mitigation SLA boundaries."
            ],
            question_feedback: "Excellent stakeholder communication style. Clear emphasis on building long-term trust over short-term reputation management.",
            question_status: "correct"
        },
        {
            id: 2,
            title: "AI & Predictive Analytics",
            question_text: "Describe a time you leveraged AI or predictive analytics in operational planning.",
            candidate_answer: "We implemented a demand-forecasting model using historical shipping logs. This allowed us to optimize warehouse staffing levels before seasonal spikes.",
            ideal_answer: "Explain data selection, model deployment, measurable efficiency gains, and impact on team bandwidth.",
            question_score: 88,
            duration: "03:10",
            language: "ENGLISH",
            key_components: ["Predictive Models", "Staff Optimization", "Log Analysis"],
            correct_points: [
                "Identified key operational bottleneck (staffing spikes).",
                "Utilized historical log databases.",
                "Achieved staffing optimization."
            ],
            missing_points: [
                "Quantification of model performance error rate (e.g. MAPE)."
            ],
            question_feedback: "Very strong use-case of automated data analytics. Adding concrete accuracy indicators would strengthen this response.",
            question_status: "correct"
        },
        {
            id: 3,
            title: "Logistics Efficiency Metrics",
            question_text: "What key metrics do you look at to assess global logistics efficiency?",
            candidate_answer: "I focus on cost per ton-mile, dock-to-dock turnaround times, warehouse utilization rates, and first-time-right delivery metrics.",
            ideal_answer: "Evaluate freight cost analysis, throughput efficiency, cargo dwell times, inventory turns, and carrier scorecard metrics.",
            question_score: 84,
            duration: "01:45",
            language: "ENGLISH",
            key_components: ["KPI Mapping", "Logistics Efficiency", "Freight Cost Analysis"],
            correct_points: [
                "Turnaround times.",
                "Warehouse utilization rates.",
                "First-time-right delivery."
            ],
            missing_points: [
                "Carrier service level scorecards.",
                "Cargo dwell times."
            ],
            question_feedback: "A good operational overview. Candidate missed mentioning cargo dwell times, which are critical for ocean freight nodes.",
            question_status: "warning"
        },
        {
            id: 4,
            title: "Green Freight Reconciliation",
            question_text: "How do you reconcile carbon reduction targets with expedited freight requirements?",
            candidate_answer: "We consolidate loads to maximize vehicle fill rates and shift expedited items to hybrid fleets where available.",
            ideal_answer: "Propose intermodal shipping shifts, optimized logistics networks, routing software upgrades, and fleet carbon offsetting.",
            question_score: 78,
            duration: "02:30",
            language: "ENGLISH",
            key_components: ["Carbon Footprint", "Consolidation", "Fleet Optimization"],
            correct_points: [
                "Load consolidation.",
                "Alternative fuel/hybrid vehicles."
            ],
            missing_points: [
                "Intermodal optimization strategies.",
                "Routing software algorithm enhancements."
            ],
            question_feedback: "Solid baseline understanding, but lacks depth in software-driven route optimization and multi-modal logistics shifts.",
            question_status: "warning"
        },
        {
            id: 5,
            title: "Regional Management Conflict",
            question_text: "How do you handle conflict between regional distribution center managers?",
            candidate_answer: "I bring them together in a virtual war-room, hear their constraints, and align them back to the overall company throughput targets.",
            ideal_answer: "De-escalate local tension, focus on shared corporate KPIs, standardize capacity sharing protocols, and resolve resource constraints objectively.",
            question_score: 92,
            duration: "02:05",
            language: "ENGLISH",
            key_components: ["Leadership Scale", "Conflict Resolution", "KPI Alignment"],
            correct_points: [
                "Objective conflict resolution.",
                "Focus on company throughput targets.",
                "Collaborative problem-solving."
            ],
            missing_points: [
                "Standardizing long-term capacity sharing policies."
            ],
            question_feedback: "Strong leadership skills. The candidate shows empathy and aligns teams towards overall business objectives effectively.",
            question_status: "correct"
        },
        {
            id: 6,
            title: "Granular Financial Route Modeling",
            question_text: "Describe a granular financial model you built for a major transport route.",
            candidate_answer: "I helped model fuel costs and toll fees on our major European routes using Excel spreadsheets, updating them monthly.",
            ideal_answer: "Detail cost of capital, depreciation schedule of assets, driver wage curves, seasonal tariff variances, and sensitivity analysis.",
            question_score: 65,
            duration: "03:40",
            language: "ENGLISH",
            key_components: ["Financial Modeling", "Excel Spreadsheets", "Route Costing"],
            correct_points: [
                "Fuel cost modeling.",
                "Toll fee accounting."
            ],
            missing_points: [
                "Sensitivity analysis under volatile markets.",
                "Driver wage curves and asset depreciation schedules."
            ],
            question_feedback: "Weakest response. The model described is basic and lacks key elements of high-level financial risk modeling.",
            question_status: "incorrect"
        },
        {
            id: 7,
            title: "Supplier Inflation Negotiations",
            question_text: "What is your approach to supplier negotiations during high-inflation periods?",
            candidate_answer: "We offer longer contract durations or volume commitments in exchange for pricing caps and index-linked adjustments.",
            ideal_answer: "Leverage total volume spend, utilize dual-sourcing threats, propose index-linked contract clauses, and collaborate on shared cost-reduction initiatives.",
            question_score: 94,
            duration: "02:50",
            language: "ENGLISH",
            key_components: ["Commercial Acumen", "Supplier Relations", "Index Adjustment"],
            correct_points: [
                "Pricing caps implementation.",
                "Index-linked adjustment formulas.",
                "Volume commitment leverage."
            ],
            missing_points: [],
            question_feedback: "Highly strategic response demonstrating mature supply market understanding and strong commercial acumen.",
            question_status: "correct"
        },
        {
            id: 8,
            title: "Professional Background Analysis",
            question_text: "Tell us about your professional background and the key milestones that have shaped your career.",
            candidate_answer: "I started my career at Global Logistics Corp, where I managed the regional expansion into EMEA. This was a pivotal moment because it taught me the importance of balancing local regulatory needs with global operational standards. Over the...",
            ideal_answer: "An ideal response should demonstrate a clear progression from technical execution to strategic leadership. It should highlight specific milestones like leading large-scale digital transformations, managing cross-functional global teams, and aligning technical architecture with broader business outcomes (e.g., ROI, market expansion). The tone should be authoritative yet collaborative, showcasing executive presence and a deep understanding of both technology and stakeholder management.",
            question_score: 92,
            duration: "02:45",
            language: "ENGLISH",
            key_components: ["Strategic Vision", "Business Alignment", "Leadership Scale", "Technical Depth", "Executive Tone"],
            correct_points: [
                "EMEA Regional Expansion management.",
                "Operational standards calibration.",
                "Regulatory compliance alignment."
            ],
            missing_points: [
                "Quantification of business metrics scale (e.g. ROI growth).",
                "Direct connection to high-level digital transformation pillars."
            ],
            question_feedback: "Excellent demonstration of regional expansion management. Solid executive presence, though linking the operational scale directly to top-line business outcomes would make it bulletproof.",
            question_status: "correct"
        }
    ]
};

export default function InterviewPerformanceReport({ data = null }) {
    const navigate = useNavigate();
    const scorecard = data || defaultMockScorecard;

    // View state: 'overall' or 'question'
    const [viewMode, setViewMode] = useState('overall');
    const [selectedQuestionId, setSelectedQuestionId] = useState(8);

    // Dynamic calculations for overall score SVG circular progress
    const circleRadius = 58;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const scorePercent = Math.min(Math.max(scorecard.overall_score, 0), 100);
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

    const radarPolygonPoints = scorecard.technical_metrics.map((metric, index) => {
        const angleIndex = index % 5;
        const scoreRatio = Math.min(Math.max(metric.score, 0), 100) / 100;
        const currentRadius = maxRadarRadius * scoreRatio;
        const x = centerX + currentRadius * Math.cos(pentagonAngles[angleIndex]);
        const y = centerY + currentRadius * Math.sin(pentagonAngles[angleIndex]);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

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
        if (selectedQuestionId < scorecard.stepper_questions.length) {
            const next = selectedQuestionId + 1;
            setSelectedQuestionId(next);
            setViewMode('question');
        }
    };

    // Find active question detail
    const activeQuestion = scorecard.questions_detail.find(q => q.id === selectedQuestionId);

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
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-[#2d5a27]"
                    >
                        <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                    </button>
                    <h1 className="text-lg font-bold text-[#230804] font-sans tracking-tight">
                        Candidate Insights
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
                        {scorecard.stepper_questions.map((step, idx) => {
                            const isSelected = step.id === selectedQuestionId && viewMode === 'question';
                            const isCompleted = step.status === 'completed';
                            const isSkipped = step.status === 'skipped';

                            return (
                                <React.Fragment key={step.id}>
                                    <button
                                        onClick={() => handleStepClick(step.id)}
                                        className="relative cursor-pointer shrink-0 focus:outline-none"
                                    >
                                        {/* Selected State: White circle with green border */}
                                        {isSelected ? (
                                            <div className="w-8 h-8 rounded-full border-2 border-[#2d5a27] bg-white flex items-center justify-center text-[#2d5a27] text-sm font-bold">
                                                {step.id}
                                            </div>
                                        ) : isCompleted ? (
                                            /* Completed State: Green circle with completed icon */
                                            <>
                                                <div className="w-8 h-8 rounded-full bg-[#2d5a27] flex items-center justify-center text-white text-sm font-bold">
                                                    {step.id}
                                                </div>
                                                <div className="absolute -top-1 -right-1 bg-white rounded-full">
                                                    <CheckCircle2 className="w-4 h-4 text-[#2d5a27] fill-white" />
                                                </div>
                                            </>
                                        ) : isSkipped ? (
                                            /* Skipped State: Gray circle with skipped state badge */
                                            <>
                                                <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-400 flex items-center justify-center text-gray-600 text-sm font-bold">
                                                    {step.id}
                                                </div>
                                                <div className="absolute -top-1 -right-1 bg-white rounded-full border border-gray-300 w-4 h-4 flex items-center justify-center text-[10px] text-gray-500 font-bold leading-none">
                                                    -
                                                </div>
                                            </>
                                        ) : (
                                            /* Not Answered / Upcoming State: Default gray circle */
                                            <div className="w-8 h-8 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-bold">
                                                {step.id}
                                            </div>
                                        )}
                                    </button>
                                    {idx < scorecard.stepper_questions.length - 1 && (
                                        <div className="h-px w-6 md:w-8 bg-gray-200 shrink-0" />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <button
                        onClick={handleNextStep}
                        disabled={selectedQuestionId === scorecard.stepper_questions.length && viewMode === 'question'}
                        className={`transition-colors ${selectedQuestionId === scorecard.stepper_questions.length && viewMode === 'question' ? 'text-[#dee2e6] cursor-not-allowed' : 'text-[#adb5bd] hover:text-[#2d5a27]'}`}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Switchable Views */}
                {viewMode === 'overall' ? (

                    //  Overall Report Bento Grid 
                    <div>
                        <h2 className="text-[28px] md:text-[32px] leading-[40px] font-bold text-[#230804] mb-8 font-sans tracking-tight">
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
                                    <span className="absolute text-[48px] leading-[56px] font-bold text-white">{scorecard.overall_score}</span>
                                </div>
                                <p className="mt-4 text-white/70 text-sm max-w-[240px]">
                                    {scorecard.score_summary}
                                </p>
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
                                    <div className="relative w-full max-w-[300px] aspect-square mx-auto flex items-center justify-center">
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
                                        {scorecard.technical_metrics.map((metric) => (
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
                                                {scorecard.key_strengths.map((strength, index) => (
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
                                                {scorecard.development_areas.map((dev, index) => (
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
                                <div className="space-y-6 overflow-y-auto max-h-[380px] pr-2 flex-1 scrollbar-thin">
                                    {scorecard.interview_highlights.map((highlight, index) => {
                                        const isEmotional = highlight.tag_type === "emotional";
                                        const isTech = highlight.tag_type === "tech";

                                        return (
                                            <div key={index} className={`relative pl-5 border-l-[3px] ${isEmotional ? "border-[#2d5a27]" : "border-[#dee2e6]"
                                                }`}>
                                                <p className="italic text-[#212529] text-[15px] leading-relaxed mb-3">
                                                    "{highlight.quote}"
                                                </p>
                                                <div className={`inline-flex items-center bg-opacity-10 px-3 py-1.5 rounded-full border ${isEmotional
                                                    ? "bg-[#2d5a27]/10 border-[#2d5a27]/20 text-[#2d5a27]"
                                                    : "bg-[#f1f3f5] border-[#dee2e6] text-[#6c757d]"
                                                    }`}>
                                                    {isEmotional ? (
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
                    activeQuestion && (
                        <div>
                            {/* Selected Question Header Title */}
                            <h2 className="text-[28px] md:text-[32px] leading-[40px] font-bold text-[#230804] mb-8 font-sans tracking-tight">
                                Question {activeQuestion.id}: {activeQuestion.title}
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                                {/* Column 1: Question Summary */}
                                <section className="bg-white border border-[#dee2e6] rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-[380px]">
                                    <div>
                                        <div className="flex items-center gap-2 mb-6">
                                            <FileText className="w-5 h-5 text-[#2d5a27]" />
                                            <h4 className="text-[16px] font-bold text-[#230804] uppercase tracking-wider font-sans">
                                                Question Summary
                                            </h4>
                                        </div>
                                        <p className="text-[#212529] font-medium italic text-[15px] leading-relaxed">
                                            "{activeQuestion.question_text}"
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-[#dee2e6]/70 mt-6">
                                        <span className="text-[#6c757d] text-[10px] font-bold uppercase tracking-widest block mb-1">
                                            Question Score
                                        </span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-[36px] font-bold text-[#2d5a27] leading-none">
                                                {activeQuestion.question_score}
                                            </span>
                                            <span className="text-[#6c757d] text-xs font-bold font-sans uppercase">
                                                /100
                                            </span>
                                        </div>
                                    </div>
                                </section>

                                {/* Column 2: Technical Analysis  */}
                                <section className="bg-white border border-[#dee2e6] rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-[380px]">
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

                                        <div className="bg-[#f8f9fa] border border-[#dee2e6]/60 p-4 rounded-lg text-sm text-[#212529] leading-relaxed max-h-[180px] overflow-y-auto scrollbar-thin">
                                            "{activeQuestion.candidate_answer}"
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#dee2e6]/70">
                                        {/* Duration badge */}
                                        <div className="bg-[#f8f9fa] border border-[#dee2e6]/80 rounded px-2.5 py-1 flex items-center gap-1.5 text-[#6c757d]">
                                            <Clock className="w-3.5 h-3.5 text-[#6c757d]" />
                                            <span className="text-[9px] font-bold uppercase tracking-wider">
                                                {activeQuestion.duration} Duration
                                            </span>
                                        </div>
                                        {/* Language badge */}
                                        <div className="bg-[#f8f9fa] border border-[#dee2e6]/80 rounded px-2.5 py-1 flex items-center gap-1.5 text-[#6c757d]">
                                            <Globe className="w-3.5 h-3.5 text-[#6c757d]" />
                                            <span className="text-[9px] font-bold uppercase tracking-wider">
                                                {activeQuestion.language}
                                            </span>
                                        </div>
                                    </div>
                                </section>

                                {/* Column 3: Ideal Answer */}
                                <section className="bg-white border border-[#dee2e6] rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-[380px]">
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

                                        <div className="bg-[#f8f9fa] border border-[#dee2e6]/60 p-4 rounded-lg text-sm text-[#212529] leading-relaxed max-h-[160px] overflow-y-auto scrollbar-thin mb-4">
                                            {activeQuestion.ideal_answer}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-[#6c757d] text-[10px] font-bold uppercase tracking-widest block mb-2">
                                            Key Components
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {activeQuestion.key_components.map((comp, i) => (
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
                                            {activeQuestion.question_feedback}
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
                                                {activeQuestion.correct_points.map((pt, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-[#2d5a27] font-bold mt-0.5">
                                                            <Check className="w-4 h-4 text-[#2d5a27] stroke-[3]" />
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
                                                {activeQuestion.missing_points.map((pt, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-[#6c757d] font-bold mt-0.5">
                                                            <AlertTriangle className="w-4 h-4 text-[#6c757d]" />
                                                        </span>
                                                        <span>{pt}</span>
                                                    </li>
                                                ))}
                                                {activeQuestion.missing_points.length === 0 && (
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