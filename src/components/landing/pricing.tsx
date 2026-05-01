"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    icon: Zap,
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "5 Free Lessons",
      "Community Access",
      "Basic Code Playground",
      "Email Support",
    ],
    cta: "Get Started",
    variant: "outline" as const,
    popular: false,
    gradient: "",
  },
  {
    name: "Pro",
    icon: Sparkles,
    price: "$29",
    period: "/month",
    description: "For serious learners",
    features: [
      "All 200+ Lessons",
      "AI Code Assistant",
      "Real-World Projects",
      "Certificate of Completion",
      "Priority Support",
      "Private Discord Channel",
      "Code Reviews",
    ],
    cta: "Start Pro",
    variant: "neon" as const,
    popular: true,
    gradient: "from-purple-600 to-pink-600",
  },
  {
    name: "Lifetime",
    icon: Crown,
    price: "$199",
    period: "one-time",
    description: "Best value, pay once",
    features: [
      "Everything in Pro",
      "Lifetime Updates",
      "1-on-1 Mentoring (2 sessions)",
      "Freelancing Masterclass",
      "Resume Review",
      "Career Coaching Call",
      "Early Access to New Courses",
    ],
    cta: "Get Lifetime",
    variant: "default" as const,
    popular: false,
    gradient: "",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />
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
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Invest in Your{" "}
            <span className="gradient-text">Future</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your learning goals. All plans include our core curriculum.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={plan.popular ? "md:-mt-4 md:mb-4" : ""}
            >
              <Card
                className={`relative overflow-hidden ${
                  plan.popular
                    ? "border-purple-500/50 shadow-xl shadow-purple-500/10"
                    : "hover:border-purple-500/20"
                } transition-all duration-500 hover:shadow-lg`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600" />
                )}
                <CardHeader className="pb-4">
                  {plan.popular && (
                    <Badge className="w-fit mb-3 animate-pulse-glow">Most Popular</Badge>
                  )}
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        plan.popular
                          ? "bg-gradient-to-br from-purple-600 to-pink-600"
                          : "bg-muted"
                      }`}
                    >
                      <plan.icon className={`h-5 w-5 ${plan.popular ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10">
                          <Check className="h-3 w-3 text-purple-400" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant={plan.variant} className="w-full" size="lg">
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
