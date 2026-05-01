"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  FileCode,
  ChevronDown,
} from "lucide-react";

const defaultCode = `// 🚀 Welcome to Vibe Code Playground!
// Try editing this code and click "Run"

function greet(name) {
  return \`Hello, \${name}! Welcome to Vibe Coding 🎉\`;
}

// Array methods practice
const students = [
  { name: "Alex", score: 95 },
  { name: "Sarah", score: 88 },
  { name: "Marcus", score: 92 },
  { name: "Priya", score: 97 },
];

// Find top students (score > 90)
const topStudents = students
  .filter(s => s.score > 90)
  .map(s => s.name);

console.log(greet("Developer"));
console.log("Top Students:", topStudents);
console.log("Average Score:", 
  students.reduce((sum, s) => sum + s.score, 0) / students.length
);`;

const templates = [
  { name: "JavaScript Basics", lang: "javascript" },
  { name: "React Component", lang: "jsx" },
  { name: "API Fetch", lang: "javascript" },
  { name: "Array Methods", lang: "javascript" },
];

export function CodePlayground() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);

    setTimeout(() => {
      const logs: string[] = [];
      const originalLog = console.log;

      try {
        console.log = (...args) => {
          logs.push(
            args
              .map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)))
              .join(" ")
          );
        };

        const fn = new Function(code);
        fn();

        setOutput(logs.length > 0 ? logs : ["✅ Code executed successfully (no output)"]);
      } catch (error) {
        setOutput([`❌ Error: ${(error as Error).message}`]);
      } finally {
        console.log = originalLog;
        setIsRunning(false);
      }
    }, 500);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetCode = () => {
    setCode(defaultCode);
    setOutput([]);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileCode className="h-6 w-6 text-purple-400" />
            Code Playground
          </h1>
          <p className="text-muted-foreground mt-1">
            Write, run, and experiment with code in real-time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTemplates(!showTemplates)}
            >
              Templates
              <ChevronDown className="h-3.5 w-3.5 ml-1" />
            </Button>
            {showTemplates && (
              <div className="absolute right-0 mt-2 w-48 glass rounded-xl p-2 z-10 shadow-xl">
                {templates.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setShowTemplates(false)}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    {t.name}
                    <Badge variant="secondary" className="ml-2 text-[10px]">{t.lang}</Badge>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 xl:grid-cols-2 gap-4"
      >
        {/* Editor */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2">playground.js</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={copyCode}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={resetCode}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-muted/20 flex flex-col items-center pt-4 text-xs text-muted-foreground font-mono select-none">
              {code.split("\n").map((_, i) => (
                <div key={i} className="leading-6 h-6">{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full min-h-[400px] bg-transparent pl-14 pr-4 py-4 font-mono text-sm leading-6 text-foreground focus:outline-none resize-none"
              spellCheck={false}
            />
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
            <Badge variant="secondary" className="text-[10px]">JavaScript</Badge>
            <Button
              variant="neon"
              size="sm"
              onClick={runCode}
              disabled={isRunning}
              className="gap-1.5"
            >
              <Play className="h-3.5 w-3.5" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>
        </Card>

        {/* Output */}
        <Card className="overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">Console Output</span>
          </div>

          <div className="min-h-[400px] p-4 font-mono text-sm">
            {output.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[350px] text-center">
                <Terminal className="h-10 w-10 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground text-sm">Click &quot;Run Code&quot; to see output</p>
                <p className="text-muted-foreground/50 text-xs mt-1">Console logs will appear here</p>
              </div>
            ) : (
              <div className="space-y-1">
                {output.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    className={`py-1 px-2 rounded ${
                      line.startsWith("❌")
                        ? "text-red-400 bg-red-500/5"
                        : line.startsWith("✅")
                          ? "text-emerald-400 bg-emerald-500/5"
                          : "text-emerald-300"
                    }`}
                  >
                    <span className="text-muted-foreground mr-2 select-none">&gt;</span>
                    {line}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
