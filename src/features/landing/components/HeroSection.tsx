"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { H1, Lead } from "@/components/ui/Typography";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,103,76,0.15),rgba(255,255,255,0))]" />
      
      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl flex flex-col items-center"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Introducing AI-assisted learning paths</span>
          </div>
          
          <H1 className="mb-6 tracking-tight">
            Learn the Skills That <br className="hidden sm:block" />
            <span className="text-primary">Shape Your Future</span>
          </H1>
          
          <Lead className="mb-10 max-w-2xl mx-auto">
            From programming and AI to business, design, cloud, cybersecurity, and beyond—master in-demand skills through structured courses, personalized roadmaps, and AI-assisted learning.
          </Lead>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto group" asChild>
              <Link href="/signup">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-background/50 backdrop-blur-sm" asChild>
              <Link href="/courses">
                Explore Courses
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Hero Image Mockup Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 mx-auto max-w-5xl relative"
        >
          <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-md shadow-2xl overflow-hidden aspect-video relative flex items-center justify-center">
            {/* Abstract representation of a dashboard/app */}
            <div className="absolute inset-0 bg-gradient-to-tr from-muted/50 to-muted/20" />
            <div className="relative z-10 flex flex-col items-center gap-4 opacity-50">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">Interactive Learning Environment</p>
            </div>
            
            {/* Fake UI Elements */}
            <div className="absolute top-4 left-4 right-4 h-8 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
              <div className="w-3 h-3 rounded-full bg-green-400/50" />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
