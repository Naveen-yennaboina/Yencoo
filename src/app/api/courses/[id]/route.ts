import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { updateCourseSchema } from "@/lib/validators/course";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const course = await prisma.course.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        category: true,
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });

    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = updateCourseSchema.parse(body);

    const existingCourse = await prisma.course.findUnique({
      where: { id, deletedAt: null }
    });

    if (!existingCourse) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (validatedData.slug && validatedData.slug !== existingCourse.slug) {
      const slugExists = await prisma.course.findUnique({
        where: { slug: validatedData.slug }
      });
      if (slugExists && slugExists.id !== id) {
        return new NextResponse("Slug already exists", { status: 400 });
      }
    }

    const course = await prisma.course.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(course);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    console.error("[COURSE_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingCourse = await prisma.course.findUnique({
      where: { id, deletedAt: null }
    });

    if (!existingCourse) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const course = await prisma.course.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: "ARCHIVED" // optionally archive on delete
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
