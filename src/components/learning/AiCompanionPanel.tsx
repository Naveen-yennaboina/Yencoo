"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { 
  Sparkles, 
  Headphones, 
  Languages, 
  AlignLeft, 
  Lightbulb, 
  MessageSquare, 
  HelpCircle, 
  Bookmark, 
  FileText,
  X,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Card } from "@/components/ui/Card";

export function AiCompanionPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const features = [
    { id: "explain", icon: <Sparkles className="h-4 w-4" />, label: "Explain" },
    { id: "listen", icon: <Headphones className="h-4 w-4" />, label: "Listen" },
    { id: "translate", icon: <Languages className="h-4 w-4" />, label: "Translate" },
    { id: "summarize", icon: <AlignLeft className="h-4 w-4" />, label: "Summarize" },
    { id: "examples", icon: <Lightbulb className="h-4 w-4" />, label: "Examples" },
    { id: "interview", icon: <MessageSquare className="h-4 w-4" />, label: "Interview" },
    { id: "quiz", icon: <HelpCircle className="h-4 w-4" />, label: "Quiz" },
    { id: "bookmark", icon: <Bookmark className="h-4 w-4" />, label: "Bookmark" },
    { id: "notes", icon: <FileText className="h-4 w-4" />, label: "Notes" },
  ];

  return (
    <>
      {/* Mobile Toggle Button (Visible only when closed) */}
      {!isOpen && (
        <Button 
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-50 lg:hidden flex items-center justify-center p-0"
          onClick={() => setIsOpen(true)}
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      )}

      {/* Desktop Sidebar / Mobile Drawer */}
      <AnimatePresence>
        {(isOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`
              fixed lg:sticky top-0 right-0 h-screen w-full sm:w-96 bg-card border-l border-border shadow-2xl z-40 
              flex flex-col lg:translate-x-0
              ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            `}
          >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Sparkles className="h-5 w-5" />
                <span>AI Companion</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 lg:hidden"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!activeTab ? (
                <>
                  <div className="text-sm text-muted-foreground mb-4">
                    How can I help you with this lesson?
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {features.map((feature) => (
                      <Button
                        key={feature.id}
                        variant="outline"
                        className="h-auto py-3 px-4 justify-start bg-card hover:bg-primary/5 hover:border-primary/30 transition-all text-left"
                        onClick={() => setActiveTab(feature.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-primary">{feature.icon}</div>
                          <span className="text-sm font-medium">{feature.label}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="self-start mb-4 -ml-2 text-muted-foreground"
                    onClick={() => setActiveTab(null)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to options
                  </Button>
                  
                  <Card className="flex-1 p-6 bg-muted/30 border-dashed flex flex-col items-center justify-center text-center space-y-4">
                    {features.find(f => f.id === activeTab)?.icon}
                    <h3 className="font-semibold text-lg capitalize">{activeTab} Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      This is a placeholder for the {activeTab} functionality. 
                      AI generation logic will be integrated here later.
                    </p>
                  </Card>
                </div>
              )}
            </div>
            
            {/* Input Area (Mock) */}
            <div className="p-4 border-t border-border bg-card">
              <div className="relative">
                <textarea 
                  className="w-full bg-muted border-transparent focus:border-primary/50 focus:bg-card rounded-xl text-sm py-3 pl-4 pr-12 resize-none transition-all outline-none h-14"
                  placeholder="Ask a question about this lesson..."
                />
                <Button size="sm" className="absolute right-2 top-2 h-10 w-10 p-0 rounded-lg">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
