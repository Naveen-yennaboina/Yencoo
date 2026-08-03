"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Code, Brain, Briefcase, Palette, Cloud, Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { H2, Lead, H4, MutedText } from "@/components/ui/Typography";

const categories = [
  { name: "Programming", icon: Code, count: "120+ Courses", color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Artificial Intelligence", icon: Brain, count: "45+ Courses", color: "text-purple-500", bg: "bg-purple-500/10" },
  { name: "Business & Management", icon: Briefcase, count: "80+ Courses", color: "text-green-500", bg: "bg-green-500/10" },
  { name: "Design & UX", icon: Palette, count: "65+ Courses", color: "text-pink-500", bg: "bg-pink-500/10" },
  { name: "Cloud Computing", icon: Cloud, count: "50+ Courses", color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { name: "Cybersecurity", icon: Shield, count: "35+ Courses", color: "text-orange-500", bg: "bg-orange-500/10" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function LearningCategoriesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-16">
          <H2 className="mb-4">Explore Top Categories</H2>
          <Lead className="max-w-2xl mx-auto">
            Find the perfect course to advance your career or start a new one.
          </Lead>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group cursor-pointer rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${category.bg}`}>
                <category.icon className={`h-6 w-6 ${category.color}`} />
              </div>
              <H4 className="mb-2 group-hover:text-primary transition-colors">{category.name}</H4>
              <MutedText>{category.count}</MutedText>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
