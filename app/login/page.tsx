"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, User, GraduationCap, School, ArrowLeft, Loader2, Shield, CheckCircle2 } from "lucide-react";
import { type Role } from "@/lib/types";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const login = useStore((state) => state.login);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const handleLogin = async (values: LoginFormValues) => {
        if (!selectedRole) return;
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simple credential check (mock)
        let valid = false;
        let name = "";
        const role = selectedRole;

        if (role === 'ADMIN' && values.email === 'admin@schooldemo.com' && values.password === 'Admin@123') {
            valid = true;
            name = "Admin User";
        } else if (role === 'TEACHER' && values.email === 'teacher@schooldemo.com' && values.password === 'Teacher@123') {
            valid = true;
            name = "Teacher User";
        } else if (role === 'STUDENT' && values.email === 'student@schooldemo.com' && values.password === 'Student@123') {
            valid = true;
            name = "Student User";
        }

        if (valid) {
            login({
                id: Math.random().toString(),
                name,
                email: values.email,
                role,
            });

            if (role === 'ADMIN') router.push('/admin/dashboard');
            else if (role === 'TEACHER') router.push('/teacher/dashboard');
            else if (role === 'STUDENT') router.push('/student/dashboard');
        } else {
            alert("Invalid credentials. Please check the demo credentials.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-mesh-gradient flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Decor - Animated */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-200/30 blur-[100px] animate-pulse-slow" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px] animate-pulse-slow py-20" />
            </div>

            {/* Header Area */}
            <div className="text-center mb-10 z-10 flex flex-col items-center">
                <div className="h-16 w-16 bg-white/50 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg mb-6 border border-white/40">
                    <School className="h-10 w-10 text-indigo-600" />
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-2 drop-shadow-sm">
                    School Management System
                </h1>
                <p className="text-xl font-medium text-gray-600 max-w-2xl mx-auto">
                    {selectedRole ? `Login as ${selectedRole.charAt(0) + selectedRole.slice(1).toLowerCase()}` : "Select your role to continue"}
                </p>
                {/* Soft Gradient Divider */}
                <div className="h-1 w-32 bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-500 rounded-full mt-6 opacity-80" />
            </div>

            <div className="w-full max-w-5xl z-10 transition-all duration-500 ease-in-out px-4">
                {!selectedRole ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <RoleCard
                            title="Admin"
                            icon={<School className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform duration-300" />}
                            description="Manage school operations"
                            onClick={() => setSelectedRole('ADMIN')}
                            color="border-blue-200/50 hover:border-blue-500/50 bg-blue-50/5"
                            glow="group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]"
                        />
                        <RoleCard
                            title="Teacher"
                            icon={<User className="h-12 w-12 text-green-600 group-hover:scale-110 transition-transform duration-300" />}
                            description="Attendance, exams & homework"
                            onClick={() => setSelectedRole('TEACHER')}
                            color="border-green-200/50 hover:border-green-500/50 bg-green-50/5"
                            glow="group-hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]"
                        />
                        <RoleCard
                            title="Student"
                            icon={<GraduationCap className="h-12 w-12 text-purple-600 group-hover:scale-110 transition-transform duration-300" />}
                            description="Results, fees & updates"
                            onClick={() => setSelectedRole('STUDENT')}
                            color="border-purple-200/50 hover:border-purple-500/50 bg-purple-50/5"
                            glow="group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]"
                        />
                    </div>
                ) : (
                    <div className="max-w-md mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                        <div className="relative">
                            <div className="mb-6 flex justify-start">
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedRole(null)}
                                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors pl-0"
                                >
                                    <ArrowLeft className="h-4 w-4" /> <span className="text-sm font-semibold">Change Role</span>
                                </Button>
                            </div>
                            <div className="glass-card bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-xl border-white/50">
                                <LoginForm
                                    role={selectedRole}
                                    loading={loading}
                                    onSubmit={handleLogin}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Security & Trust Strip */}
            {!selectedRole && (
                <div className="mt-12 z-10 flex gap-8 items-center justify-center opacity-60 text-gray-600 text-xs font-medium tracking-wide">
                    <div className="flex items-center gap-2"><Lock className="h-3 w-3" /> Secure Login</div>
                    <div className="h-1 w-1 bg-gray-400 rounded-full" />
                    <div className="flex items-center gap-2"><Shield className="h-3 w-3" /> Role-Based Access</div>
                    <div className="h-1 w-1 bg-gray-400 rounded-full" />
                    <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3" /> Data Protected</div>
                </div>
            )}

            {/* Footer Branding */}
            <div className="mt-10 text-center z-10">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">Powered by</p>
                <h3 className="text-xl font-black text-gray-800 tracking-tight">
                    WibraniumTech
                </h3>
                <p className="text-xs text-gray-400 font-medium mt-1">
                    v1.0 • © 2026
                </p>
                <a href="#" className="inline-block mt-4 text-xs text-blue-500 hover:text-blue-700 hover:underline transition-colors opacity-80 hover:opacity-100">
                    Need help logging in?
                </a>
            </div>
        </div>
    );
}

