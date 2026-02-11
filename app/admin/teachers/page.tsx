"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CLASSES } from "@/lib/store";
import { User, BookOpen, Plus, X, GraduationCap } from "lucide-react";

export default function AdminTeachersPage() {
    const { teachers, assignClass, removeClass } = useStore();
    const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
                <p className="text-gray-500 mt-1">Manage teachers and their class assignments</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teachers.map((teacher) => (
                    <Card key={teacher.id} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                {teacher.name[0]}
                            </div>
                            <div>
                                <CardTitle className="text-lg">{teacher.name}</CardTitle>
                                <p className="text-sm text-gray-500">{teacher.subject}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Assigned Classes</p>
                                    <div className="flex flex-wrap gap-2">
                                        {teacher.assignedClasses?.length ? (
                                            teacher.assignedClasses.map((cls) => (
                                                <Badge key={cls} variant="secondary" className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200">
                                                    {cls}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-sm text-gray-400 italic">No classes assigned</span>
                                        )}
                                    </div>
                                </div>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full gap-2 border-dashed"
                                            onClick={() => setSelectedTeacher(teacher.id)}
                                        >
                                            <GraduationCap className="h-4 w-4" /> Manage Assignments
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                        <DialogHeader>
                                            <DialogTitle>Assign Classes to {teacher.name}</DialogTitle>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <div className="mb-6">
                                                <h4 className="text-sm font-medium mb-3">Currently Assigned</h4>
                                                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg min-h-[60px]">
                                                    {teacher.assignedClasses?.length ? (
                                                        teacher.assignedClasses.map((cls) => (
                                                            <Badge key={cls} className="pl-2 pr-1 py-1 gap-1 bg-white border border-gray-200 text-gray-800 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors cursor-pointer group"
                                                                onClick={() => removeClass(teacher.id, cls)}
                                                            >
                                                                {cls} <X className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-gray-400 self-center">No classes assigned</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium mb-3">Available Classes</h4>
                                                <ScrollArea className="h-[200px] rounded-md border p-4">
                                                    <div className="grid grid-cols-4 gap-2">
                                                        {CLASSES.filter(c => !teacher.assignedClasses?.includes(c)).map((cls) => (
                                                            <Button
                                                                key={cls}
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 text-xs font-medium border border-gray-100 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                                                onClick={() => assignClass(teacher.id, cls)}
                                                            >
                                                                <Plus className="h-3 w-3 mr-1" /> {cls}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </ScrollArea>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
