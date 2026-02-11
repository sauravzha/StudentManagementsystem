"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List as ListIcon, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

type ViewMode = "calendar" | "list";

export default function StudentAttendancePage() {
    const { currentUser, students, holidays } = useStore();
    const [viewMode, setViewMode] = useState<ViewMode>("calendar");
    const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)); // Start at March 2024 for mock data

    // Get current student data (mock: assuming logged in user is linked to student '1' or fallback)
    const currentStudent = students.find(s => s.name === currentUser?.name) || students[0];

    // Helper to get days in month
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentDate);

    // Navigation
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

    // Status Logic
    const getStatusForDate = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // 1. Check Holiday store
        const holiday = holidays.find(h => h.date === dateStr);
        if (holiday) return { status: 'HOLIDAY', label: holiday.name, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };

        // 2. Check Student Records
        const record = currentStudent.attendanceRecords?.find(r => r.date === dateStr);
        if (record) {
            if (record.status === 'PRESENT') return { status: 'PRESENT', label: 'Present', color: 'bg-green-100 text-green-700 border-green-200' };
            if (record.status === 'ABSENT') return { status: 'ABSENT', label: 'Absent', color: 'bg-red-100 text-red-700 border-red-200' };
            if (record.status === 'LATE') return { status: 'LATE', label: 'Late', color: 'bg-orange-100 text-orange-700 border-orange-200' };
        }

        // 3. Fallback / Weekend
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        if (d.getDay() === 0 || d.getDay() === 6) return { status: 'WEEKEND', label: 'Weekend', color: 'bg-gray-50 text-gray-400' };

        return { status: 'NA', label: '-', color: 'bg-white text-gray-300' };
    };

    // Stats Calculation
    const stats = {
        present: currentStudent.attendanceRecords?.filter(r => r.status === 'PRESENT').length || 0,
        absent: currentStudent.attendanceRecords?.filter(r => r.status === 'ABSENT').length || 0,
        late: currentStudent.attendanceRecords?.filter(r => r.status === 'LATE').length || 0,
        percentage: currentStudent.attendance || 0
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Stats */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Attendance Report</h1>
                    <p className="text-gray-500">Track your daily attendance performance.</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={viewMode === "calendar" ? "default" : "outline"}
                        onClick={() => setViewMode("calendar")}
                        className="gap-2"
                    >
                        <CalendarIcon className="h-4 w-4" /> Calendar
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        onClick={() => setViewMode("list")}
                        className="gap-2"
                    >
                        <ListIcon className="h-4 w-4" /> List View
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-blue-700">{stats.percentage}%</span>
                        <span className="text-xs text-blue-600 font-bold uppercase tracking-wider mt-1">Overall</span>
                    </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-100">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-green-700">{stats.present}</span>
                        <span className="text-xs text-green-600 font-bold uppercase tracking-wider mt-1">Days Present</span>
                    </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-100">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-red-700">{stats.absent}</span>
                        <span className="text-xs text-red-600 font-bold uppercase tracking-wider mt-1">Days Absent</span>
                    </CardContent>
                </Card>
                <Card className="bg-yellow-50 border-yellow-100">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-yellow-700">{holidays.length}</span>
                        <span className="text-xs text-yellow-600 font-bold uppercase tracking-wider mt-1">Holidays</span>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="border-b pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={prevMonth}><ChevronLeft className="h-5 w-5" /></Button>
                            <h2 className="text-xl font-bold text-gray-800 w-40 text-center">
                                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h2>
                            <Button variant="ghost" size="icon" onClick={nextMonth}><ChevronRight className="h-5 w-5" /></Button>
                        </div>
                        {viewMode === 'calendar' && (
                            <div className="hidden md:flex gap-4 text-xs font-medium">
                                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div> Present</span>
                                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div> Absent</span>
                                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div> Holiday</span>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {viewMode === 'calendar' ? (
                        /* CALENDAR GRID */
                        <div className="grid grid-cols-7 gap-2 md:gap-4">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="text-center font-bold text-gray-400 text-sm uppercase py-2">{day}</div>
                            ))}

                            {/* Empty cells for start of month */}
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={`empty-${i}`} className="h-24 md:h-32 bg-gray-50/50 rounded-lg" />
                            ))}

                            {/* Days */}
                            {Array.from({ length: days }).map((_, i) => {
                                const day = i + 1;
                                const { status, label, color } = getStatusForDate(day);
                                return (
                                    <div key={day} className={`h-24 md:h-32 mb-2 p-2 rounded-xl border ${color} transition-all hover:shadow-md relative group flex flex-col justify-between`}>
                                        <span className={`text-sm font-bold ${status === 'NA' ? 'text-gray-300' : 'text-gray-700'}`}>{day}</span>

                                        <div className="mt-1">
                                            {status === 'PRESENT' && <CheckCircle className="h-6 w-6 mx-auto text-green-500 opacity-80" />}
                                            {status === 'ABSENT' && <XCircle className="h-6 w-6 mx-auto text-red-500 opacity-80" />}
                                            {status === 'LATE' && <Clock className="h-6 w-6 mx-auto text-orange-500 opacity-80" />}
                                            {status === 'HOLIDAY' && <span className="text-[10px] font-bold block text-center leading-tight bg-white/50 rounded px-1 py-1">{label}</span>}
                                        </div>

                                        <div className="text-[10px] font-bold text-center uppercase tracking-wider opacity-70">
                                            {status !== 'NA' && status !== 'WEEKEND' ? status : ''}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* LIST VIEW */
                        <div className="rounded-md border">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-500 font-medium">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Date</th>
                                        <th className="px-4 py-3 text-left">Day</th>
                                        <th className="px-4 py-3 text-left">Status</th>
                                        <th className="px-4 py-3 text-left">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {Array.from({ length: days }).map((_, i) => {
                                        const day = i + 1;
                                        const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                        const { status, label, color } = getStatusForDate(day);

                                        // Filter out 'NA' days for cleaner list view if needed, but keeping all for completeness
                                        return (
                                            <tr key={day} className="hover:bg-gray-50/50">
                                                <td className="px-4 py-3 font-medium text-gray-900">{dateObj.toLocaleDateString()}</td>
                                                <td className="px-4 py-3 text-gray-500">{dateObj.toLocaleDateString('en-US', { weekday: 'long' })}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${color}`}>
                                                        {status === 'HOLIDAY' ? 'Holiday' : label}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-500 text-xs">
                                                    {status === 'HOLIDAY' ? `School Closed for ${label}` :
                                                        status === 'ABSENT' ? 'Marked by Teacher' :
                                                            status === 'LATE' ? 'Late Arrival' : '-'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
