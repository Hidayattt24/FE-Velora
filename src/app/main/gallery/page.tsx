"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  IconPlus,
  IconCalendarEvent,
  IconX,
  IconDownload,
  IconArrowUp,
  IconTrash,
  IconClock,
  IconCheck,
  IconPhoto,
  IconCamera,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { ProfileHeader } from "@/components/ui/profile-header";

// Dummy data for demonstration
const photos = [
  {
    id: 1,
    title: "Minggu ke-12",
    week: 12,
    date: "12 Maret 2024",
    imageUrl: "/main/gallery/gallery.jpg",
    notes: "Pertama kali merasakan gerakan bayi!",
  },
  {
    id: 2,
    title: "Minggu ke-16",
    week: 16,
    date: "9 April 2024",
    imageUrl: "/main/gallery/gallery.jpg",
    notes: "Baby bump mulai terlihat",
  },
  {
    id: 3,
    title: "Minggu ke-20",
    week: 20,
    date: "7 Mei 2024",
    imageUrl: "/main/gallery/gallery.jpg",
    notes: "USG menunjukkan jenis kelamin bayi",
  },
  {
    id: 4,
    title: "Minggu ke-24",
    week: 24,
    date: "4 Juni 2024",
    imageUrl: "/main/gallery/gallery.jpg",
    notes: "Perut semakin membesar",
  },
];

const weekRanges = [
  { label: "Trimester 1", range: [1, 12] },
  { label: "Trimester 2", range: [13, 27] },
  { label: "Trimester 3", range: [28, 40] },
];

// Function to handle image download
const handleDownload = async (imageUrl: string, title: string) => {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);

    // Set the download filename
    const filename = `${title.replace(/\s+/g, "_").toLowerCase()}.jpg`;
    link.download = filename;

    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading image:", error);
    alert("Gagal mengunduh gambar. Silakan coba lagi.");
  }
};

