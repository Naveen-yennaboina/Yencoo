"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  title: React.ReactNode;
  content: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export function AccordionItem({ title, content, defaultExpanded = false, className }: AccordionItemProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={cn("border-b border-border last:border-b-0", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left font-medium transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn("h-5 w-5 text-muted-foreground transition-transform duration-200", isExpanded && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-1 text-sm text-muted-foreground">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface AccordionProps {
  items: AccordionItemProps[];
  className?: string;
  allowMultiple?: boolean;
}

export function Accordion({ items, className, allowMultiple = true }: AccordionProps) {
  // If we wanted to support single-expansion mode, we'd manage state here.
  // For simplicity and since most of our use cases (like curriculum) benefit from multiple open,
  // we just render independent items.
  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, index) => (
        <AccordionItem key={index} {...item} />
      ))}
    </div>
  );
}
