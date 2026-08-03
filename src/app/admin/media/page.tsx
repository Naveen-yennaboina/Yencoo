"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Search, UploadCloud, Image as ImageIcon, Folder, File, MoreVertical } from "lucide-react";

export default function MediaLibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground mt-1">Manage images, thumbnails, and other assets.</p>
        </div>
        <Button className="gap-2">
          <UploadCloud className="h-4 w-4" /> Upload Files
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search media..." className="pl-9" />
        </div>
        <select className="bg-card border border-border rounded-lg px-3 py-2 text-sm outline-none w-full sm:w-auto">
          <option>All Types</option>
          <option>Images</option>
          <option>Documents</option>
        </select>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-border rounded-xl p-8 mb-8 text-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
        <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-semibold text-lg">Drag & Drop files here</h3>
        <p className="text-sm text-muted-foreground mt-1">or click to browse from your computer</p>
      </div>

      {/* Folders */}
      <h3 className="font-semibold mb-4">Folders</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8">
        {["Thumbnails", "Course Assets", "Avatars", "Marketing"].map(folder => (
          <Card key={folder} className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors text-center">
            <Folder className="h-8 w-8 text-blue-500/80" />
            <span className="text-sm font-medium line-clamp-1">{folder}</span>
          </Card>
        ))}
      </div>

      {/* Files */}
      <h3 className="font-semibold mb-4">Recent Files</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(file => (
          <div key={file} className="group relative rounded-lg border border-border overflow-hidden bg-card aspect-square flex flex-col">
            <div className="flex-1 bg-muted/50 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <div className="p-2 border-t border-border bg-card flex items-center justify-between text-xs">
              <span className="truncate">image_00{file}.jpg</span>
              <button className="text-muted-foreground hover:text-foreground"><MoreVertical className="h-3 w-3" /></button>
            </div>
            <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
              <Button variant="secondary" size="sm" className="h-8 text-xs">Select</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
