"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Toast } from "@/components/ui/Toast";
import { ArrowLeft, Save, Plus, GripVertical, Image as ImageIcon, BookOpen } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Select } from "@/components/ui/Select";

export default function CourseEditorPage() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.id === "new";
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    difficultyLevel: "BEGINNER",
    categoryId: "",
    thumbnailUrl: "",
    seoTitle: "",
    seoDescription: "",
    slug: "",
    audioEnabled: false,
    aiExplanationEnabled: false,
    translationEnabled: false,
    status: "DRAFT",
  });

  const [toast, setToast] = useState<{ isVisible: boolean; title: string; description?: string; variant: "default" | "destructive" | "success" }>({
    isVisible: false,
    title: "",
    variant: "default",
  });

  const showToast = (title: string, description?: string, variant: "default" | "destructive" | "success" = "default") => {
    setToast({ isVisible: true, title, description, variant });
    setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const catRes = await fetch("/api/categories");
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData.data || []);
        }

        if (!isNew) {
          const courseRes = await fetch(`/api/courses/${params.id}`);
          if (!courseRes.ok) throw new Error("Failed to load course");
          const courseData = await courseRes.json();
          
          setFormData({
            title: courseData.title || "",
            description: courseData.description || "",
            price: courseData.price?.toString() || "",
            difficultyLevel: courseData.difficultyLevel || "BEGINNER",
            categoryId: courseData.categoryId || "",
            thumbnailUrl: courseData.thumbnailUrl || "",
            seoTitle: courseData.seoTitle || "",
            seoDescription: courseData.seoDescription || "",
            slug: courseData.slug || "",
            audioEnabled: courseData.audioEnabled || false,
            aiExplanationEnabled: courseData.aiExplanationEnabled || false,
            translationEnabled: courseData.translationEnabled || false,
            status: courseData.status || "DRAFT",
          });
        }
      } catch (error: any) {
        showToast("Error", error.message, "destructive");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [isNew, params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (publish: boolean = false) => {
    setSaving(true);
    try {
      const payload = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        status: publish ? "PUBLISHED" : formData.status,
      };

      const url = isNew ? `/api/courses` : `/api/courses/${params.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData ? JSON.stringify(errorData) : "Failed to save course");
      }

      const savedData = await res.json();
      showToast("Success", `Course ${publish ? 'published' : 'saved'} successfully`, "success");
      
      if (isNew) {
        setTimeout(() => {
          router.push(`/admin/courses/${savedData.id}`);
        }, 1000);
      } else {
        setFormData(prev => ({ ...prev, status: savedData.status }));
      }
    } catch (error: any) {
      showToast("Error", error.message, "destructive");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading course data...</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <Link href="/admin/courses">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{isNew ? "Create Course" : "Edit Course"}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
            Save Draft
          </Button>
          <Button className="gap-2" onClick={() => handleSave(true)} disabled={saving}>
            <Save className="h-4 w-4" /> Publish
          </Button>
        </div>
      </div>

      <div className="flex border-b border-border overflow-x-auto">
        {["general", "curriculum", "seo", "ai_settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {tab.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === "general" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Course Title</label>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Advanced TypeScript Patterns" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  className="w-full min-h-[150px] bg-background border border-input rounded-md p-3 text-sm resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                  placeholder="Describe what students will learn..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (USD)</label>
                  <Input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="49.00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <select name="difficultyLevel" value={formData.difficultyLevel} onChange={handleChange} className="w-full bg-background border border-input rounded-md h-10 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Category</label>
                  <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full bg-background border border-input rounded-md h-10 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-sm">Course Thumbnail</h3>
              <div className="aspect-video bg-muted border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors">
                <ImageIcon className="h-8 w-8 mb-2" />
                <span className="text-sm">Click to upload</span>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-sm">Status</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Status</span>
                <Badge variant={formData.status === "PUBLISHED" ? "default" : "secondary"}>{formData.status}</Badge>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "curriculum" && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Curriculum</h3>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add Module</Button>
          </div>
          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 p-4 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                  <span className="font-medium">Module 1: Introduction</span>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between bg-card border border-border rounded p-3 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    <span className="text-sm">1. What are Generics?</span>
                  </div>
                  <Link href={`/admin/courses/${params.id}/lessons/1`}>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <BookOpen className="h-3.5 w-3.5" /> Edit Lesson
                    </Button>
                  </Link>
                </div>
                <Button variant="ghost" size="sm" className="w-full border border-dashed mt-2"><Plus className="h-4 w-4 mr-2" /> Add Lesson</Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic mt-4 text-center">Curriculum management requires Lesson CRUD feature.</p>
          </div>
        </Card>
      )}

      {activeTab === "seo" && (
        <Card className="p-6 space-y-6 max-w-2xl">
          <div className="space-y-2">
            <label className="text-sm font-medium">SEO Title</label>
            <Input name="seoTitle" value={formData.seoTitle} onChange={handleChange} placeholder="Max 60 characters" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">SEO Description</label>
            <textarea 
              name="seoDescription" 
              value={formData.seoDescription} 
              onChange={handleChange}
              className="w-full min-h-[100px] bg-background border border-input rounded-md p-3 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
              placeholder="Max 160 characters"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="advanced-typescript-patterns" />
          </div>
        </Card>
      )}

      {activeTab === "ai_settings" && (
        <Card className="p-6 space-y-6 max-w-2xl">
          <h3 className="font-bold text-lg mb-4">AI Companion Features</h3>
          
          <div className="flex items-start justify-between py-3 border-b border-border">
            <div>
              <div className="font-medium">Enable AI Explanations</div>
              <div className="text-sm text-muted-foreground">Allow students to ask the AI to explain concepts.</div>
            </div>
            <input type="checkbox" name="aiExplanationEnabled" checked={formData.aiExplanationEnabled} onChange={handleChange} className="h-5 w-5 accent-primary" />
          </div>
          
          <div className="flex items-start justify-between py-3 border-b border-border">
            <div>
              <div className="font-medium">Enable Text-to-Speech</div>
              <div className="text-sm text-muted-foreground">Allow students to listen to the lesson audio.</div>
            </div>
            <input type="checkbox" name="audioEnabled" checked={formData.audioEnabled} onChange={handleChange} className="h-5 w-5 accent-primary" />
          </div>
          
          <div className="flex items-start justify-between py-3 border-b border-border">
            <div>
              <div className="font-medium">Enable Translations</div>
              <div className="text-sm text-muted-foreground">Allow on-the-fly translations of the material.</div>
            </div>
            <input type="checkbox" name="translationEnabled" checked={formData.translationEnabled} onChange={handleChange} className="h-5 w-5 accent-primary" />
          </div>
        </Card>
      )}
      
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
