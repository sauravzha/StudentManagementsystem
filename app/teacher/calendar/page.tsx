"use client";

import CalendarComponent from "@/components/calendar/CalendarComponent";

export default function TeacherCalendarPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Academic Calendar</h1>
            <CalendarComponent role="TEACHER" />
        </div>
    );
}
