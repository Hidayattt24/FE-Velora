"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import {
  IconCalendarEvent,
  IconDownload,
  IconTrash,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

interface Photo {
  id: number;
  title: string;
  week: number;
  date: string;
  imageUrl: string;
  notes: string;
}

interface ExpandableCardProps {
  photo: Photo;
  onDelete?: (photoId: number, e: React.MouseEvent) => void;
  onConfirmDelete?: (photoId: number, e: React.MouseEvent) => void;
  onCancelDelete?: (e: React.MouseEvent) => void;
  showDeleteConfirm?: boolean;
}

// Function to handle image download
const handleDownload = async (imageUrl: string, title: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    const filename = `${title.replace(/\s+/g, "_").toLowerCase()}.jpg`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading image:", error);
    alert("Gagal mengunduh gambar. Silakan coba lagi.");
  }
};

export function ExpandableCard({
  photo,
  onDelete,
  onConfirmDelete,
  onCancelDelete,
  showDeleteConfirm,
}: ExpandableCardProps) {
  const [active, setActive] = useState<Photo | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm h-full w-full z-10"
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.div
              layoutId={`card-${photo.id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.div layoutId={`image-${photo.id}`} className="relative">
                <img
                  width={500}
                  height={300}
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${photo.id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {photo.title}
                    </motion.h3>
                    <motion.div
                      layoutId={`date-${photo.id}`}
                      className="flex items-center text-neutral-500 text-sm mt-1"
                    >
                      <IconCalendarEvent className="w-4 h-4 mr-2" />
                      {photo.date}
                    </motion.div>
                  </div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActive(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#D291BC] hover:bg-white transition-colors shadow-lg"
                  >
                    <IconX className="h-4 w-4" />
                  </motion.button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                  >
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {photo.notes}
                    </p>
                    <div className="flex justify-end w-full">
                      <button
                        onClick={() =>
                          handleDownload(photo.imageUrl, photo.title)
                        }
                        className="flex items-center gap-2 text-sm text-[#D291BC] hover:text-[#c17ba6] transition-colors bg-[#FFE3EC] hover:bg-[#D291BC]/10 px-4 py-2 rounded-full"
                      >
                        <IconDownload className="w-4 h-4" />
                        <span>Unduh Foto</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <motion.div
        layoutId={`card-${photo.id}`}
        onClick={() => setActive(photo)}
        className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer bg-white/80 backdrop-blur-sm shadow-xl border border-[#FFE3EC]/30 group hover:shadow-2xl hover:border-[#D291BC]/20 transition-all duration-300 relative"
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex gap-4 flex-col md:flex-row w-full">
          <motion.div layoutId={`image-${photo.id}`} className="relative">
            <img
              width={100}
              height={100}
              src={photo.imageUrl}
              alt={photo.title}
              className="h-40 w-full md:h-20 md:w-20 rounded-lg object-cover object-center"
            />
          </motion.div>
          <div className="flex-1">
            <motion.h3
              layoutId={`title-${photo.id}`}
              className="font-semibold text-[#D291BC] dark:text-neutral-200 text-center md:text-left text-base mb-2"
            >
              {photo.title}
            </motion.h3>
            <motion.div
              layoutId={`date-${photo.id}`}
              className="flex items-center justify-center md:justify-start text-gray-500 text-sm"
            >
              <IconCalendarEvent className="w-4 h-4 mr-2" />
              {photo.date}
            </motion.div>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2 text-center md:text-left">
              {photo.notes}
            </p>
          </div>
        </div>
        <div className="absolute top-4 right-4 opacity-100 transition-opacity z-10">
          {showDeleteConfirm ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1"
            >
              <button
                onClick={
                  onConfirmDelete
                    ? (e) => onConfirmDelete(photo.id, e)
                    : undefined
                }
                className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors shadow-lg"
              >
                <IconCheck className="w-4 h-4" />
              </button>
              <button
                onClick={onCancelDelete}
                className="p-2 bg-gray-500 hover:bg-gray-600 rounded-full text-white backdrop-blur-sm transition-colors shadow-lg"
              >
                <IconX className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={onDelete ? (e) => onDelete(photo.id, e) : undefined}
              className="p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white backdrop-blur-sm transition-colors shadow-lg"
            >
              <IconTrash className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </>
  );
}
