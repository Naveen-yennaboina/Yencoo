"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Clock, BookOpen, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { H2, H4, Lead, SmallText } from "@/components/ui/Typography";

const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2026",
    instructor: "Dr. Angela Yu",
    rating: 4.9,
    students: "120k",
    duration: "65h",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    category: "Programming",
  },
  {
    id: 2,
    title: "Machine Learning A-Z: Hands-On Python",
    instructor: "Kirill Eremenko",
    rating: 4.8,
    students: "85k",
    duration: "42h",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    category: "AI",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Gary Simon",
    rating: 4.9,
    students: "45k",
    duration: "28h",
    level: "All Levels",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    category: "Design",
  },
];

export function FeaturedCoursesSection() {
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
          <Button variant="outline" className="hidden md:flex">
            View All Courses
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-md">
                    {course.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <H4 className="mb-2 line-clamp-2">{course.title}</H4>
                <SmallText className="text-muted-foreground mb-4">By {course.instructor}</SmallText>
                
                <div className="flex items-center gap-1 text-sm font-medium text-amber-500 mb-4">
                  <Star className="h-4 w-4 fill-amber-500" />
                  <span>{course.rating}</span>
                  <span className="text-muted-foreground ml-1 font-normal">({course.students} students)</span>
                </div>
                
                <div className="mt-auto pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.level}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-8 md:hidden">
          View All Courses
        </Button>
      </Container>
    </section>
  );
}
