"use client";

import { motion } from "framer-motion";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const weekRanges = [
  { label: "Trimester 1", range: [1, 12] },
  { label: "Trimester 2", range: [13, 27] },
  { label: "Trimester 3", range: [28, 40] }
];

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [showWeekSelector, setShowWeekSelector] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
  });

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
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file));
      }
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {!preview ? (
            <div
              className={`border-2 border-dashed rounded-3xl p-8 text-center transition-colors ${
                dragActive
                  ? "border-[#D291BC] bg-[#FFE3EC]/10"
                  : "border-[#D291BC]/20 hover:border-[#D291BC]/40"
              }`}
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
              <p className="text-gray-500 text-sm mb-4">
                Seret & lepas foto di sini, atau klik untuk memilih
              </p>
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
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setPreview(null)}
                  className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <IconX className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-[#D291BC] mb-2">
                Minggu Kehamilan
              </label>
              <button
                onClick={() => setShowWeekSelector(!showWeekSelector)}
                className="w-full px-4 py-2 rounded-xl border border-[#D291BC]/20 focus:outline-none focus:border-[#D291BC] transition-colors text-left"
              >
                {selectedWeek ? `Minggu ke-${selectedWeek}` : "Pilih minggu kehamilan"}
              </button>
              
              {showWeekSelector && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-[#D291BC]/10 p-3 z-50 max-h-64 overflow-y-auto"
                >
                  {weekRanges.map((trimester, index) => (
                    <div key={index} className="space-y-1">
                      <div className="px-3 text-sm font-medium text-gray-500">
                        {trimester.label}
                      </div>
                      {Array.from(
                        { length: trimester.range[1] - trimester.range[0] + 1 },
                        (_, i) => trimester.range[0] + i
                      ).map((week) => (
                        <button
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
                            selectedWeek === week ? "bg-[#FFE3EC] text-[#D291BC]" : "hover:bg-[#FFE3EC]/50"
                          )}
                        >
                          Minggu ke-{week}
                        </button>
                      ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#D291BC] mb-2">
                Judul Foto
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-[#D291BC]/20 focus:outline-none focus:border-[#D291BC] transition-colors"
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
                className="w-full px-4 py-2 rounded-xl border border-[#D291BC]/20 focus:outline-none focus:border-[#D291BC] transition-colors"
                rows={4}
                placeholder="Tambahkan catatan tentang foto ini..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/main/gallery"
              className="px-6 py-2 rounded-xl border border-[#D291BC] text-[#D291BC] hover:bg-[#FFE3EC]/10 transition-colors"
            >
              Batal
            </Link>
            <button 
              className={cn(
                "px-6 py-2 rounded-xl transition-colors",
                preview && selectedWeek
                  ? "bg-[#D291BC] text-white hover:bg-[#c17ba6]"
                  : "bg-[#D291BC]/50 text-white cursor-not-allowed"
              )}
              disabled={!preview || !selectedWeek}
            >
              Simpan
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 