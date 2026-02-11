"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Info, CheckCircle, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function NotificationsPage() {
    const { notifications, addNotification } = useStore();

    useEffect(() => {
        // Simulate incoming notifications if empty
        if (notifications.length === 0) {
            addNotification({
                id: '1',
                title: 'Exam Schedule Released',
                message: 'Mid-term exams start next week.',
                type: 'info',
                read: false,
                timestamp: new Date().toISOString()
            });
            addNotification({
                id: '2',
                title: 'Holiday Announced',
                message: 'School will be closed tomorrow for Local Holiday.',
                type: 'warning',
                read: false,
                timestamp: new Date().toISOString()
            });
        }
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <Card key={notification.id} className={`border-l-4 ${notification.type === 'info' ? 'border-l-blue-500' :
                            notification.type === 'warning' ? 'border-l-yellow-500' :
                                'border-l-green-500'
                        }`}>
                        <CardContent className="flex items-start gap-4 p-4">
                            <div className={`p-2 rounded-full ${notification.type === 'info' ? 'bg-blue-100 text-blue-600' :
                                    notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                        'bg-green-100 text-green-600'
                                }`}>
                                {notification.type === 'info' && <Info className="h-5 w-5" />}
                                {notification.type === 'warning' && <AlertTriangle className="h-5 w-5" />}
                                {notification.type === 'success' && <CheckCircle className="h-5 w-5" />}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{notification.title}</h3>
                                <p className="text-gray-600">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-2">{new Date(notification.timestamp).toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {notifications.length === 0 && <p className="text-center text-gray-500">No new notifications.</p>}
            </div>
        </div>
    );
}
