"use client";

import { motion } from "framer-motion";
import { IconError404 } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFE3EC] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="mb-8"
        >
          <div className="relative">
            {/* Background Circle */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-48 h-48 mx-auto bg-gradient-to-br from-[#D291BC]/20 to-pink-300/30 rounded-full flex items-center justify-center"
            >
              {/* Icon */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <IconError404 className="w-24 h-24 text-[#D291BC]" />
              </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-4 right-4 w-8 h-8 bg-pink-200 rounded-full opacity-60"
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                x: [0, -8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-8 left-8 w-6 h-6 bg-[#D291BC]/40 rounded-full"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-[#D291BC] mb-4"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6"
        >
          Halaman Tidak Ditemukan
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed"
        >
          Halaman yang Anda tuju tidak ada atau telah dipindahkan. Mari kembali
          ke tempat yang aman!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#D291BC] to-pink-400 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Kembali ke Beranda
            </motion.button>
          </Link>

          <Link href="/main/gallery">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-[#D291BC] text-[#D291BC] rounded-2xl font-semibold hover:bg-[#D291BC] hover:text-white transition-all duration-200"
            >
              Pergi ke Gallery
            </motion.button>
          </Link>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-12 flex justify-center items-center gap-3"
        >
          <Image
            src="/landing/logononame.svg"
            alt="Velora Logo"
            width={40}
            height={40}
            className="opacity-60"
          />
          <span className="text-[#D291BC] font-semibold text-lg opacity-60">
            Velora
          </span>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200 to-transparent rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.05, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tl from-[#D291BC]/30 to-transparent rounded-full blur-2xl"
          />
        </div>
      </div>
    </div>
  );
}
