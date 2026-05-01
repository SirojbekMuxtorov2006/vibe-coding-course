"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface EnrollButtonProps {
  courseId: string;
  isFree: boolean;
  price: number;
}

export function EnrollButton({ courseId, isFree, price }: EnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEnroll = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      if (!res.ok) {
        throw new Error("Failed to enroll");
      }

      const data = await res.json();
      
      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        // Free course, redirect to dashboard
        router.push("/dashboard/lessons");
      }
    } catch (error) {
      console.error(error);
      // Handle error (show toast)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="neon" 
      size="xl" 
      className="w-full text-lg" 
      onClick={handleEnroll}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
      ) : null}
      {isFree ? "Enroll for Free" : `Enroll Now - $${price}`}
    </Button>
  );
}
