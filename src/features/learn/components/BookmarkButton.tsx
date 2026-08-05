"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Bookmark } from "lucide-react";
import { toggleBookmark } from "@/actions/learn-actions";
import { usePathname } from "next/navigation";

export function BookmarkButton({ lessonId, initialIsBookmarked }: { lessonId: string, initialIsBookmarked: boolean }) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  return (
    <Button 
      variant={initialIsBookmarked ? "default" : "outline"} 
      size="icon" 
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          toggleBookmark(lessonId, pathname);
        });
      }}
    >
      <Bookmark className={`w-5 h-5 ${initialIsBookmarked ? 'fill-current' : ''}`} />
    </Button>
  );
}
