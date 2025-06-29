"use client";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export function ContactSection() {
  const siteMapLinks = [
    {
      title: "Navigasi",
      links: [
        { name: "Beranda", href: "/" },
        { name: "Fitur Unggulan", href: "/#features" },
        { name: "Testimoni", href: "/#testimonials" },
        { name: "Artikel & Tips", href: "/articles" },
        { name: "Tentang Kami", href: "/about" },
        { name: "Hubungi Kami", href: "/contact" },
        { name: "Portal Bunda", href: "/portal" },
      ],
    },
    {
      title: "Informasi Legal",
      links: [
        { name: "Kebijakan Privasi", href: "/privacy" },
        { name: "Syarat & Ketentuan", href: "/terms" },
        { name: "FAQ", href: "/faq" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <IconBrandX className="w-5 h-5" />, href: "https://x.com/velora" },
    {
      icon: <IconBrandLinkedin className="w-5 h-5" />,
      href: "https://linkedin.com/company/velora",
    },
    {
      icon: <IconBrandInstagram className="w-5 h-5" />,
      href: "https://instagram.com/velora",
    },
    {
      icon: <IconBrandFacebook className="w-5 h-5" />,
      href: "https://facebook.com/velora",
    },
  ];

  return (
    <footer id="contact" className="relative bg-[#D291BC] scroll-mt-20">
      {/* Top gradient for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent"></div>

      <div className="relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12">
            {/* Logo and Description */}
            <div className="sm:col-span-2 md:col-span-5">
              <Image
                src="/landing/logowithname.svg"
                alt="Velora Logo"
                width={180}
                height={50}
                className="mb-4 sm:mb-6 h-10 sm:h-12 w-auto"
              />
              <p className="text-xs sm:text-sm text-white/90 max-w-md leading-relaxed">
                Velora hadir untuk mendampingi perjalanan kehamilan Anda dengan
                teknologi modern dan fitur-fitur inovatif, memastikan setiap
                momen berharga dapat terpantau dengan baik.
              </p>
              <div className="flex space-x-3 sm:space-x-4 mt-6 sm:mt-8">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Site Map and Legal Links */}
            {siteMapLinks.map((section) => (
              <div key={section.title} className="md:col-span-3 md:ml-8">
                <h3 className="text-white font-medium mb-4 sm:mb-6 text-base sm:text-lg">
                  {section.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/80 hover:text-[#FFE3EC] transition-colors text-xs sm:text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Back to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-8 sm:mt-12 inline-flex items-center border border-white/20 px-3 sm:px-4 py-2 text-xs sm:text-sm text-white 
                     hover:bg-white/10 transition-colors rounded-lg group touch-manipulation"
          >
            <svg
              className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            KEMBALI KE ATAS
          </button>

          {/* Copyright */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20">
            <p className="text-xs sm:text-sm text-white/80">
              Copyright © {new Date().getFullYear()} Velora. Hak Cipta
              Dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
