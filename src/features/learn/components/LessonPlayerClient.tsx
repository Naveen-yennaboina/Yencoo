"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, Bookmark, Monitor, Eye, BookOpen, CheckCircle2, PlayCircle, FileText, Sparkles } from "lucide-react";
import { Flashcard } from "@/components/learning/Flashcard";
import { ProductionQuizView } from "./ProductionQuizView";
import Link from "next/link";
import { NotesPanel } from "@/features/learn/components/NotesPanel";
import { AiAssistantPanel } from "@/features/ai/components/AiAssistantPanel";
import { toggleBookmark, markLessonComplete } from "@/actions/learn-actions";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

interface LessonPlayerClientProps {
  slug: string;
  lessonId: string;
  currentLesson: any;
  currentModule: any;
  prevLesson?: any;
  nextLesson?: any;
  initialBookmarked: boolean;
  initialNote?: string;
  initialAiMessages?: any[];
  initialQuiz?: any;
}

export function LessonPlayerClient({
  slug,
  lessonId,
  currentLesson,
  currentModule,
  prevLesson,
  nextLesson,
  initialBookmarked,
  initialNote,
  initialAiMessages = [],
  initialQuiz
}: LessonPlayerClientProps) {
  const pathname = usePathname();
  const [viewMode, setViewMode] = useState<"standard" | "reader" | "focus">("standard");
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // We could use useOptimistic here, but keeping it simple for now
  // Next.js will automatically refresh server state on action completion
  const handleToggleBookmark = () => {
    startTransition(() => {
      toggleBookmark(lessonId, pathname);
    });
  };

  const handleCompleteAndContinue = (href: string) => {
    startTransition(async () => {
      // Pass a dummy time spent for now, in a real app this would be tracked
      await markLessonComplete(lessonId, 120, pathname);
      router.push(href);
    });
  };

  // Mock Lesson Content based on Type
  let lessonContent = "";
  if (currentLesson.type === "TEXT") {
    lessonContent = `Welcome to this text lesson: ${currentLesson.title}.\n\nThis is a mock text lesson content. Here you would read about the concepts taught in this specific part of the module.`;
  } else if (currentLesson.type === "VIDEO") {
    lessonContent = `This is a video lesson: ${currentLesson.title}.\n\nBelow the video, there might be a transcript or supplementary notes.`;
  }

  // Responsive classes based on viewMode
  let containerClasses = "max-w-3xl mx-auto py-8 lg:py-12 px-6 transition-all duration-500";
  if (viewMode === "reader") {
    containerClasses = "max-w-2xl mx-auto py-12 lg:py-20 px-6 text-lg md:text-xl font-serif leading-relaxed";
  } else if (viewMode === "focus") {
    containerClasses = "max-w-4xl mx-auto py-12 px-6 bg-background ring-4 ring-primary/20 rounded-2xl shadow-2xl";
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Main Content Area */}
      <div className={`flex-1 overflow-y-auto ${viewMode === "focus" ? "bg-muted/50 p-4 lg:p-8" : ""}`}>
      
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
        <div className="flex items-center gap-2">
          <Button
            variant={isAiOpen ? "secondary" : "ghost"}
            size="sm"
            onClick={() => {
              setIsAiOpen(!isAiOpen);
              if (!isAiOpen) setIsNotesOpen(false);
            }}
            className="h-8 text-primary"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Ask AI
          </Button>
          <Button
            variant={isNotesOpen ? "secondary" : "ghost"}
            size="sm"
            onClick={() => {
              setIsNotesOpen(!isNotesOpen);
              if (!isNotesOpen) setIsAiOpen(false);
            }}
            className="h-8"
          >
            <FileText className="h-4 w-4 mr-2" />
            Notes
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            disabled={isPending}
            onClick={handleToggleBookmark}
            className={`h-8 ${initialBookmarked ? "text-primary" : "text-muted-foreground"}`}
          >
            <Bookmark className={`h-4 w-4 mr-2 ${initialBookmarked ? "fill-primary" : ""}`} /> 
            {initialBookmarked ? "Saved" : "Save Lesson"}
          </Button>
        </div>
      </div>

      <div className={containerClasses}>
        <div className="space-y-8">
          
          <header className="space-y-4">
            <div className="text-sm font-medium text-primary tracking-wide uppercase">
              {currentModule?.title}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {currentLesson.title}
            </h1>
          </header>

          <article className="prose prose-slate dark:prose-invert max-w-none">
            {currentLesson.type === "VIDEO" && (
              <div className="w-full aspect-video bg-neutral-900 rounded-xl mb-8 flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white/50" />
              </div>
            )}
            
            <p className="whitespace-pre-line">{lessonContent}</p>

            {currentLesson.type === "TEXT" && (
              <pre className="bg-muted p-4 rounded-xl overflow-x-auto text-sm border border-border mt-6 mb-6">
                <code className="text-foreground">
                  {`// Code example placeholder
function example() {
  return "Hello from ${currentLesson.title}";
}`}
                </code>
              </pre>
            )}
          </article>

          {currentLesson.type === "QUIZ" ? (
             <div className="space-y-6 mt-12">
               {initialQuiz ? (
                 <ProductionQuizView 
                   quizId={initialQuiz.id}
                   lessonId={currentLesson.id}
                   passingScore={initialQuiz.passingScore}
                   questions={initialQuiz.questions}
                 />
               ) : (
                 <div className="p-8 text-center text-muted-foreground bg-muted rounded-xl border border-border">
                   Quiz data is unavailable for this lesson.
                 </div>
               )}
             </div>
          ) : (
            <>
              <hr className="my-12 border-border" />
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Key Concept Review</h3>
                <Flashcard 
                  category="Review"
                  front={<>What is the main takeaway from this lesson?</>}
                  back={<>The main takeaway is understanding {currentLesson.title} within the context of {currentModule?.title}.</>}
                />
              </div>
            </>
          )}

          <hr className="my-12 border-border" />

          {/* Lesson Navigation */}
          <div className="mt-16 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            {prevLesson ? (
              <Link href={`/learn/${slug}/${prevLesson.id}`} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto gap-2 h-12 px-6">
                  <ChevronLeft className="h-4 w-4" /> Previous Lesson
                </Button>
              </Link>
            ) : (
              <div className="w-full sm:w-auto" />
            )}
            
            {nextLesson ? (
              <Button 
                onClick={() => handleCompleteAndContinue(`/learn/${slug}/${nextLesson.id}`)}
                disabled={isPending}
                className="w-full sm:w-auto gap-2 h-12 px-8 shadow-lg shadow-primary/20"
              >
                {isPending ? "Saving..." : "Continue"} <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={() => handleCompleteAndContinue(`/dashboard/courses/${slug}`)}
                disabled={isPending}
                className="w-full sm:w-auto gap-2 h-12 px-8 shadow-lg shadow-primary/20"
              >
                {isPending ? "Saving..." : "Finish Module"} <CheckCircle2 className="h-4 w-4" />
              </Button>
            )}
          </div>

        </div>
      </div>
      
      </div>
      {/* Sidebars */}
      {isNotesOpen && (
        <NotesPanel lessonId={lessonId} initialNote={initialNote} onClose={() => setIsNotesOpen(false)} />
      )}
      {isAiOpen && (
        <AiAssistantPanel lessonId={lessonId} initialMessages={initialAiMessages} onClose={() => setIsAiOpen(false)} />
      )}
    </div>
  );
}
