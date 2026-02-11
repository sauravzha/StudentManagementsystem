"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Save, CheckCircle, XCircle } from "lucide-react";

export default function AttendancePage() {
    const { students, holidays, markAttendance } = useStore();
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [attendanceMap, setAttendanceMap] = useState<Record<string, 'PRESENT' | 'ABSENT'>>({});

    const isHoliday = holidays.some(h => h.date === date);
    const holidayName = holidays.find(h => h.date === date)?.name;

    const currentClass = "10";
    const currentSection = "A";
    const classStudents = students.filter(s => s.class === currentClass && s.section === currentSection);

    // Initialize/Sync state with store when date changes
    useEffect(() => {
        const newMap: Record<string, 'PRESENT' | 'ABSENT'> = {};
        classStudents.forEach(s => {
            const record = s.attendanceRecords?.find(r => r.date === date);
            newMap[s.id] = record?.status === 'ABSENT' ? 'ABSENT' : 'PRESENT'; // Default to Present if not marked
        });
        setAttendanceMap(newMap);
    }, [date, students]); // Re-run when date or students store changes

    const handleToggle = (studentId: string) => {
        if (isHoliday) return;
        setAttendanceMap(prev => ({
            ...prev,
            [studentId]: prev[studentId] === 'PRESENT' ? 'ABSENT' : 'PRESENT'
        }));
    };

    const handleSave = () => {
        classStudents.forEach(student => {
            const status = attendanceMap[student.id];
            markAttendance(student.id, date, status);
        });
        alert(`Attendance saved for ${date}!`);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Class Attendance</h1>
                    <p className="text-gray-500">Mark daily attendance for Class {currentClass}-{currentSection}</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
                    <Label htmlFor="date" className="font-medium text-gray-700">Date:</Label>
                    <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-40 border-none shadow-none focus-visible:ring-0"
                    />
                </div>
            </div>

            {isHoliday && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-center gap-3" role="alert">
                    <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <CalendarIcon className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                        <strong className="font-bold">Holiday: {holidayName}</strong>
                        <span className="block text-sm opacity-90">Attendance is locked for today.</span>
                    </div>
                </div>
            )}

            <Card className="border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4 bg-gray-50/50">
                    <div>
                        <CardTitle className="text-lg">Student List</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{classStudents.length} Students Total</p>
                    </div>
                    <Button onClick={handleSave} disabled={isHoliday} className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Save className="h-4 w-4" /> Save Attendance
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                                <tr>
                                    <th className="px-6 py-4">Student Name</th>
                                    <th className="px-6 py-4">Roll No</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {classStudents.map(student => {
                                    const status = isHoliday ? 'HOLIDAY' : attendanceMap[student.id];
                                    const isPresent = status === 'PRESENT';

                                    return (
                                        <tr key={student.id} className="hover:bg-gray-50/80 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                    {student.name[0]}
                                                </div>
                                                {student.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{student.rollNo}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold capitalize border ${isHoliday ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                    isPresent ? 'bg-green-50 text-green-700 border-green-200' :
                                                        'bg-red-50 text-red-700 border-red-200'
                                                    }`}>
                                                    {isHoliday ? <CalendarIcon className="h-3 w-3" /> :
                                                        isPresent ? <CheckCircle className="h-3 w-3" /> :
                                                            <XCircle className="h-3 w-3" />}
                                                    {isHoliday ? 'Holiday' : isPresent ? 'Present' : 'Absent'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button
                                                    size="sm"
                                                    variant={isPresent ? "outline" : "destructive"}
                                                    onClick={() => handleToggle(student.id)}
                                                    disabled={isHoliday}
                                                    className={`w-32 transition-all ${isPresent
                                                        ? "hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                                        : "bg-red-600 hover:bg-red-700 ring-2 ring-red-100"
                                                        }`}
                                                >
                                                    {isPresent ? "Mark Absent" : "Mark Present"}
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
