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
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FFE3EC]/20 to-[#D291BC]/5 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm mx-auto lg:max-w-3xl"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 lg:p-8 border border-white/20">
          <div className="flex items-center gap-3 mb-8 lg:mb-10">
            <Link href="/main/profile">
              <motion.div
                whileHover={{ x: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 lg:p-3 rounded-xl hover:bg-[#FFE3EC]/70 text-[#D291BC] transition-all duration-200 shadow-sm"
              >
                <IconArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </motion.div>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#FFE3EC] to-[#F8BBD9] p-3 lg:p-4 rounded-xl shadow-sm">
                <IconLock className="w-5 h-5 lg:w-6 lg:h-6 text-[#D291BC]" />
              </div>
              <h1 className="text-xl lg:text-2xl font-bold text-[#D291BC]">
                Change Password
              </h1>
            </div>
          </div>

          <form className="space-y-6 lg:space-y-8">
            <PasswordInput
              label="Current Password"
              value={oldPassword}
              onChange={setOldPassword}
              showPassword={showOldPassword}
              onToggleShow={() => setShowOldPassword(!showOldPassword)}
              placeholder="Enter current password"
            />
            <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-6 lg:space-y-0">
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
                onToggleShow={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                placeholder="Confirm new password"
              />
            </div>

            <div className="flex gap-3">
              <Link
                href="/main/profile"
                className="flex-1 py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl border-2 border-[#D291BC] text-[#D291BC] font-semibold text-center hover:bg-[#D291BC]/5 transition-all duration-200 shadow-sm text-sm lg:text-base"
              >
                Cancel
              </Link>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base"
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
      <label className="block text-[#D291BC] text-sm lg:text-base font-semibold mb-3">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full px-4 py-3.5 lg:py-4 rounded-xl border-2 border-[#D291BC]/10 focus:border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/20 transition-all text-[#D291BC] bg-white/60 placeholder-[#D291BC]/40 pr-12 font-medium text-sm lg:text-base"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-[#D291BC]/60 hover:text-[#D291BC] hover:bg-[#FFE3EC]/50 transition-all duration-200"
        >
          {showPassword ? (
            <IconEyeOff className="w-4 h-4 lg:w-5 lg:h-5" />
          ) : (
            <IconEye className="w-4 h-4 lg:w-5 lg:h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
