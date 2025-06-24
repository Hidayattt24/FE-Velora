"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileHeader } from "@/components/ui/profile-header";
import { MultiStepLoader } from "@/components/aceternity/loader";
import Marquee from "react-fast-marquee";
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
import { jsPDF } from "jspdf";

// SVG Icons as components
const UserIcon = () => (
  <svg className="w-6 h-6 text-[#D291BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const AgeIcon = () => (
  <svg className="w-6 h-6 text-[#D291BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const BloodIcon = () => (
  <svg className="w-6 h-6 text-[#D291BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const WarningIcon = () => (
  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-6 h-6 text-[#D291BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const loadingStates = [
  { text: "Memproses data kesehatan..." },
  { text: "Menganalisis parameter vital..." },
  { text: "Menghitung tingkat risiko..." },
  { text: "Menyiapkan rekomendasi..." }
];

const steps = [
  { id: 'userData', title: 'Data Diri' },
  { id: 'age', title: 'Usia Kehamilan' },
  { id: 'bloodPressure', title: 'Tekanan Darah' },
  { id: 'bloodSugar', title: 'Gula Darah' },
  { id: 'bodyTemp', title: 'Suhu Tubuh' },
  { id: 'heartRate', title: 'Detak Jantung' },
  { id: 'result', title: 'Hasil Analisis' }
];

// Add this constant at the top with other constants
const riskLevelExplanations = {
  "high risk": {
    title: "RISIKO TINGGI",
    description: "Kondisi kesehatan Anda memerlukan perhatian medis segera. Harap segera konsultasi dengan dokter atau tenaga medis profesional.",
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  "mid risk": {
    title: "RISIKO MENENGAH",
    description: "Beberapa parameter vital Anda memerlukan pemantauan lebih lanjut. Disarankan untuk melakukan pemeriksaan rutin dengan tenaga medis.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50"
  },
  "low risk": {
    title: "RISIKO RENDAH",
    description: "Parameter vital Anda dalam kondisi normal. Tetap jaga kesehatan dan lakukan pemeriksaan rutin sesuai jadwal.",
    color: "text-green-500",
    bgColor: "bg-green-50"
  }
};

export default function DiagnosaPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<HealthRiskResponse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    nama: "",
    usia: "",
    golonganDarah: ""
  });
  const [formData, setFormData] = useState({
    age: ageOptions[0].value,
    bp: bpOptions[0],
    bs: bsOptions[0].value,
    bodyTemp: tempOptions[0].value,
    heartRate: hrOptions[0].value,
  });
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleNext = () => {
    if (currentStep === 0) {
      if (!userData.nama || !userData.usia || !userData.golonganDarah) {
        alert("Mohon lengkapi semua data diri Anda");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const resetForm = () => {
    setUserData({
      nama: "",
      usia: "",
      golonganDarah: ""
    });
    setFormData({
      age: ageOptions[0].value,
      bp: bpOptions[0],
      bs: bsOptions[0].value,
      bodyTemp: tempOptions[0].value,
      heartRate: hrOptions[0].value,
    });
    setResult(null);
    setShowModal(false);
    setCurrentStep(0);
  };

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
      setShowModal(true);
    } catch (error) {
      console.error("Error during diagnosis:", error);
      alert("Terjadi kesalahan saat memproses data. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    
    // Add header with gradient-like effect
    doc.setFillColor(210, 145, 188); // #D291BC
    doc.rect(0, 0, 210, 40, "F");
    doc.setFillColor(255, 192, 203); // pink
    doc.rect(0, 35, 210, 5, "F");
    
    // Add title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text("VELORA", 20, 20);
    doc.setFontSize(16);
    doc.text("Sistem Prediksi Risiko Kesehatan Ibu Hamil", 20, 30);
    
    // Add user data section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.roundedRect(20, 50, 170, 40, 3, 3, "S");
    doc.text("Data Pasien:", 25, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Nama: ${userData.nama}`, 25, 70);
    doc.text(`Usia: ${userData.usia} tahun`, 25, 77);
    doc.text(`Golongan Darah: ${userData.golonganDarah}`, 25, 84);
    
    // Add risk level section with colored box
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Tingkat Risiko:", 25, 105);
    
    const riskColor = 
      result.risk_level === "high risk" ? "#FF0000" :
      result.risk_level === "mid risk" ? "#FFA500" : "#008000";
    
    doc.setFillColor(riskColor);
    doc.roundedRect(20, 110, 170, 25, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text(
      result.risk_level === "high risk" ? "RISIKO TINGGI" :
      result.risk_level === "mid risk" ? "RISIKO MENENGAH" : "RISIKO RENDAH",
      105, 125, { align: "center" }
    );
    
    // Add vital signs section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("Parameter Vital:", 25, 150);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`• Tekanan Darah: ${formData.bp.systolic}/${formData.bp.diastolic} mmHg`, 30, 160);
    doc.text(`• Gula Darah: ${formData.bs} mmol/L`, 30, 167);
    doc.text(`• Suhu Tubuh: ${formData.bodyTemp}°C`, 30, 174);
    doc.text(`• Detak Jantung: ${formData.heartRate} bpm`, 30, 181);
    
    // Add recommendations
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Rekomendasi:", 25, 200);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    const recommendations = getRiskRecommendations(result.risk_level);
    let yPos = 210;
    recommendations.forEach((rec) => {
      const lines = doc.splitTextToSize(rec, 160);
      lines.forEach((line: string) => {
        doc.text(`• ${line}`, 30, yPos);
        yPos += 7;
      });
    });
    
    // Add disclaimer
    doc.setFillColor(255, 247, 237); // warm background
    doc.roundedRect(20, yPos + 10, 170, 35, 3, 3, "F");
    doc.setTextColor(100);
    doc.setFontSize(10);
    doc.text("PERHATIAN PENTING:", 25, yPos + 20);
    doc.text("Hasil diagnosa ini hanya bersifat prediktif dengan tingkat akurasi 84.21% dan", 25, yPos + 27);
    doc.text("tidak menggantikan pemeriksaan langsung oleh tenaga medis profesional.", 25, yPos + 34);
    doc.text("Selalu konsultasikan kondisi Anda dengan dokter atau bidan yang menangani", 25, yPos + 41);
    doc.text("kehamilan Anda untuk mendapatkan penanganan yang tepat.", 25, yPos + 48);
    
    // Add footer
    doc.setFontSize(8);
    doc.text("Dicetak melalui Aplikasi Velora - Sistem Prediksi Risiko Kesehatan Ibu Hamil", 105, 285, { align: "center" });
    doc.text(new Date().toLocaleString(), 105, 290, { align: "center" });
    
    // Save the PDF
    doc.save(`Diagnosa_${userData.nama.replace(/\s+/g, '_')}.pdf`);
  };

  const renderStep = () => {
    switch(currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 sm:space-y-6 px-4 sm:px-0"
          >
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-lg border border-pink-200">
              <h2 className="text-xl sm:text-2xl font-bold text-[#D291BC] mb-4">👋 Hi mom!</h2>
              <p className="text-base sm:text-lg text-gray-600">
                Untuk memulai diagnosa, mohon lengkapi data diri Anda terlebih dahulu.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-pink-100">
                <label className="block text-[#D291BC] text-base sm:text-lg font-medium mb-3">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-pink-100 focus:border-[#D291BC] focus:ring-2 focus:ring-pink-200 transition-all text-base sm:text-lg text-[#D291BC] placeholder-pink-300"
                  placeholder="Masukkan nama lengkap Anda"
                  value={userData.nama}
                  onChange={(e) => setUserData({ ...userData, nama: e.target.value })}
                />
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-pink-100">
                <label className="block text-[#D291BC] text-base sm:text-lg font-medium mb-3">Usia</label>
                <input
                  type="number"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-pink-100 focus:border-[#D291BC] focus:ring-2 focus:ring-pink-200 transition-all text-base sm:text-lg text-[#D291BC] placeholder-pink-300"
                  placeholder="Masukkan usia Anda"
                  value={userData.usia}
                  onChange={(e) => setUserData({ ...userData, usia: e.target.value })}
                />
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-pink-100">
                <label className="block text-[#D291BC] text-base sm:text-lg font-medium mb-3">Golongan Darah</label>
                <select
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 border-pink-100 focus:border-[#D291BC] focus:ring-2 focus:ring-pink-200 transition-all text-base sm:text-lg text-[#D291BC]"
                  value={userData.golonganDarah}
                  onChange={(e) => setUserData({ ...userData, golonganDarah: e.target.value })}
                >
                  <option value="" className="text-pink-300">Pilih golongan darah Anda</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="w-full mt-8 bg-gradient-to-r from-[#D291BC] to-pink-400 text-white rounded-xl py-4 px-8 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Lanjutkan →
            </motion.button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-lg border border-pink-100"
          >
            <h3 className="text-2xl font-bold text-[#D291BC] mb-6">Berapakah usia kehamilan Anda?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ageOptions.map((option: HealthOption) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.age === option.value
                      ? "border-[#D291BC] bg-pink-50 shadow-md"
                      : "border-pink-100 hover:border-pink-200 hover:bg-pink-50/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="age"
                    value={option.value}
                    checked={formData.age === option.value}
                    onChange={(e) => {
                      setFormData({ ...formData, age: Number(e.target.value) });
                      setTimeout(handleNext, 500);
                    }}
                    className="hidden"
                  />
                  <span className="text-lg text-[#D291BC]">{option.label}</span>
                </motion.label>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-lg border border-pink-100"
          >
            <h3 className="text-2xl font-bold text-[#D291BC] mb-6">
              Bagaimana kondisi tekanan darah Anda?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {bpOptions.map((option: BloodPressureOption) => (
                <motion.label
                  key={option.systolic}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.bp.systolic === option.systolic
                      ? "border-[#D291BC] bg-pink-50 shadow-md"
                      : "border-pink-100 hover:border-pink-200 hover:bg-pink-50/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="bp"
                    checked={formData.bp.systolic === option.systolic}
                    onChange={() => setFormData({ ...formData, bp: option })}
                    className="hidden"
                  />
                  <span className="text-lg text-[#D291BC]">{option.label}</span>
                </motion.label>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-lg border border-pink-100"
          >
            <h3 className="text-2xl font-bold text-[#D291BC] mb-6">
              Bagaimana level gula darah Anda?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {bsOptions.map((option: HealthOption) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.bs === option.value
                      ? "border-[#D291BC] bg-pink-50 shadow-md"
                      : "border-pink-100 hover:border-pink-200 hover:bg-pink-50/30"
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
                  <span className="text-lg text-[#D291BC]">{option.label}</span>
                </motion.label>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-lg border border-pink-100"
          >
            <h3 className="text-2xl font-bold text-[#D291BC] mb-6">
              Bagaimana suhu tubuh Anda?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {tempOptions.map((option: HealthOption) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.bodyTemp === option.value
                      ? "border-[#D291BC] bg-pink-50 shadow-md"
                      : "border-pink-100 hover:border-pink-200 hover:bg-pink-50/30"
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
                  <span className="text-lg text-[#D291BC]">{option.label}</span>
                </motion.label>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-lg border border-pink-100"
          >
            <h3 className="text-2xl font-bold text-[#D291BC] mb-6">
              Bagaimana detak jantung Anda?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {hrOptions.map((option: HealthOption) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.heartRate === option.value
                      ? "border-[#D291BC] bg-pink-50 shadow-md"
                      : "border-pink-100 hover:border-pink-200 hover:bg-pink-50/30"
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
                  <span className="text-lg text-[#D291BC]">{option.label}</span>
                </motion.label>
              ))}
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-lg border border-pink-100"
          >
            <h3 className="text-3xl font-bold text-[#D291BC] mb-6">Siap untuk melihat hasil?</h3>
            <p className="text-gray-600 text-lg mb-8">
              Semua data telah lengkap. Klik tombol di bawah untuk melihat hasil analisis.
            </p>

            {/* Risk Level Explanations */}
            <div className="mb-8 space-y-4">
              <h4 className="text-xl font-semibold text-[#D291BC] mb-4">Penjelasan Tingkat Risiko:</h4>
              <div className="grid grid-cols-1 gap-4 text-left">
                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                  <h5 className="text-lg font-semibold text-red-500 mb-2">Risiko Tinggi</h5>
                  <p className="text-red-700">Memerlukan perhatian medis segera dan pemantauan intensif oleh tenaga medis profesional.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                  <h5 className="text-lg font-semibold text-yellow-500 mb-2">Risiko Menengah</h5>
                  <p className="text-yellow-700">Memerlukan pemantauan lebih lanjut dan konsultasi rutin dengan tenaga medis.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <h5 className="text-lg font-semibold text-green-500 mb-2">Risiko Rendah</h5>
                  <p className="text-green-700">Kondisi normal, tetap lakukan pemeriksaan rutin sesuai jadwal.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-[#D291BC] to-pink-400 text-white rounded-xl py-6 text-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <MultiStepLoader loadingStates={loadingStates} loading={true} />
                ) : (
                  "Analisis Risiko"
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetForm}
                disabled={isLoading}
                className="px-6 bg-white text-[#D291BC] border-2 border-[#D291BC] rounded-xl font-medium shadow-lg hover:shadow-xl hover:bg-pink-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 pt-14">
      <div className="fixed top-0 left-0 w-full z-50">
        <Marquee className="bg-gradient-to-r from-[#D291BC] to-pink-400 text-white text-sm py-2">
          <p className="mr-8">
            ⚠️ Penting: Sistem ini hanya alat bantu diagnosa awal dengan akurasi 84.21%. 
            Hasil tidak menggantikan diagnosis dari tenaga medis profesional.
            Selalu konsultasikan kondisi Anda dengan dokter atau bidan yang menangani kehamilan Anda.
          </p>
        </Marquee>
      </div>

      <div className="container mx-auto px-4">
        <ProfileHeader />
        
        {/* Info Button */}
        <div className="max-w-4xl mx-auto mb-6 px-4 sm:px-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowInfoModal(true)}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#D291BC]/10 to-pink-400/10 hover:from-[#D291BC]/20 hover:to-pink-400/20 text-[#D291BC] p-3 sm:p-4 rounded-xl border-2 border-[#D291BC]/20 hover:border-[#D291BC]/30 transition-all"
          >
            <InfoIcon />
            <div className="text-left">
              <p className="font-semibold text-sm sm:text-base">Tentang Model AI Velora</p>
              <p className="text-xs sm:text-sm opacity-80">Pelajari lebih lanjut tentang dataset dan penelitian yang mendukung model ini</p>
            </div>
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 ${index < steps.length - 1 ? 'mr-3' : ''}`}
              >
                <div
                  className={`h-2 rounded-full transition-all ${
                    index <= currentStep
                      ? 'bg-gradient-to-r from-[#D291BC] to-pink-400 shadow-sm'
                      : 'bg-pink-100'
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-lg font-medium text-[#D291BC]">
              {steps[currentStep].title}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep > 0 && currentStep < 6 && (
            <div className="flex justify-between mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="px-6 py-2 text-[#D291BC] hover:text-pink-500 transition-colors font-medium"
              >
                ← Kembali
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="px-6 py-2 text-[#D291BC] hover:text-pink-500 transition-colors font-medium"
              >
                Lanjut →
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Result Modal */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-2 sm:p-4 overflow-y-auto" style={{ marginTop: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-7xl mx-auto mb-8 shadow-2xl border border-pink-100"
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#D291BC]">Hasil Analisis</h2>
              <div className="flex gap-2">
                <button
                  onClick={resetForm}
                  className="text-[#D291BC] hover:text-pink-500 p-1.5"
                  title="Mulai Ulang"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#D291BC] hover:text-pink-500 p-1.5"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
              {/* Left Column - User Info & Risk Level */}
              <div className="md:col-span-4 space-y-4 sm:space-y-5">
                {/* User Info */}
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4">
                  <div className="bg-pink-50 p-3 sm:p-4 rounded-xl flex items-center space-x-3">
                    <UserIcon />
                    <div>
                      <p className="text-xs sm:text-sm text-[#D291BC]">Nama</p>
                      <p className="text-sm sm:text-base font-medium text-[#D291BC]">{userData.nama}</p>
                    </div>
                  </div>
                  <div className="bg-pink-50 p-3 sm:p-4 rounded-xl flex items-center space-x-3">
                    <AgeIcon />
                    <div>
                      <p className="text-xs sm:text-sm text-[#D291BC]">Usia</p>
                      <p className="text-sm sm:text-base font-medium text-[#D291BC]">{userData.usia} tahun</p>
                    </div>
                  </div>
                  <div className="bg-pink-50 p-3 sm:p-4 rounded-xl flex items-center space-x-3 col-span-2 md:col-span-1">
                    <BloodIcon />
                    <div>
                      <p className="text-xs sm:text-sm text-[#D291BC]">Golongan Darah</p>
                      <p className="text-sm sm:text-base font-medium text-[#D291BC]">{userData.golonganDarah}</p>
                    </div>
                  </div>
                </div>

                {/* Risk Level */}
                <div className="bg-gradient-to-br from-white to-pink-50 rounded-xl p-4 sm:p-5 border border-pink-100">
                  <p className="text-sm sm:text-base font-medium text-[#D291BC] mb-2">Tingkat Risiko:</p>
                  <div className={`${riskLevelExplanations[result.risk_level].bgColor} p-3 sm:p-4 rounded-xl border ${
                    result.risk_level === "high risk" ? "border-red-200" :
                    result.risk_level === "mid risk" ? "border-yellow-200" :
                    "border-green-200"
                  }`}>
                    <p className={`text-xl sm:text-2xl font-bold mb-2 ${riskLevelExplanations[result.risk_level].color}`}>
                      {riskLevelExplanations[result.risk_level].title}
                    </p>
                    <p className={`text-xs sm:text-sm ${
                      result.risk_level === "high risk" ? "text-red-700" :
                      result.risk_level === "mid risk" ? "text-yellow-700" :
                      "text-green-700"
                    }`}>
                      {riskLevelExplanations[result.risk_level].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Middle Column - Vital Signs */}
              <div className="md:col-span-5 space-y-4 sm:space-y-5">
                {/* Vital Signs */}
                <div className="bg-gradient-to-br from-white to-pink-50 rounded-xl p-4 sm:p-5 border border-pink-100">
                  <p className="text-sm sm:text-base font-medium text-[#D291BC] mb-3 sm:mb-4">Parameter Vital:</p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-pink-50/50 p-3 sm:p-4 rounded-xl border border-pink-100">
                      <p className="text-xs sm:text-sm text-[#D291BC]">Tekanan Darah</p>
                      <p className="text-sm sm:text-lg font-medium text-[#D291BC]">{formData.bp.systolic}/{formData.bp.diastolic} mmHg</p>
                    </div>
                    <div className="bg-pink-50/50 p-3 sm:p-4 rounded-xl border border-pink-100">
                      <p className="text-xs sm:text-sm text-[#D291BC]">Gula Darah</p>
                      <p className="text-sm sm:text-lg font-medium text-[#D291BC]">{formData.bs} mmol/L</p>
                    </div>
                    <div className="bg-pink-50/50 p-3 sm:p-4 rounded-xl border border-pink-100">
                      <p className="text-xs sm:text-sm text-[#D291BC]">Suhu Tubuh</p>
                      <p className="text-sm sm:text-lg font-medium text-[#D291BC]">{formData.bodyTemp}°C</p>
                    </div>
                    <div className="bg-pink-50/50 p-3 sm:p-4 rounded-xl border border-pink-100">
                      <p className="text-xs sm:text-sm text-[#D291BC]">Detak Jantung</p>
                      <p className="text-sm sm:text-lg font-medium text-[#D291BC]">{formData.heartRate} bpm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Recommendations & Warning */}
              <div className="md:col-span-3 space-y-4 sm:space-y-5">
                {/* Recommendations */}
                <div className="bg-gradient-to-br from-white to-pink-50 rounded-xl p-4 sm:p-5 border border-pink-100">
                  <p className="text-sm sm:text-base font-medium text-[#D291BC] mb-3">Rekomendasi:</p>
                  <ul className="space-y-2 sm:space-y-3">
                    {getRiskRecommendations(result.risk_level).map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#D291BC] mr-2">•</span>
                        <span className="text-xs sm:text-sm text-[#D291BC]">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Warning */}
                <div className="bg-yellow-50 rounded-xl p-4 sm:p-5 border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <WarningIcon />
                    <div>
                      <p className="text-sm sm:text-base font-medium text-yellow-800 mb-2">Catatan Penting:</p>
                      <p className="text-xs sm:text-sm text-yellow-700">
                        Model AI ini memiliki tingkat akurasi 84.21% dan hanya berfungsi sebagai alat bantu prediksi awal.
                        Hasil prediksi tidak menggantikan diagnosis dari tenaga medis profesional.
                        Selalu konsultasikan kondisi Anda dengan dokter atau bidan yang menangani kehamilan Anda.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generatePDF}
                    className="flex-1 bg-gradient-to-r from-[#D291BC] to-pink-400 text-white rounded-xl py-2.5 sm:py-3 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    Unduh PDF
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(false)}
                    className="flex-1 border-2 border-[#D291BC] text-[#D291BC] rounded-xl py-2.5 sm:py-3 text-sm sm:text-base font-medium hover:bg-pink-50 transition-all"
                  >
                    Tutup
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl mx-auto my-4 sm:my-8 shadow-2xl border border-pink-100"
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#D291BC]">Tentang Model AI Velora</h2>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-[#D291BC] hover:text-pink-500 p-1.5"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] sm:max-h-[600px] pr-2">
              <div className="bg-gradient-to-br from-white to-pink-50 rounded-xl p-5 border border-pink-100">
                <h3 className="text-lg font-semibold text-[#D291BC] mb-3">Dataset</h3>
                <p className="text-gray-700 mb-4">
                  Model AI Velora dilatih menggunakan dataset Maternal Health Risk Data yang tersedia di Kaggle. 
                  Dataset ini berisi data kesehatan ibu hamil yang mencakup berbagai parameter vital seperti 
                  tekanan darah, gula darah, detak jantung, dan suhu tubuh.
                </p>
                <a 
                  href="https://www.kaggle.com/datasets/csafrit2/maternal-health-risk-data/data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D291BC] hover:text-pink-500 underline"
                >
                  Lihat Dataset di Kaggle →
                </a>
              </div>

              <div className="bg-gradient-to-br from-white to-pink-50 rounded-xl p-5 border border-pink-100">
                <h3 className="text-lg font-semibold text-[#D291BC] mb-3">Penelitian Pendukung</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 mb-2">
                      1. Review and Analysis of Risk Factor of Maternal Health in Remote Area Using the Internet of Things (IoT)
                    </p>
                    <a 
                      href="https://www.researchgate.net/publication/340106910_Review_and_Analysis_of_Risk_Factor_of_Maternal_Health_in_Remote_Area_Using_the_Internet_of_Things_IoT"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D291BC] hover:text-pink-500 underline text-sm"
                    >
                      Baca Paper →
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2">
                      2. IoT Based Risk Level Prediction Model For Maternal Health Care In The Context Of Bangladesh
                    </p>
                    <a 
                      href="https://www.researchgate.net/publication/349367479_IoT_Based_Risk_Level_Prediction_Model_For_Maternal_Health_Care_In_The_Context_Of_Bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D291BC] hover:text-pink-500 underline text-sm"
                    >
                      Baca Paper →
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
                <div className="flex items-start space-x-3">
                  <WarningIcon />
                  <div>
                    <p className="text-base font-medium text-yellow-800 mb-2">Catatan Penting:</p>
                    <p className="text-sm text-yellow-700">
                      Model AI ini memiliki tingkat akurasi 84.21% dan hanya berfungsi sebagai alat bantu prediksi awal.
                      Hasil prediksi tidak menggantikan diagnosis dari tenaga medis profesional.
                      Selalu konsultasikan kondisi Anda dengan dokter atau bidan yang menangani kehamilan Anda.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowInfoModal(false)}
                className="w-full bg-gradient-to-r from-[#D291BC] to-pink-400 text-white rounded-xl py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Saya Mengerti
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 