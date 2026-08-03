"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Toast } from "@/components/ui/Toast";
import { Plus, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Select } from "@/components/ui/Select";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [toast, setToast] = useState<{ isVisible: boolean; title: string; description?: string; variant: "default" | "destructive" | "success" }>({
    isVisible: false,
    title: "",
    variant: "default",
  });

  const showToast = (title: string, description?: string, variant: "default" | "destructive" | "success" = "default") => {
    setToast({ isVisible: true, title, description, variant });
    setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter && statusFilter !== "ALL") params.append("status", statusFilter);
      
      const response = await fetch(`/api/courses?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch courses");
      
      const data = await response.json();
      setCourses(data.data);
    } catch (error: any) {
      showToast("Error", error.message, "destructive");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCourses();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, statusFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete course");
      showToast("Deleted", "Course deleted successfully", "success");
      fetchCourses();
    } catch (error: any) {
      showToast("Error", error.message, "destructive");
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Draft Course" })
      });
      
      if (!response.ok) throw new Error("Failed to create course");
      const course = await response.json();
      window.location.href = `/admin/courses/${course.id}`;
    } catch (error: any) {
      showToast("Error", error.message, "destructive");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground mt-1">Manage your course catalog.</p>
        </div>
        <Button className="gap-2" onClick={handleCreate}>
          <Plus className="h-4 w-4" /> Create Course
        </Button>
      </div>

      <Card className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search courses..." 
            className="pl-9" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { label: "All Statuses", value: "ALL" },
              { label: "Draft", value: "DRAFT" },
              { label: "Review", value: "REVIEW" },
              { label: "Published", value: "PUBLISHED" },
              { label: "Archived", value: "ARCHIVED" },
            ]}
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-sm text-left relative">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Course Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Lessons</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                    Loading courses...
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                    No courses found.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{course.title}</td>
                    <td className="px-6 py-4 text-muted-foreground">{course.category?.name || "Uncategorized"}</td>
                    <td className="px-6 py-4">
                      <Badge variant={course.status === "PUBLISHED" ? "default" : course.status === "DRAFT" ? "secondary" : "outline"}>
                        {course.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{course._count?.modules || 0} modules</td>
                    <td className="px-6 py-4 text-muted-foreground">${course.price || "0.00"}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/courses/${course.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(course.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {toast.isVisible && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast 
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
          />
        </div>
      )}
    </div>
  );
}
