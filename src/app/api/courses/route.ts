import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/courses — list published courses (public)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const courses = await db.course.findMany({
      where: {
        published: true,
        ...(category ? { category } : {}),
        ...(featured === "true" ? { featured: true } : {}),
      },
      include: {
        modules: {
          include: {
            lessons: { select: { id: true, duration: true } },
          },
          orderBy: { position: "asc" },
        },
        _count: { select: { enrollments: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(courses);
  } catch {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

// POST /api/courses — create course (admin only)
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const { title, description, price, category, level, imageUrl } = body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const course = await db.course.create({
      data: {
        title,
        slug,
        description,
        price: price || 0,
        category,
        level,
        imageUrl,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create course";
    const status = message === "Unauthorized" || message.includes("Forbidden") ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
