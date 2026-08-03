import * as React from "react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  bordered?: boolean;
}

export function Avatar({ className, src, alt, fallback, size = "md", bordered = false, ...props }: AvatarProps) {
  const [error, setError] = React.useState(false);

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
    "2xl": "h-24 w-24 text-2xl",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-muted shadow-sm transition-transform hover:scale-105",
        sizes[size],
        bordered && "ring-2 ring-background ring-offset-2 ring-offset-primary/20",
        className
      )}
      {...props}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="aspect-square h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary">
          {fallback || <User className="h-1/2 w-1/2" />}
        </div>
      )}
    </div>
  );
}
