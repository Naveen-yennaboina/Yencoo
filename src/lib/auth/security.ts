import bcrypt from "bcryptjs";
import crypto from "crypto";

// --- Password Hashing ---
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// --- OTP Generation ---
export function generateOTP(): string {
  // Generate a random 6-digit number
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function hashOTP(otp: string): string {
  // Simple SHA-256 hash for OTPs
  return crypto.createHash("sha256").update(otp).digest("hex");
}

// --- Rate Limiting (In-Memory MVP) ---
// Note: In production, use Redis (e.g., Upstash) for rate limiting across multiple instances.

interface RateLimitInfo {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitInfo>();

/**
 * Basic rate limiter.
 * @param key unique identifier (e.g. IP or email)
 * @param limit max requests allowed
 * @param windowMs time window in milliseconds
 * @returns true if allowed, false if rate limited
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (now > record.resetAt) {
    // Window expired, reset
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false; // Rate limited
  }

  record.count += 1;
  return true;
}

// Cleanup function to prevent memory leak in long-running processes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 60000); // Run every minute
