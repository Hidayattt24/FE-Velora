"use client";

import { createContext, useContext } from "react";
import toast from "react-hot-toast";

// Interface untuk toast options
interface ToastOptions {
  duration?: number;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

// Interface untuk toast context
interface ToastContextType {
  showSuccess: (message: string, options?: ToastOptions) => void;
  showError: (message: string, options?: ToastOptions) => void;
  showInfo: (message: string, options?: ToastOptions) => void;
  showWarning: (message: string, options?: ToastOptions) => void;
  showLoading: (message: string) => string;
  dismiss: (toastId?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const showSuccess = (message: string, options: ToastOptions = {}) => {
    toast.success(message, {
      duration: options.duration || 4000,
      position: options.position || "top-right",
      style: {
        background: "#10B981",
        color: "#FFFFFF",
        borderRadius: "16px",
        padding: "16px",
        fontWeight: "500",
        fontSize: "14px",
        maxWidth: "400px",
      },
      iconTheme: {
        primary: "#FFFFFF",
        secondary: "#10B981",
      },
    });
  };

  const showError = (message: string, options: ToastOptions = {}) => {
    toast.error(message, {
      duration: options.duration || 5000,
      position: options.position || "top-right",
      style: {
        background: "#EF4444",
        color: "#FFFFFF",
        borderRadius: "16px",
        padding: "16px",
        fontWeight: "500",
        fontSize: "14px",
        maxWidth: "400px",
      },
      iconTheme: {
        primary: "#FFFFFF",
        secondary: "#EF4444",
      },
    });
  };

  const showInfo = (message: string, options: ToastOptions = {}) => {
    toast(message, {
      duration: options.duration || 4000,
      position: options.position || "top-right",
      style: {
        background: "#3B82F6",
        color: "#FFFFFF",
        borderRadius: "16px",
        padding: "16px",
        fontWeight: "500",
        fontSize: "14px",
        maxWidth: "400px",
      },
      icon: "ℹ️",
    });
  };

  const showWarning = (message: string, options: ToastOptions = {}) => {
    toast(message, {
      duration: options.duration || 4000,
      position: options.position || "top-right",
      style: {
        background: "#F59E0B",
        color: "#FFFFFF",
        borderRadius: "16px",
        padding: "16px",
        fontWeight: "500",
        fontSize: "14px",
        maxWidth: "400px",
      },
      icon: "⚠️",
    });
  };

  const showLoading = (message: string): string => {
    return toast.loading(message, {
      style: {
        background: "#D291BC",
        color: "#FFFFFF",
        borderRadius: "16px",
        padding: "16px",
        fontWeight: "500",
        fontSize: "14px",
        maxWidth: "400px",
      },
    });
  };

  const dismiss = (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  const value: ToastContextType = {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    dismiss,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
