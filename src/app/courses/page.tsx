import { db } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Star } from "lucide-react";
import Image from "next/image";

export default async function CoursesPage() {
  const courses = await db.course.findMany({
    where: { published: true },
    include: {
      modules: {
        include: {
          lessons: true
        }
      },
      _count: {
        select: { enrollments: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-background pb-20 pt-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Explore <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Master modern web development, AI integration, and freelancing with our comprehensive courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => {
            const lessonCount = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
            const durationSec = course.modules.reduce(
              (acc, mod) => acc + mod.lessons.reduce((lAcc, l) => lAcc + l.duration, 0),
              0
            );
            const hours = Math.floor(durationSec / 3600);
            const minutes = Math.floor((durationSec % 3600) / 60);

            return (
              <Card key={course.id} className="group overflow-hidden flex flex-col h-full hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                <div className="relative h-48 w-full bg-muted overflow-hidden">
                  {course.imageUrl ? (
                    <Image src={course.imageUrl} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-white/20" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {course.category && (
                      <Badge variant="secondary" className="glass backdrop-blur-md">{course.category}</Badge>
                    )}
                    {course.level && (
                      <Badge variant="outline" className="glass backdrop-blur-md bg-black/50 border-white/10 text-white capitalize">{course.level}</Badge>
                    )}
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-purple-400 transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" />
                      <span>{lessonCount} lessons</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{hours > 0 ? `${hours}h ` : ''}{minutes}m</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm">
                    <div className="flex items-center text-amber-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 font-medium">4.9</span>
                    </div>
                    <span className="text-muted-foreground">({course._count.enrollments} students)</span>
                  </div>
                </CardContent>

                <CardFooter className="border-t border-border/50 pt-6">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-2xl font-bold">
                      {course.price === 0 ? "Free" : `$${course.price}`}
                    </span>
                    <Link href={`/courses/${course.slug}`}>
                      <Button variant="neon">View Course</Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
          
          {courses.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No courses available yet</h3>
              <p className="text-muted-foreground">Check back later for new content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
