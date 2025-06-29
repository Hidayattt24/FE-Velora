"use client";

import { cn } from "@/lib/utils";
import {
  IconPhoto,
  IconTimeline,
  IconStethoscope,
  IconNotebook,
  IconSettings,
  IconHeartFilled,
  IconUser,
  IconShield,
  IconCloudUpload,
  IconDeviceAnalytics,
  IconEdit,
  IconUserCheck,
} from "@tabler/icons-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Galeri Kehamilan",
      description:
        "Dokumentasikan momen-momen berharga kehamilan Anda dengan foto dan video yang tersimpan aman di cloud.",
      icon: <IconPhoto className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Linimasa Perkembangan",
      description:
        "Pantau perkembangan kehamilan minggu demi minggu dengan visualisasi timeline yang interaktif dan informatif.",
      icon: <IconTimeline className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Diagnosa & Konsultasi",
      description:
        "Dapatkan diagnosis awal dan saran kesehatan berdasarkan AI serta konsultasi dengan tenaga medis profesional.",
      icon: <IconStethoscope className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Jurnal Kehamilan",
      description:
        "Catat perjalanan emosional dan fisik kehamilan Anda dalam jurnal digital yang aman dan terorganisir.",
      icon: <IconNotebook className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Profil & Pengaturan",
      description:
        "Kelola informasi pribadi, preferensi aplikasi, dan pengaturan keamanan akun Anda dengan mudah.",
      icon: <IconSettings className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Pelacakan Kesehatan",
      description:
        "Monitor kondisi kesehatan harian dengan tracking berat badan, tekanan darah, dan vital signs lainnya.",
      icon: <IconHeartFilled className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Upload Foto Profil",
      description:
        "Upload dan ubah foto profil Anda dengan mudah, tersimpan aman di cloud storage untuk akses kapan saja.",
      icon: <IconUserCheck className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Edit Profil",
      description:
        "Kelola dan perbarui informasi pribadi, data kesehatan, dan preferensi akun Anda dengan mudah.",
      icon: <IconEdit className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Keamanan Data",
      description:
        "Data kesehatan Anda diamankan dengan enkripsi tingkat militer dan backup otomatis ke cloud.",
      icon: <IconShield className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Dashboard Profile",
      description:
        "Akses informasi profil dan ringkasan data kehamilan Anda dalam satu dashboard yang mudah dipahami.",
      icon: <IconDeviceAnalytics className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Upload ke Cloud",
      description:
        "Semua data dan file Anda otomatis tersinkronisasi ke cloud storage yang aman dan dapat diakses kapan saja.",
      icon: <IconCloudUpload className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Profil Kehamilan",
      description:
        "Simpan dan kelola data lengkap kehamilan Anda termasuk informasi perkembangan dan riwayat medis.",
      icon: <IconUser className="w-8 h-8 text-[#D291BC]" />,
    },
  ];

  return (
    <section
      id="features"
      className="min-h-screen py-12 sm:py-16 md:py-20 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D291BC]">
            Fitur Unggulan
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Velora menyediakan berbagai fitur lengkap untuk mendampingi
            perjalanan kehamilan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto gap-4 sm:gap-0">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:border-r py-6 sm:py-8 lg:py-10 relative group/feature bg-white sm:bg-transparent rounded-lg sm:rounded-none shadow-sm sm:shadow-none border sm:border-none border-[#FFE3EC]/30",
        "sm:border-[#FFE3EC]/30",
        (index === 0 || index === 4 || index === 8) && "sm:lg:border-l",
        index < 8 && "sm:lg:border-b"
      )}
    >
      {index < 8 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#FFE3EC]/20 to-transparent pointer-events-none" />
      )}
      {index >= 8 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#FFE3EC]/20 to-transparent pointer-events-none" />
      )}
      <div className="mb-3 sm:mb-4 relative z-10 px-4 sm:px-6 lg:px-10">
        {icon}
      </div>
      <div className="text-base sm:text-lg font-bold mb-2 relative z-10 px-4 sm:px-6 lg:px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#FFE3EC] group-hover/feature:bg-[#D291BC] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-gray-800">
          {title}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-gray-600 max-w-xs relative z-10 px-4 sm:px-6 lg:px-10 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
