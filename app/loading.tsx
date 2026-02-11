"use client";

import { School } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl text-white animate-pulse">
                    <School className="h-8 w-8" />
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold text-gray-900 tracking-tight">School Management</h2>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest animate-pulse">Loading...</p>
                </div>
            </div>
        </div>
    );
}
