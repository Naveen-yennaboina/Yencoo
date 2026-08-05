import React from "react";
import Link from "next/link";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AiCompanionPanel } from "@/components/learning/AiCompanionPanel";
import { CurriculumSidebar } from "@/features/learn/components/CurriculumSidebar";
import { MOCK_COURSES, MOCK_COURSE_MODULES } from "@/lib/mock-data";

export default async function LearnLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  const courseTitle = course?.title || "Course Details";
  const progress = course?.progress || 0; // percentage
  
  const modules = MOCK_COURSE_MODULES.filter((m) => m.courseId === course?.id)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/courses/${slug}`} className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline text-sm font-medium">Exit Course</span>
          </Link>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <h1 className="font-semibold text-sm sm:text-base line-clamp-1">{courseTitle}</h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Progress Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-sm font-medium">{progress}%</div>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="md:hidden p-2">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex w-full relative h-[calc(100vh-4rem)]">
        
        {/* Curriculum Sidebar */}
        {modules.length > 0 && <CurriculumSidebar courseSlug={slug} modules={modules} />}
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        
        {/* The AI Companion panel is rendered here. */}
        <AiCompanionPanel />
      </div>
    </div>
  );
}
