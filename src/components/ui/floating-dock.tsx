"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import Image from "next/image";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  logo,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  logo: string;
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  // Split items into two groups for the layout
  const leftItems = items.slice(0, Math.ceil(items.length / 2));
  const rightItems = items.slice(Math.ceil(items.length / 2));

  return (
    <>
      <FloatingDockDesktop 
        leftItems={leftItems} 
        rightItems={rightItems} 
        logo={logo}
        className={desktopClassName} 
      />
      <FloatingDockMobile items={items} logo={logo} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  logo,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  logo: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <div className="flex items-center gap-4">
        <Image
          src={logo}
          alt="Logo"
          width={100}
          height={32}
          priority
          className="h-8 w-auto"
        />
        {/* Mobile button ukuran disesuaikan */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-[#FFE3EC] hover:shadow-md transition-all duration-300"
        >
          <IconLayoutNavbarCollapse className="h-4 w-4 text-[#D291BC]" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute right-0 top-full mt-2 flex flex-col gap-1.5 items-end"
          >
            {items.map((item, idx) => (
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
                  delay: (items.length - 1 - idx) * 0.05,
                  type: "spring",
                  stiffness: 150,
                  damping: 15
                }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  className="group flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-[#FFE3EC] hover:shadow-md transition-all duration-300"
                >
                  <div className="h-4 w-4 transition-transform duration-300 group-hover:scale-110">
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
};

const FloatingDockDesktop = ({
  leftItems,
  rightItems,
  logo,
  className,
}: {
  leftItems: { title: string; icon: React.ReactNode; href: string }[];
  rightItems: { title: string; icon: React.ReactNode; href: string }[];
  logo: string;
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-10 items-center gap-3 rounded-full px-3 md:flex bg-white/95 shadow-lg backdrop-blur-sm w-fit",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {leftItems.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </div>

      <Image
        src={logo}
        alt="Logo"
        width={100}
        height={32}
        priority
        className="h-6 w-auto transition-transform duration-300 hover:scale-105 mx-2"
      />

      <div className="flex items-center gap-3">
        {rightItems.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </div>
    </motion.div>
  );
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

  // Ukuran disesuaikan: lebih proporsional dan smooth
  let widthTransform = useTransform(distance, [-100, 0, 100], [36, 48, 36]);
  let heightTransform = useTransform(distance, [-100, 0, 100], [36, 48, 36]);
  let scaleTransform = useTransform(distance, [-100, 0, 100], [0.9, 1.05, 0.9]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  });
  
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  });

  let scale = useSpring(scaleTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  });

  const [hovered, setHovered] = useState(false);

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
              className="absolute -bottom-7 left-1/2 whitespace-pre rounded-md border border-[#FFE3EC] bg-white/95 px-2 py-0.5 text-xs text-[#D291BC] shadow-sm backdrop-blur-sm"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="flex h-4 w-4 items-center justify-center transition-transform duration-300 hover:scale-110"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}