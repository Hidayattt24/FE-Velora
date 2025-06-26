"use client";

import { motion } from "framer-motion";
import { IconChevronRight, IconEdit, IconLock, IconMail, IconLogout, IconCamera } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePage() {
  // Dummy user data, ganti dengan fetch dari backend jika ada
  const [user] = useState({
    photo: "/main/gallery/photo-profile.jpg",
    fullName: "Sarah Johnson",
    username: "sarahmommy",
    email: "sarah@email.com",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE3EC]/40 px-2 py-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mx-auto relative"
      >
        {/* Dekorasi background */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#D291BC]/10 rounded-full blur-2xl -z-10" />
        <div className="absolute -bottom-16 -right-10 w-40 h-40 bg-[#FFE3EC]/30 rounded-full blur-2xl -z-10" />

        {/* Card Profile */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center mb-8 relative overflow-hidden">
          {/* Animasi lingkaran */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="absolute -top-8 right-8 w-20 h-20 bg-[#D291BC]/10 rounded-full z-0"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="absolute -bottom-8 left-8 w-16 h-16 bg-[#FFE3EC]/20 rounded-full z-0"
          />

          {/* Foto Profil */}
          <div className="relative z-10 group">
            <Image
              src={user.photo}
              alt="Profil"
              width={120}
              height={120}
              className="rounded-2xl object-cover border-4 border-[#D291BC]/20 shadow-md transition-all duration-300 group-hover:scale-105"
            />
            <Link href="/main/profile/edit-photo">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-2 right-2 bg-[#D291BC] text-white p-2 rounded-full shadow-lg border-2 border-white"
                aria-label="Edit Foto"
              >
                <IconCamera className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold mt-4 text-[#D291BC] text-center"
          >
            {user.fullName}
          </motion.h2>
          <p className="text-gray-500 text-sm">@{user.username}</p>
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg space-y-3 sm:space-y-4">
          <ProfileMenuItem
            href="/main/profile/edit-profile"
            icon={<IconEdit className="w-5 h-5 text-[#D291BC]" />}
            label="Ubah Profil"
          />
          <ProfileMenuItem
            href="/main/profile/change-password"
            icon={<IconLock className="w-5 h-5 text-[#D291BC]" />}
            label="Ubah Kata Sandi"
          />
          <ProfileMenuItem
            href="/main/profile/edit-email"
            icon={<IconMail className="w-5 h-5 text-[#D291BC]" />}
            label={
              <div className="flex flex-col">
                <span>Email</span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
            }
          />
        </div>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="w-full mt-8 py-4 bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-semibold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:from-pink-400 hover:to-[#D291BC] transition-all"
        >
          <IconLogout className="w-5 h-5" />
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
}

// Komponen menu profile agar lebih reusable dan konsisten
function ProfileMenuItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ x: 8, scale: 1.01 }}
        className="flex items-center justify-between p-4 bg-[#FFE3EC]/60 hover:bg-[#FFE3EC]/90 rounded-2xl cursor-pointer transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[#FFE3EC] p-3 rounded-xl">{icon}</div>
          <span className="font-medium text-[#D291BC]">{label}</span>
        </div>
        <IconChevronRight className="w-5 h-5 text-[#D291BC]/60" />
      </motion.div>
    </Link>
  );
}