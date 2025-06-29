"use client";

import { IconClock } from "@tabler/icons-react";
import { useAuth } from "@/lib/contexts/AuthContext";

export function ProfileHeader() {
  const { user, isLoading } = useAuth();

  // Format current date and time
  const now = new Date();
  const formattedDate = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Get first name from full name
  const firstName = user?.fullName?.split(" ")[0] || "Mom";

  // Use email instead of username
  const userEmail = user?.email || "user@example.com";

  return (
    <div className="relative mb-4">
      {/* Mobile Design (< 640px) */}
      <div className="sm:hidden px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <img
              src="/main/gallery/photo-profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-end text-[#D291BC]">
            <div className="flex items-center gap-1.5">
              <IconClock className="w-4 h-4" />
              <time className="text-sm font-medium">{formattedDate}</time>
            </div>
            <div className="text-sm mt-1">{formattedTime}</div>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-base text-[#D291BC]">
            Hi mom, <span className="font-medium">{firstName}</span>! 👋
          </p>
          <h2 className="text-lg font-semibold text-[#D291BC]">{userEmail}</h2>
        </div>
      </div>

      {/* Desktop Design (≥ 640px) */}
      <div className="hidden sm:flex items-center justify-between w-full px-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-105">
            <img
              src="/main/gallery/photo-profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xl text-[#D291BC] mb-2">
              Hi mom, <span className="font-medium">{firstName}</span>! 👋
            </p>
            <h2 className="text-2xl font-semibold text-[#D291BC]">
              {userEmail}
            </h2>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-[#D291BC]">
            <IconClock className="w-5 h-5" />
            <time className="text-lg">{formattedDate}</time>
          </div>
          <div className="text-lg text-[#D291BC] mt-2">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}
