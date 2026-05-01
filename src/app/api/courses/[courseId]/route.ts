import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/courses/[courseId]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;

    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { position: "asc" },
            },
          },
          orderBy: { position: "asc" },
        },
        _count: { select: { enrollments: true } },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch {
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

// PATCH /api/courses/[courseId] — update (admin)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await requireAdmin();
    const { courseId } = await params;
    const body = await req.json();

    const course = await db.course.update({
      where: { id: courseId },
      data: body,
    });

    return NextResponse.json(course);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update course";
    const status = message === "Unauthorized" || message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

// DELETE /api/courses/[courseId] — delete (admin)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await requireAdmin();
    const { courseId } = await params;

    await db.course.delete({ where: { id: courseId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete course";
    const status = message === "Unauthorized" || message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
