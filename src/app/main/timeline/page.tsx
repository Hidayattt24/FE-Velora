"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconAlertTriangle,
  IconX,
  IconCheck,
  IconCalendarEvent,
  IconNotes,
  IconStethoscope,
  IconHeartbeat,
  IconAlertCircle,
} from "@tabler/icons-react";
import { ProfileHeader } from "@/components/ui/profile-header";
import { StatefulButton } from "@/components/aceternity/stateful-button";

// Health services tracking interface
interface HealthService {
  id: string;
  title: string;
  description: string;
  recommendedWeeks: number[];
}

// Symptoms tracking interface
interface Symptom {
  id: string;
  title: string;
  description: string;
  isDanger: boolean;
}

// Journal entry interface
interface JournalEntry {
  week: number;
  date: string;
  healthServices: {
    [id: string]: boolean;
  };
  symptoms: {
    [id: string]: boolean;
  };
  healthServicesNotes: string;
  symptomsNotes: string;
}

// Health services data based on Buku KIA 2024
const healthServicesData: HealthService[] = [
  {
    id: "bloodPressure",
    title: "Pengukuran Tekanan Darah",
    description: "Pemeriksaan tekanan darah untuk memantau risiko preeklampsia",
    recommendedWeeks: [8, 12, 16, 20, 24, 28, 30, 32, 34, 36, 37, 38, 39, 40],
  },
  {
    id: "weightCheck",
    title: "Penimbangan Berat Badan",
    description: "Pemantauan pertambahan berat badan selama kehamilan",
    recommendedWeeks: [8, 12, 16, 20, 24, 28, 30, 32, 34, 36, 37, 38, 39, 40],
  },
  {
    id: "fundusHeight",
    title: "Pengukuran Tinggi Fundus Uteri",
    description: "Pemeriksaan tinggi rahim untuk memantau pertumbuhan janin",
    recommendedWeeks: [12, 16, 20, 24, 28, 30, 32, 34, 36, 37, 38, 39, 40],
  },
  {
    id: "fetalHeartRate",
    title: "Pemeriksaan Denyut Jantung Janin (DJJ)",
    description:
      "Pemantauan detak jantung janin untuk memastikan kesehatan janin",
    recommendedWeeks: [12, 16, 20, 24, 28, 30, 32, 34, 36, 37, 38, 39, 40],
  },
  {
    id: "fetalPosition",
    title: "Pemeriksaan Presentasi Janin",
    description: "Pemeriksaan posisi janin dalam kandungan",
    recommendedWeeks: [28, 30, 32, 34, 36, 37, 38, 39, 40],
  },
  {
    id: "bloodTest",
    title: "Pemeriksaan Laboratorium (Hb)",
    description: "Tes darah untuk memeriksa kadar hemoglobin",
    recommendedWeeks: [8, 28],
  },
  {
    id: "urineTest",
    title: "Pemeriksaan Urine",
    description: "Tes urine untuk mendeteksi protein dan glukosa",
    recommendedWeeks: [8, 20, 28, 36],
  },
  {
    id: "ttImmunization",
    title: "Imunisasi TT",
    description: "Vaksinasi Tetanus Toxoid sesuai status imunisasi",
    recommendedWeeks: [16, 20],
  },
  {
    id: "ironTablets",
    title: "Pemberian Tablet Tambah Darah",
    description: "Suplemen zat besi untuk mencegah anemia",
    recommendedWeeks: [8, 12, 16, 20, 24, 28, 30, 32, 34, 36, 37, 38, 39, 40],
  },
  {
    id: "counseling",
    title: "Konseling/Nasihat",
    description: "Konsultasi tentang kehamilan, persalinan, dan menyusui",
    recommendedWeeks: [8, 12, 16, 20, 24, 28, 30, 32, 34, 36, 37, 38, 39, 40],
  },
];

