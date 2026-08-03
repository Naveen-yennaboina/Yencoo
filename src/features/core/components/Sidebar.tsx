"use client";

import * as React from "react";
import { useLayout } from "@/components/providers/LayoutProvider";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";

export function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useLayout();

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md md:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] max-w-full transform border-r bg-background transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:static md:translate-x-0 md:border-r md:w-64",
          isSidebarOpen ? "translate-x-0 shadow-premium-2xl" : "-translate-x-full"
        )}
        aria-label="Sidebar Navigation"
      >
        <div className="flex h-16 items-center justify-between px-4 py-4 md:hidden border-b border-border/50">
          <a className="flex items-center space-x-2 font-heading font-bold text-xl text-primary" href="/" aria-label="Go to homepage">
            {siteConfig.name}
          </a>
          <Button variant="ghost" size="icon" onClick={closeSidebar} aria-label="Close Sidebar" className="rounded-full h-8 w-8">
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <nav className="flex flex-col space-y-2 p-4 mt-2">
          {mainNav.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/5 hover:text-primary"
              >
                {Icon && <Icon className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />}
                {item.title}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
