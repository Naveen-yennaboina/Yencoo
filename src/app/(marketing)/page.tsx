import * as React from "react";
import { Metadata } from "next";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { LearningCategoriesSection } from "@/features/landing/components/LearningCategoriesSection";
import { FeaturedCoursesSection } from "@/features/landing/components/FeaturedCoursesSection";
import { LearningRoadmapsSection } from "@/features/landing/components/LearningRoadmapsSection";
import { WhyChooseYencooSection } from "@/features/landing/components/WhyChooseYencooSection";
import { TestimonialsSection } from "@/features/landing/components/TestimonialsSection";
import { PricingPreviewSection } from "@/features/landing/components/PricingPreviewSection";
import { FAQSection } from "@/features/landing/components/FAQSection";
import { NewsletterSection } from "@/features/landing/components/NewsletterSection";

export const metadata: Metadata = {
  title: "Yencoo | From Curious to Capable",
  description: "Learn the skills that shape your future with Yencoo. Premium online courses, personalized roadmaps, and AI-assisted learning.",
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <LearningCategoriesSection />
      <FeaturedCoursesSection />
      <LearningRoadmapsSection />
      <WhyChooseYencooSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
