import React from "react";
import { Button, ButtonProps } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface ActionButtonProps extends ButtonProps {
  fullWidthOnMobile?: boolean;
}

export function ActionButton({ 
  className, 
  fullWidthOnMobile = true, 
  size = "default", 
  ...props 
}: ActionButtonProps) {
  return (
    <Button
      size={size}
      className={cn(
        // Mobile-first: minimum 44px-48px touch targets, optionally full width
        "min-h-[44px] sm:min-h-0",
        fullWidthOnMobile ? "w-full sm:w-auto" : "",
        className
      )}
      {...props}
    />
  );
}
