"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Frontend Developer",
    avatar: "AJ",
    gradient: "from-purple-500 to-pink-500",
    rating: 5,
    text: "VIBE CODING completely changed my career. I went from knowing nothing to landing a $70k job in just 4 months. The AI tools section alone is worth 10x the price.",
  },
  {
    name: "Sarah Kim",
    role: "Freelance Developer",
    avatar: "SK",
    gradient: "from-blue-500 to-cyan-500",
    rating: 5,
    text: "The freelancing module helped me land my first $5k client within 2 weeks of finishing the course. The community support is incredible.",
  },
  {
    name: "Marcus Chen",
    role: "Full-Stack Developer",
    avatar: "MC",
    gradient: "from-emerald-500 to-teal-500",
    rating: 5,
    text: "Best investment I've made in my career. The projects are real-world, not toy examples. My portfolio looks professional now.",
  },
  {
    name: "Priya Patel",
    role: "CS Student",
    avatar: "PP",
    gradient: "from-amber-500 to-orange-500",
    rating: 5,
    text: "As a student, this course taught me more practical skills in 2 months than my entire university degree. The AI assistant is like having a personal tutor.",
  },
  {
    name: "David Torres",
    role: "Career Changer",
    avatar: "DT",
    gradient: "from-rose-500 to-pink-500",
    rating: 5,
    text: "I switched from marketing to development thanks to Vibe Coding. The fast-track roadmap kept me focused and the gamification made learning addictive.",
  },
  {
    name: "Lisa Wang",
    role: "Startup Founder",
    avatar: "LW",
    gradient: "from-indigo-500 to-violet-500",
    rating: 5,
    text: "I built my startup's MVP entirely with skills from this course. The full-stack project modules are incredibly comprehensive and practical.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-pink-600/5 rounded-full blur-[120px]" />
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
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Loved by{" "}
            <span className="gradient-text">Developers</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who transformed their careers with Vibe Coding.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full hover:border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-500 group">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-purple-500/20 mb-4" />

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-white text-sm font-bold`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
