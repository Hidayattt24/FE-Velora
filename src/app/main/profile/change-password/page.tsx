"use client";

import { useState } from "react";
import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#FFE3EC]/40 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D291BC]/10 rounded-full z-0" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#D291BC]/10 rounded-full z-0" />

        <div className="relative z-10 flex flex-col items-center mb-8">
          <div className="bg-[#FFE3EC] p-4 rounded-full mb-3 shadow">
            <IconLock className="w-8 h-8 text-[#D291BC]" />
          </div>
          <h1 className="text-2xl font-bold text-[#D291BC] text-center">
            Ubah Kata Sandi
          </h1>
          <p className="text-gray-500 text-sm mt-2 text-center max-w-xs">
            Pastikan kata sandi baru Anda kuat dan mudah diingat.
          </p>
        </div>
        <form className="space-y-6 relative z-10">
          <div>
            <label className="block text-[#D291BC] font-medium mb-1">
              Kata Sandi Baru
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-xl border border-[#D291BC]/30 focus:border-[#D291BC] focus:ring-2 focus:ring-pink-100 transition-all text-[#D291BC] bg-white pr-12 text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan kata sandi baru"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D291BC]"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <IconEyeOff className="w-5 h-5" />
                ) : (
                  <IconEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D291BC] to-pink-400 hover:from-pink-400 hover:to-[#D291BC] text-white font-semibold text-lg shadow transition-colors mt-6"
          >
            Simpan Kata Sandi
          </motion.button>
          <Link
            href="/main/profile"
            className="block text-center text-[#D291BC] hover:text-pink-400 mt-4 text-sm font-medium transition-colors"
          >
            Kembali ke Profil
          </Link>
        </form>
      </div>
    </div>
  );
}
