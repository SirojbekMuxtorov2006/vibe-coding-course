import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/auth";
import { askAI } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt, context } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Build system message based on context
    let systemMessage = "You are an expert AI coding assistant for the VIBE CODING platform. Help the user with their coding problems. Keep responses concise, helpful, and format code with markdown.";
    
    if (context === "explain-code") {
      systemMessage = "You are an expert developer. The user will provide some code. Explain what the code does clearly and concisely.";
    } else if (context === "fix-bug") {
      systemMessage = "You are an expert debugger. The user will provide buggy code. Identify the bug, explain it briefly, and provide the fixed code.";
    } else if (context === "idea") {
      systemMessage = "You are a creative technical architect. The user is looking for a project idea. Suggest a modern, impressive project idea with a recommended tech stack and 3 core features.";
    }

    const aiResponse = await askAI(prompt, systemMessage);

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
  }
}
