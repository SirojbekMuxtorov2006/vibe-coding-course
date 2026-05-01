import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// POST /api/lessons — create lesson (admin)
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { moduleId, title, description, videoUrl, thumbnailUrl, duration, isFree } = body;

    const lastLesson = await db.lesson.findFirst({
      where: { moduleId },
      orderBy: { position: "desc" },
    });

    const lesson = await db.lesson.create({
      data: {
        moduleId,
        title,
        description,
        videoUrl,
        thumbnailUrl,
        duration: duration || 0,
        isFree: isFree || false,
        position: (lastLesson?.position ?? -1) + 1,
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create lesson";
    const status = message === "Unauthorized" || message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
