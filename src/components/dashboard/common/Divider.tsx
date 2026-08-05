import React from "react";
import { cn } from "@/lib/utils";

export function Divider({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr className={cn("border-t border-border my-6", className)} {...props} />
  );
}
