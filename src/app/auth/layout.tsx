"use client";

import { Navbar } from "@/components/Navbar";
import { PublicRoute } from "@/components/auth/ProtectedRoute";
import {
  IconHome,
  IconUser,
  IconMessage,
  IconPhone,
  IconLogout,
} from "@tabler/icons-react";

const authNavigationItems = [
  {
    title: "Beranda",
    href: "/",
    icon: <IconHome className="h-full w-full text-[#D291BC]" />,
  },
  {
    title: "Profil",
    href: "/profile",
    icon: <IconUser className="h-full w-full text-[#D291BC]" />,
  },
  {
    title: "Pesan",
    href: "/messages",
    icon: <IconMessage className="h-full w-full text-[#D291BC]" />,
  },
  {
    title: "Kontak",
    href: "/contact",
    icon: <IconPhone className="h-full w-full text-[#D291BC]" />,
  },
  {
    title: "Keluar",
    href: "/logout",
    icon: <IconLogout className="h-full w-full text-[#D291BC]" />,
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicRoute>
      <div className="min-h-screen bg-[#FFF5F7]">
        <Navbar items={authNavigationItems} />
        <main className="pt-16 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
    </PublicRoute>
  );
}
