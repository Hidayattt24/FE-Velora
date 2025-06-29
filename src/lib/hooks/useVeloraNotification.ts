"use client";

import { useToast } from "@/lib/context/ToastContext";

// Hook untuk notifikasi yang umum digunakan di aplikasi
export const useVeloraNotification = () => {
  const toast = useToast();

  // Notifikasi untuk form submissions
  const notifyFormSuccess = (action: string) => {
    toast.showSuccess(`${action} berhasil disimpan!`, {
      duration: 3000,
    });
  };

  const notifyFormError = (action: string, error?: string) => {
    const message =
      error || `Gagal ${action.toLowerCase()}. Silakan coba lagi.`;
    toast.showError(message, {
      duration: 5000,
    });
  };

  // Notifikasi untuk authentication
  const notifyLoginSuccess = () => {
    toast.showSuccess("Selamat datang di Velora! 🎉", {
      duration: 3000,
    });
  };

  const notifyLogoutSuccess = () => {
    toast.showInfo("Anda telah keluar dari akun", {
      duration: 2000,
    });
  };

  const notifyAuthError = (message?: string) => {
    toast.showError(
      message ||
        "Terjadi kesalahan saat masuk. Periksa email dan password Anda.",
      {
        duration: 5000,
      }
    );
  };

  // Notifikasi untuk upload/delete
  const notifyUploadSuccess = (type: string = "File") => {
    toast.showSuccess(`${type} berhasil diunggah! 📁`, {
      duration: 3000,
    });
  };

  const notifyDeleteSuccess = (item: string = "Item") => {
    toast.showSuccess(`${item} berhasil dihapus`, {
      duration: 3000,
    });
  };

  const notifyDeleteConfirm = (item: string = "item") => {
    toast.showWarning(`Yakin ingin menghapus ${item} ini?`, {
      duration: 4000,
    });
  };

  // Notifikasi untuk data/network
  const notifyDataSaved = () => {
    toast.showSuccess("Data berhasil disimpan! ✅", {
      duration: 3000,
    });
  };

  const notifyNetworkError = () => {
    toast.showError(
      "Koneksi bermasalah. Periksa internet Anda dan coba lagi.",
      {
        duration: 6000,
      }
    );
  };

  const notifyDataError = (action?: string) => {
    toast.showError(`Gagal ${action || "memuat data"}. Silakan coba lagi.`, {
      duration: 5000,
    });
  };

  // Notifikasi untuk fitur khusus Velora
  const notifyHealthPrediction = (
    result: "success" | "error",
    riskLevel?: string
  ) => {
    if (result === "success") {
      const riskMessage = riskLevel ? ` Tingkat risiko: ${riskLevel}` : "";
      toast.showSuccess(`Prediksi kesehatan berhasil!${riskMessage} 🏥`, {
        duration: 5000,
      });
    } else {
      toast.showError("Gagal melakukan prediksi kesehatan. Coba lagi nanti.", {
        duration: 5000,
      });
    }
  };

  const notifyTimelineUpdated = () => {
    toast.showSuccess("Timeline kehamilan diperbarui! 📅", {
      duration: 3000,
    });
  };

  const notifyGalleryAction = (
    action: "upload" | "delete",
    success: boolean
  ) => {
    if (success) {
      const message =
        action === "upload"
          ? "Foto berhasil ditambahkan ke galeri! 📸"
          : "Foto berhasil dihapus dari galeri";
      toast.showSuccess(message, {
        duration: 3000,
      });
    } else {
      const message =
        action === "upload" ? "Gagal mengunggah foto" : "Gagal menghapus foto";
      toast.showError(message, {
        duration: 4000,
      });
    }
  };

  // Loading states
  const showLoading = (message: string = "Memproses...") => {
    return toast.showLoading(message);
  };

  const hideLoading = (toastId: string) => {
    toast.dismiss(toastId);
  };

  // Copy/share actions
  const notifyCopied = (item: string = "Link") => {
    toast.showInfo(`${item} disalin ke clipboard! 📋`, {
      duration: 2000,
    });
  };

  const notifyShared = (platform?: string) => {
    const message = platform
      ? `Dibagikan ke ${platform}!`
      : "Berhasil dibagikan!";
    toast.showSuccess(`${message} 🔗`, {
      duration: 3000,
    });
  };

  // Validation errors
  const notifyValidationError = (field?: string) => {
    const message = field
      ? `${field} tidak boleh kosong`
      : "Mohon lengkapi semua field yang diperlukan";
    toast.showWarning(message, {
      duration: 4000,
    });
  };

  // Generic notifications
  const notifySuccess = (message: string, duration?: number) => {
    toast.showSuccess(message, { duration });
  };

  const notifyError = (message: string, duration?: number) => {
    toast.showError(message, { duration });
  };

  const notifyInfo = (message: string, duration?: number) => {
    toast.showInfo(message, { duration });
  };

  const notifyWarning = (message: string, duration?: number) => {
    toast.showWarning(message, { duration });
  };

  return {
    // Form notifications
    notifyFormSuccess,
    notifyFormError,

    // Auth notifications
    notifyLoginSuccess,
    notifyLogoutSuccess,
    notifyAuthError,

    // Upload/Delete notifications
    notifyUploadSuccess,
    notifyDeleteSuccess,
    notifyDeleteConfirm,

    // Data notifications
    notifyDataSaved,
    notifyNetworkError,
    notifyDataError,

    // Velora specific notifications
    notifyHealthPrediction,
    notifyTimelineUpdated,
    notifyGalleryAction,

    // Loading states
    showLoading,
    hideLoading,

    // Copy/Share notifications
    notifyCopied,
    notifyShared,

    // Validation notifications
    notifyValidationError,

    // Generic notifications
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,

    // Direct access to toast context
    toast,
  };
};
