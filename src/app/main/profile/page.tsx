"use client";

import { motion } from "framer-motion";
import {
  IconChevronRight,
  IconEdit,
  IconLock,
  IconMail,
  IconLogout,
  IconCamera,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [userProfile] = useState({
    photo: "/main/gallery/photo-profile.jpg",
    fullName: user?.fullName || "Sarah Johnson",
    username: "sarahmommy",
    email: user?.email || "sarah@email.com",
  });

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

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
                  src={userProfile.photo}
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
                {userProfile.fullName}
              </h2>
              <p className="text-[#D291BC]/70 text-sm lg:text-base font-medium mb-2">
                @{userProfile.username}
              </p>
              <p className="text-[#D291BC]/60 text-sm lg:text-base">
                {userProfile.email}
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
        </div>
      </motion.div>
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
