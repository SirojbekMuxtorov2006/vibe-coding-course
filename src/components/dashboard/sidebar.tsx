"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PlayCircle,
  Code2,
  Trophy,
  Bot,
  Settings,
  LogOut,
  Zap,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  BarChart3,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: PlayCircle, label: "Lessons", id: "lessons" },
  { icon: Code2, label: "Code Playground", id: "playground" },
  { icon: Bot, label: "AI Assistant", id: "chatbot" },
  { icon: Trophy, label: "Achievements", id: "achievements" },
  { icon: BarChart3, label: "Progress", id: "progress" },
  { icon: BookOpen, label: "Resources", id: "resources" },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-border bg-card/80 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30">
            <Zap className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-base font-bold tracking-tight">
              VIBE <span className="gradient-text">CODING</span>
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
              activeTab === item.id
                ? "bg-purple-500/10 text-purple-300 shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5 shrink-0",
                activeTab === item.id ? "text-purple-400" : ""
              )}
            />
            {!collapsed && <span>{item.label}</span>}
            {activeTab === item.id && !collapsed && (
              <div className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-border space-y-1">
        <button className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        )}>
          <Settings className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>
        <Link href="/" className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-red-400 hover:bg-red-500/5 transition-colors"
        )}>
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </Link>
      </div>
    </aside>
  );
}
