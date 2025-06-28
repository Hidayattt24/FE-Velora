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
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FFE3EC]/20 to-[#D291BC]/5 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm mx-auto lg:max-w-3xl"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 lg:p-8 border border-white/20">
          <div className="flex items-center gap-3 mb-6 lg:mb-8">
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
                <IconCamera className="w-5 h-5 lg:w-6 lg:h-6 text-[#D291BC]" />
              </div>
              <h1 className="text-xl lg:text-2xl font-bold text-[#D291BC]">
                Change Photo
              </h1>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col items-center">
              <div className="relative group mb-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl overflow-hidden shadow-xl border-4 border-white/30"
                >
                  <Image
                    src={previewUrl || photo}
                    alt="Profile"
                    width={200}
                    height={200}
                    className="object-cover w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48"
                  />
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#D291BC] to-pink-400 text-white p-2 lg:p-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <IconUpload className="w-4 h-4 lg:w-5 lg:h-5" />
                </motion.button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-center lg:text-left mb-6">
                <h2 className="text-lg lg:text-xl font-bold text-[#D291BC] mb-3">
                  Update Your Profile Photo
                </h2>
                <p className="text-sm lg:text-base text-[#D291BC]/70 leading-relaxed">
                  Upload a new profile photo to personalize your account. Choose
                  a clear, high-quality image that represents you best.
                  <br />
                  <span className="text-xs lg:text-sm font-medium text-[#D291BC]/60 mt-2 block">
                    Supported formats: JPG, PNG, GIF • Max size: 5MB
                  </span>
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
                  type="button"
                  className="flex-1 py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base"
                >
                  Save Photo
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
