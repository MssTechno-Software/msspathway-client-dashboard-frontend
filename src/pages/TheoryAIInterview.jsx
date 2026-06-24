import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mic, SkipForward, CheckCircle, Timer, Square } from "lucide-react";
import { FiLoader } from "react-icons/fi";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function TheoryAIInterview() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const location = useLocation();
    const topic = state?.topic || "Python";
    const subTopic = state?.subTopic || "Loops & Iterations";

    const [isRecording, setIsRecording] = useState(false);
    const [waveScale, setWaveScale] = useState(1);
    const [timeLeft, setTimeLeft] = useState(119);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const [loading, setLoading] = useState(false);

    const [popup, setPopup] = useState({
        show: false,
        message: "",
        type: "", // success | error
    });
    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useEffect(() => {
        let interval;

        if (isRecording) {
            interval = setInterval(() => {
                setWaveScale(Math.random() * 0.8 + 0.6);
            }, 150);
        } else {
            setWaveScale(1);
        }

        return () => clearInterval(interval);
    }, [isRecording]);

    const Waveform = () => {
        if (!isRecording) return null;

        const bars = [28, 40, 22, 34, 18, 30, 42];

        return (
            <div className="flex items-center justify-center gap-1 mt-8 h-15">
                {bars.map((height, index) => (
                    <div
                        key={index}
                        className="bg-[#3b6934] rounded-full"
                        style={{
                            width: "4px",
                            height: `${height * waveScale}px`,
                            transition: "height 0.15s ease-in-out",
                        }}
                    />
                ))}
            </div>
        );
    };
    return (
        <div className="bg-white min-h-screen">

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
                    <span>
                        {topic}
                    </span>
                    <span>›</span>
                    <span className="text-[#3b6934]">
                        {subTopic}
                    </span>
                </div>
            </div>
            <div className="p-6">

                {/* Progress */}
                <div className="border border-gray-300 rounded-xl p-4 mb-6">
                    <div className="flex justify-center items-center gap-4">

                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <div
                                key={num}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                ${num === 1
                                        ? "bg-[#3b6934] text-white"
                                        : "border border-gray-300 text-gray-400"
                                    }`}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">

                    {/* Left */}
                    <div className="lg:col-span-7">

                        <div className="border border-gray-300 rounded-xl min-h-150 flex flex-col items-center justify-center">

                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-d1mNhj1eejdH7s-lXg-ifQEp4vQ6reI7Px0jAwKT7mFZyoP3wTBW5DzAqjMGrTbFnX56HN0g-dT4x-9CrcUFCA23ir2F2E6RGtYNV5bT0Wfh287CJvbQt3MeGc6XLtkMJ2qeo61Dqli5FTPTekXwgXXl6qNfAQch8ZDn1gSb-vXKdxACoJJflpil6e5BDIEOBzjEqj0o8zRnLPJHnuJxv_EdW9jBF_7jKhoVcrreRH0De0HLrwk74OtGKHpJ95_T8cX0qRrP7RWH"
                                alt="AI"
                                className="w-32 h-32 rounded-xl border-4 border-green-200"
                            />

                            {/* Wave */}
                            <Waveform />

                            <div className="mt-8 text-center">

                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-[#3b6934] text-[18px]">
                                        timer
                                    </span>

                                    <span className="uppercase text-sm font-bold">
                                        Question Time Remaining:
                                        <span className="text-[#3b6934] ml-1">
                                            01:45
                                        </span>
                                    </span>
                                </div>

                                <p className="uppercase text-xs tracking-widest text-[#3b6934] font-bold">
                                    Interviewer AI Active
                                </p>

                                <h2 className="text-2xl font-bold mt-3">
                                    What is an Infinite Loop?
                                </h2>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-between gap-3 mt-4">

                            <button
                                onClick={() => setIsRecording(!isRecording)}
                                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold uppercase shadow-sm transition-all
                                    ${isRecording
                                        ? "bg-red-600 text-white"
                                        : "bg-[#3b6934] hover:bg-[#2f552a] text-white"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    {isRecording ? "stop" : "mic"}
                                </span>

                                {isRecording ? "Recording..." : "Speak Now"}
                            </button>

                            <button
                                className="flex-1 border-2 border-[#3b6934] text-[#3b6934]
                                    hover:bg-[#eff4ff] py-3 px-4 rounded-lg
                                    flex items-center justify-center gap-2 font-semibold uppercase"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    skip_next
                                </span>

                                Skip Question
                            </button>

                            <button
                                className="flex-1 bg-[#3b6934] hover:bg-[#2f552a]
                                    text-white py-3 px-4 rounded-lg
                                    flex items-center justify-center gap-2 font-semibold uppercase"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    check_circle
                                </span>

                                Submit Answer
                            </button>

                        </div>
                    </div>

                    {/* Right */}
                    <div className="lg:col-span-5">

                        <div className="border border-gray-300 rounded-xl p-5 min-h-162.5">

                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-2 h-2 bg-[#3b6934] rounded-full animate-pulse"></div>

                                <h3 className="uppercase text-sm font-bold">
                                    Live Transcription
                                </h3>
                            </div>

                            <div className="bg-[#eff4ff] border-l-4 border-[#3b6934] p-4 rounded">

                                <p className="italic text-sm">
                                    AI: Tell us about your professional
                                    background and the key milestones
                                    that have shaped your career.
                                </p>
                            </div>

                            <div className="mt-5 space-y-4 text-[#514441]">
                                <p>
                                    Vertical scaling involves adding
                                    more power like CPU, RAM or storage
                                    to an existing server...
                                </p>

                                <p className="text-[#3b6934]">
                                    Throughout my career I have focused
                                    on building scalable applications...
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TheoryAIInterview;