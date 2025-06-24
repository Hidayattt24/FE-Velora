"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export const TextGenerateEffect = ({
  words,
  className = "",
}: {
  words: string;
  className?: string;
}) => {
  const controls = useAnimation();

  const renderWords = () => {
    return (
      <motion.div className={className}>
        {words.split(" ").map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{
                duration: 1,
                delay: idx * 0.1,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
            >
              {word}&nbsp;
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return renderWords();
}; 