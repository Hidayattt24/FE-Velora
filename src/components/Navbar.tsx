"use client";

import Image from "next/image";
import { 
  IconLayoutDashboard,
  IconStars,
  IconMessageCircle2,
  IconPhone,
  IconLogin,
  IconLayoutNavbarCollapse
} from "@tabler/icons-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    href: "#home",
    icon: <IconLayoutDashboard className="h-full w-full text-[#D291BC]" />,
  },
  {
    title: "Fitur",
    href: "#features",
    icon: <IconStars className="h-full w-full text-[#D291BC]" />,
  },
  {
    title: "Kata Mereka",
    href: "#testimonials",
    icon: <IconMessageCircle2 className="h-full w-full text-[#D291BC]" />,
  },
  {
    title: "Kontak",
    href: "#contact",
    icon: <IconPhone className="h-full w-full text-[#D291BC]" />,
  },
  {
    title: "Masuk",
    href: "/login",
    icon: <IconLogin className="h-full w-full text-[#D291BC]" />,
  },
];

// Fungsi untuk smooth scroll
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  // Jika bukan link internal (#), biarkan default behavior
  if (!href.startsWith('#')) return;

  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    const offset = 80; // Offset untuk navbar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-100, 0, 100], [40, 60, 40]);
  let heightSync = useTransform(distance, [-100, 0, 100], [40, 60, 40]);
  let scaleSync = useTransform(distance, [-100, 0, 100], [0.9, 1.1, 0.9]);

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  
  let height = useSpring(heightSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let scale = useSpring(scaleSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} onClick={(e) => scrollToSection(e, href)}>
      <motion.div
        ref={ref}
        style={{ width, height, scale }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-[#FFE3EC] hover:shadow-md transition-all duration-300"
      >
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, y: 8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="absolute -bottom-8 left-1/2 whitespace-pre rounded-md border border-[#FFE3EC] bg-white/95 px-2 py-0.5 text-xs text-[#D291BC] shadow-sm backdrop-blur-sm"
            >
              {title}
            </motion.span>
          )}
        </AnimatePresence>
        <motion.div
          className="flex h-5 w-5 items-center justify-center transition-transform duration-300 hover:scale-110"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative block md:hidden">
      <div className="flex items-center gap-4">
        <Image
          src="/landing/logowithname.svg"
          alt="Velora Logo"
          width={110}
          height={66}
          className="h-[42px] w-auto"
          priority
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-[#FFE3EC] hover:shadow-md transition-all duration-300"
        >
          <IconLayoutNavbarCollapse className="h-5 w-5 text-[#D291BC]" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 flex flex-col gap-2"
          >
            {navigationItems.map((item, idx) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  scrollToSection(e, item.href);
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 rounded-lg bg-white/90 px-4 py-2 text-sm text-[#D291BC] shadow-sm hover:bg-[#FFE3EC] hover:shadow-md transition-all duration-300"
              >
                <span className="h-4 w-4">{item.icon}</span>
                {item.title}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DesktopNav() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="hidden md:flex items-center justify-center rounded-full bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm w-fit mx-auto"
    >
      <div className="flex items-center gap-6">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        >
          <Image
            src="/landing/logowithname.svg"
            alt="Velora Logo"
            width={110}
            height={66}
            className="h-[42px] w-auto transition-transform duration-300 hover:scale-105"
            priority
          />
        </motion.div>
        <div className="flex items-center gap-4">
          {navigationItems.map((item) => (
            <IconContainer
              key={item.href}
              mouseX={mouseX}
              {...item}
            />
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

export function Navbar() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <MobileNav />
      <DesktopNav />
    </header>
  );
}