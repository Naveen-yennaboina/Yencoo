import React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center space-y-4 py-8", className)} {...props}>
      {icon && (
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground/60 mb-2">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1.5 max-w-sm">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      {action && <div className="pt-2 w-full sm:w-auto">{action}</div>}
    </div>
  );
}
