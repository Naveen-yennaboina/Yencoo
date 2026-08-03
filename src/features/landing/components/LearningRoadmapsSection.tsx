"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Map, Zap, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { H2, H3, P, Lead } from "@/components/ui/Typography";

export function LearningRoadmapsSection() {
  return (
    <section className="py-24 bg-primary/5 border-y border-primary/10 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              <Map className="mr-2 h-4 w-4" />
              <span>Structured Learning</span>
            </div>
            
            <H2 className="mb-6">Don't know where to start? Follow a Roadmap.</H2>
            
            <Lead className="mb-8">
              Skip the guesswork. Our expert-curated learning roadmaps guide you from beginner to job-ready professional step by step.
            </Lead>

            <div className="space-y-4 mb-8">
              {[
                "Curated by industry experts",
                "Clear progression from basic to advanced",
                "Project-based milestones",
                "AI-assisted progress tracking",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <P className="mt-0">{item}</P>
                </div>
              ))}
            </div>

            <Button size="lg">Explore Roadmaps</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Visual representation of a roadmap */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl -z-10 blur-xl" />
            <div className="rounded-3xl border bg-card p-8 shadow-xl relative">
              
              <div className="absolute top-0 bottom-0 left-[39px] w-0.5 bg-border -z-10" />

              <div className="space-y-8 relative z-10">
                {[
                  { title: "HTML & CSS Basics", desc: "Build your first website.", active: true },
                  { title: "JavaScript Fundamentals", desc: "Make it interactive.", active: true },
                  { title: "React & Next.js", desc: "Build modern web apps.", active: false },
                  { title: "Full-Stack & Databases", desc: "Connect to the backend.", active: false },
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 relative">
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      step.active ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-muted-foreground"
                    }`}>
                      {step.active ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold">{i+1}</span>}
                    </div>
                    <div>
                      <H3 className={`text-lg mb-1 ${!step.active && "text-muted-foreground"}`}>{step.title}</H3>
                      <P className="mt-0 text-sm text-muted-foreground">{step.desc}</P>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
