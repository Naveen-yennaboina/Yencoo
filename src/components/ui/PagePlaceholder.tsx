import * as React from "react";
import { H1, MutedText, P } from "@/components/ui/Typography";
import { Hammer } from "lucide-react";

interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
      <header>
        <H1 className="mb-2">{title}</H1>
        <MutedText>{description}</MutedText>
      </header>
      
      <section className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px] gap-4">
        <div className="p-4 bg-primary/10 text-primary rounded-full mb-2">
          <Hammer className="w-8 h-8" />
        </div>
        <h3 className="font-semibold text-xl">Coming Soon</h3>
        <P className="max-w-md text-muted-foreground">
          We are currently working on the {title.toLowerCase()} feature. Check back later for updates!
        </P>
      </section>
    </div>
  );
}
