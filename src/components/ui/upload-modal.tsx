"use client";

import { useState } from "react";
import { IconX, IconUpload } from "@tabler/icons-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: {
    image: File;
    title?: string;
    description?: string;
    pregnancy_week?: number;
  }) => Promise<void>;
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pregnancyWeek, setPregnancyWeek] = useState<number | undefined>();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setIsUploading(true);
    setError(null);

    try {
      await onUpload({
        image,
        title: title || undefined,
        description: description || undefined,
        pregnancy_week: pregnancyWeek,
      });

      // Reset form
      setImage(null);
      setTitle("");
      setDescription("");
      setPregnancyWeek(undefined);
      onClose();
    } catch (err: any) {
      setError(err.message || "Gagal mengunggah foto");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#D291BC]">
              Unggah Foto
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Masukkan judul foto..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="Ceritakan tentang foto ini..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minggu Kehamilan
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={pregnancyWeek || ""}
                onChange={(e) =>
                  setPregnancyWeek(
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Contoh: 20"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={!image || isUploading}
                className="flex-1 flex items-center justify-center gap-2 bg-[#D291BC] text-white px-4 py-2 rounded-lg hover:bg-[#c17ba6] disabled:opacity-50"
              >
                <IconUpload className="w-4 h-4" />
                {isUploading ? "Mengunggah..." : "Unggah"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
