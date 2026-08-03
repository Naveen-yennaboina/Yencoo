import * as React from "react";
import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
}
