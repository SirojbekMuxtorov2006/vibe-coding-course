"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Rocket, Map, Users, Code2, Brain, Blocks, Trophy } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Learning",
    description: "Get personalized help from our AI assistant that adapts to your learning style and pace.",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    icon: Rocket,
    title: "Real-World Projects",
    description: "Build production-ready apps — not toy examples. Ship real projects to your portfolio.",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: Map,
    title: "Fast-Track Roadmap",
    description: "Follow a proven curriculum designed to get you job-ready in weeks, not years.",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join 12,000+ developers. Get help, share progress, and network with peers.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Code2,
    title: "Code Playground",
    description: "Practice coding directly in the browser with our built-in VS Code-like editor.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Brain,
    title: "AI Code Reviews",
    description: "Get instant feedback on your code from our AI, just like a senior developer mentor.",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: Blocks,
    title: "Interactive Challenges",
    description: "Level up with gamified coding challenges. Earn XP, badges, and climb the leaderboard.",
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    icon: Trophy,
    title: "Career Support",
    description: "Get freelancing guidance, interview prep, and resume reviews from industry experts.",
    gradient: "from-yellow-500 to-amber-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-purple-400 mb-3 tracking-wider uppercase">
            Why Vibe Coding
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Everything You Need to
            <br />
            <span className="gradient-text">Become a Pro</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-powered learning to real-world projects, we give you every tool and resource to succeed.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={cardVariants}>
              <Card className="group h-full hover:border-purple-500/30 hover:shadow-purple-500/5 hover:shadow-xl transition-all duration-500 cursor-default">
                <CardContent className="p-6">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
