import { PageContainer } from "@/components/dashboard/layout/PageContainer";
import { PageHeader } from "@/components/dashboard/layout/PageHeader";
import { SectionCard } from "@/components/dashboard/cards/SectionCard";
import { EmptyState } from "@/components/dashboard/states/EmptyState";
import { Bookmark, PlayCircle, FileText, CheckSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getUserBookmarks } from "@/actions/learn-actions";
import { BookmarkButton } from "@/features/learn/components/BookmarkButton";

export default async function BookmarksPage() {
  const bookmarks = await getUserBookmarks();

  return (
    <PageContainer size="wide">
      <PageHeader 
        title="Bookmarks"
        description="Access your saved content and resources."
      />
      
      {bookmarks.length === 0 ? (
        <SectionCard>
          <EmptyState
            icon={<Bookmark className="w-8 h-8" />}
            title="No bookmarks yet"
            description="When you save a course or lesson, it will appear here."
          />
        </SectionCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map(({ lesson }) => {
            // Note: Currently no specific lesson type saved in the schema, assuming default icon for now
            // In a real app, lesson.type might be added to the schema if we wanted it
            const Icon = PlayCircle;
            const course = lesson.module.course;
            
            return (
              <SectionCard key={lesson.id} className="flex flex-col h-full overflow-hidden group">
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="-mr-2 -mt-2">
                      <BookmarkButton lessonId={lesson.id} initialIsBookmarked={true} />
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {course.title}
                    </div>
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {lesson.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Module: {lesson.module.title}
                  </p>
                </div>
                
                <div className="p-4 border-t border-border bg-muted/20">
                  <Link href={`/learn/${course.slug}/${lesson.id}`} className="block">
                    <Button className="w-full" variant="outline">
                      Resume Lesson
                    </Button>
                  </Link>
                </div>
              </SectionCard>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
