"use client";

import Image from "next/image";
import { 
  IconHome2, 
  IconInfoCircle,
  IconHeartHandshake,
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
    title: "Beranda",
    href: "#home",
    icon: <IconHome2 className="h-full w-full text-[#D291BC]" />,
  },
  {
    title: "Tentang",
    href: "#about",
    icon: <IconInfoCircle className="h-full w-full text-[#D291BC]" />,
  },
  {
    title: "Layanan",
    href: "#services",
    icon: <IconHeartHandshake className="h-full w-full text-[#D291BC]" />,
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
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Ukuran disesuaikan: lebih kecil di default, lebih smooth scaling
  const widthTransform = useTransform(distance, [-150, 0, 150], [44, 56, 44]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [44, 56, 44]);
  const scaleTransform = useTransform(distance, [-150, 0, 150], [0.9, 1.05, 0.9]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  });

  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  });

  const scale = useSpring(scaleTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  });

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height, scale }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-[#FFE3EC] hover:shadow-md transition-all duration-300"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
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
            </motion.div>
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
  const [open, setOpen] = useState(false);
  
  return (
    <div className="relative block md:hidden">
      <div className="flex items-center justify-between">
        <Image
          src="/landing/logowithname.svg"
          alt="Velora Logo"
          width={100}
          height={32}
          priority
          className="h-8 w-auto"
        />
        {/* Mobile button disesuaikan */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-[#FFE3EC] hover:shadow-md transition-all duration-300"
        >
          <IconLayoutNavbarCollapse className="h-5 w-5 text-[#D291BC]" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 flex flex-col gap-2 items-end"
          >
            {navigationItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.9,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ 
                  delay: (navigationItems.length - 1 - idx) * 0.05,
                  type: "spring",
                  stiffness: 150,
                  damping: 15
                }}
              >
                <a
                  href={item.href}
                  className="group flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-[#FFE3EC] hover:shadow-md transition-all duration-300"
                >
                  <div className="h-5 w-5 transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                </a>
              </motion.div>
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
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <MobileNav />
        <DesktopNav />
      </div>
    </header>
  );
}