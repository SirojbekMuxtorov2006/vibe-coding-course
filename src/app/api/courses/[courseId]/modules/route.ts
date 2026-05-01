import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// POST /api/courses/[courseId]/modules — create module (admin)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await requireAdmin();
    const { courseId } = await params;
    const body = await req.json();

    const lastModule = await db.module.findFirst({
      where: { courseId },
      orderBy: { position: "desc" },
    });

    const newModule = await db.module.create({
      data: {
        courseId,
        title: body.title,
        position: (lastModule?.position ?? -1) + 1,
      },
    });

    return NextResponse.json(newModule, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create module";
    const status = message === "Unauthorized" || message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
