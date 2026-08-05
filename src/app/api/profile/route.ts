import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { profileSchema } from "@/lib/validators/profile";

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = profileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.flatten() }, { status: 400 });
    }

    const { 
      firstName, lastName, phone, bio, countryId, 
      preferredLearningMode, preferredLanguageId, preferredTimezone 
    } = result.data;

    // Update User model
    const updatedUser = await db.user.update({
      where: { id: session.sub },
      data: {
        firstName,
        lastName,
        phone,
        bio,
        countryId,
        // Update user preference using upsert (create if not exists, otherwise update)
        preference: {
          upsert: {
            create: {
              preferredLearningMode: preferredLearningMode || "TEXT",
              preferredLanguageId,
              preferredTimezone,
            },
            update: {
              preferredLearningMode,
              preferredLanguageId,
              preferredTimezone,
            }
          }
        }
      },
      include: {
        preference: true,
        country: true,
      }
    });

    return NextResponse.json({ 
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        countryId: updatedUser.countryId,
        country: updatedUser.country,
        preference: updatedUser.preference,
      }
    });

  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
