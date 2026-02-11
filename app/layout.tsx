import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "School Management System",
    description: "A comprehensive School Management System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen bg-gray-50 animate-in fade-in duration-500">{children}</body>
        </html>
    );
}
