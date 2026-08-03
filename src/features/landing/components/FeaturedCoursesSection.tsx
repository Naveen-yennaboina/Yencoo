"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Clock, BookOpen, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { H2, H4, Lead, SmallText } from "@/components/ui/Typography";
import Link from "next/link";

export function FeaturedCoursesSection({ courses = [] }: { courses?: any[] }) {
  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <H2 className="mb-4">Featured Courses</H2>
            <Lead className="max-w-xl">
              Hand-picked courses by industry experts to help you build real-world skills.
            </Lead>
          </div>
          <Link href="/courses">
            <Button variant="outline" className="hidden md:flex">
              View All Courses
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <Link href={`/courses/${course.slug || course.id}`} className="flex flex-col h-full">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {course.thumbnailUrl ? (
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground transition-transform duration-500 group-hover:scale-105">
                      <ImageIcon className="h-10 w-10 opacity-50" />
                    </div>
                  )}
                  {course.category?.name && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-md">
                        {course.category.name}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <H4 className="mb-2 line-clamp-2">{course.title}</H4>
                  
                  <div className="flex items-center gap-1 text-sm font-medium text-amber-500 mb-4 mt-2">
                    <Star className="h-4 w-4 fill-amber-500" />
                    <span>4.9</span>
                    <span className="text-muted-foreground ml-1 font-normal">(120 reviews)</span>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.estimatedAudioDuration || course.estimatedReadingTime || "5"}h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.difficultyLevel?.toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase()) || "All Levels"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <Link href="/courses">
          <Button variant="outline" className="w-full mt-8 md:hidden">
            View All Courses
          </Button>
        </Link>
      </Container>
    </section>
  );
}

// Added an icon for fallback
function ImageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}
