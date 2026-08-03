"use client";

import { AccordionItem } from "@/components/ui/Accordion";
import { PlayCircle, FileText, Lock } from "lucide-react";

export interface PreviewLesson {
  id: string;
  title: string;
  type: "VIDEO" | "TEXT";
  durationStr?: string;
  isPreview: boolean;
}

export interface PreviewModule {
  id: string;
  title: string;
  lessons: PreviewLesson[];
}

export interface CurriculumPreviewProps {
  modules: PreviewModule[];
}

export function CurriculumPreview({ modules }: CurriculumPreviewProps) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="bg-muted/50 px-6 py-4 border-b border-border">
        <h3 className="font-semibold">Course Curriculum</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {modules.length} modules • {modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
        </p>
      </div>
      
      <div className="divide-y divide-border">
        {modules.map((module, index) => (
          <AccordionItem
            key={module.id}
            defaultExpanded={index === 0}
            className="border-none px-6"
            title={
              <div className="flex flex-col text-left">
                <span className="font-semibold">{module.title}</span>
                <span className="text-xs text-muted-foreground font-normal mt-0.5">
                  {module.lessons.length} lessons
                </span>
              </div>
            }
            content={
              <div className="flex flex-col gap-2 pt-2 pb-4">
                {module.lessons.map(lesson => (
                  <div key={lesson.id} className="flex items-center justify-between py-2 group">
                    <div className="flex items-center gap-3">
                      {lesson.type === "VIDEO" ? (
                        <PlayCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      ) : (
                        <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                      
                      <span className={lesson.isPreview ? "font-medium group-hover:text-primary transition-colors cursor-pointer" : "text-muted-foreground"}>
                        {lesson.title}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      {lesson.isPreview ? (
                        <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full cursor-pointer hover:bg-emerald-500/20 transition-colors">
                          Preview
                        </span>
                      ) : (
                        <Lock className="h-3.5 w-3.5 text-muted-foreground/50" />
                      )}
                      {lesson.durationStr && (
                        <span className="text-muted-foreground w-12 text-right">{lesson.durationStr}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