function EmptyStateIllustration() {
  return (
    <div className="w-full max-w-[300px] mx-auto mb-6">
      <motion.svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        initial="hidden"
        animate="visible"
      >
        {/* Background Circle */}
        <motion.circle
          cx="200"
          cy="150"
          r="120"
          fill="#FFE3EC"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Photo Frame */}
        <motion.rect
          x="120"
          y="70"
          width="160"
          height="160"
          rx="20"
          fill="white"
          stroke="#D291BC"
          strokeWidth="4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        />

        {/* Decorative Lines */}
        <motion.path
          d="M140 140 L260 140"
          stroke="#D291BC"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="220"
          initial={{ strokeDashoffset: 220 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
        <motion.path
          d="M140 160 L220 160"
          stroke="#D291BC"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="180"
          initial={{ strokeDashoffset: 180 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />

        {/* Image Icon */}
        <motion.path
          d="M160 100 L180 100 L190 110 L240 110 L240 180 L160 180 Z"
          fill="#FFE3EC"
          stroke="#D291BC"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />

        {/* Sun/Circle Decoration */}
        <motion.circle
          cx="280"
          cy="80"
          r="15"
          fill="#D291BC"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1.2, duration: 0.5 }}
        />

        {/* Floating Hearts */}
        {[
          { cx: 300, cy: 200, delay: 1.4 },
          { cx: 100, cy: 180, delay: 1.6 },
          { cx: 260, cy: 240, delay: 1.8 },
        ].map((heart, index) => (
          <motion.path
            key={index}
            d={`M${heart.cx - 10},${
              heart.cy
            } a5,5 0 0,1 10,0 a5,5 0 0,1 10,0 q0,10 -10,15 q-10,-5 -10,-15`}
            fill="#D291BC"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 1, 1],
              y: [0, -20, 0],
            }}
            transition={{
              delay: heart.delay,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
            },
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bg-[#D291BC] text-white shadow-lg rounded-full",
            "w-12 h-12 flex items-center justify-center transition-colors hover:bg-[#c17ba6]",
            "right-4 md:right-8",
            "bottom-[144px] md:bottom-8",
            "z-[60]"
          )}
          whileHover={{
            scale: 1.1,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10,
            },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <IconArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function GalleryPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedTrimester, setSelectedTrimester] = useState<number | null>(
    null
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );
  const cardRef = useRef<HTMLDivElement>(null);

  useOutsideClick(cardRef, () => {
    setSelectedId(null);
  });

  const filteredPhotos = selectedWeek
    ? photos.filter((photo) => photo.week === selectedWeek)
    : selectedTrimester !== null
    ? photos.filter((photo) => {
        const trimester = weekRanges[selectedTrimester];
        return (
          photo.week >= trimester.range[0] && photo.week <= trimester.range[1]
        );
      })
    : photos;

  const handleDelete = (photoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(photoId);
  };

  const confirmDelete = (photoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // Here you would typically make an API call to delete the photo
    alert(`Foto berhasil dihapus!`);
    setShowDeleteConfirm(null);
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FFE3EC]/20 to-[#D291BC]/5">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFE3EC]/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#D291BC]/20 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-[#FFE3EC]/40 rounded-full blur-lg animate-pulse delay-2000" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-[#D291BC]/10 rounded-full blur-md animate-pulse delay-3000" />
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 relative z-10">
        <ProfileHeader />

        {/* Centered Header Section - Enhanced for modern design */}
        <div className="text-center mb-4 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="p-3 bg-gradient-to-r from-[#D291BC] to-[#c17ba6] rounded-2xl shadow-lg">
              <IconPhoto className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#D291BC] to-[#c17ba6] bg-clip-text text-transparent">
              Galeri Perjalanan Kehamilan
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-[#D291BC]/70 mb-4 sm:mb-6 max-w-md mx-auto leading-relaxed"
          >
            Dokumentasi visual perjalanan kehamilanmu yang penuh makna
          </motion.p>
          {/* Desktop Upload Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block"
          >
            <Link
              href="/main/gallery/upload"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D291BC] to-[#c17ba6] text-white px-6 py-3 rounded-2xl hover:shadow-lg hover:shadow-[#D291BC]/25 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              <IconPlus className="w-5 h-5" />
              <span>Unggah Foto Baru</span>
            </Link>
          </motion.div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="mb-6 sm:mb-8 -mx-2 sm:mx-0">
          <div className="relative flex flex-col items-center">
            <div className="flex gap-2 mb-3 sm:mb-4 overflow-x-auto pb-2 px-2 sm:px-0 scrollbar-hide snap-x snap-mandatory w-full sm:w-fit sm:mx-auto">
              <div className="absolute bottom-[6px] left-0 w-8 bg-gradient-to-r from-white to-transparent h-2 z-10 sm:hidden" />
              <div className="absolute bottom-[6px] right-0 w-8 bg-gradient-to-l from-white to-transparent h-2 z-10 sm:hidden" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedWeek(null);
                  setSelectedTrimester(null);
                }}
                className={cn(
                  "px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 snap-start flex-shrink-0 relative font-medium shadow-md",
                  !selectedWeek && selectedTrimester === null
                    ? "bg-gradient-to-r from-[#D291BC] to-[#c17ba6] text-white shadow-lg shadow-[#D291BC]/25 after:absolute after:bottom-[-6px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-[2px] after:bg-[#D291BC]"
                    : "bg-white/70 backdrop-blur-sm text-[#D291BC] border border-[#D291BC]/20 hover:bg-[#FFE3EC]/30 hover:border-[#D291BC]/40"
                )}
              >
                Semua Foto
              </motion.button>
              {weekRanges.map((trimester, index) => (
                <motion.button
                  key={`trimester-${index}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedTrimester(index);
                    setSelectedWeek(null);
                  }}
                  className={cn(
                    "px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 snap-start flex-shrink-0 relative font-medium shadow-md",
                    selectedTrimester === index
                      ? "bg-gradient-to-r from-[#D291BC] to-[#c17ba6] text-white shadow-lg shadow-[#D291BC]/25 after:absolute after:bottom-[-6px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-[2px] after:bg-[#D291BC]"
                      : "bg-white/70 backdrop-blur-sm text-[#D291BC] border border-[#D291BC]/20 hover:bg-[#FFE3EC]/30 hover:border-[#D291BC]/40"
                  )}
                >
                  {trimester.label}
                </motion.button>
              ))}
            </div>

            {selectedTrimester !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative flex gap-2 overflow-x-auto pb-2 px-2 sm:px-0 scrollbar-hide snap-x snap-mandatory w-full sm:w-fit sm:mx-auto sm:max-w-3xl"
              >
                <div className="absolute bottom-[6px] left-0 w-8 bg-gradient-to-r from-white to-transparent h-2 z-10 sm:hidden" />
                <div className="absolute bottom-[6px] right-0 w-8 bg-gradient-to-l from-white to-transparent h-2 z-10 sm:hidden" />
                <div className="flex flex-nowrap sm:flex-wrap sm:justify-center gap-2 w-full">
                  {Array.from(
                    {
                      length:
                        weekRanges[selectedTrimester].range[1] -
                        weekRanges[selectedTrimester].range[0] +
                        1,
                    },
                    (_, i) => weekRanges[selectedTrimester].range[0] + i
                  ).map((week) => (
                    <motion.button
                      key={`week-${week}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedWeek(week)}
                      className={cn(
                        "px-4 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 snap-start flex-shrink-0 relative sm:flex-shrink sm:w-[calc(20%-8px)] font-medium shadow-sm",
                        selectedWeek === week
                          ? "bg-gradient-to-r from-[#FFE3EC] to-[#D291BC]/20 text-[#D291BC] font-semibold border-2 border-[#D291BC]/30 shadow-md after:absolute after:bottom-[-6px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-[2px] after:bg-[#D291BC]"
                          : "bg-white/70 backdrop-blur-sm text-[#D291BC] border border-[#D291BC]/20 hover:bg-[#FFE3EC]/30 hover:border-[#D291BC]/40"
                      )}
                    >
                      Minggu {week}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Gallery Grid - Optimized for mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                ref={selectedId === photo.id ? cardRef : null}
                layoutId={`card-${photo.id}`}
                onClick={() => setSelectedId(photo.id)}
                className={cn(
                  "bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-[#FFE3EC]/30 overflow-hidden cursor-pointer group hover:shadow-2xl hover:border-[#D291BC]/20 transition-all duration-300",
                  selectedId === photo.id
                    ? "fixed inset-0 sm:inset-4 z-50 m-auto max-w-4xl h-fit bg-white/95"
                    : "relative hover:-translate-y-1"
                )}
                initial={
                  selectedId === photo.id
                    ? { opacity: 0, scale: 0.8 }
                    : undefined
                }
                animate={
                  selectedId === photo.id ? { opacity: 1, scale: 1 } : undefined
                }
                exit={
                  selectedId === photo.id
                    ? { opacity: 0, scale: 0.8 }
                    : undefined
                }
                transition={{ duration: 0.3 }}
                whileHover={
                  selectedId !== photo.id ? { y: -4, scale: 1.02 } : undefined
                }
              >
                <div
                  className={cn(
                    "relative",
                    selectedId === photo.id
                      ? "aspect-video"
                      : "aspect-square sm:aspect-[4/3]"
                  )}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedId === photo.id ? (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(null);
                      }}
                      className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-sm transition-colors"
                    >
                      <IconX className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.button>
                  ) : (
                    <div className="absolute top-2 right-2 opacity-100 transition-opacity">
                      {showDeleteConfirm === photo.id ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-1"
                        >
                          <button
                            onClick={(e) => confirmDelete(photo.id, e)}
                            className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors shadow-lg"
                          >
                            <IconCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="p-2 bg-gray-500 hover:bg-gray-600 rounded-full text-white backdrop-blur-sm transition-colors shadow-lg"
                          >
                            <IconX className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ) : (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={(e) => handleDelete(photo.id, e)}
                          className="p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white backdrop-blur-sm transition-colors shadow-lg"
                        >
                          <IconTrash className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  )}
                </div>
                <motion.div
                  className={cn(
                    "p-3 sm:p-6",
                    selectedId === photo.id
                      ? "space-y-4"
                      : "space-y-1 sm:space-y-2"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                    <h3 className="text-base sm:text-lg font-semibold text-[#D291BC]">
                      {photo.title}
                    </h3>
                    <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                      <IconCalendarEvent className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
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
                      <p className="text-sm sm:text-base text-gray-600">
                        {photo.notes}
                      </p>
                      <div className="flex justify-end">
                        <button
                          onClick={() =>
                            handleDownload(photo.imageUrl, photo.title)
                          }
                          className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-[#D291BC] hover:text-[#c17ba6] transition-colors"
                        >
                          <IconDownload className="w-4 h-4 sm:w-5 sm:h-5" />
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

        {/* Back to Top Button */}
        <BackToTopButton />

        {/* Mobile-only Upload Button */}
        <div className="md:hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-20 right-4 z-[60]"
          >
            <Link
              href="/main/gallery/upload"
              className="bg-gradient-to-r from-[#D291BC] to-[#c17ba6] text-white w-14 h-14 rounded-full shadow-2xl shadow-[#D291BC]/25 flex items-center justify-center hover:shadow-3xl transition-all duration-300 border-2 border-white/20"
              title="Unggah Foto"
            >
              <IconCamera className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>

        {/* Modal Overlay - Improved for mobile */}
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setSelectedId(null)}
          />
        )}

        {/* Empty State - Enhanced with modern design */}
        {filteredPhotos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 sm:py-12 bg-white/40 backdrop-blur-sm rounded-3xl border border-[#FFE3EC]/30 mx-2"
          >
            <EmptyStateIllustration />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm sm:text-base text-[#D291BC]/70 px-4 mb-6 max-w-md mx-auto leading-relaxed"
            >
              {selectedWeek
                ? `Belum ada foto untuk minggu ke-${selectedWeek}. Tambahkan foto pertamamu dan abadikan momen spesial! ✨`
                : selectedTrimester !== null
                ? `Belum ada foto untuk ${weekRanges[selectedTrimester].label}. Mulai dokumentasikan perjalanan indahmu! 💖`
                : "Belum ada foto yang diunggah. Mulai dokumentasikan perjalanan kehamilanmu yang penuh makna! 🌸"}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="/main/gallery/upload"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D291BC] to-[#c17ba6] text-white px-8 py-3 rounded-2xl hover:shadow-lg hover:shadow-[#D291BC]/25 transition-all duration-200 transform hover:scale-105 font-medium"
              >
                <IconSparkles className="w-5 h-5" />
                <span>Unggah Foto Pertama</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
