"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
    { name: 'Jul', income: 3490, expense: 4300 },
];

const studentData = [
    { name: 'Class 9', students: 120 },
    { name: 'Class 10', students: 98 },
    { name: 'Class 11', students: 86 },
    { name: 'Class 12', students: 95 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Income vs Expense (Yearly)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="income" fill="#8884d8" />
                                    <Bar dataKey="expense" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Student Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={studentData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="students"
                                        label
                                    >
                                        {studentData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
