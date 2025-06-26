"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function EditProfilePage() {
  const [fullName, setFullName] = useState("Sarah Johnson");
  const [username, setUsername] = useState("sarahmommy");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#FFE3EC]/30 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#D291BC] mb-8 text-center">
          Edit Profil
        </h1>
        <form className="space-y-6">
          <div>
            <label className="block text-[#D291BC] font-medium mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-[#D291BC]/30 focus:border-[#D291BC] focus:ring-2 focus:ring-pink-100 transition-all text-[#D291BC] bg-white"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[#D291BC] font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-[#D291BC]/30 focus:border-[#D291BC] focus:ring-2 focus:ring-pink-100 transition-all text-[#D291BC] bg-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-[#D291BC] hover:bg-pink-400 text-white font-semibold text-lg shadow transition-colors mt-6"
          >
            Simpan Perubahan
          </motion.button>
        </form>
      </div>
    </div>
  );
}
