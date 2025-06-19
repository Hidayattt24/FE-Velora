"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

interface Tip {
  title: string
  description: string
  image?: string
}

interface LoadingCarouselProps {
  tips?: Tip[]
  autoplayInterval?: number
  showNavigation?: boolean
  showIndicators?: boolean
  showProgress?: boolean
  aspectRatio?: "video" | "square" | "wide"
  textPosition?: "top" | "bottom"
  onTipChange?: (index: number) => void
  backgroundTips?: boolean
  backgroundGradient?: boolean
  shuffleTips?: boolean
}

const defaultTips: Tip[] = [
  {
    title: "Galeri Perjalanan Kehamilan",
    description: "Abadikan dan dokumentasikan setiap momen berharga dalam perjalanan kehamilan Anda dengan galeri digital yang terorganisir.",
    image: "/landing/gallery.png"
  },
  {
    title: "Linimasa Kehamilan Interaktif",
    description: "Pantau perkembangan kehamilan Anda minggu demi minggu dengan linimasa interaktif yang informatif dan mudah dipahami.",
    image: "/landing/timeline.png"
  },
  {
    title: "Kalkulator & Pelacak Kehamilan",
    description: "Hitung dan lacak perkembangan kehamilan Anda dengan alat yang akurat dan mudah digunakan.",
    image: "/landing/calculator.png"
  },
  {
    title: "Jurnal & Pemantauan Mandiri Digital",
    description: "Catat dan pantau kondisi kesehatan Anda secara digital dengan jurnal yang terstruktur dan mudah diakses.",
    image: "/landing/journal.png"
  }
]

export function LoadingCarousel({
  tips = defaultTips,
  autoplayInterval = 4000,
  showNavigation = false,
  showIndicators = true,
  showProgress = true,
  aspectRatio = "wide",
  textPosition = "bottom",
  onTipChange,
  backgroundTips = false,
  backgroundGradient = false,
  shuffleTips = false,
}: LoadingCarouselProps) {
  const [currentTip, setCurrentTip] = useState(0)
  const [progress, setProgress] = useState(0)
  const [displayedTips, setDisplayedTips] = useState(tips)

  useEffect(() => {
    if (shuffleTips) {
      setDisplayedTips([...tips].sort(() => Math.random() - 0.5))
    } else {
      setDisplayedTips(tips)
    }
  }, [tips, shuffleTips])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % displayedTips.length)
    }, autoplayInterval)

    return () => clearInterval(interval)
  }, [autoplayInterval, displayedTips.length])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + (100 / (autoplayInterval / 100))
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [autoplayInterval])

  useEffect(() => {
    if (onTipChange) {
      onTipChange(currentTip)
    }
  }, [currentTip, onTipChange])

  const handlePrevious = () => {
    setCurrentTip((prev) => (prev - 1 + displayedTips.length) % displayedTips.length)
    setProgress(0)
  }

  const handleNext = () => {
    setCurrentTip((prev) => (prev + 1) % displayedTips.length)
    setProgress(0)
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className={cn(
          "relative",
          aspectRatio === "square" && "aspect-square",
          aspectRatio === "video" && "aspect-video",
          aspectRatio === "wide" && "aspect-[2/1]"
        )}
      >
        {/* Background Gradient */}
        {backgroundGradient && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFE3EC]/20 to-white" />
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col"
          >
            <div
              className={cn(
                "flex flex-col flex-1 p-6",
                textPosition === "top" ? "justify-start" : "justify-end"
              )}
            >
              {/* Background Tips */}
              {backgroundTips && (
                <div className="absolute inset-0 flex items-center justify-center opacity-10 text-8xl font-bold text-[#D291BC]">
                  {currentTip + 1}
                </div>
              )}

              <div className="relative space-y-4">
                <h3 className="text-2xl font-bold text-[#D291BC]">
                  {displayedTips[currentTip].title}
                </h3>
                <p className="text-gray-600">
                  {displayedTips[currentTip].description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        {showProgress && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FFE3EC]">
            <motion.div
              className="h-full bg-[#D291BC]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}

        {/* Navigation */}
        {showNavigation && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-white/80 text-[#D291BC] hover:bg-white"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/80 text-[#D291BC] hover:bg-white"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex items-center justify-center gap-2">
            {displayedTips.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentTip(index)
                  setProgress(0)
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentTip === index
                    ? "bg-[#D291BC] w-4"
                    : "bg-[#FFE3EC]"
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 