"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { VideoLessons } from "@/components/dashboard/video-lessons";
import { CodePlayground } from "@/components/dashboard/code-playground";
import { Chatbot } from "@/components/dashboard/chatbot";
import { Achievements } from "@/components/dashboard/achievements";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { Resources } from "@/components/dashboard/resources";
import { Bell, Search, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome onNavigate={setActiveTab} />;
      case "lessons":
        return <VideoLessons />;
      case "playground":
        return <CodePlayground />;
      case "chatbot":
        return <Chatbot />;
      case "achievements":
        return <Achievements />;
      case "progress":
        return <ProgressTracker />;
      case "resources":
        return <Resources />;
      default:
        return <DashboardHome onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-64">
            <Sidebar activeTab={activeTab} onTabChange={(tab) => {
              setActiveTab(tab);
              setMobileMenuOpen(false);
            }} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64 transition-all duration-300">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border glass-strong px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search lessons, resources..."
                className="w-64 bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors cursor-pointer">
              <Bell className="h-5 w-5" />
              <div className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-purple-500" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/50 border border-border">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-xs font-bold text-white">
                D
              </div>
              <span className="text-sm font-medium hidden sm:block">Developer</span>
              <Badge className="hidden sm:flex text-[10px]">Pro</Badge>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
