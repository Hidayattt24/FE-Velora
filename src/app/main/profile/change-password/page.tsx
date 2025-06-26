"use client";

import { useState } from "react";
import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <div className="h-screen bg-gradient-to-b from-white to-[#FFE3EC]/40 p-4 md:p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative"
      >
        {/* Background decorations */}
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#D291BC]/10 rounded-full blur-xl -z-10" />
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#FFE3EC]/30 rounded-full blur-xl -z-10" />

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#FFE3EC] p-2 rounded-lg">
              <IconLock className="w-5 h-5 text-[#D291BC]" />
            </div>
            <h1 className="text-xl font-semibold text-[#D291BC]">Change Password</h1>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  className="w-full px-3 py-2 rounded-xl border border-[#D291BC]/20 focus:border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/20 transition-all text-gray-700 bg-white/50 pr-10"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <IconEyeOff className="w-4 h-4" />
                  ) : (
                    <IconEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full px-3 py-2 rounded-xl border border-[#D291BC]/20 focus:border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/20 transition-all text-gray-700 bg-white/50 pr-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <IconEyeOff className="w-4 h-4" />
                  ) : (
                    <IconEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Link 
                href="/main/profile"
                className="flex-1 py-2.5 px-4 rounded-xl border border-[#D291BC] text-[#D291BC] font-medium text-center hover:bg-[#D291BC]/5 transition-colors"
              >
                Cancel
              </Link>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-medium shadow-md"
              >
                Save
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
