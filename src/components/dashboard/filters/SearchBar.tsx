import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

export function SearchBar({ className, wrapperClassName, ...props }: SearchBarProps) {
  return (
    <div className={cn("relative w-full", wrapperClassName)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input 
        className={cn("pl-9 min-h-[44px] md:min-h-0 bg-background", className)} 
        {...props} 
      />
    </div>
  );
}
