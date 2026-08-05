import React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "./EmptyState";

export function ErrorState({ className, title = "Something went wrong", description, action }: any) {
  return (
    <div className={cn("p-8 md:p-12", className)}>
      <EmptyState
        icon={<AlertTriangle className="w-10 h-10 text-destructive" />}
        title={title}
        description={description}
        action={action}
      />
    </div>
  );
}
