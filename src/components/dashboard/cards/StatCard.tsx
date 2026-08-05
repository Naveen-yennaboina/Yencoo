import React from "react";
import { DashboardCard } from "./DashboardCard";
import { cn } from "@/lib/utils";

export interface StatCardProps extends React.ComponentProps<typeof DashboardCard> {
  title: string;
  value: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
}

export function StatCard({ title, value, description, icon, trend, className, ...props }: StatCardProps) {
  return (
    <DashboardCard className={cn("flex flex-col", className)} {...props}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground/50">{icon}</div>}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className={cn("text-xs font-medium", trend.positive ? "text-emerald-600" : "text-rose-600")}>
              {trend.positive ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
