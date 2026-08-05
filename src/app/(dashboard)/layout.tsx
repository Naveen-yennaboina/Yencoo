import React from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";

import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  let user = null;

  if (session) {
    user = await db.user.findUnique({
      where: { id: session.sub },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        streak: true,
        createdAt: true,
        _count: {
          select: {
            certificates: true,
            enrollments: {
              where: {
                progressPercent: { lt: 100 }
              }
            }
          }
        },
        enrollments: {
          select: {
            timeSpent: true
          }
        }
      }
    });
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen">
        <DashboardHeader user={user} />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
