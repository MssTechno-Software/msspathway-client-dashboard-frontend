import React, { useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import NextSessionCard from "./NextSessionCard";
import TimelineCard from "./TimelineCard";

const CalendarView = ({
    scheduledInterviews,
    nextSession,
    todayTimeline,
    onStartInterview,
}) => {

    const calendarRef = useRef();

    const events = useMemo(() => {

        return scheduledInterviews.map((item) => ({
            id: item.interview_id,
            title: item.title,
            start: item.scheduled_at,
            end: item.scheduled_at,
            extendedProps: item,
        }));

    }, [scheduledInterviews]);

    const renderEvent = (eventInfo) => {

        const interview = eventInfo.event.extendedProps;

        return (

            <div className="rounded-md p-1 bg-blue-100 border-l-4 border-blue-500 text-xs">

                <div className="font-semibold truncate">
                    {interview.title}
                </div>

                <div className="text-gray-500 truncate">
                    {interview.company_name ||
                        interview.interview_source}
                </div>

                <div className="text-blue-700 text-[10px]">

                    {new Date(interview.scheduled_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}

                </div>

            </div>

        );
    };

    return (

        <div className="grid grid-cols-12 gap-6">

            {/* Calendar */}

            <div className="col-span-9 bg-white rounded-xl shadow border p-4">

                <FullCalendar
                    ref={calendarRef}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                    ]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek",
                    }}
                    buttonText={{
                        today: "Today",
                        month: "Month",
                        week: "Week",
                    }}
                    events={events}
                    eventContent={renderEvent}
                    height="auto"
                    eventClick={(info) => {

                        onStartInterview(
                            info.event.extendedProps
                        );

                    }}
                />

            </div>

            {/* Sidebar */}

            <div className="col-span-3 space-y-5">

                <NextSessionCard
                    session={nextSession}
                    onStart={onStartInterview}
                />

                <TimelineCard
                    timeline={todayTimeline}
                />

            </div>

        </div>

    );
};

export default CalendarView;