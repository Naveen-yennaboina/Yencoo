import * as React from "react";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { H1, Lead, P } from "@/components/ui/Typography";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us | Yencoo",
  description: "Get in touch with the Yencoo team.",
};

export default function ContactPage() {
  return (
    <section className="py-24">
      <Container className="max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <H1 className="mb-6">Get in Touch</H1>
            <Lead className="mb-8">
              Have questions about our courses, pricing, or need technical support? We're here to help.
            </Lead>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                <P className="text-muted-foreground mt-0">support@yencoo.com</P>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Office</h3>
                <P className="text-muted-foreground mt-0">
                  123 Tech Avenue<br />
                  San Francisco, CA 94105<br />
                  United States
                </P>
              </div>
            </div>
          </div>
          
          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium">First Name</label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="How can we help you?"
                />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
