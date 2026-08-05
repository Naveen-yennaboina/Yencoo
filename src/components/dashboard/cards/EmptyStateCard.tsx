import React from "react";
import { DashboardCard } from "./DashboardCard";
import { cn } from "@/lib/utils";
import { EmptyState } from "../states/EmptyState";

export interface EmptyStateCardProps extends React.ComponentProps<typeof DashboardCard> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyStateCard({ title, description, icon, action, className, ...props }: EmptyStateCardProps) {
  return (
    <DashboardCard className={cn("flex flex-col items-center justify-center p-8 md:p-12", className)} {...props}>
      <EmptyState title={title} description={description} icon={icon} action={action} />
    </DashboardCard>
  );
}
