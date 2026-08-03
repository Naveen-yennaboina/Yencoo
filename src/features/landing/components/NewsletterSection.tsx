"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { H2, Lead } from "@/components/ui/Typography";

export function NewsletterSection() {
  return (
    <section className="py-24">
      <Container>
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-16 text-center relative overflow-hidden">
          {/* Abstract BG pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0,transparent_100%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <H2 className="mb-4">Ready to start learning?</H2>
            <Lead className="mb-8 text-primary-foreground/90">
              Join our newsletter to get weekly tips, free resources, and updates on new courses.
            </Lead>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/50"
                required
              />
              <Button type="submit" variant="secondary" className="shrink-0">
                Subscribe
              </Button>
            </form>
            <p className="mt-4 text-xs text-primary-foreground/70">
              We care about your data in our privacy policy.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
