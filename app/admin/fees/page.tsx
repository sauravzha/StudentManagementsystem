"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, DollarSign, Filter } from "lucide-react";
import { useState } from "react";

export default function FeesPage() {
    const { students } = useStore();
    const [filter, setFilter] = useState<'ALL' | 'PAID' | 'PENDING'>('ALL');
    const [search, setSearch] = useState("");

    const filteredStudents = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.includes(search);
        const matchesFilter = filter === 'ALL'
            ? true
            : filter === 'PAID' ? s.feesPaid : !s.feesPaid;
        return matchesSearch && matchesFilter;
    });

    const totalCollected = students.filter(s => s.feesPaid).length * 5000;
    const totalPending = students.filter(s => !s.feesPaid).length * 5000;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-green-700 text-lg">Total Collected</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-800">${totalCollected.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-red-700 text-lg">Pending Dues</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-800">${totalPending.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search student..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={filter === 'ALL' ? 'default' : 'outline'}
                        onClick={() => setFilter('ALL')}
                    >All</Button>
                    <Button
                        variant={filter === 'PENDING' ? 'destructive' : 'outline'}
                        onClick={() => setFilter('PENDING')}
                    >
                        Pending
                    </Button>
                    <Button
                        variant={filter === 'PAID' ? 'secondary' : 'outline'}
                        onClick={() => setFilter('PAID')}
                        className={filter === 'PAID' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                    >
                        Paid
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Fee Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700 uppercase">
                                <tr>
                                    <th className="px-4 py-3">Roll No</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Class</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(student => (
                                    <tr key={student.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">{student.rollNo}</td>
                                        <td className="px-4 py-3 font-medium">{student.name}</td>
                                        <td className="px-4 py-3">{student.class}-{student.section}</td>
                                        <td className="px-4 py-3">$5,000</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.feesPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {student.feesPaid ? 'Paid' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {!student.feesPaid && (
                                                <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700">
                                                    <DollarSign className="h-4 w-4" /> Collect
                                                </Button>
                                            )}
                                            {student.feesPaid && (
                                                <Button size="sm" variant="outline" disabled>Collected</Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
