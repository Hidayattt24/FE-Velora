"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconPlus, IconCalendarEvent, IconX, IconDownload, IconArrowUp, IconTrash, IconClock, IconCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import { cn } from "@/lib/utils";

// Dummy data for demonstration
const photos = [
  {
    id: 1,
    title: "Minggu ke-12",
    week: 12,
    date: "12 Maret 2024",
    imageUrl: "/main/gallery/gallery.jpg",
    notes: "Pertama kali merasakan gerakan bayi!"
  },
  {
    id: 2,
    title: "Minggu ke-16",
    week: 16,
    date: "9 April 2024",
    imageUrl: "/main/gallery/gallery.jpg",
    notes: "Baby bump mulai terlihat"
  },
  {
    id: 3,
    title: "Minggu ke-20",
    week: 20,
    date: "7 Mei 2024",
    imageUrl: "/main/gallery/gallery.jpg",
    notes: "USG menunjukkan jenis kelamin bayi"
  },
  {
    id: 4,
    title: "Minggu ke-24",
    week: 24,
    date: "4 Juni 2024",
    imageUrl: "/main/gallery/gallery.jpg",
    notes: "Perut semakin membesar"
  },
];

const weekRanges = [
  { label: "Trimester 1", range: [1, 12] },
  { label: "Trimester 2", range: [13, 27] },
  { label: "Trimester 3", range: [28, 40] }
];

// Function to handle image download
const handleDownload = async (imageUrl: string, title: string) => {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    
    // Set the download filename
    const filename = `${title.replace(/\s+/g, '_').toLowerCase()}.jpg`;
    link.download = filename;
    
    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error downloading image:', error);
    alert('Gagal mengunduh gambar. Silakan coba lagi.');
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
          { cx: 260, cy: 240, delay: 1.8 }
        ].map((heart, index) => (
          <motion.path
            key={index}
            d={`M${heart.cx-10},${heart.cy} a5,5 0 0,1 10,0 a5,5 0 0,1 10,0 q0,10 -10,15 q-10,-5 -10,-15`}
            fill="#D291BC"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 1, 1],
              y: [0, -20, 0]
            }}
            transition={{
              delay: heart.delay,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
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
              damping: 20
            }
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
              damping: 10
            }
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
  const [selectedTrimester, setSelectedTrimester] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

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
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Profile Section - Simplified */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden">
            <img
              src="/main/gallery/photo-profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-base sm:text-lg text-[#D291BC] mb-1">
              Hi mom, <span className="font-medium">Sarah Johnson</span>! 👋
            </p>
            <h2 className="text-lg sm:text-xl font-semibold text-[#D291BC]">
              @sarahmommy
            </h2>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-[#D291BC]">
            <IconClock className="w-4 h-4" />
            <time className="text-sm">
              {currentTime.toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className="text-sm text-[#D291BC] mt-1">
            {currentTime.toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>

      {/* Centered Header Section - Optimized for mobile */}
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#D291BC] mb-1 sm:mb-2">
          Galeri Perjalanan Kehamilan
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-4 sm:mb-6">
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
                  { length: weekRanges[selectedTrimester].range[1] - weekRanges[selectedTrimester].range[0] + 1 },
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
                selectedId === photo.id ? "fixed inset-0 sm:inset-4 z-50 m-auto max-w-4xl h-fit" : "relative"
              )}
              initial={selectedId === photo.id ? { opacity: 0, scale: 0.8 } : undefined}
              animate={selectedId === photo.id ? { opacity: 1, scale: 1 } : undefined}
              exit={selectedId === photo.id ? { opacity: 0, scale: 0.8 } : undefined}
              transition={{ duration: 0.3 }}
            >
              <div className={cn(
                "relative",
                selectedId === photo.id ? "aspect-video" : "aspect-square sm:aspect-[4/3]"
              )}>
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
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {showDeleteConfirm === photo.id ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1"
                      >
                        <button
                          onClick={(e) => confirmDelete(photo.id, e)}
                          className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors"
                        >
                          <IconCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelDelete}
                          className="p-2 bg-gray-500 hover:bg-gray-600 rounded-full text-white backdrop-blur-sm transition-colors"
                        >
                          <IconX className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={(e) => handleDelete(photo.id, e)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-white backdrop-blur-sm transition-colors"
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
                  selectedId === photo.id ? "space-y-4" : "space-y-1 sm:space-y-2"
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
                    <p className="text-sm sm:text-base text-gray-600">{photo.notes}</p>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleDownload(photo.imageUrl, photo.title)}
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
            className="bg-[#D291BC] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-[#c17ba6] transition-colors"
            title="Unggah Foto"
          >
            <IconPlus className="w-5 h-5 sm:w-6 sm:h-6" />
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
      {filteredPhotos.length === 0 && (
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
              : "Belum ada foto yang diunggah. Mulai dokumentasikan perjalanan kehamilanmu!"
            }
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6"
          >
            <Link
              href="/main/gallery/upload"
              className="inline-flex items-center gap-2 bg-[#D291BC] text-white px-6 py-2.5 rounded-xl hover:bg-[#c17ba6] transition-colors"
            >
              <IconPlus className="w-5 h-5" />
              <span>Unggah Foto Baru</span>
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
} 