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
import { db as prisma } from "@/lib/db";
import { serializeDecimals } from "@/lib/serializers/decimal";

export const metadata: Metadata = {
  title: "Yencoo | From Curious to Capable",
  description: "Learn the skills that shape your future with Yencoo. Premium online courses, personalized roadmaps, and AI-assisted learning.",
};

async function getFeaturedCourses() {
  return await prisma.course.findMany({
    where: { 
      status: "PUBLISHED",
      deletedAt: null
    },
    take: 3,
    orderBy: { createdAt: "desc" },
    include: {
      category: true
    }
  });
}

export default async function LandingPage() {
  const featuredCoursesRaw = await getFeaturedCourses();
  const featuredCourses = serializeDecimals(featuredCoursesRaw);

  return (
    <>
      <HeroSection />
      <LearningCategoriesSection />
      <FeaturedCoursesSection courses={featuredCourses} />
      <LearningRoadmapsSection />
      <WhyChooseYencooSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
