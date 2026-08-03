"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { AccordionItem } from "@/components/ui/Accordion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

// Mock categories for UI
const CATEGORIES = [
  { id: "programming", label: "Programming", count: 124 },
  { id: "cloud", label: "Cloud & DevOps", count: 85 },
  { id: "ai", label: "Artificial Intelligence", count: 62 },
  { id: "business", label: "Business", count: 45 },
  { id: "design", label: "Design", count: 38 },
];

const DIFFICULTIES = [
  { id: "BEGINNER", label: "Beginner" },
  { id: "INTERMEDIATE", label: "Intermediate" },
  { id: "ADVANCED", label: "Advanced" },
];

export function CourseFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  
  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };
  
  const toggleDifficulty = (id: string) => {
    setSelectedDifficulties(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedDifficulties([]);
  };

  const hasFilters = selectedCategories.length > 0 || selectedDifficulties.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Filters</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs text-muted-foreground">
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-1">
        <AccordionItem
          title={<span className="font-medium">Category</span>}
          defaultExpanded
          className="border-none"
          content={
            <div className="space-y-3">
              {CATEGORIES.map(category => (
                <div key={category.id} className="flex items-center justify-between">
                  <Checkbox 
                    id={`cat-${category.id}`} 
                    label={category.label}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                  />
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                </div>
              ))}
            </div>
          }
        />
        
        <div className="h-px w-full bg-border" />
        
        <AccordionItem
          title={<span className="font-medium">Difficulty</span>}
          defaultExpanded
          className="border-none"
          content={
            <div className="space-y-3">
              {DIFFICULTIES.map(difficulty => (
                <Checkbox 
                  key={difficulty.id}
                  id={`diff-${difficulty.id}`} 
                  label={difficulty.label}
                  checked={selectedDifficulties.includes(difficulty.id)}
                  onChange={() => toggleDifficulty(difficulty.id)}
                />
              ))}
            </div>
          }
        />

        <div className="h-px w-full bg-border" />

        <AccordionItem
          title={<span className="font-medium">Price</span>}
          defaultExpanded
          className="border-none"
          content={
            <div className="space-y-3">
              <Checkbox id="price-free" label="Free" />
              <Checkbox id="price-premium" label="Premium" />
            </div>
          }
        />
      </div>
    </div>
  );
}
