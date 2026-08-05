import React from "react";
import { cn } from "@/lib/utils";

export interface DashboardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4;
}

export function DashboardGrid({ cols = 3, children, className, ...props }: DashboardGridProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4 md:gap-6", colClasses[cols], className)} {...props}>
      {children}
    </div>
  );
}
