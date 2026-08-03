import * as React from "react";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { H1, H2, Lead, P } from "@/components/ui/Typography";
import { NewsletterSection } from "@/features/landing/components/NewsletterSection";

export const metadata: Metadata = {
  title: "About Us | Yencoo",
  description: "Learn about our mission to make high-quality tech education accessible to everyone.",
};

export default function AboutPage() {
  return (
    <>
      <section className="py-24 bg-muted/30">
        <Container className="max-w-4xl text-center">
          <H1 className="mb-6">About Yencoo</H1>
          <Lead>
            We're on a mission to bridge the gap between ambition and opportunity by providing world-class, AI-assisted tech education.
          </Lead>
        </Container>
      </section>

      <section className="py-24">
        <Container className="max-w-4xl">
          <div className="space-y-12">
            <div>
              <H2 className="mb-4">Our Story</H2>
              <P>
                Founded in 2026, Yencoo started with a simple observation: traditional education is too slow, and self-taught learning is too unstructured. We wanted to create a platform that combines the structured path of a degree with the practical, up-to-date skills required by modern industry, all accelerated by AI.
              </P>
            </div>
            
            <div>
              <H2 className="mb-4">Our Approach</H2>
              <P>
                We believe that anyone can master complex technical skills if they are presented in a clear, structured way. Our learning roadmaps remove the guesswork of "what to learn next", while our AI tutor ensures you never get stuck on a frustrating bug or confusing concept for too long.
              </P>
            </div>
          </div>
        </Container>
      </section>

      <NewsletterSection />
    </>
  );
}
