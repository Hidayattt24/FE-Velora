"use client";

import Image from "next/image";
import { IconClock } from "@tabler/icons-react";

export function ProfileHeader() {
  return (
    <div className="flex items-center justify-between mb-8 w-full p-6">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden">
          <img
            src="/main/gallery/photo-profile.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-lg sm:text-xl text-[#D291BC] mb-2">
            Hi mom, <span className="font-medium">Sarah Johnson</span>! 👋
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#D291BC]">
            @sarahmommy
          </h2>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-2 text-[#D291BC]">
          <IconClock className="w-5 h-5" />
          <time className="text-base sm:text-lg">
            Selasa, 24 Juni 2025
          </time>
        </div>
        <div className="text-base sm:text-lg text-[#D291BC] mt-2">
          21:29
        </div>
      </div>
    </div>
  );
} 