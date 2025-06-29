"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  IconPlus,
  IconCalendarEvent,
  IconX,
  IconDownload,
  IconArrowUp,
  IconTrash,
  IconCheck,
  IconPhoto,
  IconCamera,
  IconSparkles,
  IconLoader,
  IconRefresh,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { ProfileHeader } from "@/components/ui/profile-header";
import { galleryApi, Photo } from "@/lib/api/gallery";
import { useVeloraNotification } from "@/lib/hooks/useVeloraNotification";

interface PhotoDisplay {
  id: string;
  title: string;
  week: number;
  date: string;
  imageUrl: string;
  notes: string;
}

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedTrimester, setSelectedTrimester] = useState<number | null>(
    null
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [photos, setPhotos] = useState<PhotoDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const {
    notifyGalleryAction,
    notifyDataError,
    showLoading,
    hideLoading,
    notifyDeleteConfirm,
    notifySuccess,
    notifyError,
  } = useVeloraNotification();

  useOutsideClick(cardRef, () => {
    setSelectedId(null);
  });

  // Function to convert backend Photo to PhotoDisplay
  const convertToPhotoDisplay = (photo: Photo): PhotoDisplay => {
    const createdDate = new Date(photo.created_at);
    const formattedDate = createdDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Convert relative image URL to full URL
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const imageUrl = photo.image_url.startsWith("http")
      ? photo.image_url
      : `${API_BASE_URL}${photo.image_url}`;

    return {
      id: photo.id,
      title: photo.title || `Minggu ke-${photo.pregnancy_week || "Unknown"}`,
      week: photo.pregnancy_week || 0,
      date: formattedDate,
      imageUrl: imageUrl,
      notes: photo.description || "Tidak ada catatan",
    };
  };

  // Fetch photos from backend
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await galleryApi.getPhotos();

        if (response.success && response.data.photos) {
          const convertedPhotos = response.data.photos.map(
            convertToPhotoDisplay
          );
          setPhotos(convertedPhotos);
        } else {
          setPhotos([]);
        }
      } catch (err) {
        console.error("Error fetching photos:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Gagal memuat foto";
        setError(errorMessage);
        notifyDataError("memuat galeri foto");
        setPhotos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []); // Remove notifyDataError from dependencies

  // Listen for page visibility changes to refresh when user comes back from upload
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Refetch photos when page becomes visible
        const fetchPhotos = async () => {
          try {
            const response = await galleryApi.getPhotos();
            if (response.success && response.data.photos) {
              const convertedPhotos = response.data.photos.map(
                convertToPhotoDisplay
              );
              setPhotos(convertedPhotos);
            }
          } catch (err) {
            console.error("Error refreshing photos:", err);
          }
        };
        fetchPhotos();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

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

  const handleDelete = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    notifyDeleteConfirm("foto");
    setShowDeleteConfirm(photoId);
  };

  const confirmDelete = async (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const loadingToast = showLoading("Menghapus foto...");

    try {
      await galleryApi.deletePhoto(photoId);
      // Remove photo from local state
      setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
      setShowDeleteConfirm(null);
      hideLoading(loadingToast);
      notifyGalleryAction("delete", true);
    } catch (err) {
      hideLoading(loadingToast);
      console.error("Error deleting photo:", err);
      notifyGalleryAction("delete", false);
    }
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(null);
  };

  const handleRefresh = async () => {
    const loadingToast = showLoading("Memperbarui galeri...");

    try {
      setIsLoading(true);
      setError(null);
      const response = await galleryApi.getPhotos();

      if (response.success && response.data.photos) {
        const convertedPhotos = response.data.photos.map(convertToPhotoDisplay);
        setPhotos(convertedPhotos);
        hideLoading(loadingToast);
        notifySuccess("Galeri berhasil diperbarui! 🔄", 2000);
      } else {
        setPhotos([]);
        hideLoading(loadingToast);
        notifyError("Tidak ada foto ditemukan");
      }
    } catch (err) {
      hideLoading(loadingToast);
      console.error("Error refreshing photos:", err);
      setError(err instanceof Error ? err.message : "Gagal memperbarui foto");
      notifyDataError("memperbarui galeri");
    } finally {
      setIsLoading(false);
    }
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

        {/* Enhanced Header Section - Optimized for mobile */}
        <div className="text-center mb-4 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4"
          >
            <div className="p-2 sm:p-3 bg-gradient-to-r from-[#D291BC] to-[#c17ba6] rounded-xl sm:rounded-2xl shadow-lg">
              <IconPhoto className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#D291BC] to-[#c17ba6] bg-clip-text text-transparent">
              Galeri Perjalanan Kehamilan
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-[#D291BC]/70 mb-4 sm:mb-6 max-w-md mx-auto leading-relaxed px-4"
          >
            Dokumentasi visual perjalanan kehamilanmu yang penuh makna
          </motion.p>
          {/* Desktop Upload Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center justify-center gap-3"
          >
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-white text-[#D291BC] border border-[#D291BC] px-4 py-2 rounded-xl hover:bg-[#FFE3EC]/10 transition-all duration-200 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconRefresh
                className={cn("w-4 h-4", isLoading && "animate-spin")}
              />
              <span>Refresh</span>
            </button>
            <Link
              href="/main/gallery/upload"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D291BC] to-[#c17ba6] text-white px-6 py-3 rounded-2xl hover:shadow-lg hover:shadow-[#D291BC]/25 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              <IconPlus className="w-5 h-5" />
              <span>Unggah Foto Baru</span>
            </Link>
          </motion.div>
        </div>

        {/* Centered Filter Section - Improved mobile scrolling */}
        <div className="mb-6 sm:mb-8 -mx-2 sm:mx-0">
          <div className="relative flex flex-col items-center">
            <div className="flex gap-2 mb-3 sm:mb-4 overflow-x-auto pb-2 px-2 sm:px-0 scrollbar-hide snap-x snap-mandatory w-full sm:w-fit sm:mx-auto sm:after:content-[''] sm:after:h-[2px] sm:after:bg-[#D291BC]/5 sm:after:absolute sm:after:bottom-[6px] sm:after:left-0 sm:after:right-0 sm:after:-z-10">
              <div className="absolute bottom-[6px] left-0 w-8 bg-gradient-to-r from-white to-transparent h-2 z-10" />
              <div className="absolute bottom-[6px] right-0 w-8 bg-gradient-to-l from-white to-transparent h-2 z-10" />
              <button
                onClick={() => {
                  setSelectedWeek(null);
                  setSelectedTrimester(null);
                }}
                className={cn(
                  "px-4 py-2 rounded-xl whitespace-nowrap transition-colors snap-start flex-shrink-0 relative",
                  !selectedWeek && selectedTrimester === null
                    ? "bg-[#D291BC] text-white after:absolute after:bottom-[-6px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-[2px] after:bg-[#D291BC]"
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
                    "px-4 py-2 rounded-xl whitespace-nowrap transition-colors snap-start flex-shrink-0 relative",
                    selectedTrimester === index
                      ? "bg-[#D291BC] text-white after:absolute after:bottom-[-6px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-[2px] after:bg-[#D291BC]"
                      : "bg-white text-[#D291BC] border border-[#D291BC]/20 hover:bg-[#FFE3EC]/10"
                  )}
                >
                  {trimester.label}
                </button>
              ))}
            </div>

            {selectedTrimester !== null && (
              <div className="relative flex gap-2 overflow-x-auto pb-2 px-2 sm:px-0 scrollbar-hide snap-x snap-mandatory w-full sm:w-fit sm:mx-auto sm:after:content-[''] sm:after:h-[2px] sm:after:bg-[#D291BC]/5 sm:after:absolute sm:after:bottom-[6px] sm:after:left-0 sm:after:right-0 sm:after:-z-10 sm:max-w-3xl">
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
                    <button
                      key={`week-${week}`}
                      onClick={() => setSelectedWeek(week)}
                      className={cn(
                        "px-4 py-2 rounded-xl whitespace-nowrap transition-colors snap-start flex-shrink-0 relative sm:flex-shrink sm:w-[calc(20%-8px)]",
                        selectedWeek === week
                          ? "bg-[#FFE3EC] text-[#D291BC] font-medium after:absolute after:bottom-[-6px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-[2px] after:bg-[#D291BC]"
                          : "bg-white text-[#D291BC] border border-[#D291BC]/20 hover:bg-[#FFE3EC]/10"
                      )}
                    >
                      Minggu {week}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Grid - Optimized for mobile */}
        {isLoading ? (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <IconLoader className="w-8 h-8 text-[#D291BC] animate-spin" />
              <p className="text-[#D291BC]/70">Memuat foto...</p>
            </motion.div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="p-4 bg-red-100 rounded-full">
                <IconX className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-red-600 font-medium">Gagal memuat foto</p>
              <p className="text-gray-500 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-4 py-2 bg-[#D291BC] text-white rounded-lg hover:bg-[#c17ba6] transition-colors"
              >
                Coba Lagi
              </button>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            <AnimatePresence>
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  ref={selectedId === photo.id ? cardRef : null}
                  layoutId={`card-${photo.id}`}
                  onClick={() => setSelectedId(photo.id)}
                  className={cn(
                    "bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden cursor-pointer group",
                    selectedId === photo.id
                      ? "fixed inset-0 sm:inset-4 z-50 m-auto max-w-4xl h-fit"
                      : "relative"
                  )}
                  initial={
                    selectedId === photo.id
                      ? { opacity: 0, scale: 0.8 }
                      : undefined
                  }
                  animate={
                    selectedId === photo.id
                      ? { opacity: 1, scale: 1 }
                      : undefined
                  }
                  exit={
                    selectedId === photo.id
                      ? { opacity: 0, scale: 0.8 }
                      : undefined
                  }
                  transition={{ duration: 0.3 }}
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
                      <div className="absolute top-2 right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        {showDeleteConfirm === photo.id ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-1"
                          >
                            <button
                              onClick={(e) => confirmDelete(photo.id, e)}
                              className="p-1.5 sm:p-2 bg-red-500 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors shadow-lg"
                            >
                              <IconCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={cancelDelete}
                              className="p-1.5 sm:p-2 bg-gray-500 hover:bg-gray-600 rounded-full text-white backdrop-blur-sm transition-colors shadow-lg"
                            >
                              <IconX className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </motion.div>
                        ) : (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={(e) => handleDelete(photo.id, e)}
                            className="p-1.5 sm:p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white backdrop-blur-sm transition-colors shadow-lg"
                          >
                            <IconTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                          </motion.button>
                        )}
                      </div>
                    )}
                  </div>
                  <motion.div
                    className={cn(
                      "p-2 sm:p-3 md:p-6",
                      selectedId === photo.id
                        ? "space-y-4"
                        : "space-y-1 sm:space-y-2"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#D291BC] line-clamp-1">
                        {photo.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                        <IconCalendarEvent className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="text-xs sm:text-sm">{photo.date}</span>
                      </div>
                    </div>

                    {selectedId === photo.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="space-y-3 sm:space-y-4"
                      >
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {photo.notes}
                        </p>
                        <div className="flex justify-end">
                          <button
                            onClick={() =>
                              handleDownload(photo.imageUrl, photo.title)
                            }
                            className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-[#D291BC] hover:text-[#c17ba6] transition-colors bg-[#FFE3EC]/50 hover:bg-[#FFE3EC] px-3 py-2 rounded-full"
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
        )}

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

        {/* Empty State - Now with illustration */}
        {!isLoading && !error && filteredPhotos.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <EmptyStateIllustration />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm sm:text-base text-gray-500 px-4"
            >
              {selectedWeek
                ? `Belum ada foto untuk minggu ke-${selectedWeek}. Tambahkan foto pertamamu!`
                : selectedTrimester !== null
                ? `Belum ada foto untuk ${weekRanges[selectedTrimester].label}. Tambahkan foto pertamamu!`
                : "Belum ada foto yang diunggah. Mulai dokumentasikan perjalanan kehamilanmu!"}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6"
            >
              <Link
                href="/main/gallery/upload"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D291BC] to-[#c17ba6] text-white px-6 py-3 rounded-2xl hover:shadow-lg hover:shadow-[#D291BC]/25 transition-all duration-200 transform hover:scale-105 font-medium"
              >
                <IconSparkles className="w-5 h-5" />
                <span>Unggah Foto Pertama</span>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
