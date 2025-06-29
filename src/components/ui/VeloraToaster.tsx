"use client";

import { Toaster } from "react-hot-toast";

export const VeloraToaster = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{
        top: 20,
        right: 20,
        zIndex: 9999,
      }}
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: "#FFFFFF",
          color: "#374151",
          borderRadius: "16px",
          padding: "16px",
          fontWeight: "500",
          fontSize: "14px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          border: "1px solid #E5E7EB",
          maxWidth: "400px",
        },
        // Success
        success: {
          duration: 4000,
          style: {
            background: "#10B981",
            color: "#FFFFFF",
            border: "1px solid #059669",
          },
          iconTheme: {
            primary: "#FFFFFF",
            secondary: "#10B981",
          },
        },
        // Error
        error: {
          duration: 5000,
          style: {
            background: "#EF4444",
            color: "#FFFFFF",
            border: "1px solid #DC2626",
          },
          iconTheme: {
            primary: "#FFFFFF",
            secondary: "#EF4444",
          },
        },
        // Loading
        loading: {
          duration: Infinity,
          style: {
            background: "#D291BC",
            color: "#FFFFFF",
            border: "1px solid #C86B85",
          },
        },
      }}
    />
  );
};
