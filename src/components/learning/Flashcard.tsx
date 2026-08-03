"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Repeat } from "lucide-react";

export interface FlashcardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  category?: string;
}

export function Flashcard({ front, back, category }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full max-w-md mx-auto aspect-[4/3] [perspective:1000px] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <Card className="absolute inset-0 [backface-visibility:hidden] w-full h-full bg-card border-2 flex flex-col justify-between p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span className="uppercase tracking-wider font-semibold text-xs">{category || "Flashcard"}</span>
            <Repeat className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex-1 flex items-center justify-center text-center px-4">
            <div className="text-xl font-medium">{front}</div>
          </div>
          <div className="text-center text-xs text-muted-foreground uppercase tracking-widest font-semibold opacity-50">
            Click to reveal
          </div>
        </Card>

        {/* Back */}
        <Card className="absolute inset-0 [backface-visibility:hidden] w-full h-full bg-primary text-primary-foreground flex flex-col justify-between p-6 shadow-md [transform:rotateY(180deg)]">
          <div className="flex justify-between items-center text-sm text-primary-foreground/70">
            <span className="uppercase tracking-wider font-semibold text-xs">{category || "Flashcard"} - Answer</span>
            <Repeat className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex-1 flex items-center justify-center text-center px-4">
            <div className="text-lg">{back}</div>
          </div>
          <div className="text-center text-xs text-primary-foreground/50 uppercase tracking-widest font-semibold">
            Click to flip back
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
