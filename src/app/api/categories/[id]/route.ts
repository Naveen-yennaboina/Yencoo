import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { updateCategorySchema } from "@/lib/validators/category";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const category = await db.category.findUnique({
      where: { id, deletedAt: null },
      include: {
        parent: true,
        children: {
          where: { deletedAt: null }
        },
      }
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ data: category });
  } catch (error) {
    console.error("[CATEGORY_GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();
    const result = updateCategorySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.issues },
        { status: 400 }
      );
    }

    const category = await db.category.findUnique({
      where: { id, deletedAt: null },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const { name, slug, parentId } = result.data;

    // Check duplicate slug if slug changed
    if (slug && slug !== category.slug) {
      const existing = await db.category.findFirst({
        where: { slug, deletedAt: null },
      });

      if (existing) {
        return NextResponse.json(
          { error: "Category with this slug already exists" },
          { status: 409 }
        );
      }
    }

    if (parentId && parentId !== category.parentId) {
      // Prevent setting parent to itself
      if (parentId === id) {
         return NextResponse.json({ error: "Category cannot be its own parent" }, { status: 400 });
      }

      const parent = await db.category.findUnique({ where: { id: parentId } });
      if (!parent || parent.deletedAt) {
        return NextResponse.json({ error: "Parent category not found" }, { status: 404 });
      }
    }

    const updated = await db.category.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(slug ? { slug } : {}),
        ...(parentId !== undefined ? { parentId } : {}),
      },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("[CATEGORY_PUT]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const category = await db.category.findUnique({
      where: { id, deletedAt: null },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Soft delete
    await db.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("[CATEGORY_DELETE]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
