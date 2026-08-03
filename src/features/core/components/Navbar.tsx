"use client";

import * as React from "react";
import { useLayout } from "@/components/providers/LayoutProvider";
import { Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function Navbar() {
  const { toggleSidebar } = useLayout();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all">
      <div className="flex h-16 w-full items-center px-4 md:px-8">
        <div className="mr-4 hidden md:flex">
          <a className="flex items-center justify-center space-x-2" href="/" aria-label="Go to homepage">
            <span className="font-heading font-bold text-xl tracking-tight text-primary">{siteConfig.name}</span>
          </a>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground hover:bg-muted"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          aria-expanded="false"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-6">
             {mainNav.map((item) => (
               <a 
                 key={item.href} 
                 href={item.href}
                 className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary md:inline-block relative group"
               >
                 {item.title}
                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
               </a>
             ))}
          </nav>
          
          <div className="flex items-center space-x-2 border-l pl-4 border-border">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="default" size="sm" className="hidden sm:inline-flex rounded-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
