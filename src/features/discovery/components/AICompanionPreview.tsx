"use client";

import { Sparkles, Headphones, Languages, Lightbulb, CheckCircle2 } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";

export function AICompanionPreview() {
  const tabsData = [
    {
      label: "Explain",
      content: (
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-2 font-medium text-primary mb-2">
            <Lightbulb className="h-4 w-4" /> Explain it to me
          </div>
          <p className="text-muted-foreground">
            Stuck on a complex concept? Highlight any text and the AI will generate a tailored explanation based on your current knowledge level and learning style.
          </p>
          <div className="bg-background rounded p-3 border border-border text-xs text-muted-foreground shadow-sm">
            <span className="font-semibold text-foreground">You:</span> "Can you explain closures in simple terms?"<br/><br/>
            <span className="font-semibold text-primary">AI:</span> "Imagine a function is a backpack. When a function is created inside another function, it packs up all the variables from the outer function into its backpack..."
          </div>
        </div>
      )
    },
    {
      label: "Listen",
      content: (
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-2 font-medium text-primary mb-2">
            <Headphones className="h-4 w-4" /> Immersive Audio
          </div>
          <p className="text-muted-foreground">
            Listen to lessons on the go. Our advanced Text-to-Speech engine provides natural-sounding narration in multiple voices and languages.
          </p>
          <div className="flex items-center justify-center py-4">
            <div className="h-10 w-full max-w-xs bg-background rounded-full border border-border flex items-center px-4 gap-3 shadow-sm">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center pl-0.5">
                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-primary-foreground border-b-[4px] border-b-transparent"></div>
              </div>
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/3"></div>
              </div>
              <span className="text-xs text-muted-foreground font-mono">01:24</span>
            </div>
          </div>
        </div>
      )
    },
    {
      label: "Translate",
      content: (
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-2 font-medium text-primary mb-2">
            <Languages className="h-4 w-4" /> Real-time Translation
          </div>
          <p className="text-muted-foreground">
            Learn in your native language. Our AI translates course material dynamically, ensuring you never miss a beat due to language barriers.
          </p>
        </div>
      )
    },
    {
      label: "Quiz",
      content: (
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-2 font-medium text-primary mb-2">
            <CheckCircle2 className="h-4 w-4" /> Dynamic Quizzes
          </div>
          <p className="text-muted-foreground">
            Test your knowledge instantly. The AI companion reads the lesson and generates practice questions tailored to what you just learned.
          </p>
        </div>
      )
    },
    {
      label: "Examples",
      content: (
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-2 font-medium text-primary mb-2">
            <Sparkles className="h-4 w-4" /> Real-world Examples
          </div>
          <p className="text-muted-foreground">
            Abstract concepts are hard. Ask the AI for real-world examples applied to your specific industry or area of interest.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-5 border-b border-border flex items-start gap-4">
        <div className="bg-primary/20 p-2.5 rounded-xl text-primary">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg">AI Learning Companion</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            This course is enhanced with our proprietary AI companion. Get personalized explanations, audio narration, and real-time translation.
          </p>
        </div>
      </div>

      <div className="p-6">
        <Tabs tabs={tabsData} />
      </div>
    </div>
  );
}