// Symptoms data including danger signs based on KIA guidelines
const symptomsData: Symptom[] = [
  // Danger signs (based on KIA book)
  {
    id: "bleeding",
    title: "Perdarahan",
    description: "Perdarahan pervaginam dalam jumlah sedikit hingga banyak",
    isDanger: true,
  },
  {
    id: "severeHeadache",
    title: "Sakit Kepala Hebat",
    description: "Sakit kepala yang tidak biasa dan sangat mengganggu",
    isDanger: true,
  },
  {
    id: "blurredVision",
    title: "Gangguan Penglihatan",
    description: "Penglihatan kabur atau melihat titik-titik berkedip",
    isDanger: true,
  },
  {
    id: "swelling",
    title: "Bengkak Wajah & Tangan",
    description: "Pembengkakan pada wajah, tangan, atau seluruh tubuh",
    isDanger: true,
  },
  {
    id: "fever",
    title: "Demam Tinggi",
    description: "Suhu tubuh >38°C",
    isDanger: true,
  },
  {
    id: "reducedMovement",
    title: "Gerakan Janin Berkurang",
    description: "Gerakan janin berkurang atau tidak ada",
    isDanger: true,
  },
  {
    id: "waterBreaking",
    title: "Ketuban Pecah",
    description: "Air ketuban keluar dari jalan lahir",
    isDanger: true,
  },
  {
    id: "abdominalPain",
    title: "Nyeri Perut Hebat",
    description: "Nyeri perut yang hebat dan tidak kunjung hilang",
    isDanger: true,
  },
  {
    id: "easyTiring",
    title: "Mudah Lelah",
    description: "Merasa lelah yang berlebihan",
    isDanger: false,
  },
  {
    id: "nausea",
    title: "Mual & Muntah",
    description: "Morning sickness atau mual-muntah ringan",
    isDanger: false,
  },
  {
    id: "fatigue",
    title: "Kelelahan",
    description: "Mudah lelah dan mengantuk",
    isDanger: false,
  },
  {
    id: "heartburn",
    title: "Heartburn",
    description: "Rasa panas/nyeri di dada akibat asam lambung",
    isDanger: false,
  },
  {
    id: "constipation",
    title: "Sembelit",
    description: "Kesulitan buang air besar",
    isDanger: false,
  },
  {
    id: "backPain",
    title: "Nyeri Punggung",
    description: "Nyeri di punggung bagian bawah",
    isDanger: false,
  },
];

// Function to get week range for each trimester
const getWeeksInTrimester = (trimester: number): number[] => {
  switch (trimester) {
    case 1:
      return Array.from({ length: 12 }, (_, i) => i + 1); // Weeks 1-12
    case 2:
      return Array.from({ length: 15 }, (_, i) => i + 13); // Weeks 13-27
    case 3:
      return Array.from({ length: 15 }, (_, i) => i + 28); // Weeks 28-42
    default:
      return [];
  }
};

