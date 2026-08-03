"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, MotionCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Avatar } from "@/components/ui/Avatar";
import { PlayCircle, BookOpen, Clock, Trophy } from "lucide-react";

export default function DashboardTemplate() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Here's what's happening with your learning journey.</p>
        </div>
        <Button>Browse Courses</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Courses in Progress", value: "3", icon: BookOpen },
          { label: "Completed Courses", value: "12", icon: Trophy },
          { label: "Learning Hours", value: "48h", icon: Clock },
          { label: "Current Streak", value: "5 days", icon: PlayCircle },
        ].map((stat, i) => (
          <MotionCard key={i} isHoverable>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </MotionCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-heading font-semibold">Continue Learning</h2>
          <Card>
            <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-full sm:w-48 h-32 bg-muted rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-4 w-full">
                <div>
                  <h3 className="font-semibold text-lg">Advanced Next.js Architecture</h3>
                  <p className="text-sm text-muted-foreground">Module 4: Server Components & Actions</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>65% Complete</span>
                    <span className="text-muted-foreground">2h 15m left</span>
                  </div>
                  <Progress value={65} />
                </div>
                <Button className="w-full sm:w-auto">Resume Course</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-semibold">Leaderboard</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                    <span className="font-bold text-muted-foreground w-4">{i}</span>
                    <Avatar size="sm" src={`https://i.pravatar.cc/150?u=${i}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Student Name</p>
                      <p className="text-xs text-muted-foreground">1,240 XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
