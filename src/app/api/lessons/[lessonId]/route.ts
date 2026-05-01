import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// PATCH /api/lessons/[lessonId]
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    await requireAdmin();
    const { lessonId } = await params;
    const body = await req.json();

    const lesson = await db.lesson.update({
      where: { id: lessonId },
      data: body,
    });

    return NextResponse.json(lesson);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update lesson";
    const status = message === "Unauthorized" || message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

// DELETE /api/lessons/[lessonId]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    await requireAdmin();
    const { lessonId } = await params;

    await db.lesson.delete({ where: { id: lessonId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete lesson";
    const status = message === "Unauthorized" || message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
