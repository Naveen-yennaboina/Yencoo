import React from "react";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { AdminHeader } from "@/features/admin/components/AdminHeader";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

const ADMIN_ROLES: UserRole[] = [
  UserRole.ADMIN,
  UserRole.OWNER,
  UserRole.EDITOR,
  UserRole.INSTRUCTOR,
  UserRole.SUPPORT
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const user = await db.user.findUnique({
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

  if (!user || !ADMIN_ROLES.includes(user.role)) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen">
        <AdminHeader user={user} />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
