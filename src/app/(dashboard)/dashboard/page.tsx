import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { H1, H3, MutedText, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { BookOpen, Bookmark, Clock, CreditCard, PlayCircle } from "lucide-react";

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

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
      <header>
        <H1 className="mb-2">Welcome, {firstName}</H1>
        <MutedText>Here is an overview of your learning progress.</MutedText>
      </header>

      {/* Continue Learning */}
      <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-primary mb-2">
              <PlayCircle className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Continue Learning</span>
            </div>
            <H3>Getting Started with Yencoo</H3>
            <P>Pick up where you left off and complete your first course.</P>
          </div>
          <Button size="lg" className="w-full md:w-auto">
            Resume Course
          </Button>
        </div>
      </section>

      {/* Grid sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* My Courses */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-start gap-4 shadow-sm hover:border-primary/30 transition-colors">
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">My Courses</h4>
            <MutedText className="text-sm">View your enrolled courses</MutedText>
          </div>
          <Button variant="outline" className="w-full mt-auto">View All</Button>
        </div>

        {/* Bookmarks */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-start gap-4 shadow-sm hover:border-primary/30 transition-colors">
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">Bookmarks</h4>
            <MutedText className="text-sm">Saved lessons and articles</MutedText>
          </div>
          <Button variant="outline" className="w-full mt-auto">View Saved</Button>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-start gap-4 shadow-sm hover:border-primary/30 transition-colors">
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">Recent Activity</h4>
            <MutedText className="text-sm">Check your latest actions</MutedText>
          </div>
          <Button variant="outline" className="w-full mt-auto">View History</Button>
        </div>

        {/* Membership */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-start gap-4 shadow-sm hover:border-primary/30 transition-colors">
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">Membership</h4>
            <MutedText className="text-sm">Manage your billing and plan</MutedText>
          </div>
          <Button variant="outline" className="w-full mt-auto">Manage Plan</Button>
        </div>
      </div>
    </div>
  );
}
