import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { BookOpen, Bookmark, Clock, CreditCard, PlayCircle } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/dashboard/layout/PageContainer";
import { PageHeader } from "@/components/dashboard/layout/PageHeader";
import { DashboardGrid } from "@/components/dashboard/layout/DashboardGrid";
import { DashboardCard } from "@/components/dashboard/cards/DashboardCard";
import { FeatureCard } from "@/components/dashboard/cards/FeatureCard";
import { StatCard } from "@/components/dashboard/cards/StatCard";
import { ActionButton } from "@/components/dashboard/common/ActionButton";
import { getUserAnalytics } from "@/actions/analytics-actions";
import { Flame, Target, Trophy, Laptop } from "lucide-react";

export const metadata = {
  title: "Dashboard - Yencoo",
  description: "Your personal learning dashboard",
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.sub },
    select: { firstName: true, lastName: true },
  });

  if (!user) {
    redirect("/login");
  }

  const firstName = user.firstName || "Learner";
  const analytics = await getUserAnalytics(session.sub);

  return (
    <PageContainer size="wide">
      <PageHeader 
        title={`Welcome back, ${firstName}`} 
        description="Here is an overview of your learning progress and recent activity."
      />

      <div className="flex flex-col gap-8">
        {/* Analytics Grid */}
        <DashboardGrid cols={4}>
          <StatCard
            title="Learning Streak"
            value={`${analytics.currentStreak} Days`}
            description={`Longest: ${analytics.longestStreak} days`}
            icon={<Flame className="w-5 h-5 text-orange-500" />}
          />
          <StatCard
            title="Time Spent"
            value={`${analytics.totalTimeSpentHours}h`}
            description="Total learning time"
            icon={<Clock className="w-5 h-5 text-blue-500" />}
          />
          <StatCard
            title="Completed Lessons"
            value={analytics.completedLessons}
            description="Total finished"
            icon={<Trophy className="w-5 h-5 text-yellow-500" />}
          />
          <StatCard
            title="Active Courses"
            value={analytics.activeCourses}
            description="Currently in progress"
            icon={<Laptop className="w-5 h-5 text-green-500" />}
          />
        </DashboardGrid>
        {/* Continue Learning */}
        <DashboardCard className="bg-gradient-to-r from-card to-muted/50 border-primary/20 shadow-md">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-primary mb-2">
                <PlayCircle className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Continue Learning</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Getting Started with Yencoo</h2>
              <p className="text-muted-foreground text-sm md:text-base">Pick up where you left off and complete your first course.</p>
            </div>
            <ActionButton size="lg" className="w-full md:w-auto mt-4 md:mt-0 shadow-lg">
              Resume Course
            </ActionButton>
          </div>
        </DashboardCard>

        {/* Grid sections */}
        <DashboardGrid cols={4}>
          <FeatureCard
            title="My Courses"
            description="View your enrolled courses"
            icon={<BookOpen className="w-5 h-5 md:w-6 md:h-6" />}
            action={
              <Link href="/dashboard/courses" className="w-full">
                <ActionButton variant="outline" className="w-full">View All</ActionButton>
              </Link>
            }
          />
          
          <FeatureCard
            title="Bookmarks"
            description="Saved lessons and articles"
            icon={<Bookmark className="w-5 h-5 md:w-6 md:h-6" />}
            action={
              <Link href="/dashboard/bookmarks" className="w-full">
                <ActionButton variant="outline" className="w-full">View Saved</ActionButton>
              </Link>
            }
          />

          <FeatureCard
            title="Recent Activity"
            description="Check your latest actions"
            icon={<Clock className="w-5 h-5 md:w-6 md:h-6" />}
            action={
              <Link href="/dashboard/progress" className="w-full">
                <ActionButton variant="outline" className="w-full">View History</ActionButton>
              </Link>
            }
          />

          <FeatureCard
            title="Membership"
            description="Manage your billing and plan"
            icon={<CreditCard className="w-5 h-5 md:w-6 md:h-6" />}
            action={
              <Link href="/dashboard/billing" className="w-full">
                <ActionButton variant="outline" className="w-full">Manage Plan</ActionButton>
              </Link>
            }
          />
        </DashboardGrid>
      </div>
    </PageContainer>
  );
}
