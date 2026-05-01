"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Flame,
  Star,
  Zap,
  Target,
  Award,
  Crown,
  Rocket,
  Code2,
  Brain,
  Users,
  Heart,
  Lock,
} from "lucide-react";

const badges = [
  { icon: Flame, name: "7-Day Streak", description: "Complete lessons 7 days in a row", xp: 100, earned: true, gradient: "from-orange-500 to-red-500" },
  { icon: Star, name: "First Star", description: "Complete your first lesson", xp: 50, earned: true, gradient: "from-amber-500 to-yellow-500" },
  { icon: Code2, name: "Code Warrior", description: "Write 1,000 lines of code", xp: 200, earned: true, gradient: "from-blue-500 to-cyan-500" },
  { icon: Brain, name: "Quick Learner", description: "Complete 10 lessons in one week", xp: 300, earned: true, gradient: "from-purple-500 to-violet-500" },
  { icon: Zap, name: "Speed Demon", description: "Finish a lesson in under 5 minutes", xp: 75, earned: true, gradient: "from-yellow-500 to-orange-500" },
  { icon: Users, name: "Team Player", description: "Help 5 community members", xp: 150, earned: true, gradient: "from-emerald-500 to-teal-500" },
  { icon: Heart, name: "Devoted", description: "30-day learning streak", xp: 500, earned: true, gradient: "from-pink-500 to-rose-500" },
  { icon: Award, name: "Perfectionist", description: "Score 100% on 5 quizzes", xp: 250, earned: true, gradient: "from-indigo-500 to-blue-500" },
  { icon: Rocket, name: "Launchpad", description: "Deploy your first project", xp: 400, earned: false, progress: 80, gradient: "from-violet-500 to-purple-500" },
  { icon: Crown, name: "Master Coder", description: "Complete all course modules", xp: 1000, earned: false, progress: 47, gradient: "from-amber-500 to-orange-500" },
  { icon: Trophy, name: "Legend", description: "Earn all badges", xp: 2000, earned: false, progress: 30, gradient: "from-fuchsia-500 to-pink-500" },
  { icon: Target, name: "Sharpshooter", description: "Complete 50 coding challenges", xp: 350, earned: false, progress: 60, gradient: "from-red-500 to-orange-500" },
];

const levels = [
  { level: 1, name: "Newbie", xpRequired: 0 },
  { level: 2, name: "Beginner", xpRequired: 200 },
  { level: 3, name: "Learner", xpRequired: 500 },
  { level: 4, name: "Coder", xpRequired: 1000 },
  { level: 5, name: "Developer", xpRequired: 2000 },
  { level: 6, name: "Engineer", xpRequired: 3500 },
  { level: 7, name: "Expert", xpRequired: 5000 },
  { level: 8, name: "Master", xpRequired: 8000 },
  { level: 9, name: "Legend", xpRequired: 12000 },
  { level: 10, name: "Vibe Lord", xpRequired: 20000 },
];

const currentXP = 2450;
const currentLevel = levels.filter((l) => l.xpRequired <= currentXP).pop()!;
const nextLevel = levels.find((l) => l.xpRequired > currentXP);
const levelProgress = nextLevel
  ? ((currentXP - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100
  : 100;

export function Achievements() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-400" />
          Achievements
        </h1>
        <p className="text-muted-foreground mt-1">
          Earn XP, collect badges, and level up your coding skills
        </p>
      </motion.div>

      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden">
          <div className="relative p-6 bg-gradient-to-r from-purple-600/20 via-violet-600/10 to-pink-600/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30 text-2xl font-bold text-white">
                    {currentLevel.level}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{currentLevel.name}</h2>
                    <p className="text-sm text-muted-foreground">Level {currentLevel.level}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold gradient-text">{currentXP.toLocaleString()} XP</p>
                {nextLevel && (
                  <p className="text-xs text-muted-foreground">
                    {(nextLevel.xpRequired - currentXP).toLocaleString()} XP to Level {nextLevel.level}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Level {currentLevel.level}</span>
                {nextLevel && <span>Level {nextLevel.level} — {nextLevel.name}</span>}
              </div>
              <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 relative"
                >
                  <div className="absolute inset-0 animate-shimmer" />
                </motion.div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total XP", value: "2,450", icon: Zap, color: "text-purple-400" },
          { label: "Badges Earned", value: "8/12", icon: Award, color: "text-amber-400" },
          { label: "Day Streak", value: "12", icon: Flame, color: "text-orange-400" },
          { label: "Leaderboard", value: "#42", icon: Trophy, color: "text-emerald-400" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          >
            <Card className="p-4 text-center hover:border-purple-500/20 transition-all duration-300">
              <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Badges Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">All Badges</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            >
              <Card
                className={`group transition-all duration-300 ${
                  badge.earned
                    ? "hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5"
                    : "opacity-60"
                }`}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="relative">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${badge.gradient} ${
                        badge.earned ? "shadow-lg" : "grayscale opacity-50"
                      } transition-all duration-300 group-hover:scale-110`}
                    >
                      <badge.icon className="h-7 w-7 text-white" />
                    </div>
                    {!badge.earned && (
                      <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-muted border border-border">
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold truncate">{badge.name}</h4>
                      <Badge variant={badge.earned ? "success" : "secondary"} className="text-[10px] shrink-0">
                        {badge.earned ? "Earned" : `${badge.progress}%`}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{badge.description}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Zap className="h-3 w-3 text-amber-400" />
                      <span className="text-xs font-medium text-amber-400">{badge.xp} XP</span>
                    </div>
                    {!badge.earned && badge.progress !== undefined && (
                      <div className="h-1.5 w-full rounded-full bg-muted mt-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
