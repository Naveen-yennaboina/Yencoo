import { Prisma } from "@prisma/client";

/**
 * Recursively converts Prisma Decimal objects to standard numbers within an object or array.
 * Useful for Next.js Server Components passing data to Client Components.
 */
export function serializeDecimals<T>(obj: T): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => serializeDecimals(item));
  }

  // Handle Prisma Decimal
  if (typeof obj === 'object' && 'd' in obj && 'e' in obj && 's' in obj && typeof (obj as any).toNumber === 'function') {
    return (obj as any).toNumber();
  }
  
  if (Prisma.Decimal && Prisma.Decimal.isDecimal && Prisma.Decimal.isDecimal(obj)) {
    return obj.toNumber();
  }
  
  if (obj instanceof Prisma.Decimal) {
    return obj.toNumber();
  }

  // Handle standard objects (skip Date, Buffer, etc.)
  if (typeof obj === 'object') {
    if (obj instanceof Date) {
      return obj; // Leave Dates as is, Next.js handles Date serialization fine now in most cases, or handle it depending on needs.
    }
    
    const serialized: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      serialized[key] = serializeDecimals(value);
    }
    return serialized;
  }

  // Primitives
  return obj;
}
