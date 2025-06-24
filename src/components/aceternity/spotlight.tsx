"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const Spotlight = ({ className }: { className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = divRef.current.getBoundingClientRect();

      const x = ((clientX - left) / width) * 100;
      const y = ((clientY - top) / height) * 100;

      divRef.current.style.setProperty("--mouse-x", `${x}%`);
      divRef.current.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={divRef}
      className={cn(
        "absolute inset-0 pointer-events-none [--mouse-x:50%] [--mouse-y:50%]",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-0 bg-gradient-to-r from-indigo-500/50 to-blue-500/50"
        style={{
          opacity: 0.5,
          background:
            "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(79, 70, 229, 0.15), transparent 40%)",
        }}
      />
    </div>
  );
}; 