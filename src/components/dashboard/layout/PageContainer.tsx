import React from "react";
import { cn } from "@/lib/utils";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "wide" | "full";
  children: React.ReactNode;
}

export function PageContainer({ 
  size = "wide", 
  children, 
  className,
  ...props 
}: PageContainerProps) {
  const sizeClasses = {
    default: "max-w-5xl",
    wide: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full",
        "px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8", // Mobile -> Tablet -> Desktop padding
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
