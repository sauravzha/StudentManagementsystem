"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import {
    LayoutDashboard,
    ClipboardCheck,
    Upload,
    Calendar,
    FileText,
    Bell,
} from "lucide-react";

const teacherItems = [
    {
        label: "Classroom",
        items: [
            { title: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
            { title: "Attendance", href: "/teacher/attendance", icon: ClipboardCheck },
            { title: "Homework Upload", href: "/teacher/homework", icon: Upload },
            { title: "Marks Upload", href: "/teacher/marks", icon: FileText },
        ]
    },
    {
        label: "Academics",
        items: [
            { title: "Exam Schedule", href: "/teacher/exams", icon: Calendar },
            { title: "Academic Calendar", href: "/teacher/calendar", icon: Calendar },
        ]
    },
    {
        label: "System",
        items: [
            { title: "Notifications", href: "/teacher/notifications", icon: Bell },
        ]
    }
];

export default function TeacherLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar items={teacherItems} title="Teacher Portal" />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
