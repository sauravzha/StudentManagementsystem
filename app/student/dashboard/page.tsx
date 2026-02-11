"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { User, CheckCircle, Clock, Calendar as CalendarIcon, FileText, Download, Bell, AlertCircle, ChevronRight, BookOpen, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentDashboardPage() {
    const { currentUser, students, exams, notifications } = useStore();
    const router = useRouter();

    // 1. Get Real Student Data
    const currentStudent = students.find(s => s.name === currentUser?.name) || students[0];

    // 2. Calculate Real Attendance Stats
    const totalDays = currentStudent.attendanceRecords?.length || 0;
    const presentDays = currentStudent.attendanceRecords?.filter(r => r.status === 'PRESENT').length || 0;
    const absentDays = currentStudent.attendanceRecords?.filter(r => r.status === 'ABSENT').length || 0;

    // Calculate percentage (default to safe 100 if no data to avoid NaN)
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

    // Determine Colors based on percentage
    const ringColor = attendancePercentage >= 75 ? "text-green-500" : attendancePercentage >= 60 ? "text-yellow-500" : "text-red-500";
    const ringStroke = attendancePercentage >= 75 ? "#22c55e" : attendancePercentage >= 60 ? "#eab308" : "#ef4444";

    // 3. Get Real Recent Attendance History (Last 3 records)
    // specific logic: sort by date descending take 3
    const recentAttendance = [...(currentStudent.attendanceRecords || [])]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    // 4. Get Real Upcoming Exams
    // Filter exams for student's class (assuming Class 10 for demo) and sort by date
    const upcomingExams = exams
        .filter(e => e.class === currentStudent.class)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 2);

    // 5. Get Real Notifications (Unread first)
    const recentNotifications = notifications.slice(0, 3);

    const nextClass = "Mathematics";
    const nextClassTime = "10:30 AM";

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Context Strip */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 gap-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Good Morning, {currentStudent.name.split(' ')[0]}! ☀️</h2>
                    <p className="text-sm text-gray-500">Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Clock className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Next Class</p>
                        <p className="text-sm font-bold text-gray-900">{nextClass} <span className="text-gray-400 font-normal">• {nextClassTime}</span></p>
                    </div>
                </div>
            </div>

            {/* Profile Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-xl group">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none group-hover:bg-white/15 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none group-hover:bg-white/15 transition-colors duration-500" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

                <div className="relative z-10 p-8 flex flex-col md:flex-row items-center gap-8">
                    {/* Avatar Ring */}
                    <div className="relative h-32 w-32 flex-shrink-0">
                        <svg className="h-full w-full -rotate-90 transform drop-shadow-lg" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/10" />
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke={ringStroke}
                                strokeWidth="8"
                                strokeDasharray="283"
                                strokeDashoffset={283 - (283 * attendancePercentage) / 100}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-24 w-24 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center overflow-hidden backdrop-blur-sm shadow-inner">
                                {currentStudent.name?.[0] ? (
                                    <span className="text-4xl font-bold text-white drop-shadow-md">{currentStudent.name[0]}</span>
                                ) : (
                                    <User className="h-12 w-12 text-white/80" />
                                )}
                            </div>
                        </div>
                        <div className={`absolute bottom-1 right-1 h-8 w-12 rounded-full border-2 border-white/30 flex items-center justify-center shadow-lg ${attendancePercentage >= 75 ? 'bg-green-500' : 'bg-red-500'}`}>
                            <span className="text-xs font-bold">{attendancePercentage}%</span>
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2 drop-shadow-sm">{currentStudent.name}</h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-blue-100 font-medium opacity-90 mb-6">
                            <span className="flex items-center gap-1"><GraduationCap className="h-4 w-4" /> Class {currentStudent.class}-{currentStudent.section}</span>
                            <span>•</span>
                            <span>Roll No: {currentStudent.rollNo}</span>
                            <span>•</span>
                            <span>Batch: 2025-26</span>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <div className="text-xs bg-white/10 inline-flex items-center px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                                Section: <span className="font-bold ml-1">{currentStudent.section}</span>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
                            <Link href="/student/attendance">
                                <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm shadow-lg hover:shadow-xl transition-all h-9">
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                                    Check Attendance
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Attendance Overview (Real Data) */}
                <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-md group">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between text-base">
                            Attendance Overview
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full uppercase tracking-wider">LATEST</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mb-6 text-sm font-medium">
                            <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg w-[48%] border border-green-100">
                                <span className="text-green-700 font-bold text-lg">{presentDays}</span>
                                <span className="text-xs text-green-600 uppercase tracking-wide">Present</span>
                            </div>
                            <div className="flex flex-col items-center p-2 bg-red-50 rounded-lg w-[48%] border border-red-100">
                                <span className="text-red-600 font-bold text-lg">{absentDays}</span>
                                <span className="text-xs text-red-500 uppercase tracking-wide">Absent</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recent Logs</h4>
                            {recentAttendance.length > 0 ? recentAttendance.map((record, i) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group/item">
                                    <span className="text-gray-600 font-medium text-sm flex items-center gap-2">
                                        <div className={`h-2 w-2 rounded-full ${record.status === 'PRESENT' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        {record.date}
                                    </span>
                                    <span className={`text-xs font-bold ${record.status === 'ABSENT' ? 'text-red-500' : 'text-green-600'}`}>{record.status}</span>
                                </div>
                            )) : (
                                <p className="text-sm text-gray-500 italic">No attendance records yet.</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0 justify-center">
                        <Link href="/student/attendance" className="w-full">
                            <Button variant="ghost" className="text-xs w-full text-blue-600 hover:text-blue-700 h-8 hover:bg-blue-50">View Full History</Button>
                        </Link>
                    </CardFooter>
                </Card>

                {/* Upcoming Exams (Real Data) */}
                <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-md overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <CalendarIcon className="h-24 w-24 text-blue-900" />
                    </div>
                    <CardHeader className="pb-3 relative z-10">
                        <CardTitle className="text-base flex items-center gap-2">
                            Upcoming Exams
                            <span className="h-5 w-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">{upcomingExams.length}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="space-y-4">
                            {upcomingExams.length > 0 ? upcomingExams.map(exam => (
                                <div key={exam.id} className="group flex gap-4 items-start p-3 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer">
                                    <div className="flex flex-col items-center justify-center h-14 w-14 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-100">
                                        <span className="text-xs uppercase">{new Date(exam.date).toLocaleString('default', { month: 'short' })}</span>
                                        <span className="text-xl leading-none">{new Date(exam.date).getDate()}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-gray-800">{exam.subject}</h4>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{exam.name}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 text-sm">No upcoming exams.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications (Real Data) */}
                <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-md">
                    <CardHeader><CardTitle className="text-base">Recent Notifications</CardTitle></CardHeader>
                    <CardContent>
                        {recentNotifications.length > 0 ? (
                            <div className="space-y-4">
                                {recentNotifications.map(notification => (
                                    <div key={notification.id} className="flex gap-3 items-start p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${notification.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 leading-tight">{notification.title}</p>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notification.message}</p>
                                            <p className="text-[10px] text-gray-400 mt-1">{new Date(notification.timestamp).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center min-h-[160px]">
                                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                                    <Bell className="h-6 w-6 text-blue-400" />
                                </div>
                                <h3 className="font-bold text-gray-800 text-sm">You're all caught up!</h3>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