export default function TimelinePage() {
  // State for selected trimester (1, 2, or 3)
  const [selectedTrimester, setSelectedTrimester] = useState<number>(1);

  // State for selected week in the pregnancy
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  // State for journal entries (week -> entry)
  const [journalEntries, setJournalEntries] = useState<{
    [week: number]: JournalEntry;
  }>({});

  // State for health services notes
  const [healthServicesNotes, setHealthServicesNotes] = useState<string>("");

  // State for symptoms notes
  const [symptomsNotes, setSymptomsNotes] = useState<string>("");

  // State for warning modal
  const [showWarning, setShowWarning] = useState<boolean>(false);

  // State for current warning symptom
  const [currentWarning, setCurrentWarning] = useState<Symptom | null>(null);

  // State for card expansion
  const [expandedHealthServices, setExpandedHealthServices] =
    useState<boolean>(true);
  const [expandedSymptoms, setExpandedSymptoms] = useState<boolean>(true);

  // Initialize or load journal entry for the selected week
  useEffect(() => {
    // Load existing entry if it exists
    const existingEntry = journalEntries[selectedWeek];
    if (existingEntry) {
      setHealthServicesNotes(existingEntry.healthServicesNotes || "");
      setSymptomsNotes(existingEntry.symptomsNotes || "");
    } else {
      // Reset notes if no entry exists
      setHealthServicesNotes("");
      setSymptomsNotes("");
    }
  }, [selectedWeek, journalEntries]);

  // When trimester changes, update the selected week to the first week of the trimester
  useEffect(() => {
    const weeksInTrimester = getWeeksInTrimester(selectedTrimester);
    if (weeksInTrimester.length > 0) {
      setSelectedWeek(weeksInTrimester[0]);
    }
  }, [selectedTrimester]);

  // Get or create a journal entry for the current week
  const getJournalEntry = (): JournalEntry => {
    return (
      journalEntries[selectedWeek] || {
        week: selectedWeek,
        date: new Date().toISOString().split("T")[0],
        healthServices: {},
        symptoms: {},
        healthServicesNotes: "",
        symptomsNotes: "",
      }
    );
  };

  // Toggle health service checkbox
  const toggleHealthService = (serviceId: string) => {
    const entry = getJournalEntry();
    const newValue = !entry.healthServices[serviceId];

    setJournalEntries((prev) => ({
      ...prev,
      [selectedWeek]: {
        ...entry,
        healthServices: {
          ...entry.healthServices,
          [serviceId]: newValue,
        },
      },
    }));
  };

  // Toggle symptom checkbox
  const toggleSymptom = (symptomId: string) => {
    const entry = getJournalEntry();
    const newValue = !entry.symptoms[symptomId];
    const symptom = symptomsData.find((s) => s.id === symptomId);

    setJournalEntries((prev) => ({
      ...prev,
      [selectedWeek]: {
        ...entry,
        symptoms: {
          ...entry.symptoms,
          [symptomId]: newValue,
        },
      },
    }));

    // Show warning if danger sign is checked
    if (symptom?.isDanger && newValue) {
      setCurrentWarning(symptom);
      setShowWarning(true);
    }
  };

  // Save the journal entry
  const saveJournalEntry = () => {
    const entry = getJournalEntry();

    setJournalEntries((prev) => ({
      ...prev,
      [selectedWeek]: {
        ...entry,
        healthServicesNotes: healthServicesNotes,
        symptomsNotes: symptomsNotes,
        date: new Date().toISOString().split("T")[0],
      },
    }));

    // Show success message or toast here
    alert("Catatan minggu " + selectedWeek + " berhasil disimpan!");
  };

  // Get danger symptoms
  const getDangerSymptoms = () => {
    return symptomsData.filter((symptom) => symptom.isDanger);
  };

  // Get normal symptoms
  const getNormalSymptoms = () => {
    return symptomsData.filter((symptom) => !symptom.isDanger);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F8] to-white pb-8">
      {/* Profile Header */}
      <ProfileHeader />

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4">
        {/* Centered Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#D291BC] leading-tight">
            Jurnal & Pemantauan
            <br />
            <span className="text-lg md:text-xl font-medium text-gray-600">
              Lembar Pemantauan Ibu Hamil
            </span>
          </h1>
        </div>

        {/* Trimester Filter Navigation */}
        <div className="mb-6">
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-pink-100">
              <div className="flex gap-1">
                {[1, 2, 3].map((trimester) => (
                  <button
                    key={trimester}
                    onClick={() => setSelectedTrimester(trimester)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      selectedTrimester === trimester
                        ? "bg-[#D291BC] text-white shadow-md"
                        : "text-[#D291BC] hover:bg-pink-50"
                    }`}
                  >
                    Trimester {trimester}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Week Selector Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Pilih Minggu Kehamilan (Trimester {selectedTrimester})
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {getWeeksInTrimester(selectedTrimester).map((week) => (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`p-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  selectedWeek === week
                    ? "bg-[#D291BC] text-white shadow-md scale-105"
                    : "bg-white text-[#D291BC] border border-pink-200 hover:bg-pink-50"
                }`}
              >
                {week}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Pelayanan Kesehatan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden h-fit"
          >
            <div
              className="bg-gradient-to-r from-[#D291BC] to-[#E2A8D6] p-4 cursor-pointer"
              onClick={() => setExpandedHealthServices(!expandedHealthServices)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconStethoscope className="w-6 h-6 text-white" />
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Pelayanan Kesehatan
                    </h2>
                    <p className="text-pink-100 text-sm">
                      Minggu ke-{selectedWeek} kehamilan
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedHealthServices ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconCalendarEvent className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {expandedHealthServices && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6">
                    <div className="grid gap-4">
                      {healthServicesData.map((service) => {
                        const isRecommended =
                          service.recommendedWeeks.includes(selectedWeek);
                        const isChecked =
                          getJournalEntry().healthServices[service.id] || false;

                        return (
                          <motion.div
                            key={service.id}
                            className={`border rounded-xl p-4 transition-all duration-200 ${
                              isRecommended
                                ? "border-pink-200 bg-pink-50"
                                : "border-gray-200 bg-gray-50"
                            }`}
                            whileHover={{ scale: 1.01 }}
                          >
                            <label className="flex items-start gap-3 cursor-pointer">
                              <div className="relative mt-1">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() =>
                                    toggleHealthService(service.id)
                                  }
                                  className="sr-only"
                                />
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                    isChecked
                                      ? "bg-[#D291BC] border-[#D291BC]"
                                      : "border-pink-300 hover:border-[#D291BC]"
                                  }`}
                                >
                                  {isChecked && (
                                    <IconCheck className="w-3 h-3 text-white" />
                                  )}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4
                                  className={`font-medium ${
                                    isRecommended
                                      ? "text-pink-700"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {service.title}
                                  {isRecommended && (
                                    <span className="ml-2 text-xs bg-pink-200 text-pink-700 px-2 py-1 rounded-full">
                                      Direkomendasikan
                                    </span>
                                  )}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {service.description}
                                </p>
                              </div>
                            </label>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Notes for Health Services */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <IconNotes className="w-4 h-4 inline mr-2" />
                        Catatan Pelayanan Kesehatan
                      </label>
                      <textarea
                        value={healthServicesNotes}
                        onChange={(e) => setHealthServicesNotes(e.target.value)}
                        placeholder="Tambahkan catatan tentang pelayanan kesehatan yang diterima..."
                        className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-[#D291BC] transition-colors resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Card 2: Pemantauan Gejala Mingguan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden h-fit"
          >
            <div
              className="bg-gradient-to-r from-[#D291BC] to-[#E2A8D6] p-4 cursor-pointer"
              onClick={() => setExpandedSymptoms(!expandedSymptoms)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconHeartbeat className="w-6 h-6 text-white" />
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Pemantauan Gejala Mingguan
                    </h2>
                    <p className="text-pink-100 text-sm">
                      Pantau gejala dan tanda-tanda penting
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedSymptoms ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconCalendarEvent className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {expandedSymptoms && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6">
                    {/* Danger Signs Section */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <IconAlertTriangle className="w-5 h-5 text-red-500" />
                        <h3 className="text-lg font-semibold text-red-600">
                          Tanda Bahaya Kehamilan
                        </h3>
                      </div>
                      <div className="grid gap-3">
                        {getDangerSymptoms().map((symptom) => {
                          const isChecked =
                            getJournalEntry().symptoms[symptom.id] || false;

                          return (
                            <motion.div
                              key={symptom.id}
                              className="border-2 border-red-200 rounded-xl p-4 bg-red-50"
                              whileHover={{ scale: 1.01 }}
                            >
                              <label className="flex items-start gap-3 cursor-pointer">
                                <div className="relative mt-1">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleSymptom(symptom.id)}
                                    className="sr-only"
                                  />
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                      isChecked
                                        ? "bg-red-500 border-red-500"
                                        : "border-red-400 hover:border-red-500"
                                    }`}
                                  >
                                    {isChecked && (
                                      <IconCheck className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-red-700">
                                    {symptom.title}
                                  </h4>
                                  <p className="text-sm text-red-600 mt-1">
                                    {symptom.description}
                                  </p>
                                </div>
                              </label>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Normal Symptoms Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Gejala Umum Kehamilan
                      </h3>
                      <div className="grid gap-3">
                        {getNormalSymptoms().map((symptom) => {
                          const isChecked =
                            getJournalEntry().symptoms[symptom.id] || false;

                          return (
                            <motion.div
                              key={symptom.id}
                              className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50"
                              whileHover={{ scale: 1.01 }}
                            >
                              <label className="flex items-start gap-3 cursor-pointer">
                                <div className="relative mt-1">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleSymptom(symptom.id)}
                                    className="sr-only"
                                  />
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                      isChecked
                                        ? "bg-[#D291BC] border-[#D291BC]"
                                        : "border-pink-300 hover:border-[#D291BC]"
                                    }`}
                                  >
                                    {isChecked && (
                                      <IconCheck className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-700">
                                    {symptom.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {symptom.description}
                                  </p>
                                </div>
                              </label>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notes for Symptoms */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <IconNotes className="w-4 h-4 inline mr-2" />
                        Catatan Gejala & Keluhan
                      </label>
                      <textarea
                        value={symptomsNotes}
                        onChange={(e) => setSymptomsNotes(e.target.value)}
                        placeholder="Deskripsikan gejala atau keluhan yang dirasakan secara detail..."
                        className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-[#D291BC] transition-colors resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Save Button */}
        <div className="text-center pt-8">
          <StatefulButton
            onSubmit={async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
              saveJournalEntry();
            }}
            className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            Simpan Catatan Minggu {selectedWeek}
          </StatefulButton>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && currentWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-md w-full shadow-xl"
          >
            <div className="bg-red-600 rounded-t-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconAlertCircle className="w-6 h-6 text-white" />
                <h3 className="text-lg font-bold text-white">
                  Peringatan Tanda Bahaya
                </h3>
              </div>
              <button
                onClick={() => setShowWarning(false)}
                className="text-white hover:text-red-100"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              <h4 className="text-xl font-semibold text-red-600 mb-3">
                {currentWarning.title}
              </h4>

              <p className="text-gray-700 mb-4">{currentWarning.description}</p>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <p className="text-red-700 font-medium mb-2">
                  Tindakan yang disarankan:
                </p>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Segera hubungi dokter atau bidan Anda</li>
                  <li>
                    Jika tidak bisa dihubungi, datangi fasilitas kesehatan
                    terdekat
                  </li>
                  <li>Siapkan dokumen kehamilan Anda (Buku KIA)</li>
                  <li>Minta bantuan keluarga untuk menemani Anda</li>
                </ul>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowWarning(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors font-medium"
                >
                  Tutup
                </button>
                <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium">
                  Telepon Darurat
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
