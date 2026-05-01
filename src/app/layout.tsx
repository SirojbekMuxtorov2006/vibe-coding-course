import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIBE CODING — Master Modern Development",
  description:
    "Learn coding with AI tools and real-world projects. Go from beginner to professional developer with our fast-track roadmap and community of 12,000+ students.",
  keywords: [
    "coding course",
    "learn programming",
    "AI development",
    "web development",
    "React",
    "Next.js",
    "freelancing",
  ],
  openGraph: {
    title: "VIBE CODING — Master Modern Development",
    description: "Learn coding with AI tools and real-world projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      >
        <body className="min-h-full flex flex-col bg-background text-foreground">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
