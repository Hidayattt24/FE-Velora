"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProfileHeader } from "@/components/ui/profile-header";

interface DiagnosaResult {
  riskLevel: "Rendah" | "Sedang" | "Tinggi";
  recommendations: string[];
}

export default function DiagnosaPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosaResult | null>(null);
  const [formData, setFormData] = useState({
    age: "",
    systolicBP: "",
    diastolicBP: "",
    bs: "",
    bodyTemp: "",
    heartRate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Integrasi dengan backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Contoh hasil sementara
      setResult({
        riskLevel: "Rendah",
        recommendations: [
          "Lakukan pemeriksaan rutin setiap bulan",
          "Jaga pola makan sehat dan seimbang",
          "Lakukan olahraga ringan yang aman untuk ibu hamil",
        ],
      });
    } catch (error) {
      console.error("Error during diagnosis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <ProfileHeader />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#D291BC]">
            Diagnosa Risiko Kesehatan Ibu Hamil
          </h1>
          <p className="mt-2 text-sm text-[#D291BC]/80">
            Masukkan data kesehatan Anda untuk mengetahui tingkat risiko kehamilan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#D291BC] mb-2">
                Usia (tahun)
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/50"
                placeholder="Masukkan usia Anda"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#D291BC] mb-2">
                Tekanan Darah Sistolik (mmHg)
              </label>
              <input
                type="number"
                value={formData.systolicBP}
                onChange={(e) => setFormData({ ...formData, systolicBP: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/50"
                placeholder="Contoh: 120"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#D291BC] mb-2">
                Tekanan Darah Diastolik (mmHg)
              </label>
              <input
                type="number"
                value={formData.diastolicBP}
                onChange={(e) => setFormData({ ...formData, diastolicBP: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/50"
                placeholder="Contoh: 80"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#D291BC] mb-2">
                Gula Darah (mg/dL)
              </label>
              <input
                type="number"
                value={formData.bs}
                onChange={(e) => setFormData({ ...formData, bs: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/50"
                placeholder="Masukkan kadar gula darah"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#D291BC] mb-2">
                Suhu Tubuh (°C)
              </label>
              <input
                type="number"
                value={formData.bodyTemp}
                onChange={(e) => setFormData({ ...formData, bodyTemp: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/50"
                placeholder="Contoh: 36.5"
                step="0.1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#D291BC] mb-2">
                Detak Jantung (bpm)
              </label>
              <input
                type="number"
                value={formData.heartRate}
                onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/50"
                placeholder="Contoh: 80"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#D291BC] text-white rounded-xl font-medium hover:bg-[#c17ba6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Memproses..." : "Analisis Risiko"}
          </button>
        </form>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-[#FFF5F7] rounded-xl"
          >
            <h2 className="text-xl font-semibold text-[#D291BC] mb-4">
              Hasil Analisis
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Tingkat Risiko:</p>
                <p className={`text-lg font-bold ${
                  result.riskLevel === "Tinggi" ? "text-red-500" :
                  result.riskLevel === "Sedang" ? "text-yellow-500" :
                  "text-green-500"
                }`}>
                  {result.riskLevel}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Rekomendasi:</p>
                <ul className="list-disc list-inside space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 