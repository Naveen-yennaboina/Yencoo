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

    if (step === 1) {
      // Step 1: Validate info, generate OTP, send email
      const result = signupStep1Schema.safeParse(body.data);
      if (!result.success) {
        return NextResponse.json({ error: "Invalid data", details: result.error.errors }, { status: 400 });
      }

      const { email, firstName, lastName, country } = result.data;

      // Check if user already exists
      const existingUser = await db.user.findUnique({ where: { email } });
      if (existingUser) {
        return NextResponse.json({ error: "User already exists with this email" }, { status: 409 });
      }

      // In a real app, you might want to create a temporary user or store this in a session/cache.
      // Since we don't have Redis, we'll create the user with a pending status or just store the OTP.
      // We will create the user with no password, and set them as inactive/pending via OTP.
      
      let user = await db.user.findFirst({ where: { email, hashedPassword: null } });
      
      // Let's resolve country to countryId. We'll find by code or name.
      const countryRecord = await db.country.findFirst({ where: { OR: [{ code: country }, { name: country }] } });
      
      if (!user) {
        user = await db.user.create({
          data: {
            email,
            firstName,
            lastName,
            countryId: countryRecord?.id || null,
          },
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
      // Step 2: Verify OTP
      const result = otpSchema.safeParse(body.data);
      if (!result.success) {
        return NextResponse.json({ error: "Invalid OTP format" }, { status: 400 });
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
      // Step 3: Set Password
      const result = passwordSchema.safeParse(body.data);
      if (!result.success) {
        return NextResponse.json({ error: "Invalid password format", details: result.error.errors }, { status: 400 });
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
