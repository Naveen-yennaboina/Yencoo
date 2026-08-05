"use server";

import { db as prisma } from "@/lib/db";
import { CourseStatus } from "@prisma/client";

// Simulate a logged-in user for Phase 4 development
const TEST_USER_EMAIL = 'test@yencoo.com';

async function getTestUserId() {
  const user = await prisma.user.findUnique({ where: { email: TEST_USER_EMAIL } });
  if (!user) throw new Error("Test user not found. Did you run the seed script?");
  return user.id;
}

export async function getPublishedCourses() {
  return prisma.course.findMany({
    where: { status: CourseStatus.PUBLISHED },
    include: {
      category: true,
      _count: {
        select: { modules: true, enrollments: true },
      },
    },
  });
}

export async function getCourseBySlug(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    include: {
      category: true,
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
        },
      },
    },
  });
}

export async function getUserEnrollment(courseId: string) {
  const userId = await getTestUserId();
  return prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    include: {
      progress: true,
    }
  });
}
