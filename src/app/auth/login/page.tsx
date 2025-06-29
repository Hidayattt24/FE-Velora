"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { AuthInput } from "@/components/ui/auth-input";
import { AuthButton } from "@/components/ui/auth-button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useVeloraNotification } from "@/lib/hooks/useVeloraNotification";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    notifyLoginSuccess,
    notifyAuthError,
    notifyValidationError,
    showLoading,
    hideLoading,
  } = useVeloraNotification();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email harus diisi";
      notifyValidationError("Email");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
      notifyValidationError("Format email");
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi";
      notifyValidationError("Password");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    const loadingToast = showLoading("Sedang masuk ke akun Anda...");

    try {
      await login(formData.email, formData.password);
      hideLoading(loadingToast);
      notifyLoginSuccess();
      router.push("/main/gallery"); // Redirect to gallery after successful login
    } catch (error: any) {
      hideLoading(loadingToast);
      console.error("Login error:", error);
      const errorMessage =
        error.message || "Terjadi kesalahan. Silakan coba lagi.";
      notifyAuthError(errorMessage);
      setErrors({
        general: errorMessage,
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
                placeholder="Masukkan kata sandi Anda"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                error={errors.password}
                showPasswordToggle
                autoComplete="current-password"
                required
              />
            </div>

            <div className="flex items-center justify-start">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#D291BC] text-[#D291BC] focus:ring-[#D291BC]"
                />
                <span className="text-sm text-gray-600">Ingat saya</span>
              </label>
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
