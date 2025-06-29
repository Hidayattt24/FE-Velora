"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconAlertCircle, IconCheck } from "@tabler/icons-react";

interface AuthAlertProps {
  type: "error" | "success" | "info";
  title?: string;
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function AuthAlert({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = 5000,
}: AuthAlertProps) {
  // Auto close logic
  React.useEffect(() => {
    if (isVisible && autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, onClose, duration]);

  const getAlertStyles = () => {
    switch (type) {
      case "error":
        return {
          container: "bg-red-50 border-red-200 text-red-800",
          icon: "text-red-500",
          iconComponent: <IconAlertCircle className="w-5 h-5" />,
        };
      case "success":
        return {
          container: "bg-green-50 border-green-200 text-green-800",
          icon: "text-green-500",
          iconComponent: <IconCheck className="w-5 h-5" />,
        };
      case "info":
        return {
          container: "bg-blue-50 border-blue-200 text-blue-800",
          icon: "text-blue-500",
          iconComponent: <IconAlertCircle className="w-5 h-5" />,
        };
      default:
        return {
          container: "bg-gray-50 border-gray-200 text-gray-800",
          icon: "text-gray-500",
          iconComponent: <IconAlertCircle className="w-5 h-5" />,
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`p-4 border rounded-lg shadow-sm ${styles.container}`}
        >
          <div className="flex items-start gap-3">
            <div className={styles.icon}>{styles.iconComponent}</div>
            <div className="flex-1 min-w-0">
              {title && <h4 className="font-medium text-sm mb-1">{title}</h4>}
              <p className="text-sm">{message}</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IconX className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
