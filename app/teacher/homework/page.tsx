"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText } from "lucide-react";

export default function HomeworkPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Homework Upload</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Upload New Homework</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Class</Label>
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                    <option>Class 10-A</option>
                                    <option>Class 9-B</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Subject</Label>
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                    <option>Mathematics</option>
                                    <option>Physics</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input placeholder="e.g. Algebra Worksheet 1" />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Instructions for the students..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Attachment</Label>
                            <Input type="file" />
                        </div>
                        <Button className="w-full">
                            <Upload className="mr-2 h-4 w-4" /> Upload Homework
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Mock Uploaded Homeworks */}
                {[1, 2].map((i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Algebra Worksheet {i}</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Class 10-A</div>
                            <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
