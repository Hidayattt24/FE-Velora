"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconUser, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { profileService, type UserProfile } from "@/lib/api/profile";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await profileService.getProfile();
        if (response.success && response.data) {
          const profile = response.data.user;
          setFullName(profile.full_name || "");
          setUsername(profile.username || "");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast.error("Gagal memuat profil");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Nama lengkap tidak boleh kosong");
      return;
    }

    if (!username.trim()) {
      toast.error("Username tidak boleh kosong");
      return;
    }

    setIsSaving(true);
    try {
      const response = await profileService.updateProfile({
        fullName: fullName.trim(),
        username: username.trim(),
      });

      if (response.success && response.data) {
        // Update user context
        updateUser({
          fullName: response.data.user.full_name,
          username: response.data.user.username,
        });

        toast.success("Profil berhasil diperbarui");
        router.push("/main/profile");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(
        error instanceof Error ? error.message : "Gagal memperbarui profil"
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
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
                <IconUser className="w-5 h-5 lg:w-6 lg:h-6 text-[#D291BC]" />
              </div>
              <h1 className="text-xl lg:text-2xl font-bold text-[#D291BC]">
                Edit Profile
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-6 lg:space-y-0">
              <div>
                <label className="block text-[#D291BC] text-sm lg:text-base font-semibold mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 lg:py-4 rounded-xl border-2 border-[#D291BC]/10 focus:border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/20 transition-all text-[#D291BC] bg-white/60 placeholder-[#D291BC]/40 font-medium text-sm lg:text-base"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  disabled={isSaving}
                />
              </div>
              <div>
                <label className="block text-[#D291BC] text-sm lg:text-base font-semibold mb-3">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 lg:py-4 rounded-xl border-2 border-[#D291BC]/10 focus:border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/20 transition-all text-[#D291BC] bg-white/60 placeholder-[#D291BC]/40 font-medium text-sm lg:text-base"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  required
                  disabled={isSaving}
                />
              </div>
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
                disabled={isSaving}
                className="flex-1 py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Menyimpan..." : "Save Changes"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
