"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function ShinyButton({ children, className, ...props }: ShinyButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white transition-all duration-500 ease-out hover:scale-105",
        className
      )}
      {...props}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D291BC] via-[#D291BC] to-[#D291BC]/80"
        style={{
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["0%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-full opacity-30 blur-md bg-gradient-to-r from-[#D291BC] via-[#D291BC] to-[#D291BC]/80"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
} 