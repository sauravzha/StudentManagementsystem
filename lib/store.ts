import { create } from 'zustand';
import { User, Student, Teacher, Exam, Holiday, Notification } from './types';

interface StoreState {
    currentUser: User | null;
    students: Student[];
    teachers: Teacher[];
    exams: Exam[];
    holidays: Holiday[];
    notifications: Notification[];

    // Actions
    login: (user: User) => void;
    logout: () => void;
    addStudent: (student: Student) => void;
    addTeacher: (teacher: Teacher) => void;
    addExam: (exam: Exam) => void;
    addHoliday: (holiday: Holiday) => void;
    addNotification: (notification: Notification) => void;
    markNotificationRead: (id: string) => void;

    // Class Assignment Actions
    assignClass: (teacherId: string, className: string) => void;
    removeClass: (teacherId: string, className: string) => void;
    markAttendance: (studentId: string, date: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => void;
}

const mockStudents: Student[] = [
    {
        id: '1', name: 'John Doe', rollNo: '101', class: '10', section: 'A', email: 'john@student.com', phone: '1234567890', feesPaid: true, attendance: 85, gpa: 3.8,
        attendanceRecords: [
            { date: '2024-03-01', status: 'PRESENT' },
            { date: '2024-03-04', status: 'PRESENT' },
            { date: '2024-03-05', status: 'PRESENT' },
            { date: '2024-03-06', status: 'ABSENT' },
            { date: '2024-03-07', status: 'PRESENT' },
            { date: '2024-03-08', status: 'PRESENT' },
            { date: '2024-03-11', status: 'PRESENT' },
            { date: '2024-03-12', status: 'LATE' },
            { date: '2024-03-13', status: 'PRESENT' },
            { date: '2024-03-14', status: 'PRESENT' },
            { date: '2024-03-15', status: 'PRESENT' },
        ]
    },
    { id: '2', name: 'Jane Smith', rollNo: '102', class: '10', section: 'A', email: 'jane@student.com', phone: '0987654321', feesPaid: false, attendance: 92, gpa: 3.9 },
    { id: '3', name: 'Rahul Kumar', rollNo: '103', class: '10', section: 'B', email: 'rahul@student.com', phone: '1122334455', feesPaid: true, attendance: 78, gpa: 3.5 },
];

const mockTeachers: Teacher[] = [
    { id: '1', name: 'Mr. Sharma', subject: 'Mathematics', email: 'sharma@teacher.com', phone: '9988776655', assignedClasses: ['10-A', '9-B'] },
    { id: '2', name: 'Ms. Verma', subject: 'Science', email: 'verma@teacher.com', phone: '8877665544', assignedClasses: ['10-B'] },
];

// Generate Classes 1-12 with Sections A, B
export const CLASSES = Array.from({ length: 12 }, (_, i) => i + 1).flatMap(std =>
    ['A', 'B'].map(sec => `${std}-${sec}`)
);

const mockExams: Exam[] = [
    { id: '1', name: 'Mid-Term Maths', date: '2024-03-15', subject: 'Mathematics', class: '10' },
    { id: '2', name: 'Final Science', date: '2024-04-10', subject: 'Science', class: '10' },
];

const mockHolidays: Holiday[] = [
    { id: '1', name: 'Holi', date: '2024-03-25', type: 'HOLIDAY' },
    { id: '2', name: 'Good Friday', date: '2024-03-29', type: 'HOLIDAY' },
];

export const useStore = create<StoreState>((set) => ({
    currentUser: null,
    students: mockStudents,
    teachers: mockTeachers,
    exams: mockExams,
    holidays: mockHolidays,
    notifications: [],

    login: (user) => set({ currentUser: user }),
    logout: () => set({ currentUser: null }),
    addStudent: (student) => set((state) => ({ students: [...state.students, student] })),
    addTeacher: (teacher) => set((state) => ({ teachers: [...state.teachers, teacher] })),

    // Class Assignment Logic
    assignClass: (teacherId, className) => set((state) => ({
        teachers: state.teachers.map(t =>
            t.id === teacherId
                ? { ...t, assignedClasses: [...(t.assignedClasses || []), className] }
                : t
        )
    })),

    removeClass: (teacherId, className) => set((state) => ({
        teachers: state.teachers.map(t =>
            t.id === teacherId
                ? { ...t, assignedClasses: (t.assignedClasses || []).filter(c => c !== className) }
                : t
        )
    })),

    addExam: (exam) => set((state) => {
        const newNotification: Notification = {
            id: Math.random().toString(36).substr(2, 9),
            title: "New Exam Scheduled",
            message: `${exam.subject} (${exam.name}) for Class ${exam.class} on ${exam.date}`,
            type: "warning",
            timestamp: new Date().toISOString(),
            read: false
        };
        return {
            exams: [...state.exams, exam],
            notifications: [newNotification, ...state.notifications]
        };
    }),
    addHoliday: (holiday) => set((state) => {
        const newNotification: Notification = {
            id: Math.random().toString(36).substr(2, 9),
            title: "Holiday Announced",
            message: `${holiday.name} on ${holiday.date}`,
            type: "info",
            timestamp: new Date().toISOString(),
            read: false
        };
        return {
            holidays: [...state.holidays, holiday],
            notifications: [newNotification, ...state.notifications]
        };
    }),
    addNotification: (notification) => set((state) => ({ notifications: [notification, ...state.notifications] })),
    markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
    })),

    // Attendance Action
    markAttendance: (studentId, date, status) => set((state) => ({
        students: state.students.map(s => {
            if (s.id !== studentId) return s;

            // Remove existing record for this date if exists
            const existingRecords = s.attendanceRecords?.filter(r => r.date !== date) || [];

            // Add new record
            return {
                ...s,
                attendanceRecords: [...existingRecords, { date, status }]
            };
        })
    })),
}));
