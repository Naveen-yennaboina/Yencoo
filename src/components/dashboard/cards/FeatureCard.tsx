import React from "react";
import { DashboardCard } from "./DashboardCard";
import { cn } from "@/lib/utils";

export interface FeatureCardProps extends React.ComponentProps<typeof DashboardCard> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function FeatureCard({ title, description, icon, action, className, ...props }: FeatureCardProps) {
  return (
    <DashboardCard className={cn("flex flex-col items-start gap-4", className)} {...props}>
      {icon && (
        <div className="p-2 md:p-3 rounded-lg bg-primary/10 text-primary w-fit">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      {action && <div className="mt-auto pt-4 w-full sm:w-auto">{action}</div>}
    </DashboardCard>
  );
}
