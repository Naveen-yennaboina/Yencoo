"use client";

import * as React from "react";
import { useLayout } from "@/components/providers/LayoutProvider";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useLayout();

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] max-w-full transform border-r bg-background transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:border-r md:w-64",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Sidebar Navigation"
      >
        <div className="flex h-16 items-center justify-between px-4 py-4 md:hidden">
          <a className="flex items-center space-x-2 font-bold" href="/" aria-label="Go to homepage">
            {siteConfig.name}
          </a>
          <Button variant="ghost" size="icon" onClick={closeSidebar} aria-label="Close Sidebar">
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>

        <nav className="flex flex-col space-y-2 p-4">
          {mainNav.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              >
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                {item.title}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
