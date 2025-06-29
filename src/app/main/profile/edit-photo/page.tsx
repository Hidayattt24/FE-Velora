"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { IconCamera, IconArrowLeft, IconUpload } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { profileService } from "@/lib/api/profile";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditPhotoPage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [currentPhoto, setCurrentPhoto] = useState(
    "/main/gallery/photo-profile.jpg"
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await profileService.getProfile();
        if (response.success && response.data) {
          const profile = response.data.user;
          if (profile.profile_picture) {
            // If it's a full URL, use it as is
            if (profile.profile_picture.startsWith("http")) {
              setCurrentPhoto(profile.profile_picture);
            } else {
              // If it's a relative path, prepend the API base URL
              const API_BASE_URL =
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
              setCurrentPhoto(`${API_BASE_URL}${profile.profile_picture}`);
            }
          }
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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Harap pilih file gambar yang valid");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file tidak boleh lebih dari 5MB");
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSavePhoto = async () => {
    if (!selectedFile) {
      toast.error("Harap pilih foto terlebih dahulu");
      return;
    }

    setIsLoading(true);
    try {
      const response = await profileService.uploadProfilePicture(selectedFile);

      if (response.success && response.data) {
        // Update user context
        updateUser({
          profile_picture: response.data.user.profile_picture,
        });

        toast.success("Foto profil berhasil diperbarui");
        router.push("/main/profile");
      }
    } catch (error) {
      console.error("Upload photo error:", error);
      toast.error(
        error instanceof Error ? error.message : "Gagal mengupload foto"
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
                    src={previewUrl || currentPhoto}
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
                  disabled={isLoading}
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
                  onClick={handleSavePhoto}
                  disabled={isLoading || !selectedFile}
                  className="flex-1 py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Menyimpan..." : "Save Photo"}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