function RoleCard({ title, icon, description, onClick, color, glow }: { title: string, icon: React.ReactNode, description: string, onClick: () => void, color: string, glow: string }) {
    return (
        <div
            className={`glass-card rounded-2xl p-[1px] cursor-pointer transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden ${color} ${glow}`}
            onClick={onClick}
        >
            <div className="flex flex-col items-center justify-center p-8 text-center h-full bg-white/40 backdrop-blur-sm rounded-2xl hover:bg-white/60 transition-colors">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-white/50 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative p-6 rounded-full bg-white/80 shadow-sm border border-white/60">
                        {icon}
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-600 font-medium text-sm leading-relaxed max-w-[150px] mx-auto">{description}</p>
                </div>

                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 justify-center">
                        Click to continue <span className="text-lg leading-none">›</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

function LoginForm({ role, loading, onSubmit }: { role: Role, loading: boolean, onSubmit: (data: LoginFormValues) => void }) {
    const defaultCreds = {
        ADMIN: { email: "admin@schooldemo.com", pass: "Admin@123" },
        TEACHER: { email: "teacher@schooldemo.com", pass: "Teacher@123" },
        STUDENT: { email: "student@schooldemo.com", pass: "Student@123" },
    };

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: defaultCreds[role].email,
            password: defaultCreds[role].pass,
        },
    });

    return (
        <div className="w-full">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{role.charAt(0) + role.slice(1).toLowerCase()} Login</h2>
                <p className="text-gray-600 font-medium">Enter your credentials to access the dashboard</p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900 font-bold">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        {...form.register("email")}
                        className="bg-white/50 border-gray-300 text-gray-900 font-medium focus:border-blue-500 focus:ring-blue-500 h-10"
                    />
                    {form.formState.errors.email && (
                        <p className="text-sm font-bold text-red-600">{form.formState.errors.email.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-900 font-bold">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        {...form.register("password")}
                        className="bg-white/50 border-gray-300 text-gray-900 font-medium focus:border-blue-500 focus:ring-blue-500 h-10"
                    />
                    {form.formState.errors.password && (
                        <p className="text-sm font-bold text-red-600">{form.formState.errors.password.message}</p>
                    )}
                </div>

                <div className="bg-blue-50/80 p-4 rounded-md border border-blue-100 backdrop-blur-sm">
                    <p className="text-xs font-bold text-blue-800 uppercase mb-1">Demo Credentials</p>
                    <div className="text-sm text-blue-900 font-medium grid grid-cols-[40px_1fr] gap-1">
                        <span>User:</span> <span className="font-mono">{defaultCreds[role].email}</span>
                        <span>Pass:</span> <span className="font-mono">{defaultCreds[role].pass}</span>
                    </div>
                </div>

                <Button className="w-full text-lg font-bold h-12 bg-gray-900 hover:bg-gray-800 text-white shadow-lg transform hover:-translate-y-0.5 transition-all" type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authenticating...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </Button>
            </form>
        </div>
    );
}
