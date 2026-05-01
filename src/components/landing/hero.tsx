"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Star, Users, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";

const floatingIcons = [
  { icon: "⚡", x: "10%", y: "20%", delay: 0 },
  { icon: "🚀", x: "85%", y: "15%", delay: 1 },
  { icon: "💜", x: "75%", y: "70%", delay: 2 },
  { icon: "🎯", x: "15%", y: "75%", delay: 0.5 },
  { icon: "✨", x: "90%", y: "45%", delay: 1.5 },
  { icon: "🔥", x: "5%", y: "50%", delay: 2.5 },
];

const stats = [
  { icon: Users, label: "Active Students", value: "12,000+" },
  { icon: Star, label: "Average Rating", value: "4.9/5" },
  { icon: BookOpen, label: "Lessons", value: "200+" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[200px]" />
      </div>

      {/* Floating icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl opacity-20 pointer-events-none select-none"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [-20, 20, -20],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Badge className="mb-6 px-4 py-1.5 text-sm">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            New: AI-Powered Learning is Here
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
        >
          Master Coding
          <br />
          <span className="gradient-text">with Vibe</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Learn modern coding with AI tools and real-world projects.
          Go from beginner to professional developer with our
          fast-track roadmap and community support.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <Button variant="neon" size="xl" className="group">
              Start Learning
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button variant="outline" size="xl" className="group">
            <Play className="h-5 w-5 mr-1 text-purple-400" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20">
                <stat.icon className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Animated code preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 mx-auto max-w-3xl"
        >
          <div className="glass rounded-2xl p-1 shadow-2xl shadow-purple-500/10">
            <div className="rounded-xl bg-[#0a0a12] p-4 sm:p-6 text-left overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">vibe-project.tsx</span>
              </div>
              <pre className="text-sm sm:text-base font-mono leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-300">developer</span>{" "}
                  <span className="text-muted-foreground">=</span>{" "}
                  <span className="text-emerald-400">{`{`}</span>{"\n"}
                  {"  "}<span className="text-pink-400">name</span>
                  <span className="text-muted-foreground">:</span>{" "}
                  <span className="text-amber-300">{`"You"`}</span>
                  <span className="text-muted-foreground">,</span>{"\n"}
                  {"  "}<span className="text-pink-400">skills</span>
                  <span className="text-muted-foreground">:</span>{" "}
                  <span className="text-amber-300">[</span>
                  <span className="text-amber-300">{`"React"`}</span>
                  <span className="text-muted-foreground">,</span>{" "}
                  <span className="text-amber-300">{`"AI"`}</span>
                  <span className="text-muted-foreground">,</span>{" "}
                  <span className="text-amber-300">{`"Full-Stack"`}</span>
                  <span className="text-amber-300">]</span>
                  <span className="text-muted-foreground">,</span>{"\n"}
                  {"  "}<span className="text-pink-400">level</span>
                  <span className="text-muted-foreground">:</span>{" "}
                  <span className="text-amber-300">{`"🚀 Pro"`}</span>{"\n"}
                  <span className="text-emerald-400">{`}`}</span>
                  <span className="text-muted-foreground">;</span>
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
