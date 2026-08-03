import { z } from "zod";
import { CourseStatus, DifficultyLevel } from "@prisma/client";

export const createCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
  slug: z.string().optional(),
  categoryId: z.string().uuid("Invalid category ID").optional().nullable(),
});

export const updateCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long").optional(),
  slug: z.string().min(3, "Slug must be at least 3 characters").max(100, "Slug is too long").optional(),
  description: z.string().optional().nullable(),
  thumbnailUrl: z.string().url("Must be a valid URL").optional().nullable(),
  status: z.nativeEnum(CourseStatus).optional(),
  difficultyLevel: z.nativeEnum(DifficultyLevel).optional(),
  price: z.coerce.number().min(0, "Price cannot be negative").optional().nullable(),
  
  seoTitle: z.string().max(60, "SEO Title should be 60 characters or less").optional().nullable(),
  seoDescription: z.string().max(160, "SEO Description should be 160 characters or less").optional().nullable(),
  
  audioEnabled: z.boolean().optional(),
  aiExplanationEnabled: z.boolean().optional(),
  translationEnabled: z.boolean().optional(),
  
  categoryId: z.string().uuid("Invalid category ID").optional().nullable(),
});
