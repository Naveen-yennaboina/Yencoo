"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { AccordionItem } from "@/components/ui/Accordion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { fetchApi } from "@/lib/api";
import { Loader2 } from "lucide-react";

type Category = {
  id: string;
  name: string;
  slug: string;
  _count?: {
    courses: number;
  };
};

const DIFFICULTIES = [
  { id: "BEGINNER", label: "Beginner" },
  { id: "INTERMEDIATE", label: "Intermediate" },
  { id: "ADVANCED", label: "Advanced" },
];

export function CourseFilters() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const res = await fetchApi<{ data: Category[] }>("/api/categories?limit=100");
      if (res.data) {
        setCategories(res.data.data);
      }
      setLoading(false);
    };
    loadCategories();
  }, []);
  
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
              {loading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              ) : categories.length === 0 ? (
                <div className="text-xs text-muted-foreground p-2">No categories found</div>
              ) : (
                categories.map(category => (
                  <div key={category.id} className="flex items-center justify-between">
                    <Checkbox 
                      id={`cat-${category.id}`} 
                      label={category.name}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                    />
                    <span className="text-xs text-muted-foreground">{category._count?.courses || 0}</span>
                  </div>
                ))
              )}
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
