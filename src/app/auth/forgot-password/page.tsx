"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthInput } from "@/components/ui/auth-input";
import { AuthButton } from "@/components/ui/auth-button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "otp" | "newPassword">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: ["", "", "", "", "", ""],
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (step === "email") {
      setStep("otp");
    } else if (step === "otp") {
      setStep("newPassword");
    }
    
    setIsLoading(false);
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOTP = [...formData.otp];
      newOTP[index] = value;
      setFormData({ ...formData, otp: newOTP });

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
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
              {step === "email"
                ? "Lupa Kata Sandi"
                : step === "otp"
                ? "Verifikasi OTP"
                : "Buat Kata Sandi Baru"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-sm text-[#D291BC]/80"
            >
              {step === "email"
                ? "Masukkan email Anda untuk reset kata sandi"
                : step === "otp"
                ? "Masukkan kode OTP yang telah dikirim ke email Anda"
                : "Buat kata sandi baru yang aman"}
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === "email" && (
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
            )}

            {step === "otp" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#D291BC] mb-3">
                    Kode OTP
                  </label>
                  <div className="flex gap-2 justify-between">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={formData.otp[index]}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleOTPKeyDown(index, e)}
                        className="w-12 h-12 text-center bg-white/50 border border-[#D291BC] rounded-xl text-gray-900 text-lg
                          focus:outline-none focus:ring-2 focus:ring-[#D291BC]/50 hover:border-[#D291BC]/70 transition-colors"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-center text-gray-600">
                  Tidak menerima kode?{" "}
                  <button
                    type="button"
                    className="font-semibold text-[#D291BC] hover:text-[#c17ba6] transition-colors"
                  >
                    Kirim ulang
                  </button>
                </p>
              </div>
            )}

            {step === "newPassword" && (
              <div className="space-y-4">
                <AuthInput
                  label="Kata Sandi Baru"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Minimal 8 karakter"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  error={errors.newPassword}
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
            )}

            <div className="space-y-4">
              <AuthButton type="submit" isLoading={isLoading}>
                {step === "email"
                  ? "Kirim Kode OTP"
                  : step === "otp"
                  ? "Verifikasi OTP"
                  : "Reset Kata Sandi"}
              </AuthButton>

              <p className="text-center text-sm text-gray-600">
                Ingat kata sandi Anda?{" "}
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
