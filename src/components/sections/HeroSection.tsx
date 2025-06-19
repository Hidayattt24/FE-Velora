"use client";

import Image from "next/image";

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-b from-[#FFE3EC] to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          <Image
            src="/landing/logononame.svg"
            alt="Velora Logo"
            width={160}
            height={160}
            priority
            className="mb-4"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 text-[#D291BC]">
            Buku KIA Digital
          </h1>
          <p className="text-lg md:text-xl text-center text-gray-600 max-w-2xl mx-auto">
            Platform digital interaktif untuk memantau dan mendampingi perjalanan kehamilan Anda
          </p>
        </div>
      </div>
    </section>
  );
} 