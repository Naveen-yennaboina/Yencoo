"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Search, Star, CheckCircle, XCircle, Heart } from "lucide-react";

const REVIEWS = [
  { id: 1, user: "Alex Johnson", course: "Advanced TypeScript Patterns", rating: 5, comment: "This course completely changed how I write TS. The generics section is mind-blowing.", status: "Pending", date: "2 hours ago" },
  { id: 2, user: "Maria Garcia", course: "React Performance Optimization", rating: 4, comment: "Very good content, but I wish there were more practical exercises.", status: "Approved", date: "1 day ago" },
  { id: 3, user: "James Smith", course: "UI/UX Design Systems", rating: 1, comment: "Too basic. Not what I expected at all.", status: "Rejected", date: "2 days ago" },
];

export default function ReviewManagerPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground mt-1">Moderate student reviews and testimonials.</p>
      </div>

      <div className="flex border-b border-border mb-6">
        {["Pending", "Approved", "Rejected", "Featured"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              i === 0 ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {REVIEWS.map(review => (
          <Card key={review.id} className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{review.user}</h3>
                    <p className="text-sm text-muted-foreground">on <span className="font-medium text-foreground">{review.course}</span></p>
                  </div>
                  <div className="text-xs text-muted-foreground">{review.date}</div>
                </div>

                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-muted-foreground/30"}`} />
                  ))}
                </div>

                <p className="text-sm leading-relaxed">{review.comment}</p>
              </div>

              <div className="flex md:flex-col items-center justify-end gap-2 shrink-0 md:w-32 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                <Button variant="outline" size="sm" className="w-full text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 gap-2 border-emerald-500/20">
                  <CheckCircle className="h-4 w-4" /> Approve
                </Button>
                <Button variant="outline" size="sm" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 gap-2 border-destructive/20">
                  <XCircle className="h-4 w-4" /> Reject
                </Button>
                <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10">
                  <Heart className="h-4 w-4" /> Feature
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
