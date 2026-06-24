import { useState } from "react";
import { Code2, FileCode, Braces, Atom, Coffee, Brain, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

const topics = [
    {
        id: 1,
        name: "HTML",
        icon: <Code2 size={22} />,
        description:
            "Covers System Architecture, Design Patterns, and the Software Development Life Cycle (SDLC).",
    },
    {
        id: 2,
        name: "CSS",
        icon: <FileCode size={22} />,
        description:
            "CI/CD pipelines, containerization with Kubernetes, infrastructure as code, and site reliability.",
    },
    {
        id: 3,
        name: "JavaScript",
        icon: <Braces size={22} />,
        description:
            "Statistical analysis, data modeling, big data architectures, and advanced predictive analytics.",
    },
    {
        id: 4,
        name: "React",
        icon: <Atom size={22} />,
        description:
            "Threat modeling, encryption standards, network security protocols, and incident response.",
    },
    {
        id: 5,
        name: "Java",
        icon: <Coffee size={22} />,
        description:
            "AWS/Azure/GCP service ecosystems, serverless paradigms, and cloud-native scaling strategies.",
    },
    {
        id: 6,
        name: "Python",
        icon: <Brain size={22} />,
        description:
            "Neural networks, LLM fine-tuning, ethics in AI, and reinforcement learning frameworks.",
    },
];

function TheoryTopic() {
    const [selectedTopic, setSelectedTopic] = useState("HTML");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen">
            {/* Loader */}
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
                    <span>Coding Topic</span>
                    {/* <span>›</span>
                    <span className="text-[#3b6934]">
                        {selectedTopic}
                    </span> */}
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-[32px] font-semibold text-[#0B1C30] mb-2">
                        Select Theory Topic
                    </h1>

                    <p className="text-[18px] text-[#514441]">
                        Choose your area of specialized expertise to begin the assessment.
                    </p>
                </div>

                {/* Topic Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {topics.map((topic) => (
                        <div
                            key={topic.id}
                            onClick={() => setSelectedTopic(topic.name)}
                            className={`relative bg-white rounded-lg p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-md
                                ${selectedTopic === topic.name
                                    ? "border-2 border-[#3B6934]"
                                    : "border border-gray-200"
                                }`}
                        >
                            {selectedTopic === topic.name && (
                                <div className="absolute top-4 right-4 text-[#3B6934]">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{
                                            fontVariationSettings: "'FILL' 1",
                                            fontSize: "22px",
                                        }}
                                    >
                                        check_circle
                                    </span>
                                </div>
                            )}

                            <div
                                className={`w-12 h-12 rounded-md flex items-center justify-center mb-4 transition-all duration-300
                                    ${selectedTopic === topic.name
                                        ? "bg-[#BCF1AD] text-[#3B6934]"
                                        : "bg-[#EEF4FF] text-[#3B6934] group-hover:bg-[#BCF1AD]"
                                    }`}
                            >
                                {topic.icon}
                            </div>

                            <h3 className="text-lg font-semibold text-[#0B1C30] mb-2">
                                {topic.name}
                            </h3>

                            <p className="text-sm text-[#514441] leading-relaxed">
                                {topic.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer Button */}
                <div className="mt-12 pt-8 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={() => {
                            setLoading(true);

                            setTimeout(() => {
                                navigate("/sub-topic", {
                                    state: {
                                        topic: selectedTopic,
                                    },
                                });
                            }, 500);
                        }}
                        className="bg-[#3B6934] hover:bg-[#2f552a] text-white px-8 py-3 rounded-md uppercase font-semibold tracking-wider flex items-center gap-2 transition"
                    >
                        Continue
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TheoryTopic;