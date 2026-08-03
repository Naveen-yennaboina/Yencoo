"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Plus, GripVertical, MoreHorizontal } from "lucide-react";

export default function RoadmapBuilderPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roadmaps</h1>
          <p className="text-muted-foreground mt-1">Design learning paths for your students.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Roadmap
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4 bg-muted/30">
            <h3 className="font-semibold mb-4">Existing Roadmaps</h3>
            <div className="space-y-2">
              <div className="p-3 bg-card border border-primary rounded-lg shadow-sm font-medium">
                Frontend Developer
              </div>
              <div className="p-3 bg-transparent hover:bg-card border border-transparent hover:border-border rounded-lg text-muted-foreground transition-colors cursor-pointer">
                Backend Developer
              </div>
              <div className="p-3 bg-transparent hover:bg-card border border-transparent hover:border-border rounded-lg text-muted-foreground transition-colors cursor-pointer">
                Full Stack Developer
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Frontend Developer</h2>
              <Button variant="outline" size="sm">Edit Details</Button>
            </div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-border" />

              <div className="space-y-6 relative z-10">
                {[
                  { title: "HTML & CSS Basics", courses: 2 },
                  { title: "JavaScript Fundamentals", courses: 1 },
                  { title: "React Framework", courses: 3 },
                  { title: "Advanced Frontend Patterns", courses: 2 }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center shrink-0 shadow-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <Card className="p-4 border-border flex items-center justify-between group-hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                          <div>
                            <div className="font-semibold">{step.title}</div>
                            <div className="text-xs text-muted-foreground">{step.courses} Courses linked</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </Card>
                    </div>
                  </div>
                ))}

                <div className="flex gap-4 ml-2">
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-border flex items-center justify-center shrink-0 bg-muted/50" />
                  <div className="flex-1 flex items-center">
                    <Button variant="ghost" className="border border-dashed border-border w-full justify-start text-muted-foreground hover:text-foreground">
                      <Plus className="h-4 w-4 mr-2" /> Add Step
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
