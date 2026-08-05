"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, History, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MobileSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSearch({ isOpen, onClose }: MobileSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const recentSearches = ["React Basics", "TypeScript Patterns", "System Design"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-background flex flex-col md:hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
            <form onSubmit={handleSubmit} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, roadmaps..."
                className="w-full pl-10 pr-4 py-3 bg-muted border-transparent focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-base transition-all outline-none h-12"
              />
            </form>
            <button
              onClick={onClose}
              className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
              aria-label="Close search"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto p-4 bg-muted/20">
            {query.trim() === "" ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Recent Searches
                  </h3>
                  <div className="flex flex-col space-y-1">
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => {
                          setQuery(search);
                          router.push(`/dashboard/search?q=${encodeURIComponent(search)}`);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted text-left min-h-[44px]"
                      >
                        <span className="text-foreground">{search}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>Press enter to search for "{query}"</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
