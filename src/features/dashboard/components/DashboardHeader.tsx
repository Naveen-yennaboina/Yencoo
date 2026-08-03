"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserDropdown } from "./UserDropdown";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { dashboardNav } from "@/config/dashboard";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
        
        {/* Mobile/Tablet Left: Hamburger + Brand */}
        <div className="flex items-center gap-3 lg:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1.5 -ml-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="font-bold text-lg tracking-tight text-primary">
            {siteConfig.name}
          </Link>
        </div>

        {/* Desktop/Tablet Left: Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search courses, roadmaps..." 
              className="w-full pl-9 pr-4 py-2 bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary rounded-full text-sm transition-all outline-none"
            />
          </div>
        </div>

        {/* Right Actions: Notifications, Theme, User */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          {/* Mobile Search Icon */}
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors md:hidden">
            <Search className="h-5 w-5" />
          </button>
          
          <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors hidden md:block">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
          </button>
          <div className="hidden md:block">
             <ThemeToggle />
          </div>
          <div className="h-6 w-px bg-border mx-1 hidden md:block" />
          <UserDropdown />
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-card border-r shadow-premium-2xl z-50 lg:hidden flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-border">
                <Link href="/" className="font-bold text-xl tracking-tight text-primary">
                  {siteConfig.name}
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {dashboardNav.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
              
              <div className="p-4 border-t border-border flex flex-col gap-2">
                 <div className="flex items-center justify-between px-3 py-2">
                   <span className="text-sm font-medium text-muted-foreground">Theme</span>
                   <ThemeToggle />
                 </div>
                 <button className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-destructive hover:bg-destructive/10 transition-colors w-full mt-2">
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
