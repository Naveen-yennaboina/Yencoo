import React from "react";
import Link from "next/link";
import { Users, BookOpen, DollarSign, Activity, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/dashboard/cards/StatCard";
import { PageHeader } from "@/components/dashboard/layout/PageHeader";
import { PageContainer } from "@/components/dashboard/layout/PageContainer";
import { PageSection } from "@/components/dashboard/layout/PageSection";
import { Card } from "@/components/ui/Card";

const STATS = [
  { label: "Total Revenue", value: "$45,231.89", description: "Compared to last month", trend: { value: 20.1, label: "from last month", positive: true }, icon: <DollarSign className="h-5 w-5 text-emerald-500" /> },
  { label: "Active Users", value: "2,350", description: "New users joined", trend: { value: 8.2, label: "from last month", positive: true }, icon: <Users className="h-5 w-5 text-blue-500" /> },
  { label: "Total Courses", value: "24", description: "3 in draft", icon: <BookOpen className="h-5 w-5 text-purple-500" /> },
  { label: "Completion Rate", value: "68%", description: "Average completion", trend: { value: 2.4, label: "from last month", positive: true }, icon: <Activity className="h-5 w-5 text-orange-500" /> },
];

const RECENT_ACTIVITY = [
  { id: 1, action: "New user registered", details: "john@example.com", time: "2 mins ago" },
  { id: 2, action: "Course purchased", details: "Advanced TypeScript Patterns", time: "1 hour ago" },
  { id: 3, action: "Review submitted", details: "5 stars on React Fundamentals", time: "3 hours ago" },
  { id: 4, action: "Subscription activated", details: "Pro Monthly (jane@example.com)", time: "5 hours ago" },
];

export default function AdminDashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Overview of your platform's performance."
        actions={
          <Link href="/admin/courses">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Create Course
            </Button>
          </Link>
        }
      />

      <PageSection>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <StatCard
              key={i}
              title={stat.label}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>
      </PageSection>

      <PageSection>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area (Mock) */}
          <Card className="lg:col-span-2 p-6 flex flex-col min-h-[400px]">
            <h3 className="text-lg font-bold mb-6">Revenue Overview</h3>
            <div className="flex-1 bg-muted/30 border border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground">
              [Chart Visualization Component]
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 flex flex-col h-full">
            <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
            <div className="space-y-6 flex-1">
              {RECENT_ACTIVITY.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1 opacity-70">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 shrink-0">View All Activity</Button>
          </Card>
        </div>
      </PageSection>
    </PageContainer>
  );
}
