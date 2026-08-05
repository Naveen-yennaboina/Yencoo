import Link from 'next/link';
import Image from 'next/image';
import { Course } from '../types';
import { Star, BookOpen, BarChart } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const isEnrolled = course.progress !== undefined;
  
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 active:scale-[0.98] sm:active:scale-100 hover:shadow-md sm:hover:-translate-y-1">
      <Link href={isEnrolled ? `/dashboard/courses/${course.slug}` : `/courses/${course.slug}`} className="block relative aspect-video w-full overflow-hidden">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-neutral-400" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-neutral-100 rounded-md backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm">
            {course.category.name}
          </span>
        </div>
      </Link>
      
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-3">
          <div className="flex items-center gap-1.5">
            <BarChart className="w-4 h-4" />
            <span className="capitalize">{course.difficultyLevel.toLowerCase()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessonsCount} lessons</span>
          </div>
        </div>

        <Link href={isEnrolled ? `/dashboard/courses/${course.slug}` : `/courses/${course.slug}`} className="group">
          <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors line-clamp-2">
            {course.title}
          </h3>
        </Link>
        
        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-6">
          {course.description}
        </p>

        <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              {course.instructor.avatarUrl ? (
                <Image
                  src={course.instructor.avatarUrl}
                  alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                  width={24}
                  height={24}
                  className="rounded-full ring-2 ring-white dark:ring-neutral-900"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 ring-2 ring-white dark:ring-neutral-900" />
              )}
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {course.instructor.firstName} {course.instructor.lastName}
              </span>
            </div>
            
            {!isEnrolled && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{course.rating}</span>
                <span className="text-xs text-neutral-500">({(course.studentsCount / 1000).toFixed(1)}k)</span>
              </div>
            )}
          </div>

          {isEnrolled ? (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-medium text-neutral-600 dark:text-neutral-400">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-neutral-900 dark:bg-neutral-100 transition-all duration-500 ease-in-out rounded-full" 
                  style={{ width: `${course.progress}%` }} 
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg text-neutral-900 dark:text-white">
                ${course.price?.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
