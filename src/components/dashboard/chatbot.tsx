"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, User, Sparkles, Code2, Lightbulb } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestions = [
  { icon: Code2, text: "Explain React hooks" },
  { icon: Lightbulb, text: "How do I use async/await?" },
  { icon: Sparkles, text: "Review my code" },
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hey! 👋 I'm your AI coding assistant. I can help you understand concepts, debug code, review your work, and answer any programming questions. What would you like to learn today?",
    timestamp: new Date(),
  },
];

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);

    const responses: Record<string, string> = {
      "Explain React hooks":
        "**React Hooks** are functions that let you use state and lifecycle features in functional components.\n\nThe most common hooks are:\n\n• `useState` — Manage local state\n• `useEffect` — Handle side effects\n• `useContext` — Access context values\n• `useRef` — Reference DOM elements\n• `useMemo` — Memoize expensive calculations\n\nHere's a quick example:\n```tsx\nconst [count, setCount] = useState(0);\n```\n\nWant me to go deeper into any specific hook?",
      "How do I use async/await?":
        "**Async/Await** makes asynchronous code look synchronous!\n\n```javascript\nasync function fetchData() {\n  try {\n    const response = await fetch('/api/data');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}\n```\n\nKey points:\n• `async` marks a function as asynchronous\n• `await` pauses execution until the promise resolves\n• Always wrap in `try/catch` for error handling\n\nNeed more examples?",
      "Review my code":
        "I'd love to review your code! 🔍\n\nYou can paste your code here and I'll analyze it for:\n\n• **Best practices** — Is it following conventions?\n• **Performance** — Any optimization opportunities?\n• **Security** — Potential vulnerabilities?\n• **Readability** — Can it be cleaner?\n\nGo ahead and paste your code!",
    };

    setTimeout(() => {
      const responseText =
        responses[userMessage] ||
        `Great question about "${userMessage}"! 🤔\n\nLet me break this down for you:\n\n1. This is a fundamental concept in modern development\n2. Understanding it will help you build better applications\n3. Practice with real projects is the best way to learn\n\nWould you like me to provide a code example or explain further?`;

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          role: "assistant",
          content: responseText,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        role: "user",
        content: messageText,
        timestamp: new Date(),
      },
    ]);
    setInput("");
    simulateResponse(messageText);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="h-6 w-6 text-purple-400" />
          AI Assistant
        </h1>
        <p className="text-muted-foreground mt-1">
          Your personal AI coding mentor. Ask anything!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="flex flex-col h-[calc(100vh-220px)] max-h-[700px]">
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      msg.role === "assistant"
                        ? "bg-gradient-to-br from-purple-600 to-pink-600"
                        : "bg-muted"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot className="h-4 w-4 text-white" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-muted/50 text-foreground"
                        : "bg-purple-600/20 text-foreground"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-muted/50 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s.text)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border hover:border-purple-500/30 hover:bg-purple-500/5 text-sm text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything about coding..."
                className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all placeholder:text-muted-foreground"
              />
              <Button
                variant="neon"
                size="icon"
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="h-10 w-10 shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Badge variant="secondary" className="text-[10px]">
                <Sparkles className="h-3 w-3 mr-1" />
                Powered by AI
              </Badge>
              <span className="text-[10px] text-muted-foreground">
                Press Enter to send
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
