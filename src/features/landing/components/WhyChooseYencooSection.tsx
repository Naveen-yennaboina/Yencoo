"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Trophy, Target, Headphones, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { H2, H4, Lead, P } from "@/components/ui/Typography";

const features = [
  {
    icon: Target,
    title: "Goal-Oriented Learning",
    description: "Every course is designed with specific outcomes in mind, ensuring you learn exactly what you need for your career."
  },
  {
    icon: Zap,
    title: "AI-Powered Assistance",
    description: "Get unstuck quickly with our integrated AI tutor that explains complex concepts and helps debug your code."
  },
  {
    icon: Trophy,
    title: "Certificates of Completion",
    description: "Earn verifiable certificates to showcase your new skills on LinkedIn and your resume."
  },
  {
    icon: ShieldCheck,
    title: "High-Quality Content",
    description: "We strictly vet all instructors and courses to ensure you're getting premium, up-to-date education."
  },
  {
    icon: Layers,
    title: "Bite-Sized Lessons",
    description: "Complex topics are broken down into digestible 5-10 minute videos and interactive exercises."
  },
  {
    icon: Headphones,
    title: "Community Support",
    description: "Join thousands of other learners in our Discord community to network, ask questions, and collaborate."
  }
];

export function WhyChooseYencooSection() {
  return (
    <section className="py-24">
      <Container>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <H2 className="mb-4">Why Choose Yencoo?</H2>
          <Lead>
            We've redesigned online learning to be more engaging, effective, and aligned with industry needs.
          </Lead>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <feature.icon className="h-7 w-7" />
              </div>
              <H4 className="mb-3">{feature.title}</H4>
              <P className="text-muted-foreground mt-0">{feature.description}</P>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
