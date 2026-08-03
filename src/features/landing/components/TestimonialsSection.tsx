"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { H2, Lead, P, SmallText } from "@/components/ui/Typography";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Frontend Developer at TechCorp",
    content: "Yencoo completely transformed my career. The structured roadmaps took me from knowing zero HTML to landing a mid-level frontend role in just 8 months.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: 2,
    name: "David Chen",
    role: "UX Designer",
    content: "The quality of the UI/UX courses is unmatched. I've tried many platforms, but the instructors here actually teach real-world workflows that agencies use.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Data Scientist",
    content: "The AI-assisted learning feature is a game changer. Whenever I got stuck on a complex Python algorithm, the AI tutor explained it perfectly without just giving me the answer.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <H2 className="mb-4">Loved by Learners Worldwide</H2>
          <Lead>
            Join over 500,000 students who are advancing their careers with Yencoo.
          </Lead>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="rounded-2xl border bg-card p-8 shadow-sm flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <P className="italic text-muted-foreground mt-0 flex-1">
                "{testimonial.content}"
              </P>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t">
                <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0">
                  <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{testimonial.name}</h4>
                  <SmallText className="text-muted-foreground">{testimonial.role}</SmallText>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
