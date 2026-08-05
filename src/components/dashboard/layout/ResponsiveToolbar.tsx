import React from "react";
import { cn } from "@/lib/utils";

export interface ResponsiveToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  search?: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
}

export function ResponsiveToolbar({ search, filters, actions, className, ...props }: ResponsiveToolbarProps) {
  return (
    <div 
      className={cn(
        "flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-6", 
        className
      )} 
      {...props}
    >
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full md:w-auto flex-1">
        {search && <div className="w-full sm:max-w-xs md:max-w-md">{search}</div>}
        {filters && <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">{filters}</div>}
      </div>
      {actions && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0 mt-2 md:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
}
