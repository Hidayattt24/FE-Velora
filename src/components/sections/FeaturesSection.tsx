"use client";

import { cn } from "@/lib/utils";
import {
  IconCalendarTime,
  IconHeartFilled,
  IconTimeline,
  IconNotes,
  IconApple,
  IconUsers,
  IconBellRinging,
  IconArticle,
  IconPhoto,
  IconChartLine,
  IconDashboard,
  IconDoorEnter,
  IconBabyCarriage,
  IconUserCircle,
  IconChecklist,
  IconCalendarStats,
  IconScale,
  IconPill,
  IconMoodHappy,
} from "@tabler/icons-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Unggah Foto Progres",
      description: "Dokumentasikan perjalanan kehamilan Anda dengan foto-foto perkembangan yang tersusun rapi dan mudah diakses.",
      icon: <IconPhoto className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Linimasa Visual Interaktif",
      description: "Visualisasi perjalanan kehamilan Anda dalam bentuk linimasa yang menarik dan informatif.",
      icon: <IconChartLine className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Dasbor Informasi Kunci",
      description: "Akses cepat ke informasi penting kehamilan Anda dalam satu tampilan yang mudah dipahami.",
      icon: <IconDashboard className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Pintu Gerbang Fitur",
      description: "Akses semua fitur penting Velora dengan mudah melalui satu halaman yang terorganisir.",
      icon: <IconDoorEnter className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Perkembangan Janin",
      description: "Pantau perkembangan janin Anda minggu demi minggu dengan informasi detail dan visualisasi interaktif.",
      icon: <IconBabyCarriage className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Info untuk Bunda",
      description: "Dapatkan informasi khusus untuk ibu hamil sesuai dengan tahap kehamilan Anda saat ini.",
      icon: <IconUserCircle className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Checklist & Anjuran",
      description: "Panduan lengkap hal-hal yang perlu dilakukan dan diperhatikan selama masa kehamilan.",
      icon: <IconChecklist className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Kalkulator HPL",
      description: "Hitung perkiraan tanggal kelahiran dan usia kehamilan Anda dengan akurat.",
      icon: <IconCalendarStats className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Pelacak Berat Badan",
      description: "Pantau dan catat perkembangan berat badan selama kehamilan dengan grafik yang informatif.",
      icon: <IconScale className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Pelacak TTD/Multivitamin",
      description: "Lacak konsumsi tablet tambah darah dan multivitamin dengan pengingat otomatis.",
      icon: <IconPill className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Jurnal Kesehatan Jiwa",
      description: "Catat dan pantau kondisi kesehatan mental Anda selama masa kehamilan.",
      icon: <IconMoodHappy className="w-8 h-8 text-[#D291BC]" />,
    },
    {
      title: "Artikel & Tips Kehamilan",
      description: "Akses informasi terpercaya seputar kehamilan dari para ahli untuk membantu perjalanan kehamilan Anda.",
      icon: <IconArticle className="w-8 h-8 text-[#D291BC]" />,
    },
  ];

  return (
    <section id="features" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#D291BC]">
            Fitur Unggulan
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Velora menyediakan berbagai fitur lengkap untuk mendampingi perjalanan kehamilan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
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
        "flex flex-col lg:border-r py-10 relative group/feature",
        "border-[#FFE3EC]/30",
        (index === 0 || index === 4 || index === 8) && "lg:border-l",
        index < 8 && "lg:border-b"
      )}
    >
      {index < 8 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#FFE3EC]/20 to-transparent pointer-events-none" />
      )}
      {index >= 8 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#FFE3EC]/20 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#FFE3EC] group-hover/feature:bg-[#D291BC] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-gray-800">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-600 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
}; 