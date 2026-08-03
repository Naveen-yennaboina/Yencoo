"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, CheckCircle2, Bookmark, Monitor, Eye, BookOpen } from "lucide-react";
import { Flashcard } from "@/components/learning/Flashcard";
import { QuizView } from "@/components/learning/QuizView";
import Link from "next/link";

// Mock lesson content
const lessonTitle = "Understanding Generic Constraints";
const lessonContent = `
Generics in TypeScript allow you to write reusable and flexible components. However, sometimes you want to limit the types that can be passed to a generic type parameter. This is where generic constraints come in.

By using the \`extends\` keyword, you can constrain a generic type to specific shapes. For example, if you want a function to only accept objects that have a \`length\` property:
`;

export default function LessonPage() {
  const [viewMode, setViewMode] = useState<"standard" | "reader" | "focus">("standard");
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Responsive classes based on viewMode
  let containerClasses = "max-w-3xl mx-auto py-8 lg:py-12 px-6 transition-all duration-500";
  if (viewMode === "reader") {
    containerClasses = "max-w-2xl mx-auto py-12 lg:py-20 px-6 text-lg md:text-xl font-serif leading-relaxed";
  } else if (viewMode === "focus") {
    containerClasses = "max-w-4xl mx-auto py-12 px-6 bg-background ring-4 ring-primary/20 rounded-2xl shadow-2xl";
  }

  return (
    <div className={`min-h-full ${viewMode === "focus" ? "bg-muted/50 p-4 lg:p-8" : ""}`}>
      
      {/* Lesson Control Bar */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1">
          <Button 
            variant={viewMode === "standard" ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => setViewMode("standard")}
            className="h-8"
          >
            <Monitor className="h-4 w-4 mr-2" /> Standard
          </Button>
          <Button 
            variant={viewMode === "reader" ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => setViewMode("reader")}
            className="h-8 hidden sm:flex"
          >
            <BookOpen className="h-4 w-4 mr-2" /> Reader
          </Button>
          <Button 
            variant={viewMode === "focus" ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => setViewMode("focus")}
            className="h-8 hidden sm:flex"
          >
            <Eye className="h-4 w-4 mr-2" /> Focus
          </Button>
        </div>
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`h-8 ${isBookmarked ? "text-primary" : "text-muted-foreground"}`}
          >
            <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-primary" : ""}`} /> 
            {isBookmarked ? "Saved" : "Save Lesson"}
          </Button>
        </div>
      </div>

      <div className={containerClasses}>
        <div className="space-y-8">
          
          <header className="space-y-4">
            <div className="text-sm font-medium text-primary tracking-wide uppercase">Lesson 3 of 12</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{lessonTitle}</h1>
          </header>

          <article className="prose prose-slate dark:prose-invert max-w-none">
            <p className="whitespace-pre-line">{lessonContent}</p>

            <pre className="bg-muted p-4 rounded-xl overflow-x-auto text-sm border border-border mt-6 mb-6">
              <code className="text-foreground">
                {`function logLength<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Works
logLength("hello"); 
logLength([1, 2, 3]);
logLength({ length: 10, value: 5 });

// Error: Argument of type 'number' is not assignable to parameter of type '{ length: number; }'
logLength(10);`}
              </code>
            </pre>
          </article>

          <hr className="my-12 border-border" />

          {/* Flashcard Component Demo */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Key Concept Review</h3>
            <Flashcard 
              category="TypeScript"
              front={<>What keyword is used to constrain a generic type parameter?</>}
              back={<>The <code>extends</code> keyword is used to enforce that a generic type meets a specific interface or type shape.</>}
            />
          </div>

          <hr className="my-12 border-border" />

          {/* Quiz Component Demo */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Knowledge Check</h3>
            <QuizView 
              questions={[
                {
                  id: "q1",
                  question: "Which of the following is a valid generic constraint?",
                  options: [
                    { id: "a", text: "T implements { length: number }" },
                    { id: "b", text: "T extends { length: number }" },
                    { id: "c", text: "T imposes { length: number }" },
                  ],
                  correctOptionId: "b",
                  explanation: "In TypeScript, the 'extends' keyword is used within the generic bracket syntax to constrain the type."
                }
              ]}
            />
          </div>

          {/* Lesson Navigation */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/learn/course-1/lesson-2" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto gap-2 h-12 px-6">
                <ChevronLeft className="h-4 w-4" /> Previous Lesson
              </Button>
            </Link>
            
            <Link href="/learn/course-1/lesson-4" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto gap-2 h-12 px-8 shadow-lg shadow-primary/20">
                Continue <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
