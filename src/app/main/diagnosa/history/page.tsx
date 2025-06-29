"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProfileHeader } from "@/components/ui/profile-header";
import {
  diagnosisService,
  type DiagnosisHistory,
  type DiagnosisStats,
} from "@/lib/api/diagnosis";

// SVG Icons
const CalendarIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const HealthIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const StatsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const LoadingIcon = () => (
  <svg
    className="w-5 h-5 animate-spin"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 2v4m0 12v4m8-8h-4M6 12H2m16.24-4.24l-2.83 2.83M8.59 8.59L5.76 5.76m12.48 12.48l-2.83-2.83M8.59 15.41l-2.83 2.83"
    />
  </svg>
);

const BackIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

interface LoadingState {
  loading: boolean;
  error: string | null;
}

const getRiskLevelStyle = (riskLevel: string) => {
  switch (riskLevel) {
    case "high risk":
      return {
        title: "RISIKO TINGGI",
        color: "text-red-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      };
    case "mid risk":
      return {
        title: "RISIKO MENENGAH",
        color: "text-yellow-500",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
      };
    default:
      return {
        title: "RISIKO RENDAH",
        color: "text-green-500",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      };
  }
};

export default function DiagnosisHistoryPage() {
  const [historyData, setHistoryData] = useState<DiagnosisHistory[]>([]);
  const [statsData, setStatsData] = useState<DiagnosisStats | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    loading: true,
    error: null,
  });
  const [showStats, setShowStats] = useState(false);

  const loadHistory = async (page: number = 1) => {
    try {
      setLoadingState({ loading: true, error: null });
      const response = await diagnosisService.getDiagnosisHistory(page, 10);

      if (response.success && response.data) {
        setHistoryData(response.data.predictions);
        setCurrentPage(response.data.pagination.current_page);
        setTotalPages(response.data.pagination.total_pages);
      }
    } catch (error) {
      console.error("Error loading history:", error);
      setLoadingState({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Gagal memuat riwayat diagnosa",
      });
    } finally {
      setLoadingState((prev) => ({ ...prev, loading: false }));
    }
  };

  const loadStats = async () => {
    try {
      const response = await diagnosisService.getDiagnosisStats();
      if (response.success && response.data) {
        setStatsData(response.data);
      }
    } catch (error) {
      console.error("Error loading stats:", error);
      // Set default stats data if loading fails
      setStatsData({
        total_predictions: 0,
        risk_level_counts: {
          "low risk": 0,
          "mid risk": 0,
          "high risk": 0,
        },
        recent_predictions: 0,
        latest_prediction: null,
        trends: {
          last_30_days: 0,
          dominant_risk_level: "low risk",
        },
      });
    }
  };

  const deleteDiagnosis = async (id: string) => {
    if (!confirm("Yakin ingin menghapus riwayat diagnosa ini?")) return;

    try {
      await diagnosisService.deleteDiagnosis(id);
      // Reload current page
      await loadHistory(currentPage);
      await loadStats(); // Refresh stats
    } catch (error) {
      console.error("Error deleting diagnosis:", error);
      alert("Gagal menghapus riwayat diagnosa");
    }
  };

  useEffect(() => {
    loadHistory();
    loadStats();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <ProfileHeader />

        {/* Header */}
        <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
          {/* Mobile Header Layout */}
          <div className="flex flex-col gap-4 sm:hidden mb-6">
            <div className="flex items-center justify-between">
              <Link href="/main/diagnosa">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-white text-[#D291BC] px-3 py-2 rounded-xl border border-pink-200 hover:bg-pink-50 transition-colors shadow-sm"
                >
                  <BackIcon />
                  <span className="text-sm">Kembali</span>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowStats(!showStats)}
                className="flex items-center gap-2 bg-[#D291BC] text-white px-3 py-2 rounded-xl hover:bg-[#C280AB] transition-colors"
              >
                <StatsIcon />
                <span className="text-sm">
                  {showStats ? "Sembunyikan" : "Statistik"}
                </span>
              </motion.button>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold text-[#D291BC]">
                Riwayat Diagnosa
              </h1>
              <p className="text-gray-600 mt-1 text-sm">
                Lihat riwayat hasil prediksi risiko kesehatan Anda
              </p>
            </div>
          </div>

          {/* Desktop Header Layout */}
          <div className="hidden sm:flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Link href="/main/diagnosa">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-white text-[#D291BC] px-4 py-2 rounded-xl border border-pink-200 hover:bg-pink-50 transition-colors shadow-sm"
                >
                  <BackIcon />
                  Kembali
                </motion.button>
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#D291BC]">
                  Riwayat Diagnosa
                </h1>
                <p className="text-gray-600 mt-2">
                  Lihat riwayat hasil prediksi risiko kesehatan Anda
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowStats(!showStats)}
              className="flex items-center gap-2 bg-[#D291BC] text-white px-4 py-2 rounded-xl hover:bg-[#C280AB] transition-colors"
            >
              <StatsIcon />
              {showStats ? "Sembunyikan" : "Statistik"}
            </motion.button>
          </div>

          {/* Statistics Panel */}
          <AnimatePresence>
            {showStats && statsData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-pink-100 mb-6"
              >
                <h3 className="text-lg font-semibold text-[#D291BC] mb-4">
                  Statistik Diagnosa
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-200">
                    <h4 className="text-xs sm:text-sm text-blue-600 font-medium">
                      Total Diagnosa
                    </h4>
                    <p className="text-xl sm:text-2xl font-bold text-blue-700">
                      {statsData.total_predictions}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 sm:p-4 rounded-xl border border-green-200">
                    <h4 className="text-xs sm:text-sm text-green-600 font-medium">
                      Risiko Rendah
                    </h4>
                    <p className="text-xl sm:text-2xl font-bold text-green-700">
                      {statsData.risk_level_counts["low risk"]}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-3 sm:p-4 rounded-xl border border-yellow-200">
                    <h4 className="text-xs sm:text-sm text-yellow-600 font-medium">
                      Risiko Menengah
                    </h4>
                    <p className="text-xl sm:text-2xl font-bold text-yellow-700">
                      {statsData.risk_level_counts["mid risk"]}
                    </p>
                  </div>
                  <div className="bg-red-50 p-3 sm:p-4 rounded-xl border border-red-200">
                    <h4 className="text-xs sm:text-sm text-red-600 font-medium">
                      Risiko Tinggi
                    </h4>
                    <p className="text-xl sm:text-2xl font-bold text-red-700">
                      {statsData.risk_level_counts["high risk"]}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Diagnosa dalam 30 hari terakhir:{" "}
                    <span className="font-medium">
                      {statsData.trends.last_30_days}
                    </span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading State */}
        {loadingState.loading && (
          <div className="max-w-6xl mx-auto text-center py-8 sm:py-12">
            <div className="inline-flex items-center gap-3">
              <LoadingIcon />
              <span className="text-gray-600 text-sm sm:text-base">
                Memuat riwayat diagnosa...
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {loadingState.error && !loadingState.loading && (
          <div className="max-w-6xl mx-auto mb-4 sm:mb-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-red-700 text-sm sm:text-base">
                {loadingState.error}
              </p>
              <button
                onClick={() => loadHistory(currentPage)}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Coba lagi
              </button>
            </div>
          </div>
        )}

        {/* History Data */}
        {!loadingState.loading && !loadingState.error && (
          <div className="max-w-6xl mx-auto">
            {historyData.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
                  <div className="flex justify-center mb-4">
                    <div className="text-gray-400">
                      <HealthIcon />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-700 mt-4">
                    Belum ada riwayat diagnosa
                  </h3>
                  <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    Lakukan diagnosa pertama Anda untuk melihat riwayat di sini
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-3 sm:gap-4">
                  {historyData.map((diagnosis) => {
                    const riskStyle = getRiskLevelStyle(diagnosis.risk_level);
                    return (
                      <motion.div
                        key={diagnosis.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-pink-100"
                      >
                        {/* Mobile Header */}
                        <div className="sm:hidden space-y-3 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CalendarIcon />
                              <div>
                                <h3 className="font-semibold text-[#D291BC] text-sm">
                                  {diagnosis.prediction_result?.user_data
                                    ?.nama || "Pasien"}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  {formatDate(diagnosis.created_at)}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteDiagnosis(diagnosis.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Hapus"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                          <div className="flex justify-center">
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium ${riskStyle.color} ${riskStyle.bgColor} ${riskStyle.borderColor} border`}
                            >
                              {riskStyle.title}
                            </div>
                          </div>
                        </div>

                        {/* Desktop Header */}
                        <div className="hidden sm:flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <CalendarIcon />
                            <div>
                              <h3 className="font-semibold text-[#D291BC]">
                                {diagnosis.prediction_result?.user_data?.nama ||
                                  "Pasien"}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {formatDate(diagnosis.created_at)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium ${riskStyle.color} ${riskStyle.bgColor} ${riskStyle.borderColor} border`}
                            >
                              {riskStyle.title}
                            </div>
                            <button
                              onClick={() => deleteDiagnosis(diagnosis.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Hapus"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>

                        {/* Vital Signs - Mobile Layout */}
                        <div className="sm:hidden grid grid-cols-2 gap-3 text-xs">
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500 mb-1">Tekanan Darah</p>
                            <p className="font-medium text-[#D291BC]">
                              {diagnosis.systolic_bp}/{diagnosis.diastolic_bp}{" "}
                              mmHg
                            </p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500 mb-1">Gula Darah</p>
                            <p className="font-medium text-[#D291BC]">
                              {diagnosis.blood_sugar} mmol/L
                            </p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500 mb-1">Suhu Tubuh</p>
                            <p className="font-medium text-[#D291BC]">
                              {diagnosis.body_temp}°C
                            </p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500 mb-1">Detak Jantung</p>
                            <p className="font-medium text-[#D291BC]">
                              {diagnosis.heart_rate} bpm
                            </p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500 mb-1">Usia</p>
                            <p className="font-medium text-[#D291BC]">
                              {diagnosis.prediction_result?.user_data?.usia ||
                                "-"}{" "}
                              tahun
                            </p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500 mb-1">Golongan Darah</p>
                            <p className="font-medium text-[#D291BC]">
                              {diagnosis.prediction_result?.user_data
                                ?.golonganDarah || "-"}
                            </p>
                          </div>
                        </div>

                        {/* Vital Signs - Desktop Layout */}
                        <div className="hidden sm:grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Tekanan Darah</p>
                            <p className="font-medium">
                              {diagnosis.systolic_bp}/{diagnosis.diastolic_bp}{" "}
                              mmHg
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Gula Darah</p>
                            <p className="font-medium">
                              {diagnosis.blood_sugar} mmol/L
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Suhu Tubuh</p>
                            <p className="font-medium">
                              {diagnosis.body_temp}°C
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Detak Jantung</p>
                            <p className="font-medium">
                              {diagnosis.heart_rate} bpm
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Usia</p>
                            <p className="font-medium">
                              {diagnosis.prediction_result?.user_data?.usia ||
                                "-"}{" "}
                              tahun
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Golongan Darah</p>
                            <p className="font-medium">
                              {diagnosis.prediction_result?.user_data
                                ?.golonganDarah || "-"}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-6 sm:mt-8">
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadHistory(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 sm:px-4 py-2 text-sm sm:text-base text-[#D291BC] border border-[#D291BC] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50"
                      >
                        <span className="hidden sm:inline">Sebelumnya</span>
                        <span className="sm:hidden">← Prev</span>
                      </button>
                      <span className="px-3 sm:px-4 py-2 text-gray-700 text-sm sm:text-base">
                        {currentPage} / {totalPages}
                      </span>
                      <button
                        onClick={() => loadHistory(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 sm:px-4 py-2 text-sm sm:text-base text-[#D291BC] border border-[#D291BC] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50"
                      >
                        <span className="hidden sm:inline">Selanjutnya</span>
                        <span className="sm:hidden">Next →</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
