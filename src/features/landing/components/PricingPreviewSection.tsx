"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { H2, Lead, P } from "@/components/ui/Typography";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring and getting started.",
    features: [
      "Access to 50+ free introductory courses",
      "Basic community access",
      "Public learning roadmaps",
      "7-day trial of AI Tutor",
    ],
    buttonText: "Get Started for Free",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "Everything you need to master new skills.",
    features: [
      "Unlimited access to 2,000+ premium courses",
      "Unlimited AI-assisted learning",
      "Verifiable certificates of completion",
      "Private Discord community access",
      "Downloadable resources & source code",
    ],
    buttonText: "Subscribe to Pro",
    buttonVariant: "default" as const,
    popular: true,
  },
];

export function PricingPreviewSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-[100%] blur-[100px] -z-10" />
      
      <Container>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <H2 className="mb-4">Simple, transparent pricing</H2>
          <Lead>
            Invest in your future for less than the cost of a daily coffee.
          </Lead>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative flex flex-col rounded-3xl border bg-card p-8 shadow-sm ${
                plan.popular ? "ring-2 ring-primary border-transparent shadow-xl" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <P className="text-muted-foreground mt-0 mb-6">{plan.description}</P>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-muted-foreground mb-1">/{plan.period}</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant={plan.buttonVariant} size="lg" className="w-full" asChild>
                <Link href="/signup">{plan.buttonText}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
