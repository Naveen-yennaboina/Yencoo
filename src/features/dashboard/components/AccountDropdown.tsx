"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  Award,
  HelpCircle,
  Flame
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

interface AccountDropdownProps {
  user?: any;
  isMobileTrigger?: boolean;
}

export function AccountDropdown({ user, isMobileTrigger = false }: AccountDropdownProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click for desktop
  useEffect(() => {
    if (isMobileTrigger) return;
    
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMobileTrigger]);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (!isMobileTrigger) return;
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobileTrigger]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const userName = user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Student";
  const userEmail = user?.email || "";
  const isPro = user?.role === "PRO" || user?.role === "ADMIN";
  const currentStreak = user?.streak?.currentStreak || 0;

  const MenuLinks = [
    { label: "Profile", icon: User, href: "/dashboard/profile" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
    { label: "Subscription", icon: Award, href: "/dashboard/billing?tab=subscription" },
    { label: "Help Center", icon: HelpCircle, href: "/support" },
  ];

  const MenuContent = () => (
    <>
      {/* Header Section */}
      <div className="flex items-center gap-3 p-4">
        <Avatar 
          src="" 
          alt={userName}
          fallback={userName[0] || "U"}
          className="h-10 w-10 border border-border/50"
        />
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-foreground truncate">{userName}</h3>
            <div className={cn(
              "px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase",
              isPro 
                ? "bg-[#D4674C]/10 text-[#D4674C]" 
                : "bg-muted text-muted-foreground"
            )}>
              {isPro ? "PRO" : "FREE"}
            </div>
          </div>
          <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
        </div>
      </div>

      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50 border border-border/50">
          <Flame className={cn("w-4 h-4", currentStreak > 0 ? "text-[#D4674C]" : "text-muted-foreground")} />
          <span className="text-xs font-medium text-foreground">
            {currentStreak > 0 ? `${currentStreak} Day Learning Streak` : "Start your learning journey"}
          </span>
        </div>
      </div>

      <div className="h-px bg-border/50 mx-2" />

      {/* Primary Links */}
      <div className="p-2 space-y-0.5">
        {MenuLinks.map((item) => (
          <button
            key={item.label}
            onClick={() => handleAction(() => router.push(item.href))}
            className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-muted group transition-all duration-200"
          >
            <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="font-medium text-sm text-foreground">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="h-px bg-border/50 mx-2" />

      {/* Preferences Section */}
      <div className="p-2">
        <button
          onClick={() => handleAction(() => setTheme(theme === "dark" ? "light" : "dark"))}
          className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted group transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            {theme === "dark" ? <Sun className="h-4 w-4 text-muted-foreground" /> : <Moon className="h-4 w-4 text-muted-foreground" />}
            <span className="font-medium text-sm text-foreground">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </div>
        </button>
      </div>

      <div className="h-px bg-border/50 mx-2" />

      {/* Footer Section */}
      <div className="p-2">
        <button
          onClick={() => handleAction(() => router.push("/api/auth/logout"))}
          className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-red-500/10 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className={cn("relative", isMobileTrigger ? "flex" : "inline-block")} ref={menuRef}>
      {/* Trigger */}
      <button 
        className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4674C]/50"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar 
          src="" 
          alt={userName}
          fallback={userName[0] || "U"}
          className="h-8 w-8 ring-2 ring-transparent hover:ring-[#D4674C]/50 transition-all cursor-pointer shadow-sm"
        />
      </button>

      {/* Dropdown / Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          isMobileTrigger ? (
            // Mobile Bottom Sheet
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-x-0 bottom-0 z-50 bg-card border-t border-border rounded-t-3xl shadow-premium-2xl flex flex-col pb-safe"
              >
                <div className="w-full flex justify-center pt-3 pb-2 sticky top-0 bg-card z-10" onClick={() => setIsOpen(false)}>
                  <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
                </div>
                <MenuContent />
              </motion.div>
            </>
          ) : (
            // Desktop Popover
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-12 z-50 w-[280px] sm:w-[320px] bg-card border border-border/50 rounded-xl shadow-premium-2xl flex flex-col overflow-hidden origin-top-right"
            >
              <MenuContent />
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
