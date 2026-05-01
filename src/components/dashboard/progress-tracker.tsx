"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle2,
  Target,
} from "lucide-react";

const weeklyData = [
  { day: "Mon", hours: 2.5, lessons: 3 },
  { day: "Tue", hours: 1.8, lessons: 2 },
  { day: "Wed", hours: 3.2, lessons: 4 },
  { day: "Thu", hours: 0.5, lessons: 1 },
  { day: "Fri", hours: 2.0, lessons: 2 },
  { day: "Sat", hours: 4.0, lessons: 5 },
  { day: "Sun", hours: 1.5, lessons: 2 },
];

const maxHours = Math.max(...weeklyData.map((d) => d.hours));

const moduleProgress = [
  { name: "Frontend Development", completed: 8, total: 12, color: "from-blue-500 to-cyan-500" },
  { name: "Backend Development", completed: 3, total: 10, color: "from-emerald-500 to-teal-500" },
  { name: "AI Tools & Integration", completed: 1, total: 8, color: "from-purple-500 to-pink-500" },
  { name: "Freelancing & Career", completed: 0, total: 6, color: "from-amber-500 to-orange-500" },
];

const milestones = [
  { title: "Complete first module", done: true },
  { title: "Build portfolio project", done: true },
  { title: "50% course completion", done: false, progress: 94 },
  { title: "Deploy a project", done: false, progress: 60 },
  { title: "Complete all modules", done: false, progress: 33 },
];

export function ProgressTracker() {
  const totalCompleted = moduleProgress.reduce((a, m) => a + m.completed, 0);
  const totalLessons = moduleProgress.reduce((a, m) => a + m.total, 0);
  const overallProgress = Math.round((totalCompleted / totalLessons) * 100);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-purple-400" />
          Progress
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your learning journey and stay on target
        </p>
      </motion.div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: CheckCircle2, label: "Lessons Completed", value: `${totalCompleted}/${totalLessons}`, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { icon: Clock, label: "Total Hours", value: "38.5h", color: "text-blue-400", bg: "bg-blue-500/10" },
          { icon: TrendingUp, label: "This Week", value: "15.5h", color: "text-purple-400", bg: "bg-purple-500/10" },
          { icon: Target, label: "Overall", value: `${overallProgress}%`, color: "text-amber-400", bg: "bg-amber-500/10" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="hover:border-purple-500/20 transition-all duration-300">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-400" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-48">
                {weeklyData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-muted-foreground">{d.hours}h</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.hours / maxHours) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-violet-500 min-h-[4px] relative group cursor-pointer"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block glass px-2 py-1 rounded text-xs whitespace-nowrap">
                        {d.lessons} lessons
                      </div>
                    </motion.div>
                    <span className="text-xs text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Module Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                Module Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {moduleProgress.map((mod, i) => {
                const pct = Math.round((mod.completed / mod.total) * 100);
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{mod.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {mod.completed}/{mod.total} <span className="text-foreground font-medium">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.6 + i * 0.15 }}
                        className={`h-full rounded-full bg-gradient-to-r ${mod.color}`}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-amber-400" />
              Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    m.done ? "bg-emerald-500/10" : "bg-muted"
                  }`}>
                    {m.done ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${m.done ? "line-through text-muted-foreground" : ""}`}>
                      {m.title}
                    </p>
                  </div>
                  {m.done ? (
                    <Badge variant="success">Done</Badge>
                  ) : (
                    <Badge variant="secondary">{m.progress}%</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
