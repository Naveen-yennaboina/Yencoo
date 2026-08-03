import Link from "next/link";
import Image from "next/image";
import { Clock, BarChart, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { Course, DifficultyLevel } from "@prisma/client";

// Extension of Prisma Course with the fields we need for the card
export interface CourseCardData extends Partial<Course> {
  id: string;
  slug: string;
  title: string;
  thumbnailUrl: string | null;
  difficultyLevel: DifficultyLevel;
  estimatedAudioDuration: number | null;
  aiExplanationEnabled: boolean;
  category?: { name: string } | null;
  rating?: number; // Mocked or aggregated
  reviewCount?: number;
  price?: number; // Null for free
}

export interface CourseCardProps {
  course: CourseCardData;
}

export function CourseCard({ course }: CourseCardProps) {
  const isFree = !course.price || course.price === 0;

  return (
    <Link href={`/courses/${course.slug}`} className="group h-full flex flex-col">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {course.thumbnailUrl ? (
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary/50 text-muted-foreground">
              No Image
            </div>
          )}
          {course.aiExplanationEnabled && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-primary/20 text-primary gap-1">
                <Sparkles className="h-3 w-3" /> AI
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium text-primary">{course.category?.name || "Uncategorized"}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <BarChart className="h-3.5 w-3.5" />
                {course.difficultyLevel.toLowerCase()}
              </span>
              {course.estimatedAudioDuration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {Math.round(course.estimatedAudioDuration / 60)}h
                </span>
              )}
            </div>
          </div>
          
          <h3 className="line-clamp-2 font-semibold leading-tight tracking-tight group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Rating value={course.rating || 4.5} className="text-yellow-400" />
              <span className="text-xs text-muted-foreground">({course.reviewCount || 120})</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4 pt-3 flex items-center justify-between">
          <div className="font-semibold">
            {isFree ? (
              <span className="text-emerald-500">Free</span>
            ) : (
              <span>${course.price?.toFixed(2)}</span>
            )}
          </div>
          <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            View Course &rarr;
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
