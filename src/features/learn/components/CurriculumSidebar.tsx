"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronLeft, PlayCircle, CheckCircle2, FileText, HelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Accordion, AccordionItemProps } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";

interface CurriculumSidebarProps {
  courseSlug: string;
  modules: any[];
}

export function CurriculumSidebar({ courseSlug, modules }: CurriculumSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auto-expand the module that contains the active lesson
  const getActiveModuleValue = () => {
    for (const module of modules) {
      if (module.lessons.some((lesson: any) => pathname.includes(lesson.id))) {
        return module.id;
      }
    }
    return modules[0]?.id;
  };

  const activeModule = getActiveModuleValue();

  const getIconForType = (type: string, isCompleted: boolean = false) => {
    if (isCompleted) return <CheckCircle2 className="h-4 w-4 text-primary" />;
    switch (type) {
      case "VIDEO": return <PlayCircle className="h-4 w-4 text-muted-foreground" />;
      case "TEXT": return <FileText className="h-4 w-4 text-muted-foreground" />;
      case "QUIZ": return <HelpCircle className="h-4 w-4 text-muted-foreground" />;
      default: return <PlayCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const generateAccordionItems = (): AccordionItemProps[] => {
    return modules.map((module, index) => {
      const isDefaultExpanded = module.id === activeModule;
      
      const content = (
        <div className="flex flex-col space-y-1 mt-1">
          {module.lessons.map((lesson: any, lessonIdx: number) => {
            const isActive = pathname.includes(lesson.id);
            const isCompleted = false; // Mocked
            return (
              <Link 
                key={lesson.id} 
                href={`/learn/${courseSlug}/${lesson.id}`}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group",
                  isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground"
                )}
              >
                <span className="shrink-0">
                  {getIconForType(lesson.type, isCompleted)}
                </span>
                <span className="line-clamp-2 leading-tight">
                  {lessonIdx + 1}. {lesson.title}
                </span>
              </Link>
            );
          })}
        </div>
      );

      const title = (
        <div className="flex flex-col items-start text-left">
          <span className="text-xs text-muted-foreground font-normal mb-1">Section {index + 1}</span>
          <span className="line-clamp-2 leading-tight">{module.title}</span>
        </div>
      );

      return {
        title,
        content,
        defaultExpanded: isDefaultExpanded,
        className: "border-none px-2",
      };
    });
  };

  const accordionItems = generateAccordionItems();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
        <h2 className={cn("font-semibold text-sm transition-opacity duration-200", isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
          Course Content
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex h-8 w-8 shrink-0"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className={cn("p-2", isCollapsed ? "hidden md:block" : "block")}>
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-4 py-4">
              {modules.map((m, i) => (
                <div key={m.id} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium cursor-help" title={m.title}>
                  {i + 1}
                </div>
              ))}
            </div>
          ) : (
            <Accordion items={accordionItems} className="w-full" />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div 
        className={cn(
          "hidden md:block shrink-0 transition-all duration-300 ease-in-out h-[calc(100vh-4rem)] sticky top-16 z-10", 
          isCollapsed ? "w-16" : "w-80"
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <div 
            className="w-[280px] h-full shadow-2xl bg-card border-r border-border animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
              <h2 className="font-semibold text-sm">Course Content</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-[calc(100vh-4rem)] overflow-y-auto p-2">
              <Accordion items={accordionItems} className="w-full" />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Toggle Button */}
      <Button 
        variant="secondary" 
        size="icon" 
        className="md:hidden fixed bottom-6 left-6 z-40 rounded-full shadow-xl h-12 w-12 border border-border"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}
