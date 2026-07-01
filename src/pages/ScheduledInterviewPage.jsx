import { ArrowLeft, Search, ChevronLeft, ChevronRight, Video, Play, Clock3 } from "lucide-react";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef } from "react";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config/api";
function ScheduledInterviewPage() {
    const [view, setView] = useState("list");
    const [calendarType, setCalendarType] = useState("month");
    const [search, setSearch] = useState("")
    const [interviews, setInterviews] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [summary, setSummary] = useState({});
    const [nextSession, setNextSession] = useState(null);
    const [todayTimeline, setTodayTimeline] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;
    const [popup, setPopup] = useState({
        open: false,
        type: "",
        title: "",
        message: "",
    });
    const navigate = useNavigate();
    const clientId = localStorage.getItem("client_id");

    const getScheduledInterviews = async (selectedView) => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${BASE_URL}/clients/${clientId}/scheduled-interviews`,
                {
                    params: {
                        view: selectedView,
                        page: currentPage,
                        page_size: 10,
                    },
                }
            );

            const data = res.data;

            setSummary(data.summary);
            setNextSession(data.next_session);
            setTodayTimeline(data.today_timeline);
            setPagination(data.pagination);
            if (selectedView === "list") {
                setInterviews(data.scheduled_interviews);
            } else {
                const events = [];

                Object.entries(data.scheduled_interviews).forEach(([date, list]) => {
                    list.forEach((item) => {
                        events.push({
                            id: item.interview_id,
                            title: item.title,
                            start: item.scheduled_at,
                            end: item.scheduled_at,
                            type:
                                item.interview_source === "mock_interview"
                                    ? "mock"
                                    : "company",

                            status: item.status.toLowerCase(),

                            candidateName: data.client_name,

                            meetingLink: item.meeting_link,

                            role: item.role,

                            time: new Date(item.scheduled_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            }),

                            extendedProps: {
                                ...item,
                            },
                        });
                    });
                });

                setCalendarEvents(events);
            }
        } catch (err) {
            setPopup({
                open: true,
                type: "error",
                title: "Error",
                message:
                    err?.response?.data?.detail ||
                    err?.response?.data?.message ||
                    "Unable to fetch scheduled interviews.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getScheduledInterviews(view);
    }, [view, currentPage]);

    const filteredInterviews = interviews.filter((item) => {
        const value = search.toLowerCase().trim();

        if (!value) return true;

        return (
            item.title?.toLowerCase().includes(value) ||
            item.interview_source?.toLowerCase().includes(value) ||
            item.status?.toLowerCase().includes(value)
        );
    });

    const totalPages = pagination?.total_pages || 1;
    const paginatedInterviews = filteredInterviews.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleStartInterview = async (item) => {
        try {
            setLoading(true);

            const response = await axios.get(
                `${BASE_URL}/api/clients/${clientId}/interviews/${item.interview_id}/pre-start`
            );

            navigate("/scheduled-interview-mode", {
                state: {
                    interview: item,
                    preStartData: response.data,
                },
            });

        } catch (err) {
            setPopup({
                open: true,
                type: "error",
                title: "Error",
                message:
                    err?.response?.data?.detail ||
                    "Unable to load interview details.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCalendarInterview = (event) => {
        navigate("/scheduled-Interview-mode", {
            state: {
                interview: {
                    interview_name: event.title,
                    category:
                        event.extendedProps.type === "company"
                            ? "Company"
                            : "Mock",
                    ...event.extendedProps,
                },
            },
        });
    };
    const renderEventContent = (eventInfo) => {
        // Interview type (Company / Mock)
        const type = eventInfo.event.extendedProps.type;

        // Interview status
        const status = eventInfo.event.extendedProps.status;

        // Today's date
        const today = new Date().toISOString().split("T")[0];

        // Event date
        const eventDate = eventInfo.event.startStr.split("T")[0];

        // Check if event is today
        const isToday = today === eventDate;

        // Check if interview is live
        const isLive = isToday && status === "in_progress";
        // WEEK VIEW
        if (calendarType === "week") {
            return (
                <div
                    onClick={() => handleCalendarInterview(eventInfo.event)}
                    className={`h-full w-full rounded-md border-l-4 px-2 py-2 flex flex-col justify-center cursor-pointer                  ${isToday
                        ? "bg-[#bcf1ad] border-[#2d5a27]"
                        : type === "company"
                            ? "bg-[#dbeafe] border-[#2563eb]"
                            : "bg-[#e2e8f0] border-[#64748b]"
                        }`}
                >
                    <div
                        className={`text-[11px] font-bold leading-4 break-all
                    ${isToday
                                ? "text-[#2d5a27]"
                                : type === "company"
                                    ? "text-[#1e40af]"
                                    : "text-[#334155]"
                            }`}
                    >
                        {eventInfo.event.title}
                    </div>

                    <div
                        className={`text-[9px] mt-1
                    ${isToday
                                ? "text-[#416f39]"
                                : "text-[#64748b]"
                            }`}
                    >
                        {eventInfo.event.extendedProps.time}
                    </div>
                </div>
            );
        }

        // MONTH VIEW
        return (
            <div
                onClick={() => handleCalendarInterview(eventInfo.event)}
                className={`min-h-17.5 w-full rounded-md border-l-4 px-2 py-2 overflow-hidden shadow-sm cursor-pointer                    ${isLive
                    ? "bg-white border-[#2d5a27]"
                    : type === "company"
                        ? "bg-[#dbeafe] border-[#2563eb]"
                        : "bg-[#e2e8f0] border-[#64748b]"
                    }`}
            >
                {isLive && (
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-bold uppercase text-[#2d5a27]">
                            IN PROGRESS
                        </span>

                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    </div>
                )}
                <div
                    className={`text-[12px] font-bold leading-4 whitespace-normal wrap-break-word
                    
                           ${isLive
                            ? "text-[#2d5a27]"
                            : type === "company"
                                ? "text-[#1e40af]"
                                : "text-[#334155]"
                        }`}
                >
                    {eventInfo.event.title}
                </div>
                <div className="text-[10px] text-[#6b7280]">
                    {eventInfo.event.extendedProps.candidateName}
                </div>

                <div
                    className={`text-[9px] mt-0.5
               ${isLive
                            ? "text-[#416f39]"
                            : "text-[#64748b]"
                        }`}
                >
                    {eventInfo.event.extendedProps.time}

                </div>
                {isLive && (
                    <button className="mt-2 w-full rounded bg-[#2d5a27] py-1 text-[10px] font-semibold text-white">
                        RESUME
                    </button>
                )}
            </div>
        );
    };
    // Selected calendar date
    const [currentDate, setCurrentDate] = useState(new Date());

    // FullCalendar reference
    const calendarRef = useRef(null);

    // Format date & time
    const formattedDate = nextSession
        ? new Date(nextSession.start).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        : "";

    // Today's date
    const today = new Date().toISOString().split("T")[0];

    // Today's interviews
    const todaysEvents = calendarEvents.filter(
        (event) => event.start.split("T")[0] === today
    );

    return (
        <div className="bg-[#f8f9fa]">
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
            {view === "list" && (
                <>
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-4 py-4 md:px-15">
                        <h1 className="text-[28px] md:text-[45px] font-bold text-[#230804]">
                            Scheduled Interviews
                        </h1>

                        <div className="flex items-center bg-white border border-[#d9d9d9] rounded-md overflow-hidden">                            <button
                            onClick={() => setView("calendar")}
                            className={`px-6 py-2 text-sm cursor-pointer ${view === "calendar"
                                ? "bg-[#f5f5f5] font-medium"
                                : "bg-white text-[#666]"
                                }`}
                        >
                            Calendar View
                        </button>
                            <button
                                onClick={() => setView("list")}
                                className={`px-6 py-2 text-sm border-l border-[#d9d9d9] cursor-pointer ${view === "list"
                                    ? "bg-[#f5f5f5] font-medium"
                                    : "bg-white text-[#666]"
                                    }`}
                            >
                                List View
                            </button>
                        </div>
                    </div>
                    {/* Schedule Card */}
                    <div className="bg-white border border-[#dee2e6] rounded-xl overflow-hidden mx-4 md:mx-8 lg:mx-12 mb-20">                        {/* Card Header */}
                        <div className="overflow-x-auto">
                            <div className="flex justify-between items-center px-6 py-5 border-b border-[#dee2e6]">
                                <h2 className="text-xl font-bold text-[#230804]">
                                    Active Schedule
                                </h2>
                            </div>
                            <table className="w-full min-w-200 lg:min-w-full">
                                <thead>
                                    <tr className="border-b border-[#dee2e6] text-[12px] font-semibold uppercase tracking-widest text-[#514441]">
                                        <th className="text-left px-6 py-4">Interview Type</th>
                                        <th className="text-left px-6 py-4">Duration</th>
                                        <th className="text-left px-6 py-4">Deadline Date</th>
                                        <th className="text-left px-9 py-4">Status</th>
                                        <th className="text-center px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedInterviews.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center py-10 text-gray-400"
                                            >
                                                No Interviews Found
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedInterviews.map((item) => {

                                            const isCompanyInterview =
                                                item.category?.toLowerCase() === "company";

                                            return (
                                                <tr
                                                    key={item.id}
                                                    className={`border-b border-[#dee2e6] h-30 ${isCompanyInterview
                                                        ? "bg-blue-100/50"
                                                        : "bg-slate-200/40"
                                                        }`}
                                                >
                                                    <td
                                                        className={`border-l-[6px] px-6 ${isCompanyInterview
                                                            ? "border-l-[#1d4ed8]"
                                                            : "border-l-[#56657A]"
                                                            }`}
                                                    >
                                                        <h3
                                                            className={`text-[13px] font-bold ${isCompanyInterview
                                                                ? "text-[#1e40af]"
                                                                : "text-[#445066]"
                                                                }`}
                                                        >
                                                            {item.interview_name}
                                                        </h3>

                                                        <p className="text-[12px] text-[#666]">
                                                            {item.department}
                                                        </p>
                                                    </td>

                                                    <td className="px-6">
                                                        {item.duration_minutes} mins
                                                    </td>

                                                    <td className="px-6">
                                                        {new Date(item.deadline_date).toLocaleDateString()}
                                                    </td>

                                                    <td className="px-6">
                                                        {item.status.toUpperCase() === "COMPLETED" ? (
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-[#bcf1ad] text-[#2d5a27] border border-[#2d5a27]/20">
                                                                COMPLETED
                                                            </span>
                                                        ) : item.status === "IN PROGRESS" ? (
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-[#2d5a27]/10 text-[#2d5a27] border border-[#2d5a27]/20">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a27] mr-2 animate-pulse"></span>
                                                                IN PROGRESS
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-[#f1f3f5] text-[#514441] border border-[#dee2e6]">
                                                                SCHEDULED
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="text-center px-6">
                                                        <button
                                                            onClick={() => handleStartInterview(item)}
                                                            className="bg-[#2d5a27] text-white px-3 py-2 text-sm font-semibold rounded cursor-pointer hover:bg-[#23481f] transition-colors duration-200"
                                                        >
                                                            START INTERVIEW
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Footer */}
                        <div className="flex flex-col md:flex-row gap-3 justify-between items-center px-4 py-3 border-t border-gray-200 bg-gray-50">
                            <div className="text-sm text-gray-500">
                                Showing {paginatedInterviews.length} of {filteredInterviews.length} interviews
                            </div>

                            <div className="flex items-center gap-2">

                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(1)}
                                    className="px-3 py-1 border rounded disabled:opacity-40"
                                >
                                    {"<<"}
                                </button>

                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className="px-3 py-1 border rounded disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <button className="bg-[#2f6f2f] text-white px-4 py-1 rounded">
                                    {currentPage}
                                </button>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className="px-3 py-1 border rounded disabled:opacity-20"
                                >
                                    Next
                                </button>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(totalPages)}
                                    className="px-3 py-1 border rounded disabled:opacity-20"
                                >
                                    {">>"}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {view === "calendar" && (
                <div className="mx-4 md:mx-8 xl:mx-15 mt-6 md:mt-10 xl:mt-16">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
                        {/* LEFT SECTION */}
                        <div className="xl:col-span-9">
                            {/* Heading */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                                <h1 className="text-[45px] font-bold text-[#230804]">
                                    Scheduled Interviews
                                </h1>

                                <div className="flex items-center bg-white border border-[#d9d9d9] rounded-md overflow-hidden">
                                    <button className="px-6 py-2 bg-[#f5f5f5] font-medium">
                                        Calendar
                                    </button>

                                    <button
                                        onClick={() => setView("list")}
                                        className="px-6 py-2 border-l border-[#d9d9d9]"
                                    >
                                        List
                                    </button>
                                </div>

                            </div>

                            {/* Month Controls */}
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">

                                <div className="flex flex-wrap items-center gap-3">

                                    <div className="flex items-center border border-[#d5c2bf] rounded-lg overflow-hidden bg-white">

                                        <button
                                            className="p-2 hover:bg-[#eff4ff]"
                                            onClick={() => {
                                                const calendarApi =
                                                    calendarRef.current.getApi();

                                                calendarApi.prev();

                                                setCurrentDate(calendarApi.getDate());
                                            }}
                                        >
                                            <ChevronLeft size={18} />
                                        </button>

                                        <span className="px-4 py-2.5 font-bold text-[#0b1c30]">
                                            {currentDate.toLocaleString("default", {
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>

                                        <button
                                            className="p-2 hover:bg-[#eff4ff]"
                                            onClick={() => {
                                                const calendarApi =
                                                    calendarRef.current.getApi();

                                                calendarApi.next();

                                                setCurrentDate(calendarApi.getDate());
                                            }}
                                        >
                                            <ChevronRight size={18} />
                                        </button>

                                    </div>

                                    <button
                                        onClick={() => {
                                            const calendarApi = calendarRef.current.getApi();

                                            calendarApi.today();

                                            setCurrentDate(calendarApi.getDate());
                                        }}
                                        className="px-4 py-2 border border-[#d5c2bf] rounded-lg bg-white cursor-pointer"
                                    >
                                        Today
                                    </button>
                                </div>
                                <div className="flex items-center self-start lg:self-auto bg-[#eff4ff] p-1 rounded-lg border border-[#d5c2bf]">
                                    <button
                                        onClick={() => {
                                            setCalendarType("week");
                                            calendarRef.current?.getApi().changeView("timeGridWeek");
                                            getScheduledInterviews("week");
                                        }}
                                        className={`px-4 py-1.5 rounded-md cursor-pointer ${calendarType === "week"
                                            ? "bg-white shadow-sm text-[#3b6934] font-bold"
                                            : "text-[#514441]"
                                            }`}
                                    >
                                        Week
                                    </button>

                                    <button
                                        onClick={() => {
                                            setCalendarType("month");
                                            setView("month");
                                            calendarRef.current?.getApi().changeView("dayGridMonth");
                                        }}
                                        className={`px-4 py-1.5 rounded-md cursor-pointer ${calendarType === "month"
                                            ? "bg-white shadow-sm text-[#3b6934] font-bold"
                                            : "text-[#514441]"
                                            }`}
                                    >
                                        Month
                                    </button>
                                </div>
                            </div>
                            {/* Calendar Container */}
                            <div className="bg-white border border-[#d5c2bf] rounded-xl shadow-sm overflow-x-auto mb-8 md:mb-16">

                                <FullCalendar
                                    ref={calendarRef}
                                    plugins={[dayGridPlugin, timeGridPlugin]}
                                    initialView="dayGridMonth"
                                    headerToolbar={false}
                                    fixedWeekCount={false}
                                    showNonCurrentDates={true}
                                    contentHeight="auto"
                                    /* Events */
                                    events={calendarEvents}
                                    eventContent={renderEventContent}
                                    eventDisplay="block"
                                    /* Week View */
                                    allDaySlot={false}
                                    slotDuration="01:00:00"
                                    slotLabelInterval="01:00:00"
                                    slotEventOverlap={false}
                                />
                            </div>
                        </div>
                        {/* RIGHT SECTION */}
                        <div className="xl:col-span-3">
                            <div className="p-4 md:p-6 bg-white border border-[#3b6934] rounded-xl shadow-md mb-8">
                                <h3 className="text-[24px] font-semibold mb-6">
                                    Next Session
                                </h3>

                                {nextSession ? (
                                    <>
                                        <div className="mb-6">

                                            <p className="text-[16px] font-bold">
                                                {nextSession.title}
                                            </p>

                                            <p className="text-xs text-[#514441] italic mt-1">
                                                {nextSession.role}
                                            </p>
                                            <p className="text-xs text-[#666] mt-1">
                                                {nextSession.candidateName}
                                            </p>

                                        </div>

                                        <div className="space-y-3 mb-6">

                                            <div className="flex items-center gap-3 text-[#514441]">
                                                <Clock3 size={16} />
                                                <span className="text-sm font-medium">
                                                    {formattedDate}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 text-[#514441]">
                                                <Video size={16} />

                                                <span className="text-sm font-medium">
                                                    {nextSession.meetingLink
                                                        ? "Link Attached"
                                                        : "No Link Attached"}
                                                </span>
                                            </div>

                                        </div>

                                        <button
                                            onClick={() => {
                                                if (nextSession.meetingLink) {
                                                    window.open(nextSession.meetingLink, "_blank");
                                                }
                                            }}
                                            className="w-full py-3 bg-[#3b6934] text-white rounded-lg flex items-center justify-center gap-2 font-semibold uppercase tracking-wider cursor-pointer"
                                        >
                                            START
                                            <Play size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <p>No Upcoming Sessions</p>
                                )}

                            </div>

                            <h3 className="text-xl md:text-[22px] font-bold mb-5">
                                Today's Timeline
                            </h3>

                            <div className="space-y-4">

                                {todaysEvents.map((item, index) => {

                                    const isLive = item.status === "in_progress";

                                    return (

                                        <div
                                            key={index}
                                            className="p-4 bg-white border border-[#3b6934]/20 rounded-lg shadow-sm"
                                        >

                                            <div className="flex justify-between items-center mb-2">

                                                <span className="text-[10px] font-bold text-[#837470] uppercase">
                                                    {item.time}
                                                </span>

                                                {isLive ? (
                                                    <span className="flex items-center gap-1.5 px-2 py-0.5 bg-[#bcf1ad] text-[#416f39] text-[9px] rounded-full font-bold">
                                                        <span className="w-1.5 h-1.5 bg-[#ba1a1a] rounded-full animate-pulse"></span>
                                                        LIVE
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-0.5 bg-[#e2e8f0] text-[#64748b] text-[9px] rounded-full font-bold">
                                                        SCHEDULED
                                                    </span>
                                                )}

                                            </div>

                                            <p className="text-sm font-bold">
                                                {item.title}
                                            </p>

                                            <p className="text-[11px] text-[#514441]">
                                                {item.role}
                                            </p>
                                        </div>

                                    );
                                })}

                            </div>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}
export default ScheduledInterviewPage;