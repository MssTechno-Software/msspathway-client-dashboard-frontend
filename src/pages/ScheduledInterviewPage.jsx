import { useEffect, useState } from "react";
import ListView from "../pages/scheduledForYou/ListView";
import CalendarView from "../pages/scheduledForYou/CalendarView";
import axios from "axios";
import BASE_URL from "../config/api";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const ScheduledInterviews = () => {
    const [view, setView] = useState("list");
    const [data, setData] = useState({
        scheduled_interviews: [],
        pagination: {
            page: 1,
            page_size: 10,
            total_pages: 1,
            total_records: 0,
        },
        next_session: null,
        today_timeline: [],
    });
    const clientId = localStorage.getItem("client_id");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();
    const [popup, setPopup] = useState({
        show: false,
        message: "",
        type: "", // success | error
    });
    const getScheduledInterviews = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${BASE_URL}/clients/${clientId}/scheduled-interviews`,
                {
                    params: {
                        view,
                        page,
                        page_size: pageSize,
                    },
                }
            );

            setData(res.data);

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
    useEffect(() => {
        if (clientId) {
            getScheduledInterviews();
        }
    }, [clientId, view, page, pageSize]);
    const handleStartInterview = async (interview) => {
        try {

            // Disable for realtime interviews
            if (interview.interview_source === "realtime") {
                return;
            }

            setLoading(true);

            const res = await axios.get(
                `${BASE_URL}/api/clients/${clientId}/interviews/${interview.interview_id}/pre-start`
            );

            console.log(res.data);

            navigate("/scheduled-interview-mode", {
                state: {
                    interview,
                    preStartData: res.data,
                },
            });

        } catch (err) {
            console.error(err);

            let errorMessage = "Failed to load scheduled interviews.";

            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (
                Array.isArray(err.response?.data?.detail) &&
                err.response.data.detail.length > 0
            ) {
                errorMessage = err.response.data.detail[0].msg;
            } else if (typeof err.response?.data?.detail === "string") {
                errorMessage = err.response.data.detail;
            }

            setPopup({
                show: true,
                type: "error",
                message: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="p-6">
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
            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-[48px] font-bold text-[#230804]">
                    Scheduled Interviews
                </h1>

                <div className="flex rounded-lg overflow-hidden border border-gray-300 shadow">

                    <button
                        onClick={() => setView("month")}
                        className={`px-5 py-2 cursor-pointer ${view === "month"
                            ? "bg-gray-300 text-black"
                            : "bg-white"
                            }`}
                    >
                        Calendar View
                    </button>

                    <button
                        onClick={() => setView("list")}
                        className={`px-5 py-2 cursor-pointer ${view === "list"
                            ? "bg-gray-300 text-black"
                            : "bg-white"
                            }`}
                    >
                        List View
                    </button>

                </div>

            </div>

            {/* Views */}

            {view === "list" ? (

                <ListView
                    interviews={data.scheduled_interviews}
                    pagination={data.pagination}
                    onPageChange={setPage}
                    onPageSizeChange={setPageSize}
                    onStartInterview={handleStartInterview}
                />

            ) : (

                <CalendarView
                    scheduledInterviews={data.scheduled_interviews}
                    nextSession={data.next_session}
                    todayTimeline={data.today_timeline}
                    onStartInterview={handleStartInterview}
                />

            )}

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
};

export default ScheduledInterviews;