import React from "react";
import { cn } from "@/lib/utils";

export function ResponsiveForm({ className, children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)} {...props}>
      {children}
    </form>
  );
}

// Wrapper for form fields that might span full width
export function ResponsiveField({ className, children, fullWidth = false, ...props }: React.HTMLAttributes<HTMLDivElement> & { fullWidth?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-2", fullWidth ? "md:col-span-2" : "", className)} {...props}>
      {children}
    </div>
  );
}
