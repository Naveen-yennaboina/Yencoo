import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode;
}

export function Breadcrumb({ className, separator, children, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex items-center text-sm text-muted-foreground", className)}
      {...props}
    >
      <ol className="flex items-center space-x-2">
        {React.Children.map(children, (child, index) => {
          const isLast = index === React.Children.count(children) - 1;
          return (
            <li className="flex items-center space-x-2">
              {child}
              {!isLast && (
                <span className="flex items-center justify-center">
                  {separator || <ChevronRight className="h-4 w-4" />}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & { isCurrentPage?: boolean }
>(({ className, isCurrentPage, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1.5 transition-colors",
      isCurrentPage ? "font-normal text-foreground" : "hover:text-foreground",
      className
    )}
    aria-current={isCurrentPage ? "page" : undefined}
    {...props}
  >
    {children}
  </span>
));
BreadcrumbItem.displayName = "BreadcrumbItem";
