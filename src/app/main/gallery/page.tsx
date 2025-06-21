"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconPlus, IconCalendarEvent, IconX, IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import { cn } from "@/lib/utils";

// Dummy data for demonstration
const photos = [
  {
    id: 1,
    title: "Minggu ke-12",
    week: 12,
    date: "12 Maret 2024",
    imageUrl: "https://source.unsplash.com/random/800x600?pregnancy&1",
    notes: "Pertama kali merasakan gerakan bayi!"
  },
  {
    id: 2,
    title: "Minggu ke-16",
    week: 16,
    date: "9 April 2024",
    imageUrl: "https://source.unsplash.com/random/800x600?pregnancy&2",
    notes: "Baby bump mulai terlihat"
  },
  {
    id: 3,
    title: "Minggu ke-20",
    week: 20,
    date: "7 Mei 2024",
    imageUrl: "https://source.unsplash.com/random/800x600?pregnancy&3",
    notes: "USG menunjukkan jenis kelamin bayi"
  },
  {
    id: 4,
    title: "Minggu ke-24",
    week: 24,
    date: "4 Juni 2024",
    imageUrl: "https://source.unsplash.com/random/800x600?pregnancy&4",
    notes: "Perut semakin membesar"
  },
];

const weekRanges = [
  { label: "Trimester 1", range: [1, 12] },
  { label: "Trimester 2", range: [13, 27] },
  { label: "Trimester 3", range: [28, 40] }
];

export default function GalleryPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedTrimester, setSelectedTrimester] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useOutsideClick(cardRef, () => {
    setSelectedId(null);
  });

  const filteredPhotos = selectedWeek
    ? photos.filter(photo => photo.week === selectedWeek)
    : selectedTrimester !== null
    ? photos.filter(photo => {
        const trimester = weekRanges[selectedTrimester];
        return photo.week >= trimester.range[0] && photo.week <= trimester.range[1];
      })
    : photos;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Centered Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#D291BC] mb-2">
          Galeri Perjalanan Kehamilan
        </h1>
        <p className="text-gray-500 text-sm md:text-base mb-6">
          Dokumentasi visual perjalanan kehamilanmu
        </p>
        {/* Desktop Upload Button */}
        <div className="hidden md:block">
          <Link
            href="/main/gallery/upload"
            className="inline-flex items-center gap-2 bg-[#D291BC] text-white px-6 py-2.5 rounded-xl hover:bg-[#c17ba6] transition-colors"
          >
            <IconPlus className="w-5 h-5" />
            <span>Unggah Foto Baru</span>
          </Link>
        </div>
      </div>

      {/* Centered Filter Section */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide max-w-full w-fit mx-auto">
          <button
            onClick={() => {
              setSelectedWeek(null);
              setSelectedTrimester(null);
            }}
            className={cn(
              "px-4 py-2 rounded-xl whitespace-nowrap transition-colors",
              !selectedWeek && selectedTrimester === null
                ? "bg-[#D291BC] text-white"
                : "bg-white text-[#D291BC] border border-[#D291BC]/20 hover:bg-[#FFE3EC]/10"
            )}
          >
            Semua Foto
          </button>
          {weekRanges.map((trimester, index) => (
            <button
              key={`trimester-${index}`}
              onClick={() => {
                setSelectedTrimester(index);
                setSelectedWeek(null);
              }}
              className={cn(
                "px-4 py-2 rounded-xl whitespace-nowrap transition-colors",
                selectedTrimester === index
                  ? "bg-[#D291BC] text-white"
                  : "bg-white text-[#D291BC] border border-[#D291BC]/20 hover:bg-[#FFE3EC]/10"
              )}
            >
              {trimester.label}
            </button>
          ))}
        </div>

        {selectedTrimester !== null && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-full w-fit mx-auto">
            {Array.from(
              { length: weekRanges[selectedTrimester].range[1] - weekRanges[selectedTrimester].range[0] + 1 },
              (_, i) => weekRanges[selectedTrimester].range[0] + i
            ).map((week) => (
              <button
                key={`week-${week}`}
                onClick={() => setSelectedWeek(week)}
                className={cn(
                  "px-4 py-2 rounded-xl whitespace-nowrap transition-colors min-w-[120px]",
                  selectedWeek === week
                    ? "bg-[#FFE3EC] text-[#D291BC] font-medium"
                    : "bg-white text-[#D291BC] border border-[#D291BC]/20 hover:bg-[#FFE3EC]/10"
                )}
              >
                Minggu {week}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <AnimatePresence>
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              ref={selectedId === photo.id ? cardRef : null}
              layoutId={`card-${photo.id}`}
              onClick={() => setSelectedId(photo.id)}
              className={cn(
                "bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer",
                selectedId === photo.id ? "fixed inset-4 z-50 m-auto max-w-4xl h-fit" : "relative"
              )}
              initial={selectedId === photo.id ? { opacity: 0, scale: 0.8 } : undefined}
              animate={selectedId === photo.id ? { opacity: 1, scale: 1 } : undefined}
              exit={selectedId === photo.id ? { opacity: 0, scale: 0.8 } : undefined}
              transition={{ duration: 0.3 }}
            >
              <div className={cn(
                "relative",
                selectedId === photo.id ? "aspect-video" : "aspect-[4/3]"
              )}>
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
                {selectedId === photo.id && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(null);
                    }}
                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-sm transition-colors"
                  >
                    <IconX className="w-6 h-6" />
                  </motion.button>
                )}
              </div>
              <motion.div 
                className={cn(
                  "p-6",
                  selectedId === photo.id ? "space-y-4" : ""
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#D291BC]">
                    {photo.title}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <IconCalendarEvent className="w-4 h-4 mr-2" />
                    {photo.date}
                  </div>
                </div>
                
                {selectedId === photo.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="space-y-4"
                  >
                    <p className="text-gray-600">{photo.notes}</p>
                    <div className="flex justify-end">
                      <button className="flex items-center gap-2 text-[#D291BC] hover:text-[#c17ba6] transition-colors">
                        <IconDownload className="w-5 h-5" />
                        <span>Unduh Foto</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Mobile-only Upload Button */}
      <div className="md:hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-24 right-4 z-50"
        >
          <Link
            href="/main/gallery/upload"
            className="bg-[#D291BC] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-[#c17ba6] transition-colors"
            title="Unggah Foto"
          >
            <IconPlus className="w-6 h-6" />
          </Link>
        </motion.div>
      </div>

      {/* Modal Overlay */}
      {selectedId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setSelectedId(null)}
        />
      )}

      {/* Empty State */}
      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {selectedWeek 
              ? `Belum ada foto untuk minggu ke-${selectedWeek}. Tambahkan foto pertamamu!`
              : selectedTrimester !== null
              ? `Belum ada foto untuk ${weekRanges[selectedTrimester].label}. Tambahkan foto pertamamu!`
              : "Belum ada foto yang diunggah. Mulai dokumentasikan perjalanan kehamilanmu!"
            }
          </p>
        </div>
      )}
    </div>
  );
} 