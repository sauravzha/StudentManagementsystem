"use client";

import CalendarComponent from "@/components/calendar/CalendarComponent";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CalendarPage() {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Academic Calendar</h1>
                <div className="space-x-2">
                    <Button variant="outline" onClick={() => router.push('/admin/exams')}>
                        <Plus className="h-4 w-4 mr-2" /> Schedule Exam
                    </Button>
                    <Button onClick={() => router.push('/admin/holidays')}>
                        <Plus className="h-4 w-4 mr-2" /> Add Holiday
                    </Button>
                </div>
            </div>
            <CalendarComponent role="ADMIN" />
        </div>
    );
}
