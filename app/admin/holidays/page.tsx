"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Plus, Trash2, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { type Holiday } from "@/lib/types";

export default function HolidaysPage() {
    const { holidays, addHoliday } = useStore();
    const [isAddOpen, setIsAddOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Holiday Management</h1>
                <Button onClick={() => setIsAddOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Holiday
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {holidays.map((holiday) => (
                    <Card key={holiday.id} className="border-l-4 border-l-green-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-lg font-bold">{holiday.name}</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="h-4 w-4" />
                                {new Date(holiday.date).toDateString()}
                            </div>
                            <div className="mt-2 text-sm text-green-600 font-medium">Full Day Off</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <AddHolidayModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onAdd={addHoliday}
            />
        </div>
    );
}

function AddHolidayModal({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (h: Holiday) => void }) {
    const { register, handleSubmit, reset } = useForm<Holiday>();

    const onSubmit = (data: Holiday) => {
        onAdd({
            ...data,
            id: Math.random().toString(),
            type: 'HOLIDAY'
        });
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Holiday">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label>Holiday Name</Label>
                    <Input required placeholder="e.g. Diwali Break" {...register("name")} />
                </div>
                <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" required {...register("date")} />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Add Holiday</Button>
                </div>
            </form>
        </Modal>
    );
}
