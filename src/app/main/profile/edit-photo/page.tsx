"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { IconCamera, IconArrowLeft, IconUpload } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EditPhotoPage() {
  const [photo, setPhoto] = useState("/main/gallery/photo-profile.jpg");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-white via-[#FFE3EC]/30 to-[#D291BC]/10 p-4 md:p-6 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-[#D291BC]/10">
          <div className="flex items-center gap-3 mb-6">
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
                <IconCamera className="w-5 h-5 text-[#D291BC]" />
              </div>
              <h1 className="text-xl font-semibold text-[#D291BC]">Change Photo</h1>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative group mb-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#D291BC]/10"
              >
                <Image
                  src={previewUrl || photo}
                  alt="Profile"
                  width={160}
                  height={160}
                  className="object-cover w-40 h-40 md:w-[160px] md:h-[160px]"
                />
              </motion.div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-3 right-1/2 translate-x-1/2 bg-[#D291BC] text-white p-2 rounded-xl shadow-lg hover:bg-pink-400 transition-colors group-hover:scale-105"
              >
                <IconUpload className="w-4 h-4" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>

            <p className="text-sm text-[#D291BC]/70 text-center mb-6">
              Upload a new profile photo
            </p>

            <div className="flex gap-3 w-full">
              <Link 
                href="/main/profile"
                className="flex-1 py-3 px-4 rounded-2xl border border-[#D291BC] text-[#D291BC] font-medium text-center hover:bg-[#D291BC]/5 transition-colors"
              >
                Cancel
              </Link>
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                type="button"
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                Save Photo
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
