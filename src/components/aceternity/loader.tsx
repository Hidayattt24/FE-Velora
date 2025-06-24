"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const MultiStepLoader = ({
  loadingStates,
  loading = true,
  duration = 2000,
}: {
  loadingStates: { text: string }[];
  loading?: boolean;
  duration?: number;
}) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setCurrentState((prev) =>
        prev === loadingStates.length - 1 ? prev : prev + 1
      );
    }, duration);

    return () => clearInterval(interval);
  }, [loading, loadingStates.length, duration]);

  if (!loading) return null;

  return (
    <div className="flex items-center justify-center">
      <motion.div
        key={currentState}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2"
      >
        <div className="h-2 w-2 rounded-full bg-white/40 animate-pulse" />
        <span className="text-sm text-white/80">{loadingStates[currentState].text}</span>
      </motion.div>
    </div>
  );
};

export default MultiStepLoader; 