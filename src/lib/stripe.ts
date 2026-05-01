import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
});

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    stripePriceId: null,
    features: [
      "5 Free Lessons",
      "Community Access",
      "Basic Code Playground",
    ],
  },
  PRO: {
    name: "Pro",
    price: 29,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      "All 200+ Lessons",
      "AI Code Assistant",
      "Real-World Projects",
      "Certificate of Completion",
      "Priority Support",
      "Code Reviews",
    ],
  },
  LIFETIME: {
    name: "Lifetime",
    price: 199,
    stripePriceId: process.env.STRIPE_LIFETIME_PRICE_ID,
    features: [
      "Everything in Pro",
      "Lifetime Updates",
      "1-on-1 Mentoring",
      "Freelancing Masterclass",
      "Resume Review",
      "Career Coaching Call",
    ],
  },
} as const;
