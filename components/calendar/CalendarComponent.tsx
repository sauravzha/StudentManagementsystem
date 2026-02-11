"use client";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useStore } from '@/lib/store';
import { useState } from 'react';
import { Modal } from '@/components/ui/modal';

export default function CalendarComponent({ role }: { role: 'ADMIN' | 'TEACHER' | 'STUDENT' }) {
    const { exams, holidays, addExam, addHoliday } = useStore();
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

    // Form State
    const [eventType, setEventType] = useState<'exam' | 'holiday'>('holiday');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [subject, setSubject] = useState('');
    const [examClass, setExamClass] = useState('10');

    const canAdd = role === 'ADMIN';

    const events = [
        ...exams.map(e => ({
            title: `Exam: ${e.name}`,
            date: e.date,
            color: '#ef4444',
            extendedProps: { type: 'exam', description: `Subject: ${e.subject}` }
        })),
        ...holidays.map(h => ({
            title: h.name,
            date: h.date,
            color: '#22c55e',
            extendedProps: { type: 'holiday', description: 'Holiday' }
        }))
    ];

    const handleEventClick = (info: any) => {
        setSelectedEvent({
            title: info.event.title,
            date: info.event.startStr,
            ...info.event.extendedProps
        });
    };

    const handleAddSubmit = () => {
        if (eventType === 'holiday') {
            addHoliday({
                id: Math.random().toString(36).substr(2, 9),
                name: title,
                date: date,
                type: 'HOLIDAY'
            });
        } else {
            addExam({
                id: Math.random().toString(36).substr(2, 9),
                name: title, // Using title as exam name
                subject: subject,
                date: date,
                class: examClass
            });
        }
        setIsAddModalOpen(false);
        // Reset form
        setTitle('');
        setDate('');
        setSubject('');
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
            {/* Toolbar */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">School Calendar</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsSyncModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" /></svg>
                        Sync Google Calendar
                    </button>

                    {canAdd && (
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md transition-colors"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                            Add Event
                        </button>
                    )}
                </div>
            </div>

            {/* FullCalendar Style Overrides */}
            <style jsx global>{`
                .fc-toolbar-title { font-size: 1.25rem !important; }
                .fc-button-primary { background-color: #3b82f6 !important; border-color: #3b82f6 !important; }
            `}</style>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,listWeek'
                }}
                events={events}
                eventClick={handleEventClick}
                height="auto"
            />

            {/* Event Details Modal */}
            {selectedEvent && (
                <Modal
                    isOpen={!!selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    title={selectedEvent.title}
                >
                    <div className="space-y-4">
                        <p><strong>Date:</strong> {new Date(selectedEvent.date).toDateString()}</p>
                        <p><strong>Type:</strong> <span className={`px-2 py-1 rounded text-xs font-bold ${selectedEvent.type === 'holiday' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{selectedEvent.type.toUpperCase()}</span></p>
                        <p>{selectedEvent.description}</p>
                    </div>
                </Modal>
            )}

            {/* Add Event Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Event"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Event Type</label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value as 'holiday' | 'exam')}
                        >
                            <option value="holiday">Holiday</option>
                            <option value="exam">Exam</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title / Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={eventType === 'holiday' ? "e.g., Diwali Break" : "e.g., Mid-Term Maths"}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    {eventType === 'exam' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="e.g., Mathematics"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Class</label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                    value={examClass}
                                    onChange={(e) => setExamClass(e.target.value)}
                                >
                                    <option value="10">Class 10</option>
                                    <option value="9">Class 9</option>
                                    <option value="8">Class 8</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleAddSubmit}
                            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
                        >
                            Save {eventType === 'holiday' ? 'Holiday' : 'Exam'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Sync Google Calendar Modal */}
            <Modal
                isOpen={isSyncModalOpen}
                onClose={() => setIsSyncModalOpen(false)}
                title="Sync with Google Calendar"
            >
                <div className="space-y-4 text-center py-4">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" /></svg>
                    </div>
                    <p className="text-gray-600">
                        Allow <strong>School ERP</strong> to access your Google Calendar?
                        <br />
                        <span className="text-sm text-gray-500">This will sync all school events and holidays to your personal calendar.</span>
                    </p>
                    <div className="flex justify-center gap-3 pt-4">
                        <button
                            onClick={() => setIsSyncModalOpen(false)}
                            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                alert("Syncing with Google Calendar... (Mock)");
                                setIsSyncModalOpen(false);
                            }}
                            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                        >
                            Allow Access
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
