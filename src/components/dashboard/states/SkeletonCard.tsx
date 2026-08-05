import React from "react";
import { DashboardCard } from "../cards/DashboardCard";
import { Skeleton } from "@/components/ui/Skeleton";

export function SkeletonCard() {
  return (
    <DashboardCard className="flex flex-col gap-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-24 w-full mt-2" />
    </DashboardCard>
  );
}
