import { ArrowLeft, Search, ChevronLeft, ChevronRight, Video, Play, Clock3 } from "lucide-react";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function ScheduledInterviewPage() {
    const [view, setView] = useState("list");
    const [search, setSearch] = useState("")
    const [interviews, setInterviews] = useState([
        {
            id: 1,
            interview_name: "MC THEORY-TOPIC",
            interview_type: "Technical",
            category: "Mock",
            department: "Engineering Dept",
            duration: "45 mins",
            deadline_date: "Oct 12, 2024",
            status: "COMPLETED"
        },
        {
            id: 2,
            interview_name: "MC SELF-INTRODUCTION",
            interview_type: "Communication",
            category: "Mock",
            department: "Round Screening",
            duration: "15 mins",
            deadline_date: "Oct 15, 2024",
            status: "IN PROGRESS"
        },
        {
            id: 3,
            interview_name: "CAPGEMINI L1 INTERVIEW",
            interview_type: "HR",
            category: "Company",
            department: "HR Evaluation",
            duration: "30 mins",
            deadline_date: "Oct 18, 2024",
            status: "SCHEDULED"
        },
        {
            id: 4,
            interview_name: "TCS L2 INTERVIEW",
            interview_type: "HR",
            category: "Company",
            department: "HR Evaluation",
            duration: "60 mins",
            deadline_date: "Oct 20, 2024",
            status: "SCHEDULED"
        },
        {
            id: 5,
            interview_name: "MC CODING INTERVIEW",
            interview_type: "Technical",
            category: "Mock",
            department: "Engineering Dept",
            duration: "90 mins",
            deadline_date: "Oct 25, 2024",
            status: "SCHEDULED"
        },
        {
            id: 6,
            interview_name: "INFOSYS L1 INTERVIEW",
            interview_type: "Screening",
            category: "Company",
            department: "General Screening",
            duration: "45 mins",
            deadline_date: "Oct 28, 2024",
            status: "SCHEDULED"
        },
        {
            id: 7,
            interview_name: "INFOSYS L1 INTERVIEW",
            interview_type: "Screening",
            category: "Company",
            department: "General Screening",
            duration: "45 mins",
            deadline_date: "Oct 28, 2024",
            status: "SCHEDULED"
        }
    ]);

    const filteredInterviews = interviews.filter((item) => {
        const searchValue = search.toLowerCase().trim();
        return (
            !searchValue ||
            item.interview_name?.toLowerCase().includes(searchValue) ||
            item.interview_type?.toLowerCase().includes(searchValue) ||
            item.category?.toLowerCase().includes(searchValue)
        );
    });
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 6;
    const totalPages = Math.ceil(
        filteredInterviews.length / ITEMS_PER_PAGE
    );
    const paginatedInterviews = filteredInterviews.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const [calendarType, setCalendarType] = useState("month");
    const [calendarEvents, setCalendarEvents] = useState([
        {
            title: "Infosys Code Interview",
            candidateName: "Rahul Sharma",
            start: "2026-06-24T10:00:00",
            end: "2026-06-24T11:00:00",
            time: "10:00 AM",
            type: "company",
            status: "scheduled",
        },
        {
            title: "MC Self Introduction",
            candidateName: "Priya Reddy",
            start: "2026-06-24T03:00:00",
            end: "2026-06-24T04:00:00",
            time: "3:00 AM",
            type: "mock",
            status: "scheduled",
        },
        {
            title: "Capgemini L1 Interview",
            candidateName: "Arjun Kumar",
            start: "2026-06-24T10:00:00",
            end: "2026-06-24T11:00:00",
            time: "10:00 AM",
            type: "company",
            status: "scheduled",
        },
        {
            title: "Capgemini L1 Interview",
            candidateName: "Sneha Patel",
            start: "2026-06-02T10:30:00",
            end: "2026-06-02T11:00:00",
            time: "10:30 AM",
            type: "company",
            status: "completed",
        },
        {
            title: "MC Self Introduction",
            candidateName: "Vikram Singh",
            role: "Senior System Architect",
            start: "2026-06-26T11:30:00",
            end: "2026-06-26T12:00:00",
            time: "11:30 AM",
            type: "mock",
            status: "in_progress",
        },
        {
            title: "MC Self Introduction",
            candidateName: "Ananya Rao",
            role: "Senior System Architect",
            start: "2026-06-26T02:30:00",
            end: "2026-06-26T03:00:00",
            time: "2:30 AM",
            type: "mock",
            status: "scheduled",
        },
        {
            title: "Google Technical Interview",
            candidateName: "Rahul Sharma",
            role: "Senior System Architect",
            meetingLink: "https://meet.google.com/wdi-ddgt-ufo",
            start: "2026-06-27T10:00:00",
            end: "2026-06-27T11:00:00",
            time: "10:00 AM",
            type: "company",
            status: "scheduled",
        }
    ]);
    const navigate = useNavigate();
    const handleStartInterview = (item) => {
        navigate("/scheduled-interview-mode", {
            state: {
                interview: item,
            },
        });
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

    // Next upcoming interview
    const nextSession = calendarEvents
        .filter((event) => new Date(event.start) > new Date())
        .sort((a, b) => new Date(a.start) - new Date(b.start))[0];

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
            {view === "list" && (
                <>
                    <div className="bg-white border-b border-[#ececec] px-4 py-3 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Left */}
                        <div className="flex items-center pl-5">
                            <ArrowLeft size={20} />
                            <h2 className="text-[20px] font-semibold text-[#2b0b05] ml-8">
                                Interview Schedule
                            </h2>
                        </div>
                        {/* Right Search */}
                        <div className="relative w-full md:w-62.5 mt-3 md:mt-0 md:mr-8">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search interviews..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full md:w-62.5 h-10 border border-[#d9d9d9] rounded-full py-2 pl-10 pr-4 outline-none"
                            />
                        </div>
                    </div>
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-8 px-4 md:px-15">
                        <h1 className="text-[28px] md:text-[45px] font-bold text-[#230804]">
                            Scheduled Interviews
                        </h1>

                        <div className="flex items-center bg-white border border-[#d9d9d9] rounded-md overflow-hidden">                            <button
                            onClick={() => setView("calendar")}
                            className={`px-6 py-2 text-sm ${view === "calendar"
                                ? "bg-[#f5f5f5] font-medium"
                                : "bg-white text-[#666]"
                                }`}
                        >
                            Calendar View
                        </button>
                            <button
                                onClick={() => setView("list")}
                                className={`px-6 py-2 text-sm border-l border-[#d9d9d9] ${view === "list"
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
                                                        {item.duration}
                                                    </td>

                                                    <td className="px-6">
                                                        {item.deadline_date}
                                                    </td>

                                                    <td className="px-6">
                                                        {item.status === "COMPLETED" ? (
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
                                        className="px-4 py-2 border border-[#d5c2bf] rounded-lg bg-white"
                                    >
                                        Today
                                    </button>


                                </div>
                                <div className="flex items-center self-start lg:self-auto bg-[#eff4ff] p-1 rounded-lg border border-[#d5c2bf]">
                                    <button
                                        onClick={() => {
                                            setCalendarType("week");
                                            calendarRef.current?.getApi().changeView("timeGridWeek");
                                        }}
                                        className={`px-4 py-1.5 rounded-md ${calendarType === "week"
                                            ? "bg-white shadow-sm text-[#3b6934] font-bold"
                                            : "text-[#514441]"
                                            }`}
                                    >
                                        Week
                                    </button>

                                    <button
                                        onClick={() => {
                                            setCalendarType("month");
                                            calendarRef.current?.getApi().changeView("dayGridMonth");
                                        }}
                                        className={`px-4 py-1.5 rounded-md ${calendarType === "month"
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
                                            className="w-full py-3 bg-[#3b6934] text-white rounded-lg flex items-center justify-center gap-2 font-semibold uppercase tracking-wider"
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