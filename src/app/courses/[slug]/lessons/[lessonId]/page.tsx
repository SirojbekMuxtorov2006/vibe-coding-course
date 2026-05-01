import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import { LessonClient } from "@/components/courses/lesson-client";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;

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
    },
  });

  if (!course) notFound();

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

  // Find the requested lesson
  let targetLesson = null;
  for (const mod of course.modules) {
    const l = mod.lessons.find((les) => les.id === lessonId);
    if (l) {
      targetLesson = l;
      break;
    }
  }

  if (!targetLesson) notFound();

  return (
    <LessonClient 
      course={course} 
      lesson={targetLesson} 
      isEnrolled={isEnrolled} 
    />
  );
}
