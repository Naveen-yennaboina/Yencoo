"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Search, Plus, MoreVertical, Users, BookOpen, DollarSign } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export default function AdminTemplate() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground">Manage users, courses, and platform settings.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Data</Button>
          <Button><Plus className="h-4 w-4 mr-2" /> Add Course</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: "2,543", icon: Users, trend: "+12%" },
          { label: "Active Courses", value: "48", icon: BookOpen, trend: "+3" },
          { label: "Monthly Revenue", value: "$45,231", icon: DollarSign, trend: "+8.4%" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <Badge variant="success" className="text-xs">{stat.trend}</Badge>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Recent Users</CardTitle>
          <div className="w-full sm:w-72">
            <Input placeholder="Search users..." icon={<Search className="h-4 w-4" />} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-6 py-4 font-medium">User</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="bg-background hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm" src={`https://i.pravatar.cc/150?u=${i}`} />
                        <div>
                          <p className="font-medium">User Name {i}</p>
                          <p className="text-xs text-muted-foreground">user{i}@example.com</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={i === 1 ? "default" : "outline"}>
                        {i === 1 ? "Admin" : "Student"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="success" className="bg-success/10 text-success border-success/20">Active</Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">Oct 24, 2023</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
