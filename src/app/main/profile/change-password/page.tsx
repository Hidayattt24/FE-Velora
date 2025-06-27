"use client";

import { useState } from "react";
import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconArrowLeft,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="h-screen bg-gradient-to-br from-white via-[#FFE3EC]/20 to-[#D291BC]/5 p-4 md:p-6 flex items-center justify-center">
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
                <IconLock className="w-5 h-5 text-[#D291BC]" />
              </div>
              <h1 className="text-xl font-semibold text-[#D291BC]">
                Change Password
              </h1>
            </div>
          </div>

          <form className="space-y-5">
            <PasswordInput
              label="Current Password"
              value={oldPassword}
              onChange={setOldPassword}
              showPassword={showOldPassword}
              onToggleShow={() => setShowOldPassword(!showOldPassword)}
              placeholder="Enter current password"
            />
            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              showPassword={showNewPassword}
              onToggleShow={() => setShowNewPassword(!showNewPassword)}
              placeholder="Enter new password"
            />
            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              showPassword={showConfirmPassword}
              onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
              placeholder="Confirm new password"
            />

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
                Update Password
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  showPassword,
  onToggleShow,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggleShow: () => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-[#D291BC]/90 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full px-4 py-3 rounded-2xl border border-[#D291BC]/20 focus:border-[#D291BC] focus:ring focus:ring-[#D291BC]/20 transition-all text-[#D291BC] bg-white/50 placeholder-[#D291BC]/40 pr-12"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#D291BC]/60 hover:text-[#D291BC] hover:bg-[#FFE3EC]/50 transition-colors"
        >
          {showPassword ? (
            <IconEyeOff className="w-4 h-4" />
          ) : (
            <IconEye className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
