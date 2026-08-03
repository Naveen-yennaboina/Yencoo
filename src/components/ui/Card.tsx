import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outline";
  isHoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", isHoverable, ...props }, ref) => {
    const variants = {
      default: "bg-card text-card-foreground shadow-premium-sm border border-border",
      glass: "bg-background/60 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-premium-md",
      outline: "bg-transparent border-2 border-border",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-300",
          variants[variant],
          isHoverable && "hover:shadow-premium-lg hover:-translate-y-1 cursor-pointer",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export interface MotionCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "glass" | "outline";
  isHoverable?: boolean;
}

const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className, variant = "default", isHoverable, ...props }, ref) => {
    const variants = {
      default: "bg-card text-card-foreground shadow-premium-sm border border-border",
      glass: "bg-background/60 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-premium-md",
      outline: "bg-transparent border-2 border-border",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-300",
          variants[variant],
          isHoverable && "hover:shadow-premium-lg cursor-pointer",
          className
        )}
        whileHover={isHoverable ? { y: -4 } : {}}
        {...props}
      />
    );
  }
);
MotionCard.displayName = "MotionCard";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-heading text-xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, MotionCard, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
