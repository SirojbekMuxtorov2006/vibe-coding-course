import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askAI(prompt: string, context?: string) {
  const systemMessage = `You are a helpful coding assistant for the VIBE CODING platform. 
You help students learn programming, debug code, explain concepts, and build projects.
Be concise, practical, and encouraging. Use code examples when helpful.
${context ? `\nContext: ${context}` : ""}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: prompt },
    ],
    max_tokens: 1024,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content ?? "Sorry, I could not generate a response.";
}
