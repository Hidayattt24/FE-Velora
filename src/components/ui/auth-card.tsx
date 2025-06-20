import { motion } from "motion/react";
import Image from "next/image";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  illustration?: string;
}

export function AuthCard({ children, title, subtitle, illustration = "/landing/logononame.svg" }: AuthCardProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo dan Ilustrasi */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block"
          >
            <Image
              src={illustration}
              alt="Velora Illustration"
              width={120}
              height={120}
              className="mx-auto mb-4"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-[#D291BC]"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-lg text-[#D291BC]/80"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-lg p-8"
        >
          {children}
        </motion.div>

        {/* Dekorasi */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-pink-100/30 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#FFE3EC]/40 to-transparent rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4" />
        </div>
      </motion.div>
    </div>
  );
} 