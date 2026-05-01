"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Video,
  Code2,
  Newspaper,
  FolderOpen,
} from "lucide-react";

const resources = [
  {
    category: "Cheat Sheets",
    icon: FileText,
    items: [
      { title: "React Hooks Cheat Sheet", type: "PDF", size: "2.3 MB" },
      { title: "TypeScript Quick Reference", type: "PDF", size: "1.8 MB" },
      { title: "Git Commands Guide", type: "PDF", size: "1.1 MB" },
      { title: "CSS Flexbox & Grid", type: "PDF", size: "3.2 MB" },
    ],
  },
  {
    category: "Starter Templates",
    icon: Code2,
    items: [
      { title: "Next.js SaaS Starter", type: "ZIP", size: "4.5 MB" },
      { title: "React Dashboard Template", type: "ZIP", size: "6.1 MB" },
      { title: "REST API Boilerplate", type: "ZIP", size: "2.8 MB" },
      { title: "Portfolio Template", type: "ZIP", size: "3.4 MB" },
    ],
  },
  {
    category: "Video Recordings",
    icon: Video,
    items: [
      { title: "Live Coding Session #12", type: "MP4", size: "850 MB" },
      { title: "Q&A: Career Advice", type: "MP4", size: "620 MB" },
      { title: "Workshop: Building SaaS", type: "MP4", size: "1.2 GB" },
    ],
  },
  {
    category: "Reading Materials",
    icon: Newspaper,
    items: [
      { title: "JavaScript Design Patterns", type: "Article", size: "" },
      { title: "System Design Basics", type: "Article", size: "" },
      { title: "Freelancing Pricing Guide", type: "Article", size: "" },
    ],
  },
];

export function Resources() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-purple-400" />
          Resources
        </h1>
        <p className="text-muted-foreground mt-1">
          Download cheat sheets, templates, and bonus materials
        </p>
      </motion.div>

      <div className="space-y-6">
        {resources.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <section.icon className="h-5 w-5 text-purple-400" />
              <h2 className="text-lg font-semibold">{section.category}</h2>
              <Badge variant="secondary">{section.items.length}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.items.map((item, j) => (
                <Card key={j} className="group hover:border-purple-500/20 transition-all duration-300">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                      <FolderOpen className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className="text-[10px]">{item.type}</Badge>
                        {item.size && (
                          <span className="text-xs text-muted-foreground">{item.size}</span>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
                      {item.type === "Article" ? (
                        <ExternalLink className="h-4 w-4" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
