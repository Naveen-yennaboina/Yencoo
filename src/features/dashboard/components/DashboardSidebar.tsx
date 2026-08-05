"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ChevronRight, ChevronLeft } from "lucide-react";
import { dashboardNav } from "@/config/dashboard";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside className="hidden md:flex flex-col relative flex-shrink-0 w-20 lg:w-64 bg-transparent transition-all">
      {/* Inner wrapper that expands on hover on tablet */}
      <div 
        className={cn(
          "absolute top-0 left-0 h-full bg-card border-r border-border transition-all duration-300 flex flex-col z-40 overflow-hidden",
          isHovered ? "w-64 shadow-premium-2xl lg:shadow-none" : "w-20 lg:w-64",
          "lg:w-64" // always full width on desktop
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-16 flex items-center pl-4 pr-6 border-b border-border min-w-[256px]">
          <Link href="/" className="font-bold text-xl tracking-tight text-primary flex items-center">
            <span className={cn(
              "transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0 lg:opacity-100"
            )}>
              Yencoo
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 min-w-[256px]">
          {dashboardNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px]",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title={item.title}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className={cn(
                  "transition-opacity duration-300 whitespace-nowrap",
                  isHovered ? "opacity-100" : "opacity-0 lg:opacity-100"
                )}>
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border min-w-[256px]">
          <button 
            className="flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full min-h-[44px]"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className={cn(
              "transition-opacity duration-300 whitespace-nowrap",
              isHovered ? "opacity-100" : "opacity-0 lg:opacity-100"
            )}>
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
