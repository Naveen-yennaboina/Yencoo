import { z } from "zod";
import { LearningMode } from "@prisma/client";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  phone: z.string().max(20).optional().nullable(),
  countryId: z.string().uuid().optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  preferredLearningMode: z.nativeEnum(LearningMode).optional(),
  preferredLanguageId: z.string().uuid().optional().nullable(),
  preferredTimezone: z.string().max(50).optional().nullable(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
