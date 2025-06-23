"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconUpload, IconX, IconPhoto, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/heic'];

const weekRanges = [
  { label: "Trimester 1", range: [1, 12] },
  { label: "Trimester 2", range: [13, 27] },
  { label: "Trimester 3", range: [28, 40] }
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
    setFormData(prev => ({ ...prev, file }));
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      
      // Tunggu animasi sukses selesai, lalu navigasi ke gallery
      setTimeout(() => {
        router.push('/main/gallery');
      }, 1000);
    } catch (err) {
      setError("Gagal mengunggah foto. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-[#D291BC]">
            Unggah Foto Baru
          </h1>
          <Link
            href="/main/gallery"
            className="text-[#D291BC] hover:text-[#c17ba6] transition-colors"
          >
            <IconX className="w-6 h-6" />
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {!preview ? (
              <div
                className={cn(
                  "border-2 border-dashed rounded-3xl p-8 text-center transition-colors",
                  dragActive
                    ? "border-[#D291BC] bg-[#FFE3EC]/10"
                    : "border-[#D291BC]/20 hover:border-[#D291BC]/40"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="mx-auto w-20 h-20 bg-[#FFE3EC] rounded-2xl flex items-center justify-center mb-4">
                  <IconUpload className="w-10 h-10 text-[#D291BC]" />
                </div>
                <h3 className="text-lg font-semibold text-[#D291BC] mb-2">
                  Unggah Foto Progres
                </h3>
                <p className="text-[#D291BC]/60 text-sm mb-4">
                  Seret & lepas foto di sini, atau klik untuk memilih
                </p>
                <div className="text-xs text-[#D291BC]/60 mb-4">
                  Format yang didukung: JPG, PNG, HEIC (Maks. 5MB)
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
                  className="bg-[#D291BC] text-white px-6 py-2 rounded-xl hover:bg-[#c17ba6] transition-colors inline-block cursor-pointer"
                >
                  Pilih Foto
                </label>
              </div>
            ) : (
              <div className="relative rounded-3xl overflow-hidden group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setFormData(prev => ({ ...prev, file: null }));
                    }}
                    className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <IconX className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl"
                >
                  <IconX className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-[#D291BC] mb-2">
                  Minggu Kehamilan<span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowWeekSelector(!showWeekSelector)}
                  className={cn(
                    "w-full px-4 py-2 rounded-xl border focus:outline-none transition-colors text-left",
                    selectedWeek 
                      ? "border-[#D291BC] bg-[#FFE3EC]/10 text-[#D291BC]" 
                      : "border-[#D291BC]/20 focus:border-[#D291BC] text-[#D291BC]/60"
                  )}
                >
                  {selectedWeek ? `Minggu ke-${selectedWeek}` : "Pilih minggu kehamilan"}
                </button>
                
                <AnimatePresence>
                  {showWeekSelector && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-[#D291BC]/10 p-3 z-50 max-h-64 overflow-y-auto"
                    >
                      {weekRanges.map((trimester, index) => (
                        <div key={index} className="space-y-1">
                          <div className="px-3 text-sm font-medium text-[#D291BC]/60">
                            {trimester.label}
                          </div>
                          {Array.from(
                            { length: trimester.range[1] - trimester.range[0] + 1 },
                            (_, i) => trimester.range[0] + i
                          ).map((week) => (
                            <button
                              type="button"
                              key={week}
                              onClick={() => {
                                setSelectedWeek(week);
                                setShowWeekSelector(false);
                                setFormData(prev => ({
                                  ...prev,
                                  title: `Minggu ke-${week}`
                                }));
                              }}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-lg transition-colors",
                                selectedWeek === week 
                                  ? "bg-[#FFE3EC] text-[#D291BC]" 
                                  : "hover:bg-[#FFE3EC]/50 text-[#D291BC]/80"
                              )}
                            >
                              Minggu ke-{week}
                            </button>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#D291BC] mb-2">
                  Judul Foto<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className={cn(
                    "w-full px-4 py-2 rounded-xl border focus:outline-none transition-colors",
                    formData.title 
                      ? "border-[#D291BC] bg-[#FFE3EC]/10 text-[#D291BC]" 
                      : "border-[#D291BC]/20 focus:border-[#D291BC] text-[#D291BC]/60"
                  )}
                  placeholder="Contoh: Minggu ke-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#D291BC] mb-2">
                  Catatan (Opsional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className={cn(
                    "w-full px-4 py-2 rounded-xl border focus:outline-none transition-colors min-h-[100px]",
                    formData.notes 
                      ? "border-[#D291BC] bg-[#FFE3EC]/10 text-[#D291BC]" 
                      : "border-[#D291BC]/20 focus:border-[#D291BC] text-[#D291BC]/60"
                  )}
                  placeholder="Tambahkan catatan tentang foto ini..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link
                href="/main/gallery"
                className="px-6 py-2 rounded-xl border border-[#D291BC] text-[#D291BC] hover:bg-[#FFE3EC]/10 transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={isLoading || !formData.file || !selectedWeek || !formData.title.trim()}
                className={cn(
                  "px-6 py-2 rounded-xl text-white transition-colors relative",
                  isLoading 
                    ? "bg-[#D291BC]/70" 
                    : success
                    ? "bg-green-500"
                    : "bg-[#D291BC] hover:bg-[#c17ba6]",
                  "disabled:bg-[#D291BC]/50 disabled:cursor-not-allowed"
                )}
              >
                <span className={cn("transition-opacity", isLoading && "opacity-0")}>
                  {success ? "Berhasil!" : "Unggah Foto"}
                </span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {success && (
                  <IconCheck className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
} 