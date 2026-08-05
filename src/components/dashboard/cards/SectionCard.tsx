import React from "react";
import { cn } from "@/lib/utils";
import { DashboardCard } from "./DashboardCard";

export function SectionCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <DashboardCard className={cn("w-full mb-6 md:mb-8", className)} {...props}>
      {children}
    </DashboardCard>
  );
}
