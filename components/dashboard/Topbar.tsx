"use client";

import { useStore } from "@/lib/store";
import { Bell, User } from "lucide-react";
import { useState } from "react";

export function Topbar() {
    const user = useStore((state) => state.currentUser);
    const { notifications, markNotificationRead } = useStore();
    const [showNotifications, setShowNotifications] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm relative z-20">
            <div className="flex items-center gap-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Welcome, {user?.name || "User"}</h2>
                    <p className="text-xs text-blue-600 font-semibold bg-blue-50 inline-block px-2 py-0.5 rounded-md border border-blue-100 mt-1">
                        Academic Year: 2025-26
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                            <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-700">Notifications</h3>
                                <span className="text-xs text-gray-500">{unreadCount} unread</span>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
                                ) : (
                                    notifications.map((n) => (
                                        <div
                                            key={n.id}
                                            className={`p-3 border-b hover:bg-gray-50 cursor-pointer transition-colors ${!n.read ? 'bg-blue-50' : ''}`}
                                            onClick={() => markNotificationRead(n.id)}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className={`text-sm font-medium ${n.type === 'warning' ? 'text-red-600' : 'text-gray-900'}`}>{n.title}</h4>
                                                <span className="text-[10px] text-gray-400">
                                                    {n.timestamp ? new Date(n.timestamp).toLocaleDateString() : ""}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-600 line-clamp-2">{n.message}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {user?.name?.[0] || <User className="h-5 w-5" />}
                    </div>
                    <div className="hidden md:block text-sm">
                        <p className="font-medium text-gray-700">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.role}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
