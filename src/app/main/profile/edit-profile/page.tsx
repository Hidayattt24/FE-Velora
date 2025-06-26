"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconUser, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function EditProfilePage() {
  const [fullName, setFullName] = useState("Sarah Johnson");
  const [username, setUsername] = useState("sarahmommy");

  return (
    <div className="h-screen bg-gradient-to-br from-white via-[#FFE3EC]/30 to-[#D291BC]/10 p-4 md:p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-[#D291BC]/10">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/main/profile">
              <motion.div
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl hover:bg-[#FFE3EC]/50 text-[#D291BC] transition-colors"
              >
                <IconArrowLeft className="w-5 h-5" />
              </motion.div>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-[#FFE3EC] p-2.5 rounded-xl">
                <IconUser className="w-5 h-5 text-[#D291BC]" />
              </div>
              <h1 className="text-xl font-semibold text-[#D291BC]">Edit Profile</h1>
            </div>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-[#D291BC]/90 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-2xl border border-[#D291BC]/20 focus:border-[#D291BC] focus:ring focus:ring-[#D291BC]/20 transition-all text-[#D291BC] bg-white/50 placeholder-[#D291BC]/40"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-[#D291BC]/90 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-2xl border border-[#D291BC]/20 focus:border-[#D291BC] focus:ring focus:ring-[#D291BC]/20 transition-all text-[#D291BC] bg-white/50 placeholder-[#D291BC]/40"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                required
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Link 
                href="/main/profile"
                className="flex-1 py-3.5 px-4 rounded-2xl border border-[#D291BC] text-[#D291BC] font-medium text-center hover:bg-[#D291BC]/5 transition-colors"
              >
                Cancel
              </Link>
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                Save Changes
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
