"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { Users, BookOpen, Clock, Calendar, CheckSquare, ArrowRight, MoreVertical, ClipboardCheck, Upload, ChevronDown, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function TeacherDashboardPage() {
    const { students, teachers, currentUser } = useStore();

    // In a real app, we'd get the current teacher's ID from auth
    // For demo, we'll pick the first teacher or a specific one
    const currentTeacher = teachers[0];

    // State for selected class
    const [selectedClass, setSelectedClass] = useState<string | null>(currentTeacher?.assignedClasses?.[0] || null);

    // Filter students by selected class
    const classStudents = useMemo(() => {
        if (!selectedClass) return [];
        const [std, sec] = selectedClass.split('-');
        return students.filter(s => s.class === std && s.section === sec);
    }, [selectedClass, students]);

    // Mock Context Data
    const todayContext = "Monday, 12th March • 2 Classes Remaining • Attendance Pending (1)";

    const stats = [
        {
            title: "Total Students",
            value: classStudents.length.toString(),
            subtext: selectedClass ? `In Class ${selectedClass}` : "Select a class",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            href: "/teacher/students",
        },
        {
            title: "Classes Today",
            value: "5",
            subtext: "2 completed • 3 upcoming",
            icon: BookOpen,
            color: "text-green-600",
            bgColor: "bg-green-100",
            href: "/teacher/calendar",
        },
        {
            title: "Pending Homework",
            value: "12",
            subtext: "Needs review",
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            href: "/teacher/homework",
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Top Section with Context Strip & Class Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full border border-indigo-100">
                        <Calendar className="h-4 w-4" />
                        {todayContext}
                    </div>
                </div>

                {/* Class Selector */}
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 font-medium">Viewing Class:</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="min-w-[140px] justify-between bg-white shadow-sm border-blue-200 hover:bg-blue-50 text-blue-700">
                                {selectedClass || "Select Class"}
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[140px]">
                            {currentTeacher?.assignedClasses?.length ? (
                                currentTeacher.assignedClasses.map((cls) => (
                                    <DropdownMenuItem
                                        key={cls}
                                        onClick={() => setSelectedClass(cls)}
                                        className={selectedClass === cls ? "bg-blue-50 text-blue-700 font-medium" : ""}
                                    >
                                        Class {cls}
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <DropdownMenuItem disabled>No classes assigned</DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Actionable Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat, index) => (
                    <Link key={index} href={stat.href}>
                        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-none shadow-md group h-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wide group-hover:text-gray-700 transition-colors">
                                    {stat.title}
                                </CardTitle>
                                <div className={`${stat.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.subtext}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {/* Main Content Area */}
                <div className="md:col-span-2 lg:col-span-3 space-y-6">

                    {/* Student List for Selected Class */}
                    <Card className="border-none shadow-md">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-gray-500" />
                                Students in {selectedClass}
                            </CardTitle>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="h-8 gap-1 text-gray-500">
                                    <Filter className="h-3 w-3" /> Filter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                                        <tr>
                                            <th className="px-4 py-3 rounded-l-lg">Name</th>
                                            <th className="px-4 py-3">Roll No</th>
                                            <th className="px-4 py-3">Attendance</th>
                                            <th className="px-4 py-3 rounded-r-lg">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {classStudents.length > 0 ? (
                                            classStudents.map((student) => (
                                                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                                                            {student.name[0]}
                                                        </div>
                                                        {student.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-500">{student.rollNo}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                                                <div className={`h-full ${student.attendance >= 75 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${student.attendance}%` }} />
                                                            </div>
                                                            <span className="text-xs font-medium">{student.attendance}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Button size="sm" variant="ghost" className="h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                            View Profile
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                                    {selectedClass ? "No students found in this class." : "Please select a class to view students."}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Classes Widget (Preserved) */}
                    <Card className="border-none shadow-md">
                        <CardHeader className="pb-3">
                            <CardTitle>Upcoming Classes</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100">
                                <div className="p-4 bg-blue-50/50 border-l-4 border-blue-500 flex items-center justify-between group hover:bg-blue-50 transition-colors">
                                    <div className="flex gap-4 items-center">
                                        <div className="h-12 w-12 bg-white rounded-xl flex flex-col items-center justify-center border border-blue-100 shadow-sm">
                                            <span className="text-xs font-bold text-gray-500 uppercase">Now</span>
                                            <span className="text-lg font-bold text-blue-600">10:00</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">Mathematics <span className="text-gray-400 font-normal">|</span> Class 10-A</h4>
                                            <p className="text-sm text-gray-500">Chapter 5: Trigonometry</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="secondary" className="bg-white hover:bg-blue-100 text-blue-700 border border-blue-200 shadow-sm gap-2">
                                            <ClipboardCheck className="h-4 w-4" /> Take Attendance
                                        </Button>
                                    </div>
                                </div>

                                {/* Next Class */}
                                <div className="p-4 flex items-center justify-between group hover:bg-gray-50 transition-colors">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 text-center">
                                            <span className="text-sm font-bold text-gray-400">11:30</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-700">Physics <span className="text-gray-300 font-normal">|</span> Class 9-B</h4>
                                            <p className="text-xs text-gray-400">Lab Session</p>
                                        </div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-gray-600"><MoreVertical className="h-4 w-4" /></Button>
                                    </div>
                                </div>

                                <div className="p-4 flex items-center justify-between group hover:bg-gray-50 transition-colors">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 text-center">
                                            <span className="text-sm font-bold text-gray-400">02:00</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-700">Mathematics <span className="text-gray-300 font-normal">|</span> Class 10-C</h4>
                                            <p className="text-xs text-gray-400">Doubt Clearing</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Panel - Daily Actions (Preserved) */}
                <div className="md:col-span-1">
                    <Card className="h-full border-none shadow-md bg-gradient-to-b from-gray-900 to-gray-800 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-yellow-400">
                                <CheckSquare className="h-5 w-5" /> Today's Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex gap-3 items-start group cursor-pointer">
                                    <div className="mt-0.5 h-5 w-5 rounded border border-gray-500 flex items-center justify-center group-hover:border-yellow-400 transition-colors"></div>
                                    <div>
                                        <p className="text-sm font-medium group-hover:text-yellow-100 transition-colors">Take attendance for Class 10A</p>
                                        <p className="text-xs text-gray-400 mt-1">Scheduled: 10:00 AM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start group cursor-pointer">
                                    <div className="mt-0.5 h-5 w-5 rounded border border-gray-500 flex items-center justify-center group-hover:border-yellow-400 transition-colors"></div>
                                    <div>
                                        <p className="text-sm font-medium group-hover:text-yellow-100 transition-colors">Review 3 pending homeworks</p>
                                        <p className="text-xs text-gray-400 mt-1">Algebra & Physics</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start group cursor-pointer">
                                    <div className="mt-0.5 h-5 w-5 rounded border border-gray-500 flex items-center justify-center group-hover:border-yellow-400 transition-colors">
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium group-hover:text-yellow-100 transition-colors">Upload marks for Physics Test</p>
                                        <p className="text-xs text-gray-400 mt-1">Due Today</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border-gray-700 pt-4 mt-8">
                            <p className="text-xs text-gray-400 text-center w-full italic">"Teaching is the one profession that creates all other professions."</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
