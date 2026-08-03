"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Plus, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react";

const COUPONS = [
  { code: "SAVE20", type: "PERCENTAGE", value: 20, expiry: "2026-12-31", uses: 45, limit: 100, status: "Active" },
  { code: "WELCOME", type: "FIXED", value: 10, expiry: "2026-10-15", uses: 120, limit: "Unlimited", status: "Active" },
  { code: "FLASH50", type: "PERCENTAGE", value: 50, expiry: "2026-07-01", uses: 500, limit: 500, status: "Expired" },
];

export default function CouponManagerPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
          <p className="text-muted-foreground mt-1">Manage discounts and promotional codes.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Coupon
        </Button>
      </div>

      <Card className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search coupons..." className="pl-9" />
        </div>
        <select className="bg-card border border-border rounded-lg px-3 py-2 text-sm outline-none w-full sm:w-auto">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Expired</option>
        </select>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Code</th>
                <th className="px-6 py-4 font-medium">Discount</th>
                <th className="px-6 py-4 font-medium">Usage</th>
                <th className="px-6 py-4 font-medium">Expiry</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COUPONS.map((coupon, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground tracking-wide">{coupon.code}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {coupon.type === "PERCENTAGE" ? `${coupon.value}% OFF` : `$${coupon.value} OFF`}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{coupon.uses} / {coupon.limit}</td>
                  <td className="px-6 py-4 text-muted-foreground">{coupon.expiry}</td>
                  <td className="px-6 py-4">
                    <Badge variant={coupon.status === "Active" ? "default" : "secondary"}>
                      {coupon.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
