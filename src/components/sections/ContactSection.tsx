"use client";

import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
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
    { icon: <IconBrandLinkedin className="w-5 h-5" />, href: "https://linkedin.com/company/velora" },
    { icon: <IconBrandInstagram className="w-5 h-5" />, href: "https://instagram.com/velora" },
    { icon: <IconBrandFacebook className="w-5 h-5" />, href: "https://facebook.com/velora" },
  ];

  return (
    <footer id="contact" className="relative bg-[#D291BC] scroll-mt-20">
      {/* Top gradient for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent"></div>
      
      <div className="relative pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Logo and Description */}
            <div className="md:col-span-5">
              <Image
                src="/landing/logowithname.svg"
                alt="Velora Logo"
                width={180}
                height={50}
                className="mb-6"
              />
              <p className="text-sm text-white/90 max-w-md leading-relaxed">
                Velora hadir untuk mendampingi perjalanan kehamilan Anda dengan teknologi modern 
                dan fitur-fitur inovatif, memastikan setiap momen berharga dapat terpantau dengan baik.
              </p>
              <div className="flex space-x-4 mt-8">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="text-white/80 hover:text-white transition-colors"
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
                <h3 className="text-white font-medium mb-6 text-lg">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/80 hover:text-[#FFE3EC] transition-colors text-sm"
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
            className="mt-12 inline-flex items-center border border-white/20 px-4 py-2 text-sm text-white 
                     hover:bg-white/10 transition-colors rounded-lg group"
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
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm text-white/80">
              Copyright © {new Date().getFullYear()} Velora. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 