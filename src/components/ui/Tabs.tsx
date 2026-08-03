"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface TabsProps {
  tabs: { label: string; content: React.ReactNode }[];
  className?: string;
}

export function Tabs({ tabs, className }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex w-full space-x-1 rounded-xl bg-muted p-1" role="tablist">
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={index}
              role="tab"
              aria-selected={isActive}
              className={cn(
                "relative flex-1 rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab(index)}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 z-[-1] rounded-lg bg-background shadow-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="mt-4 overflow-hidden relative min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            role="tabpanel"
            className="rounded-xl p-2 focus:outline-none"
          >
            {tabs[activeTab].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
