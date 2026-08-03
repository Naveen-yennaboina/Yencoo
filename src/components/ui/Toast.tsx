import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  isVisible?: boolean;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, title, description, action, onClose, variant = "default", isVisible = true, ...props }, ref) => {
    const variants = {
      default: "bg-background border-border text-foreground",
      destructive: "border-destructive bg-destructive text-destructive-foreground",
      success: "border-success bg-success text-success-foreground",
      warning: "border-warning bg-warning text-warning-foreground",
      info: "border-info bg-info text-info-foreground",
    };

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            ref={ref}
            className={cn(
              "pointer-events-auto relative flex w-full max-w-sm items-center justify-between space-x-4 overflow-hidden rounded-xl border p-6 pr-8 shadow-premium-lg transition-all",
              variants[variant],
              className
            )}
            {...props}
          >
            <div className="flex flex-col gap-1">
              {title && <div className="text-sm font-semibold">{title}</div>}
              {description && <div className="text-sm opacity-90">{description}</div>}
            </div>
            <div className="flex items-center gap-2">
              {action}
              {onClose && (
                <button
                  onClick={onClose}
                  className="absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
Toast.displayName = "Toast";
