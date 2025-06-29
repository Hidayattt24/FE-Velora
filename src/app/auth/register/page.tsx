"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
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
  const [successMessage, setSuccessMessage] = useState("");
  
  const { register } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap harus diisi";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Nama lengkap minimal 2 karakter";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor HP harus diisi";
    } else if (!/^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Format nomor HP tidak valid";
    }

    if (!formData.email) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password harus mengandung huruf besar, huruf kecil, dan angka";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      await register(
        formData.fullName.trim(),
        formData.phone.replace(/\s/g, ""),
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      
      setSuccessMessage("Registrasi berhasil! Silakan login untuk melanjutkan.");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
      
    } catch (error: any) {
      console.error('Registration error:', error);
      setErrors({
        general: error.message || 'Registrasi gagal. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
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
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm"
              >
                {successMessage}
              </motion.div>
            )}

            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
              >
                {errors.general}
              </motion.div>
            )}

            <div className="space-y-4">
              <AuthInput
                label="Nama Lengkap Ibu"
                id="fullName"
                name="fullName"
                placeholder="Masukkan nama lengkap Anda"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: "" });
                }}
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
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
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
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                error={errors.email}
                autoComplete="email"
                required
              />

              <AuthInput
                label="Kata Sandi"
                id="password"
                name="password"
                placeholder="Minimal 8 karakter, harus mengandung huruf besar, kecil, dan angka"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
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
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
                }}
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
