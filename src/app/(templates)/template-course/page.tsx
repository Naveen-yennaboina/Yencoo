"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { PlayCircle, CheckCircle2, Lock, FileText, Download } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { Avatar } from "@/components/ui/Avatar";

export default function CourseTemplate() {
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-black aspect-video w-full flex items-center justify-center relative group">
          {/* Placeholder for Video Player */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <PlayCircle className="h-20 w-20 text-white opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <Progress value={33} className="h-1 bg-white/20 [&>div]:bg-primary" />
          </div>
        </div>

        <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-3xl font-heading font-bold">1.2 Building the Foundation</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar size="sm" src="https://i.pravatar.cc/150?u=instructor" />
                <span>Instructor Name</span>
              </div>
              <span>•</span>
              <span>Updated Oct 2023</span>
            </div>
          </div>

          <Tabs
            tabs={[
              {
                label: "Overview",
                content: (
                  <div className="prose prose-sm dark:prose-invert max-w-none pt-4">
                    <p>In this lesson, we will cover the foundational concepts required to build robust web applications.</p>
                    <h3>What you'll learn:</h3>
                    <ul>
                      <li>Setting up the development environment</li>
                      <li>Understanding the core architecture</li>
                      <li>Implementing the first components</li>
                    </ul>
                  </div>
                )
              },
              {
                label: "Resources",
                content: (
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Lesson Slides</p>
                          <p className="text-xs text-muted-foreground">PDF • 2.4 MB</p>
                        </div>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Source Code</p>
                          <p className="text-xs text-muted-foreground">ZIP • 1.1 MB</p>
                        </div>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>
      </div>

      {/* Course Sidebar */}
      <div className="w-full lg:w-96 border-l bg-background/50 flex flex-col h-[calc(100vh-4rem)] lg:sticky lg:top-16">
        <div className="p-4 border-b space-y-4">
          <h2 className="font-heading font-semibold text-lg">Course Content</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>33% Complete</span>
              <span>4/12 Lessons</span>
            </div>
            <Progress value={33} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Module 1 */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Module 1: Introduction</h3>
            <div className="space-y-1">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">1.1 Welcome to the Course</p>
                  <p className="text-xs text-muted-foreground">5:24</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 cursor-pointer">
                <PlayCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-primary">1.2 Building the Foundation</p>
                  <p className="text-xs text-muted-foreground">12:15</p>
                </div>
              </div>
            </div>
          </div>

          {/* Module 2 */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Module 2: Advanced Concepts</h3>
            <div className="space-y-1">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer opacity-70">
                <Lock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">2.1 Deep Dive into State</p>
                  <p className="text-xs text-muted-foreground">18:40</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer opacity-70">
                <Lock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">2.2 Performance Optimization</p>
                  <p className="text-xs text-muted-foreground">22:10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
