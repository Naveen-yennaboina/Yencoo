"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ShieldCheck, ArrowLeft, CreditCard, Lock, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { resolveUserCountry } from "@/lib/country-detection";

// Mock implementation of checkout
export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // In a real app, this would be determined server-side or via context
  const { countryCode, currency } = resolveUserCountry(null, "en-US");
  
  const plan = {
    name: "Pro Monthly",
    price: 29.00,
  };

  const tax = plan.price * 0.08; // Mock 8% tax
  const total = plan.price + tax - discount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toLowerCase() === "save20") {
      setDiscount(plan.price * 0.2);
    } else {
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      window.location.href = "/dashboard/billing";
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="h-20 border-b border-border bg-card flex items-center px-6">
        <Container className="flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl text-primary">Yencoo</Link>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Lock className="h-4 w-4" /> Secure Checkout
          </div>
        </Container>
      </header>

      <Container className="max-w-5xl py-12">
        <Link href="/pricing" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to pricing
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Checkout Form */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Complete your purchase</h1>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Account Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">First Name</label>
                    <Input placeholder="John" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                    <Input placeholder="Doe" defaultValue="Doe" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <Input type="email" placeholder="john@example.com" defaultValue="john@example.com" disabled />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-lg font-semibold">Payment Method</h3>
                <Card className="p-0 overflow-hidden border-border bg-card">
                  <div className="p-4 border-b border-border bg-primary/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="radio" defaultChecked className="w-4 h-4 text-primary focus:ring-primary accent-primary" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                    <div className="flex gap-2">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="p-6 space-y-4 bg-card">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Card Information</label>
                      <div className="relative">
                        <Input placeholder="Card number" className="pl-10" />
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM / YY" />
                      <Input placeholder="CVC" />
                    </div>
                    <Input placeholder="Name on card" />
                  </div>
                </Card>
              </div>

              <div className="pt-6">
                <Button 
                  size="lg" 
                  className="w-full text-base h-12" 
                  onClick={handleCheckout}
                  isLoading={isProcessing}
                >
                  Pay {formatCurrency(total)}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Payments are secure and encrypted.
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <Card className="p-6 bg-card border-border shadow-xl">
                <h3 className="text-lg font-bold mb-6">Order Summary</h3>
                
                <div className="flex justify-between mb-4">
                  <div>
                    <div className="font-medium">{plan.name}</div>
                    <div className="text-sm text-muted-foreground">Billed monthly</div>
                  </div>
                  <div className="font-medium">{formatCurrency(plan.price)}</div>
                </div>

                <div className="space-y-3 py-4 border-y border-border my-4 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatCurrency(plan.price)}</span>
                  </div>
                  
                  <AnimatePresence>
                    {discount > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="flex justify-between text-emerald-500 font-medium"
                      >
                        <span>Discount (SAVE20)</span>
                        <span>-{formatCurrency(discount)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Tax ({countryCode})</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-6">
                  <span className="font-semibold text-lg">Total</span>
                  <div className="text-right">
                    <span className="font-bold text-3xl">{formatCurrency(total)}</span>
                    <div className="text-xs text-muted-foreground">{currency}</div>
                  </div>
                </div>

                {/* Coupon Code */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Input 
                      placeholder="Promo code" 
                      className="pl-9 bg-muted/50" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  <Button variant="secondary" type="submit">Apply</Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
