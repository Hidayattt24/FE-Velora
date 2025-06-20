"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthCard } from "@/components/ui/auth-card";
import { AuthInput } from "@/components/ui/auth-input";
import { AuthButton } from "@/components/ui/auth-button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-lg p-8"
        >
          {/* Logo dan Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-block"
            >
              <Image
                src="/landing/logononame.svg"
                alt="Velora Logo"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold text-[#D291BC]"
            >
              Selamat Datang Kembali!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-sm text-[#D291BC]/80"
            >
              Silahkan masuk untuk melanjutkan perjalanan kehamilan Anda
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <AuthInput
                label="Nama Ibu"
                id="nama"
                name="nama"
                placeholder="Masukkan nama lengkap Anda"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                error={errors.nama}
                autoComplete="name"
                required
              />

              <AuthInput
                label="Kata Sandi"
                id="password"
                name="password"
                placeholder="Masukkan kata sandi Anda"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                showPasswordToggle
                autoComplete="current-password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#D291BC] text-[#D291BC] focus:ring-[#D291BC]"
                />
                <span className="text-sm text-gray-600">Ingat saya</span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-[#D291BC] hover:text-[#c17ba6] transition-colors"
              >
                Lupa kata sandi?
              </Link>
            </div>

            <div className="space-y-4">
              <AuthButton type="submit" isLoading={isLoading}>
                Masuk
              </AuthButton>

              <p className="text-center text-sm text-gray-600">
                Belum punya akun?{" "}
                <Link
                  href="/auth/register"
                  className="font-semibold text-[#D291BC] hover:text-[#c17ba6] transition-colors"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </form>
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
