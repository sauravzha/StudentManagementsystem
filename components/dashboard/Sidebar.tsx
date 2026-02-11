"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut, School } from "lucide-react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";

interface SidebarItem {
    title: string;
    href: string;
    icon: any;
}

interface SidebarGroup {
    label: string;
    items: SidebarItem[];
}

interface SidebarProps {
    items: SidebarItem[] | SidebarGroup[];
    title?: string;
}

function isGrouped(items: SidebarItem[] | SidebarGroup[]): items is SidebarGroup[] {
    return 'label' in items[0];
}

export function Sidebar({ items, title = "School ERP" }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const logout = useStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const NavItem = ({ item }: { item: SidebarItem }) => {
        const isActive = pathname === item.href;
        return (
            <Link
                href={item.href}
                className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 group relative",
                    isActive
                        ? "bg-gray-800 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
            >
                {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-blue-500 rounded-r-full shadow-[0_0_10px_#3b82f6]" />
                )}
                <item.icon className={cn("h-5 w-5 transition-transform duration-200", isActive ? "text-blue-400 scale-110" : "group-hover:text-gray-200")} />
                {item.title}
            </Link>
        );
    };

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-gray-900 text-white shadow-2xl z-30">
            <div className="flex h-20 items-center border-b border-gray-800 px-6 gap-4">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg text-white shrink-0">
                    <School className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-lg font-bold leading-none tracking-tight">School<br /><span className="text-blue-400 text-sm font-medium">Management</span></h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
                {/* Title for the specific portal context (e.g. Teacher Portal) if not default */}
                {title !== "School ERP" && (
                    <div className="px-3 mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{title}</span>
                    </div>
                )}

                <nav className="space-y-6">
                    {items.length > 0 && isGrouped(items) ? (
                        (items as SidebarGroup[]).map((group, idx) => (
                            <div key={idx}>
                                <h3 className="px-3 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    {group.label}
                                </h3>
                                <div className="space-y-1">
                                    {group.items.map((item) => (
                                        <NavItem key={item.href} item={item} />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="space-y-1">
                            {(items as SidebarItem[]).map((item) => (
                                <NavItem key={item.href} item={item} />
                            ))}
                        </div>
                    )}
                </nav>
            </div>

            <div className="border-t border-gray-800 p-4 bg-gray-900/50 backdrop-blur-sm">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    onClick={handleLogout}
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
