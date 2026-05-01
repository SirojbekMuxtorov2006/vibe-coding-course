import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

// GET /api/progress — get user's progress
export async function GET() {
  try {
    const user = await requireAuth();

    const progress = await db.progress.findMany({
      where: { userId: user.id },
      include: {
        lesson: {
          include: {
            module: {
              include: { course: { select: { id: true, title: true, slug: true } } },
            },
          },
        },
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch progress";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/progress — mark lesson complete/incomplete
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { lessonId, completed } = await req.json();

    const progress = await db.progress.upsert({
      where: {
        userId_lessonId: { userId: user.id, lessonId },
      },
      update: {
        completed,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId: user.id,
        lessonId,
        completed,
        completedAt: completed ? new Date() : null,
      },
    });

    // Award XP on completion
    if (completed) {
      await db.user.update({
        where: { id: user.id },
        data: { xp: { increment: 10 } },
      });
    }

    return NextResponse.json(progress);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update progress";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
