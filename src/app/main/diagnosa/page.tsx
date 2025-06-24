"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProfileHeader } from "@/components/ui/profile-header";
import {
  ageOptions,
  bpOptions,
  bsOptions,
  tempOptions,
  hrOptions,
  type BloodPressureOption,
  type HealthOption,
} from "@/lib/data/health-parameters";
import {
  predictHealthRisk,
  getRiskRecommendations,
  type HealthRiskResponse
} from "@/lib/services/health-risk";

export default function DiagnosaPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<HealthRiskResponse | null>(null);
  const [formData, setFormData] = useState({
    age: ageOptions[0].value,
    bp: bpOptions[0],
    bs: bsOptions[0].value,
    bodyTemp: tempOptions[0].value,
    heartRate: hrOptions[0].value,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await predictHealthRisk({
        Age: formData.age,
        SystolicBP: formData.bp.systolic,
        DiastolicBP: formData.bp.diastolic,
        BS: formData.bs,
        BodyTemp: formData.bodyTemp,
        HeartRate: formData.heartRate,
      });
      setResult(result);
    } catch (error) {
      console.error("Error during diagnosis:", error);
      alert("Terjadi kesalahan saat memproses data. Silakan coba lagi.");
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
            Silakan jawab pertanyaan berikut untuk mengetahui tingkat risiko kesehatan Anda selama kehamilan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Age Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#D291BC]">1. Berapakah usia Anda?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ageOptions.map((option: HealthOption) => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-xl border cursor-pointer transition-colors ${
                    formData.age === option.value
                      ? "border-[#D291BC] bg-[#FFE3EC]/20"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="age"
                    value={option.value}
                    checked={formData.age === option.value}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Blood Pressure Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#D291BC]">
              2. Bagaimana kondisi tekanan darah Anda?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {bpOptions.map((option: BloodPressureOption) => (
                <label
                  key={option.systolic}
                  className={`flex items-center p-4 rounded-xl border cursor-pointer transition-colors ${
                    formData.bp.systolic === option.systolic
                      ? "border-[#D291BC] bg-[#FFE3EC]/20"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="bp"
                    checked={formData.bp.systolic === option.systolic}
                    onChange={() => setFormData({ ...formData, bp: option })}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Blood Sugar Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#D291BC]">
              3. Bagaimana level gula darah Anda?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {bsOptions.map((option: HealthOption) => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-xl border cursor-pointer transition-colors ${
                    formData.bs === option.value
                      ? "border-[#D291BC] bg-[#FFE3EC]/20"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="bs"
                    value={option.value}
                    checked={formData.bs === option.value}
                    onChange={(e) => setFormData({ ...formData, bs: Number(e.target.value) })}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Body Temperature Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#D291BC]">
              4. Bagaimana suhu tubuh Anda?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {tempOptions.map((option: HealthOption) => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-xl border cursor-pointer transition-colors ${
                    formData.bodyTemp === option.value
                      ? "border-[#D291BC] bg-[#FFE3EC]/20"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="bodyTemp"
                    value={option.value}
                    checked={formData.bodyTemp === option.value}
                    onChange={(e) => setFormData({ ...formData, bodyTemp: Number(e.target.value) })}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Heart Rate Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#D291BC]">
              5. Bagaimana detak jantung Anda?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {hrOptions.map((option: HealthOption) => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-xl border cursor-pointer transition-colors ${
                    formData.heartRate === option.value
                      ? "border-[#D291BC] bg-[#FFE3EC]/20"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="heartRate"
                    value={option.value}
                    checked={formData.heartRate === option.value}
                    onChange={(e) => setFormData({ ...formData, heartRate: Number(e.target.value) })}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
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
                  result.risk_level === "high risk" ? "text-red-500" :
                  result.risk_level === "mid risk" ? "text-yellow-500" :
                  "text-green-500"
                }`}>
                  {result.risk_level === "high risk" ? "RISIKO TINGGI" :
                   result.risk_level === "mid risk" ? "RISIKO MENENGAH" :
                   "RISIKO RENDAH"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Rekomendasi:</p>
                <ul className="list-disc list-inside space-y-2">
                  {getRiskRecommendations(result.risk_level).map((rec: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Dibuat dengan ❤️ untuk kesehatan ibu hamil</p>
          <p className="mt-2">
            ⚠️ <strong>Perhatian</strong>: Aplikasi ini hanya alat bantu dan tidak menggantikan pemeriksaan medis profesional.
            Selalu konsultasikan kondisi Anda dengan dokter atau bidan yang menangani kehamilan Anda.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 