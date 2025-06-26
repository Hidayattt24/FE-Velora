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
    <div className="h-screen bg-gradient-to-b from-white to-[#FFE3EC]/40 p-4 md:p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md mx-auto relative"
      >
        {/* Background decorations */}
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#D291BC]/10 rounded-full blur-xl -z-10" />
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#FFE3EC]/30 rounded-full blur-xl -z-10" />

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src={user.photo}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-xl object-cover shadow-md"
              />
              <Link href="/main/profile/edit-photo">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-1 -right-1 bg-[#D291BC] text-white p-1.5 rounded-lg shadow-lg"
                >
                  <IconCamera className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[#D291BC]">{user.fullName}</h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
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
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full mt-4 py-3 bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-md"
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
        whileHover={{ x: 4 }}
        className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="bg-[#FFE3EC] p-2 rounded-lg">{icon}</div>
          <span className="font-medium text-gray-700">{label}</span>
        </div>
        <IconChevronRight className="w-4 h-4 text-gray-400" />
      </motion.div>
    </Link>
  );
}