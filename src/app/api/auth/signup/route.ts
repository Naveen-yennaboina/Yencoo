import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signupStep1Schema, otpSchema, passwordSchema } from "@/lib/validators/auth";
import { generateOTP, hashOTP, hashPassword, checkRateLimit } from "@/lib/auth/security";
import { setSessionCookie, signToken } from "@/lib/auth/session";
import { getEmailService } from "@/services/email.service";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`signup_${ip}`, 10, 60000)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await request.json();
    const { step } = body;

    if (process.env.NODE_ENV === "development") {
      console.log("Signup Request", body);
    }

    if (step === 1) {
      const result = signupStep1Schema.safeParse(body.data);
      if (!result.success) {
        if (process.env.NODE_ENV === "development") {
          console.log("Validation Error", result.error.flatten());
        }
        return NextResponse.json({ 
          success: false, 
          message: "Validation failed", 
          errors: result.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          })) 
        }, { status: 400 });
      }

      const { email, fullName, country, countryCode, currency, timezone } = result.data;

      // Split full name
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      // Check if user already exists
      let user = await db.user.findUnique({ where: { email } });
      
      if (user && user.hashedPassword) {
        return NextResponse.json({ error: "User already exists with this email" }, { status: 409 });
      }

      // Let's resolve country to countryId. We'll find by code or name.
      const countryRecord = await db.country.findFirst({ where: { OR: [{ code: countryCode || country }, { name: country }] } });
      
      if (!user) {
        user = await db.user.create({
          data: {
            email,
            firstName,
            lastName,
            countryId: countryRecord?.id || null,
          },
        });
      } else {
        user = await db.user.update({
          where: { email },
          data: {
            firstName,
            lastName,
            countryId: countryRecord?.id || null,
          }
        });
      }

      // Update or create user preferences
      if (currency || timezone) {
        await db.userPreference.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            preferredCurrency: currency,
            preferredTimezone: timezone,
          },
          update: {
            preferredCurrency: currency,
            preferredTimezone: timezone,
          }
        });
      }

      // Generate OTP
      const otp = generateOTP();
      const hashedOtp = hashOTP(otp);
      
      // Expire in 10 minutes
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await db.oTPCode.create({
        data: {
          userId: user.id,
          code: hashedOtp,
          purpose: "VERIFY_EMAIL",
          expiresAt,
        }
      });

      // Send Email
      const emailService = getEmailService();
      await emailService.sendVerificationOTP(email, otp);

      return NextResponse.json({ message: "OTP sent successfully" });
    }

    if (step === 2) {
      const result = otpSchema.safeParse(body.data);
      if (!result.success) {
        if (process.env.NODE_ENV === "development") {
          console.log("Validation Error", result.error.flatten());
        }
        return NextResponse.json({ 
          success: false, 
          message: "Validation failed", 
          errors: result.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          })) 
        }, { status: 400 });
      }

      const { email, otp } = result.data;
      const hashedOtp = hashOTP(otp);

      const user = await db.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Find valid OTP
      const validOtp = await db.oTPCode.findFirst({
        where: {
          userId: user.id,
          code: hashedOtp,
          purpose: "VERIFY_EMAIL",
          expiresAt: { gt: new Date() }
        },
        orderBy: { createdAt: "desc" }
      });

      if (!validOtp) {
        return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
      }

      // Delete the used OTP
      await db.oTPCode.delete({ where: { id: validOtp.id } });

      return NextResponse.json({ message: "OTP verified successfully" });
    }

    if (step === 3) {
      const result = passwordSchema.safeParse(body.data);
      if (!result.success) {
        if (process.env.NODE_ENV === "development") {
          console.log("Validation Error", result.error.flatten());
        }
        return NextResponse.json({ 
          success: false, 
          message: "Validation failed", 
          errors: result.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          })) 
        }, { status: 400 });
      }

      const { email, password } = result.data;

      const user = await db.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const hashedPassword = await hashPassword(password);

      // Update user with password
      const updatedUser = await db.user.update({
        where: { id: user.id },
        data: { hashedPassword }
      });

      // Create session
      const token = await signToken({
        sub: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      });

      await setSessionCookie(token);

      return NextResponse.json({ message: "Account created successfully" });
    }

    return NextResponse.json({ error: "Invalid step" }, { status: 400 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
