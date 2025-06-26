"use client";

import { useState } from "react";
import { IconMail } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EditEmailPage() {
  const [email, setEmail] = useState("sarah@email.com");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#FFE3EC]/40 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D291BC]/10 rounded-full z-0" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#D291BC]/10 rounded-full z-0" />

        <div className="relative z-10 flex flex-col items-center mb-8">
          <div className="bg-[#FFE3EC] p-4 rounded-full mb-3 shadow">
            <IconMail className="w-8 h-8 text-[#D291BC]" />
          </div>
          <h1 className="text-2xl font-bold text-[#D291BC] text-center">
            Edit Email
          </h1>
          <p className="text-gray-500 text-sm mt-2 text-center max-w-xs">
            Masukkan email baru yang aktif dan valid.
          </p>
        </div>
        <form className="space-y-6 relative z-10">
          <div>
            <label className="block text-[#D291BC] font-medium mb-1">
              Email Baru
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-[#D291BC]/30 focus:border-[#D291BC] focus:ring-2 focus:ring-pink-100 transition-all text-[#D291BC] bg-white text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Masukkan email baru"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D291BC] to-pink-400 hover:from-pink-400 hover:to-[#D291BC] text-white font-semibold text-lg shadow transition-colors mt-6"
          >
            Simpan Email
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
