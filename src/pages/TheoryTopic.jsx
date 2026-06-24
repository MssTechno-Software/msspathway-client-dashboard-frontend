import { useState, useEffect } from "react";
import { Code2, FileCode, Braces, Atom, Coffee, Brain, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

function TheoryTopic() {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [popup, setPopup] = useState({
        show: false,
        message: "",
        type: "", // success | error
    });

    useEffect(() => {
        fetchTechnologies();
    }, []);

    const fetchTechnologies = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                "https://uat-msspathway-software-backend-81057313575.asia-south1.run.app/Topic_based/clients/1/technologies"
            );

            const data = await response.json();

            if (data?.technologies) {
                const sortedTopics = data.technologies.sort(
                    (a, b) => a.display_order - b.display_order
                );

                setTopics(sortedTopics);

                if (sortedTopics.length > 0) {
                    setSelectedTopic(sortedTopics[0].technology_name);
                }
                setPopup({
                    show: true,
                    message:
                        data.message ||
                        data.detail ||
                        "Technologies loaded successfully",
                    type: "success",
                });
            }
        } catch (error) {
            console.error("Error fetching technologies:", error);
            setPopup({
                show: true,
                message:
                    error.message ||
                    error.detail ||
                    "Failed to load technologies",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

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
                            key={topic.technology_id}
                            onClick={() => setSelectedTopic(topic.technology_name)}
                            className={`relative bg-white rounded-lg p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-md
                                ${selectedTopic === topic.technology_name
                                    ? "border-2 border-[#3B6934]"
                                    : "border border-gray-200"
                                }`}
                        >
                            {selectedTopic === topic.technology_name && (
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
                                className={`w-12 h-12 rounded-md flex items-center justify-center mb-4
                                    ${selectedTopic === topic.technology_name
                                        ? "bg-[#BCF1AD]"
                                        : "bg-[#EEF4FF]"
                                    }`}
                            >
                                <img
                                    src={topic.icon}
                                    alt={topic.technology_name}
                                    className="w-7 h-7"
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-[#0B1C30] mb-2">
                                {topic.technology_name}
                            </h3>

                            <p className="text-sm text-[#514441] leading-relaxed">
                                {topic.technology_description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer Button */}
                <div className="mt-12 pt-8 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={() => {
                            if (!selectedTopic) {
                                setPopup({
                                    show: true,
                                    message: "Please select a technology",
                                    type: "error",
                                });

                                return;
                            }

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

            {popup.show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-2">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
                        <p
                            className={`text-lg font-semibold mb-4
                                ${popup.type === "success"
                                    ? "text-green-800"
                                    : "text-red-600"
                                }
                                `}
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
                            className="px-4 py-2 bg-green-800 text-white rounded-full hover:bg-green-700 cursor-pointer"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TheoryTopic;