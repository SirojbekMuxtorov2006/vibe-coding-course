"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlayCircle, Code2, MessageSquare, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LessonClientProps {
  course: any;
  lesson: any;
  isEnrolled: boolean;
}

export function LessonClient({ course, lesson, isEnrolled }: LessonClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isEnrolled && !lesson.isFree) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Content Locked</h2>
          <p className="text-muted-foreground mb-6">You need to enroll in this course to view this lesson.</p>
          <Link href={`/courses/${course.slug}`}>
            <Button variant="neon">Go to Course Page</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Find next/prev lessons
  const allLessons = course.modules.flatMap((m: any) => m.lessons);
  const currentIndex = allLessons.findIndex((l: any) => l.id === lesson.id);
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  const handleMarkComplete = async () => {
    // Call API to mark as complete
    await fetch("/api/progress", {
      method: "POST",
      body: JSON.stringify({ lessonId: lesson.id, completed: true })
    });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-80 bg-card border-r border-border transition-transform duration-300 transform",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-4 border-b border-border bg-card/80 backdrop-blur-md">
          <Link href={`/courses/${course.slug}`} className="font-semibold text-sm hover:text-purple-400 transition-colors line-clamp-1">
            {course.title}
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-6">
            {course.modules.map((module: any, i: number) => (
              <div key={module.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  Module {i + 1}: {module.title}
                </h3>
                <div className="space-y-1">
                  {module.lessons.map((l: any) => (
                    <Link
                      key={l.id}
                      href={`/courses/${course.slug}/lessons/${l.id}`}
                      className={cn(
                        "flex items-start gap-3 p-2 rounded-lg text-sm transition-colors",
                        lesson.id === l.id
                          ? "bg-purple-500/10 text-purple-400 font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <PlayCircle className={cn("h-4 w-4 mt-0.5 shrink-0", lesson.id === l.id ? "text-purple-400" : "")} />
                      <span className="line-clamp-2">{l.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        sidebarOpen ? "lg:ml-80" : "ml-0"
      )}>
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-border bg-background/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors">
                <Menu className="h-5 w-5" />
              </button>
            )}
            <h1 className="text-lg font-semibold line-clamp-1">{lesson.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleMarkComplete}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Complete
            </Button>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Video Player */}
            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden border border-border shadow-2xl relative">
              {lesson.videoUrl ? (
                <video 
                  src={lesson.videoUrl} 
                  controls 
                  className="w-full h-full"
                  poster={lesson.thumbnailUrl || undefined}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                  <PlayCircle className="h-16 w-16 mb-4 opacity-50" />
                  <p>Video processing...</p>
                </div>
              )}
            </div>

            {/* Content & Navigation */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">About this lesson</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {lesson.description || "No description provided."}
                  </p>
                </div>

                <div className="flex gap-4 border-t border-border pt-6">
                  <Button variant="secondary" className="flex-1">
                    <Code2 className="h-4 w-4 mr-2" />
                    Code Files
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Discuss
                  </Button>
                </div>
              </div>

              <div className="w-full md:w-64 shrink-0 space-y-4 border-l border-border pl-0 md:pl-8">
                <p className="text-sm font-semibold text-muted-foreground">Up Next</p>
                {nextLesson ? (
                  <Link href={`/courses/${course.slug}/lessons/${nextLesson.id}`}>
                    <div className="group p-3 rounded-xl border border-border bg-card hover:border-purple-500/50 transition-colors">
                      <p className="text-sm font-medium line-clamp-2 group-hover:text-purple-400 transition-colors">
                        {nextLesson.title}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <PlayCircle className="h-3 w-3" />
                        <span>{Math.floor(nextLesson.duration / 60)}m</span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="p-4 rounded-xl border border-border bg-muted/50 text-center text-sm text-muted-foreground">
                    End of course!
                  </div>
                )}
                
                {prevLesson && (
                  <Link href={`/courses/${course.slug}/lessons/${prevLesson.id}`}>
                    <Button variant="ghost" size="sm" className="w-full mt-4 justify-start text-muted-foreground">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous Lesson
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
