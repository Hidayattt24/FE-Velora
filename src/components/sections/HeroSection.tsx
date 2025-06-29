"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function HeroSection() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Animated words
  const features = ["Dokumentasi", "Kesehatan", "Dukungan", "Perhatian"];
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/main/gallery");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-16 sm:pt-20 md:pt-12 flex items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      {/* Modern Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFE3EC] to-white">
        {/* Animated Floating Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-[#D291BC] opacity-10 blur-[80px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-40 left-[5%] w-[400px] h-[400px] rounded-full bg-[#FFE3EC] opacity-15 blur-[60px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 20, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-[20%] w-[300px] h-[300px] rounded-full bg-[#D291BC] opacity-10 blur-[50px]"
        />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#D291BC 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
          {/* Main content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl mx-auto"
          >
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-[#D291BC] block"
                >
                  Velora
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="text-[#D291BC]"
                >
                  Temani Kehamilan
                </motion.span>
              </h1>

              {/* Animated subtitle with changing words */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-[#D291BC]/80 min-h-[1.5rem] sm:min-h-[2rem] md:min-h-[2.5rem] flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2"
              >
                <span className="text-center">Platform Terlengkap untuk</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#D291BC] font-bold"
                  >
                    {features[currentFeature]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-gray-600 max-w-lg mx-auto leading-relaxed px-4"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Sahabat digital terpercaya
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="text-[#D291BC] font-bold ml-1"
              >
                setiap ibu hamil
              </motion.span>
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.6,
                ease: "easeOut",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <ShinyButton onClick={handleGetStarted} disabled={isLoading}>
                  {isLoading ? "Loading..." : "Mulai Sekarang"}
                </ShinyButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
