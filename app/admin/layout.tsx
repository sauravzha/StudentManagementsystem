"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

import {
    LayoutDashboard,
    Users,
    GraduationCap,
    FileText,
    Upload,
    Calendar,
    Coffee,
    CreditCard,
    BarChart,
    Bell
} from "lucide-react";

const adminItems = [
    {
        label: "Management",
        items: [
            { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
            { title: "Student Management", href: "/admin/students", icon: Users },
            { title: "Teacher Management", href: "/admin/teachers", icon: GraduationCap },
        ]
    },
    {
        label: "Academics",
        items: [
            { title: "Exam Setup", href: "/admin/exams", icon: FileText },
            { title: "Marks Upload", href: "/admin/marks", icon: Upload },
            { title: "Academic Calendar", href: "/admin/calendar", icon: Calendar },
            { title: "Holiday Management", href: "/admin/holidays", icon: Coffee },
        ]
    },
    {
        label: "Finance & Reports",
        items: [
            { title: "Fee Management", href: "/admin/fees", icon: CreditCard },
            { title: "Reports & Analytics", href: "/admin/reports", icon: BarChart },
            { title: "Notifications", href: "/admin/notifications", icon: Bell },
        ]
    }
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar items={adminItems} title="Admin Portal" />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
