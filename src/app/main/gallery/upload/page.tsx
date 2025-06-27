"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  IconUpload,
  IconX,
  IconPhoto,
  IconCheck,
  IconCamera,
  IconCloudUpload,
  IconSparkles,
  IconHeart,
  IconArrowLeft,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/heic"];

const weekRanges = [
  { label: "Trimester 1", range: [1, 12] },
  { label: "Trimester 2", range: [13, 27] },
  { label: "Trimester 3", range: [28, 40] },
];

export default function UploadPage() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [showWeekSelector, setShowWeekSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
    file: null as File | null,
  });

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type.toLowerCase())) {
      return "Format file tidak didukung. Gunakan JPG, PNG, atau HEIC.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Ukuran file terlalu besar. Maksimal 5MB.";
    }
    return null;
  };

  const handleFileSelect = (file: File) => {
    const errorMessage = validateFile(file);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError(null);
    setPreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file || !selectedWeek || !formData.title.trim()) {
      setError("Harap lengkapi semua field yang diperlukan");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulasi upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);

      // Tunggu animasi sukses selesai, lalu navigasi ke gallery
      setTimeout(() => {
        router.push("/main/gallery");
      }, 1000);
    } catch (err) {
      setError("Gagal mengunggah foto. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FFE3EC]/20 to-[#D291BC]/5">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFE3EC]/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#D291BC]/10 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-[#FFE3EC]/30 rounded-full blur-lg animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              href="/main/gallery"
              className="inline-flex items-center gap-2 text-[#D291BC] hover:text-[#c17ba6] transition-colors group"
            >
              <IconArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Kembali ke Galeri</span>
            </Link>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#FFE3EC]/50 p-6 sm:p-8 space-y-8"
            >
              {/* Upload Area */}
              {!preview ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className={cn(
                    "border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 group relative overflow-hidden",
                    dragActive
                      ? "border-[#D291BC] bg-gradient-to-br from-[#FFE3EC]/20 to-[#D291BC]/10 scale-105"
                      : "border-[#D291BC]/30 hover:border-[#D291BC]/60 hover:bg-[#FFE3EC]/10"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {/* Background Animation */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 w-3 h-3 bg-[#D291BC] rounded-full animate-bounce delay-0" />
                    <div className="absolute top-8 right-8 w-2 h-2 bg-[#FFE3EC] rounded-full animate-bounce delay-300" />
                    <div className="absolute bottom-6 left-1/3 w-2 h-2 bg-[#D291BC] rounded-full animate-bounce delay-700" />
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      className="mx-auto w-24 h-24 bg-gradient-to-br from-[#FFE3EC] to-[#D291BC]/20 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <IconCloudUpload className="w-12 h-12 text-[#D291BC]" />
                    </motion.div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#D291BC] mb-3 flex items-center justify-center gap-2">
                      <IconSparkles className="w-6 h-6" />
                      Unggah Foto Progres
                      <IconHeart className="w-6 h-6 text-pink-400" />
                    </h3>

                    <p className="text-[#D291BC]/70 text-sm sm:text-base mb-6 max-w-sm mx-auto leading-relaxed">
                      Seret & lepas foto di sini, atau klik tombol di bawah
                      untuk memilih dari galeri
                    </p>

                    <div className="flex flex-col items-center gap-3">
                      <div className="text-xs text-[#D291BC]/60 bg-[#FFE3EC]/50 px-4 py-2 rounded-full">
                        Format: JPG, PNG, HEIC • Maksimal 5MB
                      </div>

                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="file-upload"
                        className="bg-gradient-to-r from-[#D291BC] to-[#c17ba6] text-white px-8 py-3 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer font-medium inline-flex items-center gap-2 group"
                      >
                        <IconPhoto className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Pilih Foto
                      </label>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative rounded-3xl overflow-hidden group shadow-2xl"
                >
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setFormData((prev) => ({ ...prev, file: null }));
                        }}
                        className="bg-white/20 backdrop-blur-md text-white p-4 rounded-2xl hover:bg-white/30 transition-all duration-200 transform hover:scale-110 shadow-lg"
                        whileHover={{ rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconX className="w-6 h-6" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Photo Frame Effect */}
                  <div className="absolute inset-0 border-4 border-white/20 rounded-3xl pointer-events-none" />
                </motion.div>
              )}

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-2xl border border-red-200"
                  >
                    <div className="p-1 bg-red-100 rounded-full">
                      <IconX className="w-4 h-4 flex-shrink-0" />
                    </div>
                    <p className="text-sm font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Fields */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Week Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative sm:col-span-2"
                >
                  <label className="text-sm font-semibold text-[#D291BC] mb-3 flex items-center gap-2">
                    <IconCalendarEvent className="w-4 h-4" />
                    Minggu Kehamilan
                    <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowWeekSelector(!showWeekSelector)}
                    className={cn(
                      "w-full px-6 py-4 rounded-2xl border-2 focus:outline-none transition-all duration-200 text-left font-medium backdrop-blur-sm",
                      selectedWeek
                        ? "border-[#D291BC] bg-gradient-to-r from-[#FFE3EC]/20 to-[#FFE3EC]/10 text-[#D291BC] shadow-md"
                        : "border-[#D291BC]/30 hover:border-[#D291BC]/60 focus:border-[#D291BC] text-[#D291BC]/60 bg-white/50"
                    )}
                  >
                    <span className="flex items-center justify-between">
                      {selectedWeek
                        ? `Minggu ke-${selectedWeek}`
                        : "Pilih minggu kehamilan"}
                      <motion.div
                        animate={{ rotate: showWeekSelector ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </motion.div>
                    </span>
                  </button>

                  <AnimatePresence>
                    {showWeekSelector && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute left-0 right-0 top-full mt-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#FFE3EC] p-4 z-50 max-h-64 overflow-y-auto"
                      >
                        {weekRanges.map((trimester, index) => (
                          <div key={index} className="space-y-2">
                            <div className="px-4 py-2 text-sm font-bold text-[#D291BC]/80 bg-[#FFE3EC]/30 rounded-xl">
                              {trimester.label}
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              {Array.from(
                                {
                                  length:
                                    trimester.range[1] - trimester.range[0] + 1,
                                },
                                (_, i) => trimester.range[0] + i
                              ).map((week) => (
                                <motion.button
                                  type="button"
                                  key={week}
                                  onClick={() => {
                                    setSelectedWeek(week);
                                    setShowWeekSelector(false);
                                    setFormData((prev) => ({
                                      ...prev,
                                      title: `Minggu ke-${week}`,
                                    }));
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className={cn(
                                    "p-3 rounded-xl transition-all duration-200 text-sm font-medium",
                                    selectedWeek === week
                                      ? "bg-gradient-to-r from-[#D291BC] to-[#c17ba6] text-white shadow-lg"
                                      : "bg-[#FFE3EC]/20 hover:bg-[#FFE3EC]/40 text-[#D291BC]/80 hover:text-[#D291BC]"
                                  )}
                                >
                                  {week}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Title Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="text-sm font-semibold text-[#D291BC] mb-3 flex items-center gap-2">
                    <IconSparkles className="w-4 h-4" />
                    Judul Foto
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className={cn(
                      "w-full px-6 py-4 rounded-2xl border-2 focus:outline-none transition-all duration-200 font-medium backdrop-blur-sm",
                      formData.title
                        ? "border-[#D291BC] bg-gradient-to-r from-[#FFE3EC]/20 to-[#FFE3EC]/10 text-[#D291BC] shadow-md"
                        : "border-[#D291BC]/30 hover:border-[#D291BC]/60 focus:border-[#D291BC] text-[#D291BC]/60 bg-white/50"
                    )}
                    placeholder="Contoh: Minggu ke-24 - Baby bump cantik"
                  />
                </motion.div>

                {/* Notes Field */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="text-sm font-semibold text-[#D291BC] mb-3 flex items-center gap-2">
                    <IconHeart className="w-4 h-4" />
                    Catatan Spesial
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    className={cn(
                      "w-full px-6 py-4 rounded-2xl border-2 focus:outline-none transition-all duration-200 min-h-[120px] font-medium backdrop-blur-sm resize-none",
                      formData.notes
                        ? "border-[#D291BC] bg-gradient-to-r from-[#FFE3EC]/20 to-[#FFE3EC]/10 text-[#D291BC] shadow-md"
                        : "border-[#D291BC]/30 hover:border-[#D291BC]/60 focus:border-[#D291BC] text-[#D291BC]/60 bg-white/50"
                    )}
                    placeholder="Ceritakan momen spesial dari foto ini... 💕"
                  />
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
              >
                <Link
                  href="/main/gallery"
                  className="px-8 py-4 rounded-2xl border-2 border-[#D291BC]/30 text-[#D291BC] hover:bg-[#FFE3EC]/20 hover:border-[#D291BC]/60 transition-all duration-200 text-center font-medium backdrop-blur-sm"
                >
                  Batal
                </Link>
                <motion.button
                  type="submit"
                  disabled={
                    isLoading ||
                    !formData.file ||
                    !selectedWeek ||
                    !formData.title.trim()
                  }
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "px-8 py-4 rounded-2xl text-white transition-all duration-200 relative font-semibold shadow-lg min-w-[180px]",
                    isLoading
                      ? "bg-[#D291BC]/70 cursor-not-allowed"
                      : success
                      ? "bg-gradient-to-r from-green-500 to-green-600"
                      : "bg-gradient-to-r from-[#D291BC] to-[#c17ba6] hover:shadow-xl hover:shadow-[#D291BC]/25",
                    "disabled:bg-[#D291BC]/50 disabled:cursor-not-allowed disabled:shadow-none"
                  )}
                >
                  <span
                    className={cn(
                      "transition-opacity flex items-center justify-center gap-2",
                      isLoading && "opacity-0"
                    )}
                  >
                    {success ? (
                      <>
                        <IconCheck className="w-5 h-5" />
                        Berhasil Disimpan!
                      </>
                    ) : (
                      <>
                        <IconCloudUpload className="w-5 h-5" />
                        Simpan Momen
                      </>
                    )}
                  </span>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
}
