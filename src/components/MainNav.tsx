"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MainNavProps {
  items: {
    label: string;
    icon: React.ReactNode;
    href: string;
  }[];
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // if scroll down hide the navbar
          setShow(false);
        } else { // if scroll up show the navbar
          setShow(true);
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <motion.div 
      className={cn(
        "fixed z-50 w-full transition-transform duration-300",
        isMobile ? "bottom-0" : "bottom-8",
        !show && "translate-y-full"
      )}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
    >
      <div className={cn(
        "mx-auto",
        isMobile ? "w-full" : "max-w-fit px-8"
      )}>
        <nav className={cn(
          "flex items-center justify-around bg-white/90 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out",
          isMobile ? (
            "w-full px-2 py-2 border-t border-[#D291BC]/20"
          ) : (
            "gap-4 rounded-full border border-[#D291BC]/20 p-3 mx-auto max-w-fit"
          )
        )}>
          {items.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center transition-all duration-200",
                  isMobile ? (
                    "h-14 w-16 hover:rounded-xl group"
                  ) : (
                    "h-16 w-16 rounded-full"
                  ),
                  isActive ? "text-[#D291BC]" : "text-[#D291BC]/60 hover:text-[#D291BC]/80"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="bubble"
                    className={cn(
                      "absolute inset-0 bg-[#FFE3EC]/50",
                      isMobile ? (
                        "group-hover:rounded-xl transition-all duration-200"
                      ) : (
                        "rounded-full"
                      )
                    )}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative">{item.icon}</span>
                <span className={cn(
                  "text-[10px] mt-1 font-medium transition-opacity duration-200",
                  isActive ? "text-[#D291BC]" : "text-[#D291BC]/60"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
} 