"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthInput } from "@/components/ui/auth-input";
import { AuthButton } from "@/components/ui/auth-button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
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
              Selamat Datang di Velora!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-sm text-[#D291BC]/80"
            >
              Mulai perjalanan kehamilan Anda dengan aman dan nyaman
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <AuthInput
                label="Nama Lengkap Ibu"
                id="fullName"
                name="fullName"
                placeholder="Masukkan nama lengkap Anda"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                error={errors.fullName}
                autoComplete="name"
                required
              />

              <AuthInput
                label="Nomor HP"
                id="phone"
                name="phone"
                type="tel"
                placeholder="Contoh: 08123456789"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
                autoComplete="tel"
                required
              />

              <AuthInput
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="Masukkan email Anda"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                autoComplete="email"
                required
              />

              <AuthInput
                label="Kata Sandi"
                id="password"
                name="password"
                placeholder="Minimal 8 karakter"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                showPasswordToggle
                autoComplete="new-password"
                required
              />

              <AuthInput
                label="Konfirmasi Kata Sandi"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Masukkan ulang kata sandi"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
                showPasswordToggle
                autoComplete="new-password"
                required
              />
            </div>

            <div className="space-y-4">
              <AuthButton type="submit" isLoading={isLoading}>
                Daftar Sekarang
              </AuthButton>

              <p className="text-center text-sm text-gray-600">
                Sudah punya akun?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-[#D291BC] hover:text-[#c17ba6] transition-colors"
                >
                  Masuk sekarang
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
