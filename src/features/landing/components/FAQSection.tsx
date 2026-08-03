"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { H2, Lead } from "@/components/ui/Typography";

const faqs = [
  {
    question: "Do I get a certificate after completing a course?",
    answer: "Yes! For all Pro subscribers, we issue a verifiable certificate of completion for every premium course you finish. You can easily add these to your LinkedIn profile or resume."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Absolutely. There are no long-term contracts. You can cancel your Pro subscription at any time from your account settings, and you won't be billed again."
  },
  {
    question: "How does the AI Tutor work?",
    answer: "Our AI Tutor is integrated directly into the learning environment. If you're stuck on a coding challenge or don't understand a concept, you can highlight it and ask the AI for an explanation, hints, or debugging help."
  },
  {
    question: "Do I need prior experience to start learning?",
    answer: "Not at all. We have dedicated beginner roadmaps that start from absolute zero. Just pick a topic you're interested in, select the beginner roadmap, and follow the step-by-step instructions."
  },
  {
    question: "Do you offer team or enterprise plans?",
    answer: "Yes, we offer Yencoo for Business, which includes team management, analytics, and bulk pricing. Please contact our sales team for more information."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <H2 className="mb-4">Frequently Asked Questions</H2>
          <Lead>
            Everything you need to know about the product and billing.
          </Lead>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-2xl bg-card overflow-hidden"
            >
              <button
                className="flex items-center justify-between w-full p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
