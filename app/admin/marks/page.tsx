"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Save, CheckCircle, FileText, Send, Loader2 } from "lucide-react";

export default function MarksUploadPage() {
    const { students, exams, addNotification } = useStore();
    const [selectedExamId, setSelectedExamId] = useState<string>("");
    const [marks, setMarks] = useState<Record<string, string>>({});

    // Automation States
    const [stage, setStage] = useState<'input' | 'processing' | 'preview' | 'published'>('input');
    const [processingProgress, setProcessingProgress] = useState(0);

    const handleMarkChange = (studentId: string, value: string) => {
        setMarks(prev => ({ ...prev, [studentId]: value }));
    };

    const handleGenerateResults = () => {
        setStage('processing');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setProcessingProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setStage('preview');
            }
        }, 300); // 3 seconds total
    };

    const handlePublish = () => {
        const exam = exams.find(e => e.id === selectedExamId);
        if (exam) {
            addNotification({
                id: Math.random().toString(),
                title: "Results Published",
                message: `Results for ${exam.name} have been released to parents.`,
                type: 'success',
                timestamp: new Date().toISOString(),
                read: false
            });
        }
        setStage('published');
    };

    const handleReset = () => {
        setStage('input');
        setMarks({});
        setSelectedExamId("");
        setProcessingProgress(0);
    };

    const selectedExam = exams.find(e => e.id === selectedExamId);
    const classStudents = selectedExam ? students.filter(s => s.class === selectedExam.class) : [];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Result Automation</h1>

            {/* Stage 1: Input Marks */}
            {stage === 'input' && (
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-end bg-white p-4 rounded-lg shadow-sm">
                        <div className="w-full md:w-1/3 space-y-2">
                            <Label>Select Exam</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={selectedExamId}
                                onChange={(e) => setSelectedExamId(e.target.value)}
                            >
                                <option value="">-- Select Exam --</option>
                                {exams.map(exam => (
                                    <option key={exam.id} value={exam.id}>{exam.name} ({exam.class})</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:ml-auto">
                            <Button variant="outline" className="gap-2">
                                <Upload className="h-4 w-4" /> Import Excel
                            </Button>
                        </div>
                    </div>

                    {selectedExam && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Enter Marks for {selectedExam.name}</CardTitle>
                                <Button onClick={handleGenerateResults} className="gap-2 bg-blue-600 hover:bg-blue-700">
                                    <Loader2 className="h-4 w-4" /> Generate Result
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-3 text-left">Roll No</th>
                                                <th className="p-3 text-left">Student Name</th>
                                                <th className="p-3 text-left">Marks (Out of 100)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classStudents.map(student => (
                                                <tr key={student.id} className="border-t hover:bg-gray-50">
                                                    <td className="p-3 font-medium">{student.rollNo}</td>
                                                    <td className="p-3">{student.name}</td>
                                                    <td className="p-3">
                                                        <Input
                                                            type="number"
                                                            className="w-24"
                                                            min="0"
                                                            max="100"
                                                            value={marks[student.id] || ""}
                                                            onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                                            placeholder="0"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {classStudents.length === 0 && (
                                        <div className="p-4 text-center text-gray-500">No students found in Class {selectedExam.class}</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {/* Stage 2: Processing Loader */}
            {stage === 'processing' && (
                <div className="h-[60vh] flex flex-col items-center justify-center space-y-6">
                    <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                    <div className="w-full max-w-md space-y-2">
                        <div className="flex justify-between text-sm font-medium text-gray-700">
                            <span>Processing Results...</span>
                            <span>{processingProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${processingProgress}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">Calculating grades, generating PDFs, and preparing notifications.</p>
                    </div>
                </div>
            )}

            {/* Stage 3: Preview */}
            {stage === 'preview' && (
                <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        <strong>Success!</strong> Results generated for {classStudents.length} students.
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preview Report Cards</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {classStudents.slice(0, 3).map(student => (
                                    <div key={student.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-red-100 p-2 rounded">
                                                <FileText className="h-5 w-5 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{student.name}</p>
                                                <p className="text-xs text-gray-500">Roll: {student.rollNo} | {marks[student.id] || "0"}/100</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">View PDF</Button>
                                    </div>
                                ))}
                                {classStudents.length > 3 && (
                                    <p className="text-center text-xs text-gray-500">+ {classStudents.length - 3} more</p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Action Center</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                                    <h4 className="font-medium text-gray-800">Ready to Publish?</h4>
                                    <p className="text-sm text-gray-600">This will send push notifications and emails to all parents of Class {selectedExam?.class}.</p>
                                </div>
                                <Button onClick={handlePublish} className="w-full gap-2 bg-green-600 hover:bg-green-700 h-12 text-lg">
                                    <Send className="h-5 w-5" /> Publish & Notify Parents
                                </Button>
                                <Button onClick={() => setStage('input')} variant="outline" className="w-full">
                                    Back to Edit
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* Stage 4: Published */}
            {stage === 'published' && (
                <div className="h-[60vh] flex flex-col items-center justify-center space-y-6 text-center">
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Published Successfully!</h2>
                        <p className="text-gray-600 mt-2">Notifications sent to {classStudents.length} parents.</p>
                    </div>
                    <Button onClick={handleReset} variant="outline">
                        Upload Another Result
                    </Button>
                </div>
            )}
        </div>
    );
}
