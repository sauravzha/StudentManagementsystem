"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // @ts-ignore
                    return React.cloneElement(child, { isOpen, setIsOpen });
                }
                return child;
            })}
        </div>
    );
};

const DropdownMenuTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; isOpen?: boolean; setIsOpen?: (open: boolean) => void }
>(({ className, children, asChild, isOpen, setIsOpen, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button";

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen && setIsOpen(!isOpen);
        props.onClick && props.onClick(e as any);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            // @ts-ignore
            onClick: handleClick,
            // @ts-ignore
            ref: ref
        });
    }

    return (
        // @ts-ignore
        <Comp
            ref={ref}
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={handleClick}
            className={cn(className)}
            {...props}
        >
            {children}
        </Comp>
    );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" | "center"; isOpen?: boolean; setIsOpen?: (open: boolean) => void }
>(({ className, align = "center", isOpen, setIsOpen, ...props }, ref) => {
    if (!isOpen) return null;

    const alignmentClasses = {
        start: "left-0",
        end: "right-0",
        center: "left-1/2 -translate-x-1/2",
    };

    return (
        <div
            ref={ref}
            className={cn(
                "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-slate-950 shadow-md",
                alignmentClasses[align],
                className
            )}
            {...props}
        />
    );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, onClick, ...props }, ref) => {

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                inset && "pl-8",
                className
            )}
            onClick={(e) => {
                onClick && onClick(e);
                // We rely on parent state to close, but in this simple implementation,
                // we might not have access to setIsOpen here easily without context.
                // For now, we assume user handles closing or clicking outside closes it.
                // A full context-based solution would be better but this is a quick fix.
            }}
            {...props}
        />
    );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
