"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Clock,
  Flame,
  Target,
  TrendingUp,
  BookOpen,
  Trophy,
  Zap,
} from "lucide-react";

const stats = [
  { icon: Flame, label: "Day Streak", value: "12", color: "text-orange-400", bg: "bg-orange-500/10" },
  { icon: Target, label: "XP Earned", value: "2,450", color: "text-purple-400", bg: "bg-purple-500/10" },
  { icon: BookOpen, label: "Lessons Done", value: "47", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: Trophy, label: "Badges", value: "8", color: "text-amber-400", bg: "bg-amber-500/10" },
];

const recentLessons = [
  { title: "React Hooks Deep Dive", module: "Frontend", progress: 75, duration: "15 min left" },
  { title: "Building REST APIs", module: "Backend", progress: 30, duration: "45 min left" },
  { title: "TailwindCSS Animations", module: "Frontend", progress: 100, duration: "Completed" },
];

const upcomingLessons = [
  { title: "Next.js Server Components", module: "Frontend", duration: "1h 20min" },
  { title: "Database Design with Prisma", module: "Backend", duration: "1h 45min" },
  { title: "AI Code Assistant Integration", module: "AI Tools", duration: "2h" },
];

export function DashboardHome({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="gradient-text">Developer</span> 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Continue your learning journey. You&apos;re making great progress!
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="hover:border-purple-500/20 transition-all duration-300">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Continue learning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="overflow-hidden">
          <div className="relative p-6 bg-gradient-to-r from-purple-600/20 via-violet-600/10 to-transparent">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <Badge className="mb-2">Continue Learning</Badge>
                <h3 className="text-xl font-bold">React Hooks Deep Dive</h3>
                <p className="text-sm text-muted-foreground mt-1">Module: Frontend Development &middot; 75% Complete</p>
              </div>
              <Button variant="neon" className="group" onClick={() => onNavigate("lessons")}>
                <Play className="h-4 w-4" />
                Continue
              </Button>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000" />
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentLessons.map((lesson, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                    <BookOpen className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">{lesson.module}</p>
                  </div>
                  <div className="text-right">
                    <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{lesson.duration}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-400" />
                Up Next
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingLessons.map((lesson, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Play className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">{lesson.module}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {lesson.duration}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
