import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

// GET /api/chat?roomId=xxx — get messages for a room
export async function GET(req: NextRequest) {
  try {
    await requireAuth();
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    if (!roomId) {
      // Return available chat rooms
      const rooms = await db.chatRoom.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { messages: true } },
        },
      });
      return NextResponse.json(rooms);
    }

    const messages = await db.message.findMany({
      where: { roomId },
      include: {
        user: {
          select: { id: true, name: true, imageUrl: true, role: true },
        },
      },
      orderBy: { createdAt: "asc" },
      take: 100,
    });

    return NextResponse.json(messages);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch messages";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/chat — send message
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { roomId, content } = await req.json();

    if (!roomId || !content?.trim()) {
      return NextResponse.json({ error: "roomId and content are required" }, { status: 400 });
    }

    const newMessage = await db.message.create({
      data: {
        userId: user.id,
        roomId,
        content: content.trim(),
      },
      include: {
        user: {
          select: { id: true, name: true, imageUrl: true, role: true },
        },
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send message";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
