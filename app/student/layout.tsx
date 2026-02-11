"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import {
    LayoutDashboard,
    CheckCircle,
    Calendar,
    FileText,
    CreditCard,
    BookOpen,
    Bell,
    LineChart
} from "lucide-react";

const studentItems = [
    {
        label: "Academics",
        items: [
            { title: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
            { title: "Attendance", href: "/student/attendance", icon: CheckCircle }, // Green in component
            { title: "Upcoming Exams", href: "/student/exams", icon: Calendar },    // Red in component
            { title: "Homework", href: "/student/homework", icon: BookOpen },       // Orange in component
            { title: "Report Card", href: "/student/reports", icon: FileText },
        ]
    },
    {
        label: "Finance",
        items: [
            { title: "Fee Status", href: "/student/fees", icon: CreditCard },
        ]
    },
    {
        label: "Tools",
        items: [
            { title: "Calendar", href: "/student/calendar", icon: Calendar },
            { title: "Notifications", href: "/student/notifications", icon: Bell },
        ]
    }
];

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar items={studentItems} title="Student Portal" />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
