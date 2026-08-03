"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { User, Settings, LogOut, Sun, Moon } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { Avatar } from "@/components/ui/Avatar";

export function UserDropdown() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <Dropdown
      trigger={
        <div className="flex items-center gap-2">
          <Avatar 
            src="" 
            alt="User avatar"
            fallback="U"
            className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all"
          />
        </div>
      }
    >
      <div className="px-4 py-3 mb-1 border-b border-border">
        <p className="text-sm font-medium leading-none text-foreground">Test User</p>
        <p className="text-xs text-muted-foreground mt-1 truncate">test@example.com</p>
      </div>
      
      <DropdownItem onClick={() => router.push("/dashboard/profile")} className="flex items-center gap-2">
        <User className="h-4 w-4" />
        <span>Profile</span>
      </DropdownItem>
      
      <DropdownItem onClick={() => router.push("/dashboard/settings")} className="flex items-center gap-2">
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </DropdownItem>
      
      <DropdownItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="flex items-center gap-2">
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span>Toggle Theme</span>
      </DropdownItem>
      
      <div className="my-1 border-t border-border" />
      
      <DropdownItem onClick={() => router.push("/api/auth/logout")} className="flex items-center gap-2 text-destructive focus:text-destructive">
        <LogOut className="h-4 w-4" />
        <span>Log out</span>
      </DropdownItem>
    </Dropdown>
  );
}
