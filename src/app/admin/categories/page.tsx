"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Plus, Folder, ChevronRight, Edit2, Trash2, Search, Loader2 } from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import { fetchApi } from "@/lib/api";

type Category = {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  parent?: Category | null;
  children?: Category[];
  _count?: {
    courses: number;
    children: number;
  };
};

export default function CategoryManagerPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({ id: "", name: "", slug: "", parentId: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState<{ isVisible: boolean; title: string; description?: string; variant: "default" | "destructive" | "success" }>({
    isVisible: false,
    title: "",
    variant: "default",
  });

  const showToast = (title: string, description?: string, variant: "default" | "destructive" | "success" = "default") => {
    setToast({ isVisible: true, title, description, variant });
    setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
  };

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetchApi<{ data: Category[]; meta: { totalPages: number } }>(
      `/api/categories?page=${page}&limit=50&q=${encodeURIComponent(search)}`
    );
    if (res.data) {
      setCategories(res.data.data);
      setTotalPages(res.data.meta.totalPages);
    } else {
      showToast("Failed to load categories", res.error || undefined, "destructive");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [page, search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Auto-generate slug if empty
    const payloadSlug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const payload = {
      name: formData.name,
      slug: payloadSlug,
      parentId: formData.parentId || null,
    };

    const endpoint = isEditing ? `/api/categories/${formData.id}` : "/api/categories";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetchApi(endpoint, {
      method,
      body: JSON.stringify(payload),
    });

    setIsSaving(false);

    if (res.error) {
      showToast("Error", res.error || undefined, "destructive");
    } else {
      showToast("Success", `Category ${isEditing ? 'updated' : 'created'} successfully`, "success");
      setFormData({ id: "", name: "", slug: "", parentId: "" });
      setIsEditing(false);
      fetchCategories();
    }
  };

  const handleEdit = (cat: Category) => {
    setIsEditing(true);
    setFormData({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    // Optimistic update
    const previous = [...categories];
    setCategories(categories.filter(c => c.id !== id && c.parentId !== id));

    const res = await fetchApi(`/api/categories/${id}`, { method: "DELETE" });
    if (res.error) {
      showToast("Error", res.error || undefined, "destructive");
      setCategories(previous); // Revert
    } else {
      showToast("Deleted", "Category deleted successfully", "success");
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setFormData({ id: "", name: "", slug: "", parentId: "" });
  };

  // Build a simple tree for display (max 2 levels for this UI)
  const topLevel = categories.filter(c => !c.parentId);
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1">Organize courses into hierarchical categories.</p>
        </div>
        <Button className="gap-2" onClick={cancelEdit}>
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">{isEditing ? "Edit Category" : "Add New Category"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input 
                  placeholder="e.g. Web Development" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>
                <Input 
                  placeholder="e.g. web-development" 
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                />
                <p className="text-[10px] text-muted-foreground">Leave empty to auto-generate</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Parent Category</label>
                <select 
                  className="w-full bg-muted/50 border border-border rounded-lg p-2.5 text-sm outline-none"
                  value={formData.parentId}
                  onChange={e => setFormData({ ...formData, parentId: e.target.value })}
                >
                  <option value="">None (Top Level)</option>
                  {categories.filter(c => !c.parentId && c.id !== formData.id).map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isSaving || !formData.name}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                </Button>
                {isEditing && (
                  <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>
                )}
              </div>
            </form>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search categories..." 
              className="pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <Card className="p-4 min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p>Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Folder className="h-12 w-12 mb-4 opacity-20" />
                <p>No categories found.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {topLevel.map(cat => {
                  const children = categories.filter(c => c.parentId === cat.id);
                  return (
                    <div key={cat.id} className="border border-border rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-3 bg-muted/30">
                        <div className="flex items-center gap-2">
                          <Folder className="h-4 w-4 text-primary" />
                          <span className="font-medium">{cat.name}</span>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{cat._count?.courses || 0} courses</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(cat)}><Edit2 className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={() => handleDelete(cat.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      {children.length > 0 && (
                        <div className="pl-8 pr-3 py-2 space-y-2 border-t border-border">
                          {children.map((child) => (
                            <div key={child.id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                              <div className="flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{child.name}</span>
                              </div>
                              <div className="flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleEdit(child)}><Edit2 className="h-3 w-3" /></Button>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive" onClick={() => handleDelete(child.id)}><Trash2 className="h-3 w-3" /></Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <Toast 
          isVisible={toast.isVisible}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
        />
      </div>
    </div>
  );
}
