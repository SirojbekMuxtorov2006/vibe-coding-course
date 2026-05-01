"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Layout,
  Server,
  Bot,
  DollarSign,
  Clock,
  PlayCircle,
  FileCode,
} from "lucide-react";
import { useState } from "react";

const modules = [
  {
    icon: Layout,
    title: "Frontend Development",
    badge: "12 Lessons",
    gradient: "from-blue-500 to-cyan-500",
    lessons: [
      { title: "HTML & CSS Fundamentals", duration: "45 min", type: "video" },
      { title: "JavaScript Essentials", duration: "1h 20min", type: "video" },
      { title: "React.js Deep Dive", duration: "2h", type: "video" },
      { title: "Next.js & App Router", duration: "1h 45min", type: "video" },
      { title: "TailwindCSS Mastery", duration: "1h", type: "code" },
      { title: "Build: Portfolio Website", duration: "3h", type: "project" },
    ],
  },
  {
    icon: Server,
    title: "Backend Development",
    badge: "10 Lessons",
    gradient: "from-emerald-500 to-teal-500",
    lessons: [
      { title: "Node.js Fundamentals", duration: "1h 30min", type: "video" },
      { title: "Express.js & REST APIs", duration: "2h", type: "video" },
      { title: "PostgreSQL & Prisma ORM", duration: "1h 45min", type: "video" },
      { title: "Authentication & Security", duration: "1h 20min", type: "video" },
      { title: "Build: Full-Stack SaaS App", duration: "4h", type: "project" },
    ],
  },
  {
    icon: Bot,
    title: "AI Tools & Integration",
    badge: "8 Lessons",
    gradient: "from-purple-500 to-pink-500",
    lessons: [
      { title: "Introduction to AI in Development", duration: "45 min", type: "video" },
      { title: "Using GitHub Copilot", duration: "1h", type: "video" },
      { title: "ChatGPT for Coding", duration: "1h 30min", type: "video" },
      { title: "Building AI-Powered Features", duration: "2h", type: "code" },
      { title: "Build: AI Chatbot", duration: "3h", type: "project" },
    ],
  },
  {
    icon: DollarSign,
    title: "Freelancing & Career",
    badge: "6 Lessons",
    gradient: "from-amber-500 to-orange-500",
    lessons: [
      { title: "Setting Up Your Freelance Business", duration: "1h", type: "video" },
      { title: "Finding & Winning Clients", duration: "1h 30min", type: "video" },
      { title: "Pricing Your Services", duration: "45 min", type: "video" },
      { title: "Building Your Portfolio", duration: "2h", type: "project" },
    ],
  },
];

function AccordionItem({
  module,
  index,
}: {
  module: (typeof modules)[0];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass rounded-2xl overflow-hidden transition-all duration-500 ${
        open ? "shadow-lg shadow-purple-500/5" : ""
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 sm:p-6 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
      >
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${module.gradient} shadow-lg`}
        >
          <module.icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold">{module.title}</h3>
          <div className="flex items-center gap-3 mt-1">
            <Badge variant="secondary">{module.badge}</Badge>
            <span className="text-xs text-muted-foreground">
              {module.lessons.length} lessons
            </span>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-2">
          {module.lessons.map((lesson, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors group"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-purple-500/10 transition-colors">
                {lesson.type === "video" ? (
                  <PlayCircle className="h-4 w-4 text-muted-foreground group-hover:text-purple-400 transition-colors" />
                ) : (
                  <FileCode className="h-4 w-4 text-muted-foreground group-hover:text-purple-400 transition-colors" />
                )}
              </div>
              <span className="flex-1 text-sm">{lesson.title}</span>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {lesson.duration}
              </div>
              {lesson.type === "project" && (
                <Badge variant="success" className="text-[10px] px-2 py-0.5">
                  Project
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function CourseContent() {
  return (
    <section id="course" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-violet-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-purple-400 mb-3 tracking-wider uppercase">
            Curriculum
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            What You&apos;ll{" "}
            <span className="gradient-text">Learn</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive curriculum covering everything from frontend to AI to freelancing.
          </p>
        </motion.div>

        <div className="space-y-4">
          {modules.map((module, i) => (
            <AccordionItem key={i} module={module} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
