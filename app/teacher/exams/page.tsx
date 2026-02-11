"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText } from "lucide-react";

export default function ExamSchedulePage() {
    const { exams } = useStore();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Exam Schedule</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {exams.map((exam) => (
                    <Card key={exam.id} className="border-l-4 border-l-blue-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-blue-500" />
                                {exam.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Subject:</span>
                                    <span className="font-medium">{exam.subject}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Class:</span>
                                    <span className="font-medium">{exam.class}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Date:</span>
                                    <span className="font-medium flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(exam.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {exams.length === 0 && (
                    <div className="col-span-full text-center p-8 text-gray-500">No exams scheduled.</div>
                )}
            </div>
        </div>
    );
}
