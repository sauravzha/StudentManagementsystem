"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Plus, Calendar, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { type Exam } from "@/lib/types";

export default function ExamsPage() {
    const { exams, addExam } = useStore();
    const [isAddOpen, setIsAddOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Exam Setup</h1>
                <Button onClick={() => setIsAddOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Exam
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {exams.map((exam) => (
                    <Card key={exam.id} className="border-l-4 border-l-purple-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-purple-500" />
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

            <AddExamModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onAdd={addExam}
            />
        </div>
    );
}

function AddExamModal({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (e: Exam) => void }) {
    const { register, handleSubmit, reset } = useForm<Exam>();

    const onSubmit = (data: Exam) => {
        onAdd({
            ...data,
            id: Math.random().toString(),
        });
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Exam">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label>Exam Name</Label>
                    <Input required placeholder="e.g. Mid Term Maths" {...register("name")} />
                </div>
                <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input required {...register("subject")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Class</Label>
                        <Input required {...register("class")} />
                    </div>
                    <div className="space-y-2">
                        <Label>Date</Label>
                        <Input type="date" required {...register("date")} />
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Schedule Exam</Button>
                </div>
            </form>
        </Modal>
    );
}
