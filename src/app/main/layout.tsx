"use client";

import { MainNav } from "@/components/MainNav";
import {
  IconPhoto,
  IconTimeline,
  IconCalculator,
  IconNotebook,
  IconSettings
} from "@tabler/icons-react";

const navigationItems = [
  {
    label: "Galeri",
    icon: <IconPhoto className="w-6 h-6" />,
    href: "/main/gallery"
  },
  {
    label: "Linimasa",
    icon: <IconTimeline className="w-6 h-6" />,
    href: "/main/timeline"
  },
  {
    label: "Kalkulator",
    icon: <IconCalculator className="w-6 h-6" />,
    href: "/main/calculator"
  },
  {
    label: "Jurnal",
    icon: <IconNotebook className="w-6 h-6" />,
    href: "/main/journal"
  },
  {
    label: "Profil",
    icon: <IconSettings className="w-6 h-6" />,
    href: "/main/profile"
  }
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFF5F7]">
      <main className="pb-24 md:pb-36">
        {children}
      </main>
      <MainNav items={navigationItems} />
    </div>
  );
} 