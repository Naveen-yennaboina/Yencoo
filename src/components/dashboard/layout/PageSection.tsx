import React from "react";
import { cn } from "@/lib/utils";

export function PageSection({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("space-y-4 md:space-y-6 mb-6 md:mb-8", className)} {...props}>
      {children}
    </section>
  );
}
