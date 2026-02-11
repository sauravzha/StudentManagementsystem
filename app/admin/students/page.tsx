"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Plus, Search, Trash2, Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { type Student } from "@/lib/types";

export default function StudentsPage() {
    const { students, addStudent } = useStore();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNo.includes(search)
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
                <Button onClick={() => setIsAddOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search by name or roll no..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Students ({students.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700 uppercase">
                                <tr>
                                    <th className="px-4 py-3">Roll No</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Class</th>
                                    <th className="px-4 py-3">Fees</th>
                                    <th className="px-4 py-3">Atten. %</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{student.rollNo}</td>
                                        <td className="px-4 py-3">{student.name}</td>
                                        <td className="px-4 py-3">{student.class}-{student.section}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.feesPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {student.feesPaid ? 'Paid' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{student.attendance}%</td>
                                        <td className="px-4 py-3 text-right space-x-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Edit className="h-4 w-4 text-blue-500" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredStudents.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                            No students found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <AddStudentModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onAdd={addStudent}
            />
        </div>
    );
}


import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const studentSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    rollNo: z.string().min(1, "Roll Number is required"),
    class: z.string().min(1, "Class is required"),
    section: z.string().min(1, "Section is required"),
    email: z.string().email("Invalid email address"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

function AddStudentModal({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (s: Student) => void }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<StudentFormValues>({
        resolver: zodResolver(studentSchema)
    });

    const onSubmit = (data: StudentFormValues) => {
        onAdd({
            ...data,
            id: Math.random().toString(),
            feesPaid: false, // Default
            attendance: 0,
            gpa: 0,
            phone: "" // Default empty
        } as Student);
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Student">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input {...register("name")} className={errors.name ? "border-red-500" : ""} />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Roll Number</Label>
                        <Input {...register("rollNo")} className={errors.rollNo ? "border-red-500" : ""} />
                        {errors.rollNo && <p className="text-xs text-red-500">{errors.rollNo.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Class</Label>
                        <Input {...register("class")} className={errors.class ? "border-red-500" : ""} />
                        {errors.class && <p className="text-xs text-red-500">{errors.class.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Section</Label>
                        <Input {...register("section")} className={errors.section ? "border-red-500" : ""} />
                        {errors.section && <p className="text-xs text-red-500">{errors.section.message}</p>}
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label>Email</Label>
                        <Input {...register("email")} className={errors.email ? "border-red-500" : ""} />
                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Save Student</Button>
                </div>
            </form>
        </Modal>
    );
}
