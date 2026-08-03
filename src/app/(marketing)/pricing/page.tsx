import * as React from "react";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { H1, Lead } from "@/components/ui/Typography";
import { PricingPreviewSection } from "@/features/landing/components/PricingPreviewSection";
import { FAQSection } from "@/features/landing/components/FAQSection";

export const metadata: Metadata = {
  title: "Pricing | Yencoo",
  description: "Simple, transparent pricing for premium tech education.",
};

export default function PricingPage() {
  return (
    <>
      <section className="pt-24 pb-12">
        <Container className="text-center max-w-4xl">
          <H1 className="mb-6">Invest in Your Future</H1>
          <Lead>
            Get unlimited access to all courses, learning roadmaps, and the AI Tutor.
          </Lead>
        </Container>
      </section>
      
      <PricingPreviewSection />
      <FAQSection />
    </>
  );
}
