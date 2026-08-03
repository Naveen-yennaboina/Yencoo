import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingProps {
  value: number; // 0 to 5
  max?: number; // default 5
  className?: string;
  starClassName?: string;
  showValue?: boolean;
}

export function Rating({ value, max = 5, className, starClassName, showValue = false }: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`Rating: ${value} out of ${max}`}>
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className={cn("h-4 w-4 fill-yellow-400 text-yellow-400", starClassName)} />
        ))}
        {hasHalfStar && <StarHalf className={cn("h-4 w-4 fill-yellow-400 text-yellow-400", starClassName)} />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className={cn("h-4 w-4 text-muted-foreground/30", starClassName)} />
        ))}
      </div>
      {showValue && <span className="text-sm font-medium text-muted-foreground">{value.toFixed(1)}</span>}
    </div>
  );
}
