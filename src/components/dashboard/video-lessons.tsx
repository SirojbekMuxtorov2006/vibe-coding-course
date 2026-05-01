"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize2,
  CheckCircle2,
  Lock,
  Clock,
} from "lucide-react";

const lessons = [
  { id: 1, title: "Introduction to React", duration: "12:30", completed: true, locked: false },
  { id: 2, title: "JSX & Components", duration: "18:45", completed: true, locked: false },
  { id: 3, title: "Props & State", duration: "24:10", completed: true, locked: false },
  { id: 4, title: "React Hooks (useState)", duration: "20:35", completed: false, locked: false, current: true },
  { id: 5, title: "useEffect Deep Dive", duration: "22:15", completed: false, locked: false },
  { id: 6, title: "Custom Hooks", duration: "19:50", completed: false, locked: false },
  { id: 7, title: "Context API", duration: "16:40", completed: false, locked: true },
  { id: 8, title: "React Router", duration: "25:20", completed: false, locked: true },
  { id: 9, title: "Performance Optimization", duration: "28:00", completed: false, locked: true },
  { id: 10, title: "Building a Real App", duration: "45:00", completed: false, locked: true },
];

export function VideoLessons() {
  const [playing, setPlaying] = useState(false);
  const [activeLesson, setActiveLesson] = useState(4);

  const currentLesson = lessons.find((l) => l.id === activeLesson);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold">Video Lessons</h1>
        <p className="text-muted-foreground mt-1">Frontend Development &middot; React Module</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="xl:col-span-2"
        >
          <Card className="overflow-hidden">
            {/* Video area */}
            <div className="relative aspect-video bg-black/50 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/10" />

              {/* Fake video content */}
              <div className="relative z-10 text-center">
                <div className="font-mono text-sm text-muted-foreground mb-4 glass px-4 py-2 rounded-lg">
                  {currentLesson?.title}
                </div>
                <button
                  onClick={() => setPlaying(!playing)}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600/80 hover:bg-purple-600 transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  {playing ? (
                    <Pause className="h-7 w-7 text-white" />
                  ) : (
                    <Play className="h-7 w-7 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-1 w-full rounded-full bg-white/20 mb-3 cursor-pointer">
                  <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-lg" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setPlaying(!playing)} className="text-white hover:text-purple-300 transition-colors cursor-pointer">
                      {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <button className="text-white hover:text-purple-300 transition-colors cursor-pointer">
                      <SkipBack className="h-4 w-4" />
                    </button>
                    <button className="text-white hover:text-purple-300 transition-colors cursor-pointer">
                      <SkipForward className="h-4 w-4" />
                    </button>
                    <span className="text-xs text-white/70">7:23 / {currentLesson?.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-white hover:text-purple-300 transition-colors cursor-pointer">
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <button className="text-white hover:text-purple-300 transition-colors cursor-pointer">
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-5">
              <h2 className="text-lg font-semibold">{currentLesson?.title}</h2>
              <p className="text-sm text-muted-foreground mt-2">
                In this lesson, you&apos;ll learn about the fundamentals of React Hooks, starting with useState. We&apos;ll cover how state management works in functional components and build practical examples.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Button variant="neon" size="sm">
                  Mark as Complete
                </Button>
                <Button variant="outline" size="sm">
                  Take Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lesson list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-sm">Course Content</h3>
              <p className="text-xs text-muted-foreground mt-0.5">3 of 10 completed</p>
            </div>
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => !lesson.locked && setActiveLesson(lesson.id)}
                  disabled={lesson.locked}
                  className={`w-full flex items-center gap-3 p-3 text-left transition-colors cursor-pointer ${
                    lesson.id === activeLesson
                      ? "bg-purple-500/10"
                      : lesson.locked
                        ? "opacity-50"
                        : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                    {lesson.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : lesson.locked ? (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    ) : lesson.id === activeLesson ? (
                      <div className="h-5 w-5 rounded-full border-2 border-purple-400 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-purple-400" />
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{lesson.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                    </div>
                  </div>
                  {lesson.locked && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">Pro</Badge>
                  )}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
