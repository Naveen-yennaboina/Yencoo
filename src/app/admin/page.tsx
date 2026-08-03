"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Users, BookOpen, DollarSign, Activity, Plus } from "lucide-react";
import Link from "next/link";

const STATS = [
  { label: "Total Revenue", value: "$45,231.89", trend: "+20.1% from last month", icon: <DollarSign className="h-5 w-5 text-emerald-500" /> },
  { label: "Active Users", value: "2,350", trend: "+180 new users", icon: <Users className="h-5 w-5 text-blue-500" /> },
  { label: "Total Courses", value: "24", trend: "3 in draft", icon: <BookOpen className="h-5 w-5 text-purple-500" /> },
  { label: "Completion Rate", value: "68%", trend: "+2.4% from last month", icon: <Activity className="h-5 w-5 text-orange-500" /> },
];

const RECENT_ACTIVITY = [
  { id: 1, action: "New user registered", details: "john@example.com", time: "2 mins ago" },
  { id: 2, action: "Course purchased", details: "Advanced TypeScript Patterns", time: "1 hour ago" },
  { id: 3, action: "Review submitted", details: "5 stars on React Fundamentals", time: "3 hours ago" },
  { id: 4, action: "Subscription activated", details: "Pro Monthly (jane@example.com)", time: "5 hours ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your platform's performance.</p>
        </div>
        <Link href="/admin/courses">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Create Course
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <Card key={i} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
              <div className="p-2 bg-muted rounded-lg">{stat.icon}</div>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Mock) */}
        <Card className="lg:col-span-2 p-6 flex flex-col min-h-[400px]">
          <h3 className="text-lg font-bold mb-6">Revenue Overview</h3>
          <div className="flex-1 bg-muted/30 border border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground">
            [Chart Visualization Component]
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
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
          <Button variant="outline" className="w-full mt-6">View All Activity</Button>
        </Card>
      </div>
    </div>
  );
}
