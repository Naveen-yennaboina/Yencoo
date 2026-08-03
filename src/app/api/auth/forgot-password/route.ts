import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { forgotPasswordStep1Schema, otpSchema, passwordSchema } from "@/lib/validators/auth";
import { generateOTP, hashOTP, hashPassword, checkRateLimit } from "@/lib/auth/security";
import { getEmailService } from "@/services/email.service";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`forgot_pw_${ip}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await request.json();
    const { step } = body;

    if (step === 1) {
      const result = forgotPasswordStep1Schema.safeParse(body.data);
      if (!result.success) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }

      const { email } = result.data;
      const user = await db.user.findUnique({ where: { email } });

      // Always return success to prevent email enumeration
      if (user) {
        const otp = generateOTP();
        const hashedOtp = hashOTP(otp);
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

        await db.oTPCode.create({
          data: {
            userId: user.id,
            code: hashedOtp,
            purpose: "RESET_PASSWORD",
            expiresAt,
          }
        });

        const emailService = getEmailService();
        await emailService.sendPasswordResetOTP(email, otp);
      }

      return NextResponse.json({ message: "If an account exists, a reset code was sent." });
    }

    if (step === 2) {
      const result = otpSchema.safeParse(body.data);
      if (!result.success) {
        return NextResponse.json({ error: "Invalid OTP format" }, { status: 400 });
      }

      const { email, otp } = result.data;
      const user = await db.user.findUnique({ where: { email } });
      
      if (!user) {
        return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
      }

      const hashedOtp = hashOTP(otp);
      const validOtp = await db.oTPCode.findFirst({
        where: {
          userId: user.id,
          code: hashedOtp,
          purpose: "RESET_PASSWORD",
          expiresAt: { gt: new Date() }
        },
        orderBy: { createdAt: "desc" }
      });

      if (!validOtp) {
        return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
      }

      // We do NOT delete the OTP here, because we need to verify it again in step 3
      // Alternatively, we could issue a temporary reset token.
      
      return NextResponse.json({ message: "OTP verified successfully" });
    }

    if (step === 3) {
      const result = passwordSchema.safeParse(body.data);
      if (!result.success) {
        return NextResponse.json({ error: "Invalid password format" }, { status: 400 });
      }

      // We also need the OTP in step 3 to authorize the password change
      const { email, password } = result.data;
      const otp = body.data.otp;

      if (!otp) {
        return NextResponse.json({ error: "OTP is required" }, { status: 400 });
      }

      const user = await db.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const hashedOtp = hashOTP(otp);
      const validOtp = await db.oTPCode.findFirst({
        where: {
          userId: user.id,
          code: hashedOtp,
          purpose: "RESET_PASSWORD",
          expiresAt: { gt: new Date() }
        }
      });

      if (!validOtp) {
        return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
      }

      const hashedPassword = await hashPassword(password);

      // Update password
      await db.user.update({
        where: { id: user.id },
        data: { hashedPassword }
      });

      // Invalidate all OTPs for this user
      await db.oTPCode.deleteMany({
        where: { userId: user.id, purpose: "RESET_PASSWORD" }
      });

      return NextResponse.json({ message: "Password reset successfully" });
    }

    return NextResponse.json({ error: "Invalid step" }, { status: 400 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
