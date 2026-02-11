"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle } from "lucide-react";

export default function StudentHomeworkPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Homework</h1>

            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <Card key={i}>
                        <CardContent className="flex items-center justify-between p-6">
                            <div>
                                <h3 className="font-semibold text-lg">Mathematics Worksheet #{i}</h3>
                                <p className="text-sm text-gray-500">Posted by Mr. Sharma • Due tomorrow</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" /> Download
                                </Button>
                                <Button size="sm">
                                    Upload Answer
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <Card className="opacity-70">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <h3 className="font-semibold text-lg line-through text-gray-500">Science Project</h3>
                            <p className="text-sm text-gray-500">Submitted on time</p>
                        </div>
                        <Button variant="secondary" size="sm" disabled className="text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" /> Turned In
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
