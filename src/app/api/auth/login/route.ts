import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validators/auth";
import { verifyPassword, checkRateLimit } from "@/lib/auth/security";
import { setSessionCookie, signToken } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    
    // Rate limit login attempts (5 attempts per 5 minutes)
    if (!checkRateLimit(`login_${ip}`, 5, 5 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 });
    }

    const body = await request.json();
    const result = loginSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { email, password } = result.data;

    // We shouldn't use checkRateLimit for email here specifically in a way that leaks existence
    // But it's good to limit per email too.
    if (!checkRateLimit(`login_email_${email}`, 10, 15 * 60 * 1000)) {
      return NextResponse.json({ error: "Account temporarily locked due to too many failed attempts." }, { status: 429 });
    }

    const user = await db.user.findUnique({ where: { email } });

    // Use generic error message for security
    if (!user || !user.hashedPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isValidPassword = await verifyPassword(password, user.hashedPassword);

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Create session
    const token = await signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    await setSessionCookie(token);

    return NextResponse.json({ 
      message: "Login successful", 
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } 
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
