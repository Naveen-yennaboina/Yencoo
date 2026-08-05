"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { adminNav } from "@/config/admin";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { AccountDropdown } from "@/features/dashboard/components/AccountDropdown";
import { MobileSearch } from "@/features/dashboard/components/MobileSearch";
import { AdminBreadcrumbs } from "./AdminBreadcrumbs";

interface AdminHeaderProps {
  user?: any;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const pathname = usePathname();

  return (
    <>
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
        
        {/* Mobile Left: Hamburger + Brand */}
        <div className="flex items-center gap-3 lg:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1.5 -ml-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/admin" className="font-bold text-xl tracking-tight text-primary">
            Yencoo Admin
          </Link>
        </div>

        {/* Desktop/Tablet Left: Breadcrumbs or Search */}
        <div className="hidden lg:flex items-center gap-4 flex-1">
          <AdminBreadcrumbs />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          {/* Mobile Search Icon */}
          <button 
            onClick={() => setIsMobileSearchOpen(true)}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open search"
          >
            <Search className="h-6 w-6" />
          </button>
          
          <div className="hidden lg:flex items-center relative max-w-xs w-full mr-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search admin..." 
              className="w-full pl-9 pr-4 py-1.5 bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary rounded-full text-sm transition-all outline-none"
            />
          </div>

          <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors hidden md:flex min-h-[44px] min-w-[44px] items-center justify-center">
            <Bell className="h-5 w-5" />
            {/* Notification badge */}
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-card" />
          </button>
          
          <div className="hidden md:block">
             <ThemeToggle />
          </div>
          
          <div className="h-6 w-px bg-border mx-1 hidden md:block" />
          
          {/* Desktop User Dropdown */}
          <div className="hidden md:block">
            <AccountDropdown user={user} />
          </div>

          {/* Mobile User Avatar Trigger */}
          <div className="md:hidden">
            <AccountDropdown user={user} isMobileTrigger />
          </div>
        </div>
      </header>

      {/* Slide-over components */}
      <MobileSearch 
        isOpen={isMobileSearchOpen} 
        onClose={() => setIsMobileSearchOpen(false)} 
      />

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
              className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-card border-r shadow-premium-2xl z-50 lg:hidden flex flex-col pb-safe"
            >
              <div className="h-16 flex items-center justify-between pl-4 pr-6 border-b border-border">
                <Link href="/admin" className="font-bold text-xl tracking-tight text-primary">
                  Yencoo Admin
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {adminNav.map((item) => {
                  const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                         "flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-colors min-h-[48px]",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-6 w-6" />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
