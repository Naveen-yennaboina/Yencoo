import React from "react";
import { cn } from "@/lib/utils";

export function DashboardCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200",
        "p-5 md:p-6 lg:p-8", // Responsive padding mapping Mobile->Tablet->Desktop
        // Use tap animation on mobile (active:scale-[0.98]) and hover on desktop (hover:shadow-md)
        "active:scale-[0.98] sm:active:scale-100 hover:shadow-md sm:hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
