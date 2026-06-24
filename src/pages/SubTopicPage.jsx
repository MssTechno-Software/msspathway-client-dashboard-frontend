import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import {
    Repeat,
    GitBranch,
    Network,
    List,
    Database,
    Puzzle,
    CheckCircle,
    ArrowRight,
    ArrowLeft,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const subTopics = {
    HTML: [
        {
            name: "Forms",
            description: "HTML forms and validation",
            progress: 50,
            icon: <List size={18} />,
        },
        {
            name: "Semantic Tags",
            description: "Semantic HTML elements",
            progress: 80,
            icon: <Database size={18} />,
        },
    ],

    CSS: [
        {
            name: "Flexbox",
            description: "Layout with Flexbox",
            progress: 60,
            icon: <Puzzle size={18} />,
        },
        {
            name: "Grid",
            description: "CSS Grid Layout",
            progress: 70,
            icon: <Network size={18} />,
        },
    ],

    JavaScript: [
        {
            name: "ES6",
            description: "Modern JavaScript features",
            progress: 75,
            icon: <GitBranch size={18} />,
        },
    ],

    React: [
        {
            name: "Hooks",
            description: "useState, useEffect, useRef",
            progress: 90,
            icon: <Repeat size={18} />,
        },
    ],

    Java: [
        {
            name: "Collections",
            description: "Java Collection Framework",
            progress: 65,
            icon: <Database size={18} />,
        },
    ],

    Python: [
        {
            name: "Loops & Iterations",
            description:
                "Evaluation of for/while loops, range functions, and iterator protocols.",
            progress: 33,
            icon: <Repeat size={18} />,
        },
        {
            name: "Conditional Statements",
            description:
                "Testing logic flow and conditional branching complexity.",
            progress: 60,
            icon: <GitBranch size={18} />,
        },
        {
            name: "Arrays & Data Structures",
            description:
                "Memory management and complex data organization strategies.",
            progress: 85,
            icon: <Network size={18} />,
        },
        {
            name: "Lists & Sequences",
            description:
                "List comprehensions, slicing, indexing and sequence manipulations.",
            progress: 100,
            icon: <List size={18} />,
        },
        {
            name: "Dictionaries & Sets",
            description:
                "Hash maps, key-value pairs and set operations.",
            progress: 0,
            icon: <Database size={18} />,
        },
        {
            name: "Functions & Modules",
            description:
                "Scope, modularity and reusable code design.",
            progress: 45,
            icon: <Puzzle size={18} />,
        },
    ],
};

function SubTopic() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();

    const topic = state?.topic || "Python";
    const getProgressColor = (progress) => {
        if (progress < 40) {
            return {
                text: "text-red-600",
                bar: "bg-red-500",
            };
        }

        if (progress <= 60) {
            return {
                text: "text-yellow-600",
                bar: "bg-yellow-500",
            };
        }

        return {
            text: "text-[#3b6934]",
            bar: "bg-[#3b6934]",
        };
    };

    const [selectedSubTopic, setSelectedSubTopic] =
        useState();

    return (
        <div className="bg-white min-h-screen">
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
            {/* Breadcrumb */}
            <div className="h-auto min-h-16 border-b border-[#d5c2bf] flex items-center px-4 sm:px-6 lg:px-12 py-4">
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold uppercase text-[#514441]">
                    <span
                        onClick={() => navigate("/interview-modes")}
                        className="cursor-pointer hover:text-[#3b6934]"
                    >
                        Interview Modes
                    </span>
                    <span>›</span>
                    <span
                        onClick={() => navigate("/theory-topic")}
                        className="cursor-pointer hover:text-[#3b6934]"
                    >
                        Coding Topic
                    </span>
                    <span>›</span>
                    <span>{topic}</span>
                    {/* <span>›</span>
                    <span className="text-[#3b6934]">Select Sub-Topic</span> */}
                </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 xl:p-12">

                <div className="mb-10">
                    <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#0B1C30]">
                        Refine Your Focus
                    </h1>

                    <p className="mt-2 text-sm sm:text-base lg:text-lg text-[#514441] max-w-3xl">
                        Select a specific area of expertise to tailor your technical interview.
                        This ensures the assessment precisely matches the candidate's core
                        technical competencies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                    {subTopics[topic]?.map((item) => (
                        <div
                            key={item.name}
                            onClick={() => setSelectedSubTopic(item.name)}
                            className={`cursor-pointer rounded-xl border p-4 sm:p-5 lg:p-6 transition-all hover:shadow-md
                                ${selectedSubTopic === item.name
                                    ? "bg-[#eff4ff] border-[#3b6934]"
                                    : "bg-white border-[#d5c2bf]"
                                }`}
                        >
                            <div className="w-10 h-10 bg-[#eff4ff] rounded flex items-center justify-center text-[#3b6934]">
                                {item.icon}
                            </div>

                            <h3 className="font-semibold text-lg sm:text-xl mt-4 flex items-center gap-2">
                                {item.name}

                                {item.progress === 100 && (
                                    <CheckCircle
                                        size={18}
                                        className="text-[#3b6934]"
                                    />
                                )}
                            </h3>

                            <p className="text-sm sm:text-base text-[#514441] mt-3 leading-relaxed">
                                {item.description}
                            </p>

                            <div className="mt-5">
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold text-sm">
                                        Progress
                                    </span>

                                    <span
                                        className={`font-semibold text-sm ${getProgressColor(item.progress).text}`}
                                    >
                                        {item.progress}%
                                    </span>
                                </div>

                                <div className="h-1.5 bg-[#dce6f7] rounded-full">
                                    <div
                                        className={`h-full rounded-full ${getProgressColor(item.progress).bar}`}
                                        style={{
                                            width: `${item.progress}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-[#d5c2bf] flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">

                    <button
                        onClick={() => {
                            setLoading(true);
                            setTimeout(() => {
                                navigate(-1);
                            }, 500);
                        }}
                        className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase text-[#514441]"
                    >
                        <ArrowLeft size={16} />
                        Change Topic
                    </button>

                    <button
                        onClick={() => {
                            if(!selectedSubTopic) return;
                            setLoading(true);

                            setTimeout(() => {
                                navigate("/theory-interview-start-module", {
                                    state: {
                                        topic,
                                        subTopic: selectedSubTopic,
                                    },
                                });
                            }, 500);
                        }}
                        className="w-full sm:w-auto bg-[#3b6934] hover:bg-[#2f552a] text-white px-6 sm:px-8 py-3 rounded-lg flex items-center justify-center gap-2 uppercase font-semibold transition"
                    >
                        Continue
                        <ArrowRight size={18} />
                    </button>

                </div>
            </div>
        </div>
    );
}

export default SubTopic;