"use server";

import { db as prisma } from "@/lib/db";

export async function getUserAnalytics(userId: string) {
  // 1. Get streak
  const streak = await prisma.userStreak.findUnique({
    where: { userId }
  });

  // 2. Get total time spent (sum of all lesson progress timeSpent)
  const allProgress = await prisma.lessonProgress.findMany({
    where: {
      enrollment: { userId }
    }
  });

  const totalTimeSpentSeconds = allProgress.reduce((acc, curr) => acc + (curr.timeSpent || 0), 0);
  const totalTimeSpentHours = Math.round((totalTimeSpentSeconds / 3600) * 10) / 10;

  // 3. Get completed lessons count
  const completedLessons = allProgress.filter(p => p.isCompleted).length;

  // 4. Get active courses (enrollments that are not completed)
  const activeCourses = await prisma.enrollment.count({
    where: {
      userId,
      progressPercent: {
        lt: 100
      }
    }
  });

  return {
    currentStreak: streak?.currentStreak || 0,
    longestStreak: streak?.longestStreak || 0,
    totalTimeSpentHours,
    completedLessons,
    activeCourses
  };
}
