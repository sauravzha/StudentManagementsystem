"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { Users, GraduationCap, DollarSign, Plus, Download, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
    const { students, teachers } = useStore();

    const stats = [
        {
            title: "Total Students",
            value: students.length,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: "Total Teachers",
            value: teachers.length,
            icon: GraduationCap,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            title: "Total Revenue",
            value: "₹45,000", // Mock
            icon: DollarSign,
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-500 mt-1">Overview of school performance and updates</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                        <div className={`h-1 w-full ${stat.bgColor.replace("bg-", "bg-gradient-to-r from-").replace("100", "500").replace(" to-", "to-") + "-400"}`} />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                                {stat.title}
                            </CardTitle>
                            <div className={`${stat.bgColor} p-2 rounded-lg`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="text-green-500 text-xs font-bold flex items-center bg-green-50 px-1 rounded">
                                    ↑ 20.1%
                                </span>
                                <span className="text-xs text-muted-foreground">vs last month</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button className="h-auto py-6 flex-col gap-1 bg-white hover:bg-blue-50 border border-gray-200 text-gray-800 hover:text-blue-700 shadow-sm hover:shadow-md transition-all group" variant="ghost">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <Plus className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-bold text-base">Add Student</span>
                        <span className="text-xs text-gray-400 font-normal">Register new admission</span>
                    </Button>
                    <Button className="h-auto py-6 flex-col gap-1 bg-white hover:bg-green-50 border border-gray-200 text-gray-800 hover:text-green-700 shadow-sm hover:shadow-md transition-all group" variant="ghost">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="font-bold text-base">Collect Fees</span>
                        <span className="text-xs text-gray-400 font-normal">Record payment</span>
                    </Button>
                    <Button className="h-auto py-6 flex-col gap-1 bg-white hover:bg-purple-50 border border-gray-200 text-gray-800 hover:text-purple-700 shadow-sm hover:shadow-md transition-all group" variant="ghost">
                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <FilePlus className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className="font-bold text-base">Exam Result</span>
                        <span className="text-xs text-gray-400 font-normal">Upload marks</span>
                    </Button>
                    <Button className="h-auto py-6 flex-col gap-1 bg-white hover:bg-orange-50 border border-gray-200 text-gray-800 hover:text-orange-700 shadow-sm hover:shadow-md transition-all group" variant="ghost">
                        <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <Download className="h-5 w-5 text-orange-600" />
                        </div>
                        <span className="font-bold text-base">Notice Board</span>
                        <span className="text-xs text-gray-400 font-normal">Post announcement</span>
                    </Button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Admissions */}
                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Recent Admissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                <Users className="h-6 w-6 text-gray-400" />
                            </div>
                            <p className="text-gray-900 font-semibold">No recent admissions</p>
                            <p className="text-sm text-gray-500 mb-4 max-w-[200px]">Get started by adding new students to the system</p>
                            <Button size="sm" className="gap-2">
                                <Plus className="h-4 w-4" /> Add New Student
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Overview */}
                <Card className="border-none shadow-md flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle>Financial Overview</CardTitle>
                        <select className="text-xs border rounded-md p-1 bg-gray-50 text-gray-600 outline-none focus:ring-1 focus:ring-blue-500">
                            <option>This Month</option>
                            <option>Last Month</option>
                        </select>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="flex items-center gap-6 mb-6">
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase">Total Collected</p>
                                <p className="text-xl font-bold text-green-600">₹45,000</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase">Pending Dues</p>
                                <p className="text-xl font-bold text-red-500">₹12,000</p>
                            </div>
                        </div>

                        <div className="h-[150px] w-full bg-gradient-to-b from-blue-50 to-white rounded-lg border border-blue-100 flex items-end justify-center pb-4 relative overflow-hidden">
                            {/* Mock Chart Area */}
                            <div className="absolute inset-x-0 bottom-0 h-[100px] flex items-end justify-around px-4 opacity-50">
                                <div className="w-8 bg-blue-300 h-[40%] rounded-t-sm" />
                                <div className="w-8 bg-blue-400 h-[70%] rounded-t-sm" />
                                <div className="w-8 bg-blue-600 h-[50%] rounded-t-sm" />
                                <div className="w-8 bg-blue-500 h-[90%] rounded-t-sm" />
                                <div className="w-8 bg-blue-300 h-[60%] rounded-t-sm" />
                            </div>
                            <p className="text-xs text-blue-400 font-medium relative z-10 bg-white/50 px-2 py-1 rounded backdrop-blur-sm"> Revenue Trend (Mock) </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
