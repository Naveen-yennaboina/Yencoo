"use client";

import { Rating } from "@/components/ui/Rating";
import { Avatar } from "@/components/ui/Avatar";

export interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewSectionProps {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

export function ReviewSection({ averageRating, totalReviews, reviews }: ReviewSectionProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-lg min-w-[200px]">
          <span className="text-5xl font-bold tracking-tighter text-foreground mb-2">
            {averageRating.toFixed(1)}
          </span>
          <Rating value={averageRating} className="mb-1" />
          <span className="text-sm text-muted-foreground font-medium">
            Course Rating
          </span>
        </div>
        
        <div className="flex-1 space-y-4 w-full">
          {/* Mock rating bars - in a real app this would be calculated */}
          {[5, 4, 3, 2, 1].map(stars => {
            const percentage = stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2;
            return (
              <div key={stars} className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 w-12 text-muted-foreground">
                  <span>{stars}</span>
                  <Rating value={1} max={1} className="text-muted-foreground/50" />
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-muted-foreground">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold">Reviews ({totalReviews})</h3>
        <div className="grid gap-6">
          {reviews.map(review => (
            <div key={review.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
              <div className="flex items-center gap-4 mb-3">
                <Avatar 
                  src={review.user.avatar} 
                  fallback={review.user.name.charAt(0)} 
                />
                <div>
                  <div className="font-semibold">{review.user.name}</div>
                  <div className="flex items-center gap-2">
                    <Rating value={review.rating} />
                    <span className="text-xs text-muted-foreground">• {new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
