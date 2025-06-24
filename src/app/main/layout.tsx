"use client";

import { MainNav } from "@/components/MainNav";
import { 
  IconPhoto,
  IconTimeline,
  IconStethoscope,
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
    label: "Diagnosa",
    icon: <IconStethoscope className="w-6 h-6" />,
    href: "/main/diagnosa"
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