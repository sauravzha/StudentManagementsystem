"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, File } from "lucide-react";

export default function StudentReportsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Report Cards</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="items-center">
                        <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <File className="h-8 w-8 text-red-600" />
                        </div>
                        <CardTitle className="text-center">Term 1 Report</CardTitle>
                        <p className="text-sm text-gray-500">Oct 2023</p>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="mb-4">
                            <span className="text-2xl font-bold text-green-600">A Grade</span>
                            <p className="text-xs text-gray-400">88% Overall</p>
                        </div>
                        <Button variant="outline" className="w-full gap-2">
                            <Download className="h-4 w-4" /> Download PDF
                        </Button>
                    </CardContent>
                </Card>

                {/* Placeholder for future Reports */}
                <Card className="opacity-50 border-dashed border-2">
                    <CardHeader className="items-center">
                        <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <File className="h-8 w-8 text-gray-400" />
                        </div>
                        <CardTitle className="text-center text-gray-400">Term 2 Report</CardTitle>
                        <p className="text-sm text-gray-400">Coming Soon</p>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Button disabled variant="ghost" className="w-full gap-2">
                            Locked
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
