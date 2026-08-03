import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    let countries = await db.country.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        code: true,
        name: true,
        dialCode: true,
      }
    });

    if (countries.length === 0) {
      const defaultCountries = [
        { code: 'IN', name: 'India', dialCode: '+91' },
        { code: 'US', name: 'United States', dialCode: '+1' },
        { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
        { code: 'CA', name: 'Canada', dialCode: '+1' },
        { code: 'AU', name: 'Australia', dialCode: '+61' },
        { code: 'DE', name: 'Germany', dialCode: '+49' },
        { code: 'FR', name: 'France', dialCode: '+33' },
        { code: 'JP', name: 'Japan', dialCode: '+81' },
        { code: 'SG', name: 'Singapore', dialCode: '+65' },
      ];

      await db.country.createMany({
        data: defaultCountries,
        skipDuplicates: true,
      });

      countries = await db.country.findMany({
        orderBy: { name: 'asc' },
        select: {
          id: true,
          code: true,
          name: true,
          dialCode: true,
        }
      });
    }

    return NextResponse.json({ success: true, data: countries });
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch countries", error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
