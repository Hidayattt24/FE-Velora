"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FFE3EC]"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            >
              <Image
                src="/landing/logononame.svg"
                alt="Velora Logo"
                width={160}
                height={160}
                priority
                className="h-40 w-40"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1,
                duration: 0.8,
              }}
              className="text-4xl font-bold text-[#D291BC]"
            >
              Velora
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{
                delay: 2,
                duration: 2,
              }}
              className="h-1 bg-[#D291BC]/50 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 