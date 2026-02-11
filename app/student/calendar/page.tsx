"use client";

import CalendarComponent from "@/components/calendar/CalendarComponent";

export default function StudentCalendarPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">My Calendar</h1>
            <CalendarComponent role="STUDENT" />
        </div>
    );
}
