"use client";

import { motion } from "framer-motion";
import {
  IconChevronRight,
  IconEdit,
  IconLock,
  IconMail,
  IconLogout,
  IconCamera,
  IconTrash,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { profileService, type UserProfile } from "@/lib/api/profile";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await profileService.getProfile();
        if (response.success && response.data) {
          setUserProfile(response.data.user);
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

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Gagal logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      toast.error("Password diperlukan untuk menghapus akun");
      return;
    }

    setIsDeleting(true);
    try {
      const response = await profileService.deleteAccount(deletePassword);

      if (response.success) {
        toast.success("Akun berhasil dihapus");
        logout(); // This will also show logout notification
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error(
        error instanceof Error ? error.message : "Gagal menghapus akun"
      );
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeletePassword("");
    }
  };

  const getProfileImageUrl = () => {
    if (userProfile?.profile_picture) {
      // If it's a full URL, use it as is
      if (userProfile.profile_picture.startsWith("http")) {
        return userProfile.profile_picture;
      }
      // If it's a relative path, prepend the API base URL
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      return `${API_BASE_URL}${userProfile.profile_picture}`;
    }
    // Fallback to default image
    return "/main/gallery/photo-profile.jpg";
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
        className="w-full max-w-sm mx-auto lg:max-w-5xl lg:grid lg:grid-cols-12 lg:gap-10 space-y-6 lg:space-y-0"
      >
        {/* Profile Card */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 lg:p-8 border border-white/20">
          <div className="flex flex-col items-center text-center lg:text-center">
            <div className="relative group mb-6">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-lg">
                <Image
                  src={getProfileImageUrl()}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <Link href="/main/profile/edit-photo">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-2 -right-2 bg-[#D291BC] text-white p-2.5 lg:p-3 rounded-xl shadow-lg hover:bg-pink-400 transition-colors"
                >
                  <IconCamera className="w-4 h-4 lg:w-5 lg:h-5" />
                </motion.button>
              </Link>
            </div>
            <div className="w-full">
              <h2 className="text-xl lg:text-2xl font-bold text-[#D291BC] mb-2">
                {userProfile?.full_name || user?.fullName || "User"}
              </h2>
              <p className="text-[#D291BC]/60 text-sm lg:text-base">
                {userProfile?.email || user?.email || "email@example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-2xl lg:text-5xl font-bold text-[#D291BC] mb-6 lg:mb-8">
            Account Settings
          </h3>
          <div className="grid gap-4 lg:gap-5">
            <ProfileMenuItem
              href="/main/profile/edit-profile"
              icon={<IconEdit className="w-5 h-5" />}
              label="Edit Profile"
              description="Update your personal information"
            />
            <ProfileMenuItem
              href="/main/profile/change-password"
              icon={<IconLock className="w-5 h-5" />}
              label="Change Password"
              description="Update your account security"
            />
            <ProfileMenuItem
              href="/main/profile/edit-email"
              icon={<IconMail className="w-5 h-5" />}
              label="Change Email"
              description="Update your email address"
            />
          </div>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            disabled={isLoggingOut}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 lg:py-5 bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-semibold rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 mt-8"
          >
            <IconLogout className="w-5 h-5" />
            <span className="text-base lg:text-lg">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          </motion.button>

          {/* Delete Account Button */}
          <motion.button
            onClick={() => setShowDeleteModal(true)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 lg:py-5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
          >
            <IconTrash className="w-5 h-5" />
            <span className="text-base lg:text-lg">Delete Account</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <IconTrash className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Delete Account
              </h3>
              <p className="text-gray-600 text-sm">
                This action cannot be undone. All your data will be permanently
                deleted.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-3">
                Enter your password to confirm
              </label>
              <div className="relative">
                <input
                  type={showDeletePassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all text-gray-700 bg-gray-50 placeholder-gray-400 pr-12"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={isDeleting}
                />
                <button
                  type="button"
                  onClick={() => setShowDeletePassword(!showDeletePassword)}
                  disabled={isDeleting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
                >
                  {showDeletePassword ? (
                    <IconEyeOff className="w-4 h-4" />
                  ) : (
                    <IconEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword("");
                }}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting || !deletePassword.trim()}
                className="flex-1 py-3 px-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function ProfileMenuItem({
  href,
  icon,
  label,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  description?: string;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-between p-4 lg:p-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/20 active:bg-white/90"
      >
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-[#FFE3EC] to-[#F8BBD9] p-3 rounded-xl shadow-sm">
            <div className="text-[#D291BC]">{icon}</div>
          </div>
          <div>
            <span className="font-semibold text-[#D291BC]/90 text-sm lg:text-base block">
              {label}
            </span>
            {description && (
              <span className="text-[#D291BC]/60 text-xs lg:text-sm">
                {description}
              </span>
            )}
          </div>
        </div>
        <IconChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-[#D291BC]/50" />
      </motion.div>
    </Link>
  );
}
