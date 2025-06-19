"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ShinyButton } from "@/components/ui/shiny-button";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden">
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
            ease: "linear"
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
            ease: "linear"
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
            ease: "linear"
          }}
          className="absolute bottom-20 right-[20%] w-[300px] h-[300px] rounded-full bg-[#D291BC] opacity-10 blur-[50px]"
        />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{
            backgroundImage: "radial-gradient(#D291BC 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-8">          
          {/* Main content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-[#D291BC] block"
                >
                  Temani Setiap Momen
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-[#D291BC] block"
                >
                  Kehamilan
                </motion.span>
              </h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#D291BC]/80"
              >
                dengan Lebih Tenang & Terarah
              </motion.h2>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-center text-gray-600 max-w-2xl mx-auto"
            >
              Velora hadir sebagai sahabat digital untuk ibu hamil — mulai dari
              <span className="text-[#D291BC] font-medium"> pelacakan kehamilan</span>,
              <span className="text-[#D291BC] font-medium"> galeri momen</span>, hingga
              <span className="text-[#D291BC] font-medium"> jurnal kesehatan jiwa</span>.
            </motion.p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 1,
                ease: "easeOut"
              }}
            >
              <ShinyButton>
                Mulai Sekarang
              </ShinyButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 