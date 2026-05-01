import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Clock, BookOpen, CheckCircle, Lock, ChevronLeft } from "lucide-react";
import { EnrollButton } from "@/components/courses/enroll-button";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const course = await db.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { position: "asc" },
        include: {
          lessons: {
            orderBy: { position: "asc" },
          },
        },
      },
      _count: {
        select: { enrollments: true },
      },
    },
  });

  if (!course) {
    notFound();
  }

  const user = await getAuthUser();
  let isEnrolled = false;

  if (user) {
    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
    });
    isEnrolled = !!enrollment;
  }

  const lessonCount = course.modules.reduce(
    (acc, mod) => acc + mod.lessons.length,
    0
  );
  const durationSec = course.modules.reduce(
    (acc, mod) => acc + mod.lessons.reduce((lAcc, l) => lAcc + l.duration, 0),
    0
  );
  const hours = Math.floor(durationSec / 3600);
  const minutes = Math.floor((durationSec % 3600) / 60);

  return (
    <div className="min-h-screen bg-background pb-20 pt-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/courses"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {course.category && (
                  <Badge variant="secondary">{course.category}</Badge>
                )}
                {course.level && (
                  <Badge variant="outline" className="capitalize">
                    {course.level}
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 py-6 border-y border-border/50">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                  <BookOpen className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lessons</p>
                  <p className="font-semibold">{lessonCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/10">
                  <Clock className="h-5 w-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">
                    {hours > 0 ? `${hours}h ` : ""}
                    {minutes}m
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {course.modules.map((module, i) => (
                  <Card key={module.id} className="overflow-hidden bg-card/50">
                    <div className="px-6 py-4 border-b border-border/50 bg-muted/20">
                      <h3 className="font-semibold text-lg">
                        Module {i + 1}: {module.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {module.lessons.length} lessons
                      </p>
                    </div>
                    <div className="divide-y divide-border/50">
                      {module.lessons.map((lesson, j) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between px-6 py-4 hover:bg-muted/10 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {isEnrolled || lesson.isFree ? (
                              <PlayCircle className="h-5 w-5 text-purple-400" />
                            ) : (
                              <Lock className="h-5 w-5 text-muted-foreground" />
                            )}
                            <span className="text-sm font-medium">
                              {j + 1}. {lesson.title}
                            </span>
                            {lesson.isFree && !isEnrolled && (
                              <Badge variant="secondary" className="text-[10px] uppercase">
                                Preview
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {Math.floor(lesson.duration / 60)}:
                            {(lesson.duration % 60)
                              .toString()
                              .padStart(2, "0")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="overflow-hidden border-purple-500/20 shadow-2xl shadow-purple-500/10">
                <div className="aspect-video relative bg-muted">
                  {course.imageUrl ? (
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/40 to-pink-900/40">
                      <PlayCircle className="h-16 w-16 text-white/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <PlayCircle className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="text-3xl font-bold mb-6">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </div>

                  {isEnrolled ? (
                    <Link href="/dashboard/lessons">
                      <Button variant="neon" size="xl" className="w-full text-lg">
                        Continue Learning
                      </Button>
                    </Link>
                  ) : (
                    <EnrollButton
                      courseId={course.id}
                      isFree={course.price === 0}
                      price={course.price}
                    />
                  )}

                  <div className="mt-6 space-y-3">
                    <p className="text-sm font-medium">This course includes:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        {hours > 0 ? `${hours} hours` : `${minutes} mins`} of on-demand video
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        {lessonCount} comprehensive lessons
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Full lifetime access
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Access on mobile and TV
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Certificate of completion
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
