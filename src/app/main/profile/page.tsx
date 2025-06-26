"use client";

import { motion } from "framer-motion";
import { IconChevronRight, IconEdit, IconLock, IconMail, IconLogout, IconCamera } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePage() {
  const [user] = useState({
    photo: "/main/gallery/photo-profile.jpg",
    fullName: "Sarah Johnson",
    username: "sarahmommy",
    email: "sarah@email.com",
  });

  return (
    <div className="h-screen bg-gradient-to-br from-white via-[#FFE3EC]/30 to-[#D291BC]/10 p-4 md:p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md mx-auto relative"
      >
        {/* Profile Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 border border-[#D291BC]/10">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={user.photo}
                  alt="Profile"
                  width={90}
                  height={90}
                  className="object-cover"
                />
              </div>
              <Link href="/main/profile/edit-photo">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-2 -right-2 bg-[#D291BC] text-white p-2 rounded-xl shadow-lg"
                >
                  <IconCamera className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#D291BC] mb-1">{user.fullName}</h2>
              <p className="text-[#D291BC]/70 text-sm mb-1">@{user.username}</p>
              <p className="text-[#D291BC]/70 text-sm">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          <ProfileMenuItem
            href="/main/profile/edit-profile"
            icon={<IconEdit className="w-4 h-4" />}
            label="Edit Profile"
          />
          <ProfileMenuItem
            href="/main/profile/change-password"
            icon={<IconLock className="w-4 h-4" />}
            label="Change Password"
          />
          <ProfileMenuItem
            href="/main/profile/edit-email"
            icon={<IconMail className="w-4 h-4" />}
            label="Change Email"
          />
        </div>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.99 }}
          className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-medium rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <IconLogout className="w-4 h-4" />
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
}

function ProfileMenuItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, x: 4 }}
        className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all border border-[#D291BC]/10"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[#FFE3EC] p-2.5 rounded-xl">
            <div className="text-[#D291BC]">{icon}</div>
          </div>
          <span className="font-medium text-[#D291BC]/90">{label}</span>
        </div>
        <IconChevronRight className="w-4 h-4 text-[#D291BC]/60" />
      </motion.div>
    </Link>
  );
}