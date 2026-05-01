"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Users } from "lucide-react";

export default function CommunityPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/chat?roomId=global");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const msgContent = input.trim();
    setInput("");

    // Optimistic UI update
    const tempMsg = {
      id: Date.now().toString(),
      content: msgContent,
      createdAt: new Date().toISOString(),
      user: { name: "You", imageUrl: null, role: "STUDENT" }
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: "global", content: msgContent }),
      });
      if (res.ok) {
        // Refetch to get real ID and correct timestamp
        fetchMessages();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8 text-purple-400" />
          Community Chat
        </h1>
        <p className="text-muted-foreground mt-2">Connect with other learners and get help.</p>
      </div>

      <Card className="flex flex-col h-[600px] border-purple-500/20 shadow-2xl shadow-purple-500/10">
        <CardHeader className="border-b border-border/50 bg-muted/20">
          <CardTitle className="text-lg">Global Channel</CardTitle>
        </CardHeader>
        
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <span className="text-muted-foreground">Loading messages...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Users className="h-12 w-12 mb-4 opacity-20" />
              <p>No messages yet. Say hello!</p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isMe = msg.user.name === "You"; // Simple check for optimistic UI
              return (
                <div key={msg.id || i} className={`flex gap-4 ${isMe ? "flex-row-reverse" : ""}`}>
                  <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                    {msg.user.imageUrl ? (
                      <img src={msg.user.imageUrl} alt="" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      msg.user.name?.charAt(0) || "?"
                    )}
                  </div>
                  <div className={`flex flex-col max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold">{msg.user.name || "Anonymous"}</span>
                      {msg.user.role === "ADMIN" && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-red-500/20 text-red-400">ADMIN</span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm ${isMe ? "bg-purple-600 text-white rounded-tr-sm" : "bg-muted rounded-tl-sm"}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 border-t border-border bg-card/50">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-background"
            />
            <Button type="submit" variant="neon" size="icon" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
