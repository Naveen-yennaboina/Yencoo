import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { createCourseSchema } from "@/lib/validators/course";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;
    
    // Server-side sorting
    const sortField = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null,
      ...(search ? { title: { contains: search, mode: 'insensitive' as const } } : {}),
      ...(status ? { status: status as any } : {}),
      ...(categoryId ? { categoryId } : {}),
    };

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          category: true,
          _count: {
            select: { modules: true },
          }
        },
        orderBy: {
          [sortField]: sortOrder,
        },
        skip,
        take: limit,
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({
      data: courses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[COURSES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = createCourseSchema.parse(body);

    let { title, categoryId, slug } = validatedData;
    
    if (!slug) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    // Ensure unique slug
    const existingCourse = await prisma.course.findUnique({
      where: { slug }
    });

    if (existingCourse) {
      slug = `${slug}-${Date.now()}`;
    }

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        categoryId: categoryId || null,
      },
    });

    return NextResponse.json(course);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    console.error("[COURSES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
