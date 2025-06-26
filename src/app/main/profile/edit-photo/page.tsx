"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { IconCamera } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EditPhotoPage() {
  const [photo, setPhoto] = useState("/main/gallery/photo-profile.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPhoto(url);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#FFE3EC]/40 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D291BC]/10 rounded-full z-0" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#D291BC]/10 rounded-full z-0" />

        <div className="relative z-10 flex flex-col items-center mb-8">
          <div className="bg-[#FFE3EC] p-4 rounded-full mb-3 shadow">
            <IconCamera className="w-8 h-8 text-[#D291BC]" />
          </div>
          <h1 className="text-2xl font-bold text-[#D291BC] text-center">
            Edit Foto Profil
          </h1>
        </div>
        <div className="relative group mb-8 z-10">
          <Image
            src={photo}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-2xl object-cover border-4 border-[#D291BC]/20 shadow-md"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-2 right-2 bg-[#D291BC] hover:bg-pink-400 text-white p-2 rounded-full shadow transition-colors"
            aria-label="Edit Foto"
          >
            <IconCamera className="w-5 h-5" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D291BC] to-pink-400 hover:from-pink-400 hover:to-[#D291BC] text-white font-semibold text-lg shadow transition-colors"
        >
          Simpan Foto
        </motion.button>
        <Link
          href="/main/profile"
          className="block text-center text-[#D291BC] hover:text-pink-400 mt-4 text-sm font-medium transition-colors"
        >
          Kembali ke Profil
        </Link>
      </div>
    </div>
  );
}
