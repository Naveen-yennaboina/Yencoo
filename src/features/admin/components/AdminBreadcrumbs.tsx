"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/Breadcrumb";

export function AdminBreadcrumbs() {
  const pathname = usePathname();
  
  // E.g. /admin/courses/new -> ["admin", "courses", "new"]
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length <= 1) {
    return null; // Don't show breadcrumbs on the root admin dashboard
  }

  return (
    <div className="hidden sm:block">
      <Breadcrumb>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          
          // Capitalize and format segment (e.g. "new-course" -> "New Course")
          const title = segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          return (
            <BreadcrumbItem key={href} isCurrentPage={isLast}>
              {isLast ? (
                title
              ) : (
                <Link href={href} className="hover:underline">
                  {title}
                </Link>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </div>
  );
}
