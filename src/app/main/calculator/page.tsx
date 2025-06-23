"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IconCalendarEvent, IconCalculator } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface CalculationResult {
  gestationalAge: {
    weeks: number;
    days: number;
  };
  dueDate: string;
}

export default function CalculatorPage() {
  const [hphtDate, setHphtDate] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculatePregnancy = () => {
    if (!hphtDate) {
      setError("Mohon masukkan tanggal HPHT Anda");
      return;
    }

    try {
      const today = new Date();
      const hphtDateObj = new Date(hphtDate);

      // Validasi tanggal HPHT tidak boleh di masa depan
      if (hphtDateObj > today) {
        setError("Tanggal HPHT tidak boleh lebih dari hari ini");
        return;
      }

      // Validasi tanggal HPHT tidak boleh lebih dari 45 minggu yang lalu
      const maxWeeksAgo = new Date();
      maxWeeksAgo.setDate(maxWeeksAgo.getDate() - (45 * 7));
      if (hphtDateObj < maxWeeksAgo) {
        setError("Tanggal HPHT terlalu lama, mohon periksa kembali");
        return;
      }

      // Hitung usia kehamilan
      const diffTime = Math.abs(today.getTime() - hphtDateObj.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;

      // Hitung HPL (tambah 280 hari dari HPHT)
      const dueDate = new Date(hphtDateObj);
      dueDate.setDate(dueDate.getDate() + 280);

      // Format tanggal HPL
      const formattedDueDate = dueDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      setResult({
        gestationalAge: { weeks, days },
        dueDate: formattedDueDate
      });
      setError(null);
    } catch (err) {
      setError("Terjadi kesalahan saat menghitung. Mohon coba lagi.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-semibold text-[#D291BC] mb-2">
            Kalkulator Kehamilan
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Hitung usia kehamilan dan perkiraan tanggal kelahiran bayi Anda
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg p-6 md:p-8"
        >
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#D291BC] mb-2">
                Hari Pertama Haid Terakhir (HPHT)
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={hphtDate}
                  onChange={(e) => {
                    setHphtDate(e.target.value);
                    setError(null);
                  }}
                  className={cn(
                    "w-full px-4 py-2 rounded-xl border focus:outline-none transition-colors pr-12",
                    hphtDate
                      ? "border-[#D291BC] bg-[#FFE3EC]/10 text-[#D291BC]"
                      : "border-[#D291BC]/20 focus:border-[#D291BC] text-[#D291BC]/60"
                  )}
                />
                <IconCalendarEvent className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D291BC]/60" />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Masukkan tanggal hari pertama menstruasi terakhir Anda
              </p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 text-red-500 p-3 rounded-xl text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Calculate Button */}
            <button
              onClick={calculatePregnancy}
              disabled={!hphtDate}
              className={cn(
                "w-full px-6 py-3 rounded-xl text-white font-medium transition-colors",
                "flex items-center justify-center gap-2",
                !hphtDate
                  ? "bg-[#D291BC]/50 cursor-not-allowed"
                  : "bg-[#D291BC] hover:bg-[#c17ba6]"
              )}
            >
              <IconCalculator className="w-5 h-5" />
              <span>Hitung Sekarang</span>
            </button>
          </div>

          {/* Results Section */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 space-y-6 overflow-hidden"
              >
                <div className="h-px bg-[#D291BC]/10" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gestational Age */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#FFE3EC]/10 rounded-2xl p-6"
                  >
                    <h3 className="text-sm font-medium text-[#D291BC]/60 mb-2">
                      Usia Kehamilan Saat Ini
                    </h3>
                    <p className="text-xl font-semibold text-[#D291BC]">
                      {result.gestationalAge.weeks} Minggu, {result.gestationalAge.days} Hari
                    </p>
                  </motion.div>

                  {/* Due Date */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#FFE3EC]/10 rounded-2xl p-6"
                  >
                    <h3 className="text-sm font-medium text-[#D291BC]/60 mb-2">
                      Hari Perkiraan Lahir (HPL)
                    </h3>
                    <p className="text-xl font-semibold text-[#D291BC]">
                      {result.dueDate}
                    </p>
                  </motion.div>
                </div>

                <p className="text-xs text-gray-500 text-center mt-6">
                  * Hasil perhitungan ini hanya perkiraan. Selalu konsultasikan dengan dokter atau bidan Anda untuk informasi yang lebih akurat.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 