"use client";

import { useState, useEffect } from "react";
import {
  IconMail,
  IconArrowLeft,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { profileService } from "@/lib/api/profile";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditEmailPage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await profileService.getProfile();
        if (response.success && response.data) {
          setNewEmail(response.data.user.email);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast.error("Gagal memuat profil");
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEmail.trim()) {
      toast.error("Email tidak boleh kosong");
      return;
    }

    if (!password.trim()) {
      toast.error("Password diperlukan untuk mengubah email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast.error("Format email tidak valid");
      return;
    }

    setIsLoading(true);
    try {
      const response = await profileService.changeEmail({
        newEmail: newEmail.trim(),
        password: password.trim(),
      });

      if (response.success && response.data) {
        // Update user context
        updateUser({
          email: response.data.user.email,
        });

        toast.success("Email berhasil diubah");
        router.push("/main/profile");
      }
    } catch (error) {
      console.error("Change email error:", error);
      toast.error(
        error instanceof Error ? error.message : "Gagal mengubah email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#FFE3EC]/20 to-[#D291BC]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#D291BC] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#D291BC]">Memuat profil...</p>
        </div>
      </div>
    );
  }

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
                <IconMail className="w-5 h-5 lg:w-6 lg:h-6 text-[#D291BC]" />
              </div>
              <h1 className="text-xl lg:text-2xl font-bold text-[#D291BC]">
                Change Email
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
            <div>
              <label className="block text-[#D291BC] text-sm lg:text-base font-semibold mb-3">
                New Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3.5 lg:py-4 rounded-xl border-2 border-[#D291BC]/10 focus:border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/20 transition-all text-[#D291BC] bg-white/60 placeholder-[#D291BC]/40 font-medium text-sm lg:text-base"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter your new email"
                required
                disabled={isLoading}
              />
              <p className="mt-3 text-sm lg:text-base text-[#D291BC]/70 leading-relaxed">
                Make sure to enter a valid email address that you have access
                to. You'll need to verify the new email address.
              </p>
            </div>

            <div>
              <label className="block text-[#D291BC] text-sm lg:text-base font-semibold mb-3">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3.5 lg:py-4 rounded-xl border-2 border-[#D291BC]/10 focus:border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/20 transition-all text-[#D291BC] bg-white/60 placeholder-[#D291BC]/40 pr-12 font-medium text-sm lg:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-[#D291BC]/60 hover:text-[#D291BC] hover:bg-[#FFE3EC]/50 transition-all duration-200"
                >
                  {showPassword ? (
                    <IconEyeOff className="w-4 h-4 lg:w-5 lg:h-5" />
                  ) : (
                    <IconEye className="w-4 h-4 lg:w-5 lg:h-5" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm text-[#D291BC]/60">
                Enter your current password to confirm this change.
              </p>
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
                disabled={isLoading}
                className="flex-1 py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Mengubah..." : "Update Email"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
