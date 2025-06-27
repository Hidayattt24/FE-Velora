"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { IconCheck, IconX, IconLoader2 } from "@tabler/icons-react";

interface StatefulButtonProps {
  children: ReactNode;
  onClick?: () => void;
  onSubmit?: () => Promise<void>;
  className?: string;
  disabled?: boolean;
}

export function StatefulButton({
  children,
  onClick,
  onSubmit,
  className = "",
  disabled = false,
}: StatefulButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleClick = async () => {
    if (disabled || state === "loading") return;

    if (onSubmit) {
      setState("loading");
      try {
        await onSubmit();
        setState("success");
        setTimeout(() => setState("idle"), 2000);
      } catch (error) {
        setState("error");
        setTimeout(() => setState("idle"), 2000);
      }
    } else if (onClick) {
      onClick();
    }
  };

  const getButtonContent = () => {
    switch (state) {
      case "loading":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <IconLoader2 className="w-5 h-5 animate-spin" />
            Menyimpan...
          </motion.div>
        );
      case "success":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-green-600"
          >
            <IconCheck className="w-5 h-5" />
            Tersimpan!
          </motion.div>
        );
      case "error":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-red-600"
          >
            <IconX className="w-5 h-5" />
            Gagal!
          </motion.div>
        );
      default:
        return children;
    }
  };

  const getButtonStyles = () => {
    const baseStyles =
      "relative px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50";

    switch (state) {
      case "loading":
        return `${baseStyles} bg-pink-400 text-white cursor-not-allowed`;
      case "success":
        return `${baseStyles} bg-green-100 text-green-600 cursor-not-allowed`;
      case "error":
        return `${baseStyles} bg-red-100 text-red-600 cursor-not-allowed`;
      default:
        return `${baseStyles} bg-[#D291BC] text-white hover:bg-[#C481AC] active:scale-[0.98] ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`;
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || state === "loading"}
      className={`${getButtonStyles()} ${className}`}
      whileTap={state === "idle" && !disabled ? { scale: 0.95 } : {}}
    >
      {getButtonContent()}
    </motion.button>
  );
}
