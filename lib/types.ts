export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
}

export interface Student {
    id: string;
    name: string;
    rollNo: string;
    class: string;
    section: string;
    email: string;
    phone: string;
    feesPaid: boolean;
    attendance: number; // percentage
    attendanceRecords?: { date: string; status: 'PRESENT' | 'ABSENT' | 'LATE' }[];
    gpa: number;
}

export interface Teacher {
    id: string;
    name: string;
    subject: string;
    email: string;
    phone: string;
    assignedClasses?: string[]; // e.g., ["10-A", "9-B"]
}

export interface Class {
    id: string;
    name: string; // "10"
    section: string; // "A"
    students: number; // count
}

export interface Exam {
    id: string;
    name: string;
    date: string; // ISO date
    subject: string;
    class: string;
}

export interface Holiday {
    id: string;
    name: string;
    date: string; // YYYY-MM-DD
    type: 'HOLIDAY' | 'EVENT';
}

export interface Event {
    id: string;
    title: string;
    start: string;
    end?: string;
    type: 'exam' | 'holiday' | 'event';
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success';
    timestamp: string;
    read: boolean;
}
