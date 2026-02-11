"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}


interface DialogContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);


const Dialog = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <DialogContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </DialogContext.Provider>
    );
};

const DialogTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, children, asChild, onClick, ...props }, ref) => {
    const context = React.useContext(DialogContext);
    if (!context) throw new Error("DialogTrigger must be used within a Dialog");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        context.setIsOpen(true);
        onClick && onClick(e);
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
        <button
            ref={ref}
            onClick={handleClick}
            className={cn(className)}
            {...props}
        >
            {children}
        </button>
    );
});
DialogTrigger.displayName = "DialogTrigger";

const DialogContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(DialogContext);
    if (!context) throw new Error("DialogContent must be used within a Dialog");

    if (!context.isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                ref={ref}
                className={cn(
                    "relative grid w-full max-w-lg gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg animate-in fade-in zoom-in-95",
                    className
                )}
                {...props}
            >
                {children}
                <button
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none"
                    onClick={() => context.setIsOpen(false)}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>
            </div>
        </div>
    );
});
DialogContent.displayName = "DialogContent";

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
));
DialogTitle.displayName = "DialogTitle";

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle };
