import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

function TheoryConfiguration() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const topic = state?.topic || "";
    const subTopic = state?.subTopic || "";

    const [loading, setLoading] = useState(false);
    const [difficulty, setDifficulty] = useState("Easy");

    return (
        <div className="bg-[#f8f9ff] min-h-screen">

            {/* Loader */}
            {loading && (
                <div className="fixed inset-0 bg-black/40 z-9999 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <FiLoader className="animate-spin text-4xl text-green-800" />
                        <p>Please wait...</p>
                    </div>
                </div>
            )}

            {/* Breadcrumb */}
            <div className="h-16 border-b border-[#d5c2bf] flex items-center px-12">
                <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#514441]">
                    <span>Interview Modes</span>
                    <span>›</span>
                    <span>Theory Topic</span>
                    <span>›</span>
                    <span>{topic}</span>
                    <span>›</span>
                    <span className="text-[#3b6934]">
                        {subTopic}
                    </span>
                </div>
            </div>

            <div className="p-12">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-[40px] font-semibold text-[#0B1C30]">
                        {subTopic}
                    </h1>

                    <p className="text-[#514441] mt-2">
                        Tailor the assessment difficulty and duration to match the executive level of the applicant.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-8">

                        <div className="bg-white border border-[#d5c2bf] rounded-xl p-6">

                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-[#3b6934]">
                                    psychology
                                </span>

                                <h3 className="font-semibold">
                                    Select Difficulty
                                </h3>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">

                                {/* Easy */}
                                <div
                                    onClick={() => setDifficulty("Easy")}
                                    className={`cursor-pointer border rounded-lg p-5 transition
                                    ${
                                        difficulty === "Easy"
                                            ? "border-2 border-[#3b6934] bg-[#eff4ff]"
                                            : "border-[#d5c2bf]"
                                    }`}
                                >
                                    <div className="flex justify-between mb-4">
                                        <span className="material-symbols-outlined text-[#3b6934]">
                                            sentiment_satisfied
                                        </span>

                                        {difficulty === "Easy" && (
                                            <span className="material-symbols-outlined text-[#3b6934]">
                                                check_circle
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="font-bold text-[#3b6934]">
                                        Easy
                                    </h3>

                                    <p className="text-sm text-[#514441] mt-2">
                                        Entry-level focus, standard questions.
                                    </p>
                                </div>

                                {/* Medium */}
                                <div className="opacity-40 border border-[#d5c2bf] rounded-lg p-5">
                                    <span className="material-symbols-outlined mb-4">
                                        equalizer
                                    </span>

                                    <h3 className="font-bold">
                                        Medium
                                    </h3>

                                    <p className="text-sm mt-2">
                                        Professional assessment, behavioral depth.
                                    </p>
                                </div>

                                {/* Hard */}
                                <div className="opacity-40 border border-[#d5c2bf] rounded-lg p-5">
                                    <span className="material-symbols-outlined mb-4">
                                        bolt
                                    </span>

                                    <h3 className="font-bold">
                                        Hard
                                    </h3>

                                    <p className="text-sm mt-2">
                                        Stress testing, high-level strategy.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-4">

                        <div className="bg-white border border-[#d5c2bf] rounded-xl p-6">

                            <h3 className="font-semibold mb-5">
                                Environment Preview
                            </h3>

                            <img
                                src="/interview-preview.png"
                                alt="preview"
                                className="rounded-lg w-full h-44 object-cover"
                            />

                            <div className="bg-[#eff4ff] p-4 rounded-lg mt-4">
                                <p className="italic text-center text-sm text-[#514441]">
                                    "The system is configured for an entry-level
                                    professional assessment with standard
                                    behavioral metrics."
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setLoading(true);

                                    setTimeout(() => {
                                        navigate("/theory-interview", {
                                            state: {
                                                topic,
                                                subTopic,
                                                difficulty,
                                            },
                                        });
                                    }, 500);
                                }}
                                className="w-full mt-5 bg-[#3b6934] text-white py-4 rounded-xl font-bold uppercase"
                            >
                                Start Interview
                            </button>

                            <button
                                onClick={() => navigate(-1)}
                                className="w-full mt-4 border border-[#d5c2bf] py-3 rounded-lg uppercase text-[#514441]"
                            >
                                Cancel Assessment
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TheoryConfiguration;