"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const defaultId = React.useId();
    const checkboxId = id || defaultId;

    return (
      <div className="flex items-start gap-3">
        <div className="flex h-5 items-center">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              id={checkboxId}
              ref={ref}
              className={cn(
                "peer h-4 w-4 appearance-none rounded border border-input bg-background transition-colors",
                "checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
              {...props}
            />
            <Check className="pointer-events-none absolute h-3 w-3 text-primary-foreground opacity-0 peer-checked:opacity-100" strokeWidth={3} />
          </div>
        </div>
        {(label || description) && (
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label
                htmlFor={checkboxId}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
