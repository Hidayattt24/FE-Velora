"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileHeader } from "@/components/ui/profile-header";
import {
  IconBabyCarriage,
  IconHeart,
  IconCheck,
  IconUser,
  IconClipboard,
  IconChevronLeft,
  IconChevronRight,
  IconCalendarEvent,
  IconMoodHappy,
  IconActivity,
  IconShield,
  IconPill,
  IconStethoscope,
} from "@tabler/icons-react";

// Pregnancy week data structure
interface WeekData {
  week: number;
  trimester: number;
  fetal: {
    size: string;
    development: string[];
    organs: string[];
    weight: string;
    length: string;
  };
  mother: {
    physical: string[];
    emotional: string[];
    symptoms: string[];
    tips: string[];
  };
  checklist: {
    medical: string[];
    lifestyle: string[];
    nutrition: string[];
    completed?: boolean[];
  };
}

// Sample data for pregnancy weeks (expanded based on KIA guidelines)
const pregnancyData: WeekData[] = [
  {
    week: 4,
    trimester: 1,
    fetal: {
      size: "Sebesar biji poppy",
      development: [
        "Embrio mulai terbentuk",
        "Sistem saraf pusat mulai berkembang",
        "Jantung primitif mulai berdetak",
      ],
      organs: ["Sistem saraf", "Jantung primitif", "Tabung neural"],
      weight: "< 1 gram",
      length: "1-2 mm",
    },
    mother: {
      physical: [
        "Terlambat menstruasi",
        "Payudara terasa lebih sensitif",
        "Mudah lelah",
      ],
      emotional: [
        "Perasaan campur aduk",
        "Antisipasi dan kegembiraan",
        "Sedikit cemas",
      ],
      symptoms: [
        "Morning sickness ringan",
        "Perubahan nafsu makan",
        "Sering buang air kecil",
      ],
      tips: [
        "Mulai konsumsi asam folat",
        "Hindari alkohol dan rokok",
        "Istirahat yang cukup",
      ],
    },
    checklist: {
      medical: [
        "Tes kehamilan",
        "Konsultasi dengan dokter/bidan",
        "Mulai konsumsi asam folat 400mcg",
      ],
      lifestyle: [
        "Berhenti merokok dan alkohol",
        "Hindari obat-obatan tanpa resep",
        "Mulai olahraga ringan",
      ],
      nutrition: [
        "Konsumsi makanan bergizi seimbang",
        "Minum air putih 8-10 gelas/hari",
        "Hindari makanan mentah",
      ],
    },
  },
  {
    week: 8,
    trimester: 1,
    fetal: {
      size: "Sebesar buah raspberry",
      development: [
        "Semua organ utama mulai terbentuk",
        "Lengan dan kaki mulai berkembang",
        "Wajah mulai terbentuk",
      ],
      organs: ["Jantung", "Otak", "Ginjal", "Hati", "Paru-paru"],
      weight: "1 gram",
      length: "14-20 mm",
    },
    mother: {
      physical: [
        "Morning sickness lebih intens",
        "Payudara membesar",
        "Kelelahan meningkat",
      ],
      emotional: [
        "Perubahan mood yang cepat",
        "Kekhawatiran tentang perkembangan bayi",
        "Mulai merasa 'hamil'",
      ],
      symptoms: ["Mual dan muntah", "Sensitivitas terhadap bau", "Konstipasi"],
      tips: [
        "Makan sedikit tapi sering",
        "Hindari pemicu mual",
        "Istirahat siang jika memungkinkan",
      ],
    },
    checklist: {
      medical: [
        "Pemeriksaan kehamilan pertama",
        "Tes darah lengkap",
        "Vaksinasi Tetanus Toxoid (TT) 1",
      ],
      lifestyle: [
        "Cukup tidur 8-9 jam",
        "Hindari stress berlebihan",
        "Mulai kelas prenatal",
      ],
      nutrition: [
        "Konsumsi TTD (Tablet Tambah Darah)",
        "Protein hewani dan nabati",
        "Kalsium dan vitamin D",
      ],
    },
  },
  {
    week: 12,
    trimester: 1,
    fetal: {
      size: "Sebesar jeruk nipis",
      development: [
        "Semua organ utama sudah terbentuk",
        "Dapat menggerakkan tangan dan kaki",
        "Refleks mengisap sudah ada",
      ],
      organs: ["Sistem pencernaan", "Ginjal", "Otot", "Tulang"],
      weight: "14 gram",
      length: "5.4 cm",
    },
    mother: {
      physical: [
        "Morning sickness mulai berkurang",
        "Energi mulai kembali",
        "Perut mulai membesar sedikit",
      ],
      emotional: [
        "Merasa lebih stabil",
        "Mulai bonding dengan bayi",
        "Optimisme meningkat",
      ],
      symptoms: ["Nafsu makan membaik", "Perubahan kulit", "Gusi berdarah"],
      tips: [
        "Mulai berbicara dengan bayi",
        "Dokumentasikan kehamilan",
        "Sharing dengan pasangan",
      ],
    },
    checklist: {
      medical: [
        "USG pertama",
        "Skrining genetik (jika diperlukan)",
        "Pemeriksaan tekanan darah",
      ],
      lifestyle: [
        "Mulai yoga prenatal",
        "Beli bra yang lebih besar",
        "Rencanakan pengumuman kehamilan",
      ],
      nutrition: [
        "Tingkatkan konsumsi kalsium",
        "Omega-3 untuk perkembangan otak",
        "Serat untuk mencegah konstipasi",
      ],
    },
  },
  {
    week: 16,
    trimester: 2,
    fetal: {
      size: "Sebesar alpukat",
      development: [
        "Sistem saraf berkembang pesat",
        "Dapat mendengar suara",
        "Rambut dan kuku mulai tumbuh",
      ],
      organs: ["Sistem pendengaran", "Sistem koordinasi", "Kelenjar keringat"],
      weight: "100 gram",
      length: "11.6 cm",
    },
    mother: {
      physical: [
        "Perut mulai terlihat",
        "Mungkin merasakan gerakan pertama",
        "Postur tubuh mulai berubah",
      ],
      emotional: [
        "Periode honeymoon kehamilan",
        "Merasa lebih berenergi",
        "Excited tentang perkembangan",
      ],
      symptoms: [
        "Nafsu makan meningkat",
        "Gatal-gatal ringan",
        "Hidung tersumbat",
      ],
      tips: [
        "Mulai bicara dan bernyanyi untuk bayi",
        "Pijat perut dengan lembut",
        "Persiapkan kamar bayi",
      ],
    },
    checklist: {
      medical: [
        "Pemeriksaan rutin ke-2",
        "Tes AFP (Alpha Fetoprotein)",
        "Vaksinasi TT 2",
      ],
      lifestyle: [
        "Mulai senam hamil teratur",
        "Beli pakaian hamil",
        "Persiapkan rencana persalinan",
      ],
      nutrition: [
        "Protein 75-100g per hari",
        "Zat besi untuk mencegah anemia",
        "Vitamin C untuk penyerapan zat besi",
      ],
    },
  },
  {
    week: 20,
    trimester: 2,
    fetal: {
      size: "Sebesar pisang",
      development: [
        "Jenis kelamin sudah dapat diketahui",
        "Gerakan semakin aktif",
        "Sidik jari mulai terbentuk",
      ],
      organs: ["Organ reproduksi", "Sistem pencernaan", "Sistem imun"],
      weight: "300 gram",
      length: "16.4 cm",
    },
    mother: {
      physical: [
        "Gerakan bayi terasa jelas",
        "Perut membesar signifikan",
        "Postur berdiri berubah",
      ],
      emotional: [
        "Bonding dengan bayi menguat",
        "Mulai merasa seperti 'ibu'",
        "Anticipasi yang tinggi",
      ],
      symptoms: [
        "Sakit punggung ringan",
        "Bengkak ringan di kaki",
        "Heartburn",
      ],
      tips: [
        "Catat pola gerakan bayi",
        "Mulai persiapan mental persalinan",
        "Bonding time dengan pasangan",
      ],
    },
    checklist: {
      medical: [
        "USG anomali (anatomi scan)",
        "Pemeriksaan tekanan darah",
        "Tes gula darah",
      ],
      lifestyle: [
        "Tidur dengan posisi miring kiri",
        "Mulai kelas persalinan",
        "Siapkan daftar nama bayi",
      ],
      nutrition: [
        "Kalsium 1000mg per hari",
        "Hindari makanan pedas berlebihan",
        "Konsumsi ikan tinggi omega-3",
      ],
    },
  },
  {
    week: 24,
    trimester: 2,
    fetal: {
      size: "Sebesar jagung",
      development: [
        "Paru-paru mulai memproduksi surfaktan",
        "Pendengaran semakin sensitif",
        "Pola tidur-bangun teratur",
      ],
      organs: ["Paru-paru", "Sistem pendengaran", "Otak"],
      weight: "600 gram",
      length: "21 cm",
    },
    mother: {
      physical: [
        "Gerakan bayi semakin kuat",
        "Sesak napas ringan",
        "Stretch marks mulai muncul",
      ],
      emotional: [
        "Mulai khawatir tentang persalinan",
        "Perasaan protektif menguat",
        "Persiapan mental menjadi orangtua",
      ],
      symptoms: ["Kontraksi Braxton Hicks", "Kram kaki", "Perubahan kulit"],
      tips: [
        "Gunakan pelembab untuk stretch marks",
        "Latihan pernapasan",
        "Mulai persiapan perlengkapan bayi",
      ],
    },
    checklist: {
      medical: [
        "Tes toleransi glukosa",
        "Pemeriksaan anemia",
        "Monitor tekanan darah",
      ],
      lifestyle: [
        "Hindari posisi tidur telentang",
        "Gunakan bantalan penyangga",
        "Siapkan tas persalinan",
      ],
      nutrition: [
        "Tingkatkan konsumsi serat",
        "Batasi garam berlebihan",
        "Konsumsi makanan kaya folat",
      ],
    },
  },
  {
    week: 28,
    trimester: 3,
    fetal: {
      size: "Sebesar terong",
      development: [
        "Mata dapat membuka dan menutup",
        "Dapat mengisap jempol",
        "Otak berkembang pesat",
      ],
      organs: ["Mata", "Sistem saraf", "Jaringan lemak"],
      weight: "1 kg",
      length: "25 cm",
    },
    mother: {
      physical: [
        "Perut semakin besar",
        "Sesak napas lebih sering",
        "Sering buang air kecil",
      ],
      emotional: [
        "Mulai cemas tentang persalinan",
        "Nesting instinct mulai muncul",
        "Anticipasi bertemu bayi",
      ],
      symptoms: ["Insomnia", "Sakit punggung", "Bengkak di kaki"],
      tips: [
        "Siapkan rencana persalinan",
        "Mulai kelas laktasi",
        "Persiapan rumah untuk bayi",
      ],
    },
    checklist: {
      medical: [
        "Pemeriksaan rutin setiap 2 minggu",
        "Tes Rhesus (jika Rh negatif)",
        "Konsultasi rencana persalinan",
      ],
      lifestyle: [
        "Mulai cuti hamil (jika memungkinkan)",
        "Siapkan kamar bayi",
        "Kelas persiapan persalinan",
      ],
      nutrition: [
        "Protein tinggi untuk pertumbuhan",
        "Hindari makanan tinggi merkuri",
        "Konsumsi DHA untuk otak bayi",
      ],
    },
  },
  {
    week: 32,
    trimester: 3,
    fetal: {
      size: "Sebesar kelapa",
      development: [
        "Tulang mengeras kecuali tengkorak",
        "Gerakan lebih terkoordinasi",
        "Sistem imun berkembang",
      ],
      organs: ["Tulang", "Sistem kekebalan", "Paru-paru"],
      weight: "1.7 kg",
      length: "28 cm",
    },
    mother: {
      physical: [
        "Napas semakin sesak",
        "Gerakan bayi terasa tidak nyaman",
        "Sulit tidur",
      ],
      emotional: [
        "Mulai tidak sabar menunggu",
        "Khawatir tentang proses persalinan",
        "Excited sekaligus nervous",
      ],
      symptoms: ["Kontraksi palsu lebih sering", "Heartburn parah", "Edema"],
      tips: [
        "Latihan pernapasan intensif",
        "Persiapan fisik dan mental",
        "Siapkan semua keperluan bayi",
      ],
    },
    checklist: {
      medical: [
        "USG untuk posisi bayi",
        "Tes GBS (Group B Strep)",
        "Finalisasi rencana persalinan",
      ],
      lifestyle: [
        "Siapkan semua dokumen persalinan",
        "Pack tas rumah sakit",
        "Atur transportasi ke rumah sakit",
      ],
      nutrition: [
        "Konsumsi kurma untuk persalinan",
        "Tetap terhidrasi dengan baik",
        "Vitamin K untuk pembekuan darah",
      ],
    },
  },
  {
    week: 36,
    trimester: 3,
    fetal: {
      size: "Sebesar melon honeydew",
      development: [
        "Paru-paru hampir matang",
        "Lemak tubuh terakumulasi",
        "Sistem pencernaan siap",
      ],
      organs: ["Paru-paru", "Hati", "Ginjal"],
      weight: "2.6 kg",
      length: "32 cm",
    },
    mother: {
      physical: [
        "Kepala bayi mulai turun",
        "Napas sedikit lega",
        "Tekanan di panggul meningkat",
      ],
      emotional: [
        "Anticipation tinggi",
        "Mulai merasa ready",
        "Sedikit khawatir timing persalinan",
      ],
      symptoms: [
        "Sering buang air kecil",
        "Kontraksi lebih reguler",
        "Nyeri panggul",
      ],
      tips: [
        "Monitor tanda-tanda persalinan",
        "Siapkan semua kontak darurat",
        "Latihan relaksasi",
      ],
    },
    checklist: {
      medical: [
        "Pemeriksaan mingguan dimulai",
        "Monitor denyut jantung bayi",
        "Diskusi induksi jika perlu",
      ],
      lifestyle: [
        "Siapkan rencana pengasuhan",
        "Atur bantuan pasca persalinan",
        "Final check semua perlengkapan",
      ],
      nutrition: [
        "Makanan berenergi tinggi",
        "Tetap konsumsi suplemen",
        "Persiapan nutrisi menyusui",
      ],
    },
  },
  {
    week: 40,
    trimester: 3,
    fetal: {
      size: "Sebesar semangka",
      development: [
        "Siap dilahirkan",
        "Semua organ berfungsi penuh",
        "Vernix caseosa hilang",
      ],
      organs: ["Semua organ matang", "Sistem imun aktif", "Pencernaan ready"],
      weight: "3.4 kg",
      length: "35 cm",
    },
    mother: {
      physical: [
        "Kontraksi semakin reguler",
        "Mungkin pecah ketuban",
        "Tanda-tanda persalinan muncul",
      ],
      emotional: [
        "Excited bertemu bayi",
        "Nervous tentang proses persalinan",
        "Ready menjadi ibu",
      ],
      symptoms: ["Kontraksi teratur", "Bloody show", "Energi burst"],
      tips: [
        "Tetap tenang dan rileks",
        "Monitor kontraksi",
        "Siap kapan saja ke rumah sakit",
      ],
    },
    checklist: {
      medical: [
        "Siap persalinan kapan saja",
        "Tahu kapan harus ke rumah sakit",
        "Kontak bidan/dokter siaga",
      ],
      lifestyle: [
        "Semua persiapan selesai",
        "Support system ready",
        "Mental dan fisik prepared",
      ],
      nutrition: [
        "Makan ringan dan mudah dicerna",
        "Tetap terhidrasi",
        "Energi untuk persalinan",
      ],
    },
  },
];

const weekRanges = [
  {
    label: "Trimester 1",
    range: [1, 12],
    color: "from-green-400 to-green-500",
  },
  { label: "Trimester 2", range: [13, 27], color: "from-blue-400 to-blue-500" },
  {
    label: "Trimester 3",
    range: [28, 40],
    color: "from-purple-400 to-purple-500",
  },
];

export default function TimelinePage() {
  const [currentWeek, setCurrentWeek] = useState(20); // Current pregnancy week
  const [selectedWeek, setSelectedWeek] = useState(20);
  const [activeTab, setActiveTab] = useState<"fetal" | "mother" | "checklist">(
    "fetal"
  );
  const [checkedItems, setCheckedItems] = useState<{
    [key: string]: boolean[];
  }>({});

  const currentData =
    pregnancyData.find((data) => data.week === selectedWeek) ||
    pregnancyData[4];
  const currentTrimester = Math.ceil(selectedWeek / 13.33);

  const toggleChecklistItem = (category: string, index: number) => {
    const key = `${selectedWeek}-${category}`;
    setCheckedItems((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [index]: !prev[key]?.[index],
      },
    }));
  };

  const getCompletionPercentage = () => {
    const categories = ["medical", "lifestyle", "nutrition"];
    let totalItems = 0;
    let completedItems = 0;

    categories.forEach((category) => {
      const key = `${selectedWeek}-${category}`;
      const items = (currentData.checklist as any)[category];
      totalItems += items.length;
      completedItems += Object.values(checkedItems[key] || {}).filter(
        Boolean
      ).length;
    });

    return Math.round((completedItems / totalItems) * 100) || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FFE3EC]/30 to-[#D291BC]/10">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <ProfileHeader />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-[#D291BC] mb-2 px-2">
            Linimasa Kehamilan Interaktif
          </h1>
          <p className="text-[#D291BC]/70 mb-4 text-sm sm:text-base px-2">
            Informasi lengkap berdasarkan usia kehamilan Anda
          </p>

          {/* Current Week Indicator */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 border border-[#D291BC]/10 inline-block mx-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <IconCalendarEvent className="w-5 h-5 sm:w-6 sm:h-6 text-[#D291BC]" />
              <div>
                <p className="text-xs sm:text-sm text-[#D291BC]/70">
                  Usia Kehamilan Saat Ini
                </p>
                <p className="text-lg sm:text-xl font-semibold text-[#D291BC]">
                  {currentWeek} Minggu
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Week Navigator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 sm:p-6 mb-4 sm:mb-6 border border-[#D291BC]/10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-3 sm:gap-0">
            <h3 className="text-base sm:text-lg font-semibold text-[#D291BC] text-center sm:text-left">
              Pilih Minggu Kehamilan
            </h3>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setSelectedWeek(Math.max(4, selectedWeek - 4))}
                disabled={selectedWeek <= 4}
                className="p-2 rounded-lg bg-[#FFE3EC] text-[#D291BC] hover:bg-[#D291BC] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IconChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[#D291BC] font-medium px-3 sm:px-4 text-sm sm:text-base">
                Minggu {selectedWeek}
              </span>
              <button
                onClick={() => setSelectedWeek(Math.min(40, selectedWeek + 4))}
                disabled={selectedWeek >= 40}
                className="p-2 rounded-lg bg-[#FFE3EC] text-[#D291BC] hover:bg-[#D291BC] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IconChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Week Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5 sm:gap-2">
            {Array.from({ length: 37 }, (_, i) => i + 4).map((week) => {
              const trimester = Math.ceil(week / 13.33);
              const isSelected = week === selectedWeek;
              const isCurrent = week === currentWeek;

              return (
                <motion.button
                  key={week}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedWeek(week)}
                  className={`
                    relative p-1.5 sm:p-2 rounded-lg text-xs sm:text-sm font-medium transition-all
                    ${
                      isSelected
                        ? "bg-[#D291BC] text-white shadow-md"
                        : "bg-[#FFE3EC]/50 text-[#D291BC] hover:bg-[#FFE3EC]"
                    }
                    ${
                      isCurrent && !isSelected
                        ? "ring-2 ring-[#D291BC] ring-opacity-50"
                        : ""
                    }
                  `}
                >
                  {week}
                  {isCurrent && (
                    <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Trimester Legend */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#D291BC]/10">
            {weekRanges.map((range, index) => (
              <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                <div
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded bg-gradient-to-r ${range.color}`}
                ></div>
                <span className="text-xs sm:text-sm text-[#D291BC]/70">
                  {range.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-4 sm:mb-6 px-2"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-1.5 sm:p-2 border border-[#D291BC]/10 w-full sm:w-auto">
            <div className="flex gap-0.5 sm:gap-1">
              {[
                {
                  id: "fetal",
                  label: "Perkembangan Janin",
                  shortLabel: "Janin",
                  icon: IconBabyCarriage,
                },
                {
                  id: "mother",
                  label: "Info untuk Bunda",
                  shortLabel: "Bunda",
                  icon: IconUser,
                },
                {
                  id: "checklist",
                  label: "Checklist & Anjuran",
                  shortLabel: "Checklist",
                  icon: IconClipboard,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all
                    ${
                      activeTab === tab.id
                        ? "bg-[#D291BC] text-white shadow-md"
                        : "text-[#D291BC] hover:bg-[#FFE3EC]/50"
                    }
                  `}
                >
                  <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden text-center leading-tight">
                    {tab.shortLabel}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${selectedWeek}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "fetal" && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 sm:p-6 border border-[#D291BC]/10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 sm:mb-6">
                  <div className="bg-[#FFE3EC] p-2.5 sm:p-3 rounded-xl mx-auto sm:mx-0">
                    <IconBabyCarriage className="w-5 h-5 sm:w-6 sm:h-6 text-[#D291BC]" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#D291BC]">
                      Perkembangan Janin - Minggu {selectedWeek}
                    </h2>
                    <p className="text-sm sm:text-base text-[#D291BC]/70">
                      Trimester {currentTrimester}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Size & Physical Development */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4">
                      <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                        <IconActivity className="w-4 h-4 sm:w-5 sm:h-5" />
                        Ukuran & Berat
                      </h3>
                      <div className="space-y-1.5 sm:space-y-2 text-blue-700">
                        <p className="text-sm sm:text-base">
                          <strong>Ukuran:</strong> {currentData.fetal.size}
                        </p>
                        <p className="text-sm sm:text-base">
                          <strong>Panjang:</strong> {currentData.fetal.length}
                        </p>
                        <p className="text-sm sm:text-base">
                          <strong>Berat:</strong> {currentData.fetal.weight}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4">
                      <h3 className="font-semibold text-green-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <IconHeart className="w-4 h-4 sm:w-5 sm:h-5" />
                        Organ yang Berkembang
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                        {currentData.fetal.organs.map((organ, index) => (
                          <div
                            key={index}
                            className="bg-white/50 rounded-lg p-2 text-xs sm:text-sm text-green-700 font-medium text-center"
                          >
                            {organ}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Development Milestones */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 sm:p-4">
                    <h3 className="font-semibold text-purple-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <IconStethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
                      Perkembangan Utama
                    </h3>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {currentData.fetal.development.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-purple-700"
                        >
                          <IconCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "mother" && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 sm:p-6 border border-[#D291BC]/10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 sm:mb-6">
                  <div className="bg-[#FFE3EC] p-2.5 sm:p-3 rounded-xl mx-auto sm:mx-0">
                    <IconUser className="w-5 h-5 sm:w-6 sm:h-6 text-[#D291BC]" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#D291BC]">
                      Info untuk Bunda - Minggu {selectedWeek}
                    </h2>
                    <p className="text-sm sm:text-base text-[#D291BC]/70">
                      Yang akan Anda alami
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Physical Changes */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-3 sm:p-4">
                      <h3 className="font-semibold text-pink-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <IconActivity className="w-4 h-4 sm:w-5 sm:h-5" />
                        Perubahan Fisik
                      </h3>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {currentData.mother.physical.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-pink-700"
                          >
                            <IconCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 sm:p-4">
                      <h3 className="font-semibold text-orange-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <IconShield className="w-4 h-4 sm:w-5 sm:h-5" />
                        Gejala Umum
                      </h3>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {currentData.mother.symptoms.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-orange-700"
                          >
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                            <span className="text-xs sm:text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Emotional & Tips */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4">
                      <h3 className="font-semibold text-blue-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <IconMoodHappy className="w-4 h-4 sm:w-5 sm:h-5" />
                        Perubahan Emosional
                      </h3>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {currentData.mother.emotional.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-blue-700"
                          >
                            <IconHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4">
                      <h3 className="font-semibold text-green-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <IconShield className="w-4 h-4 sm:w-5 sm:h-5" />
                        Tips & Saran
                      </h3>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {currentData.mother.tips.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-green-700"
                          >
                            <IconCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "checklist" && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 sm:p-6 border border-[#D291BC]/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="bg-[#FFE3EC] p-2.5 sm:p-3 rounded-xl mx-auto sm:mx-0">
                      <IconClipboard className="w-5 h-5 sm:w-6 sm:h-6 text-[#D291BC]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="text-lg sm:text-xl font-semibold text-[#D291BC]">
                        Checklist & Anjuran - Minggu {selectedWeek}
                      </h2>
                      <p className="text-sm sm:text-base text-[#D291BC]/70">
                        Berdasarkan pedoman Buku KIA
                      </p>
                    </div>
                  </div>

                  {/* Progress Circle */}
                  <div className="flex items-center justify-center sm:justify-end">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                      <svg
                        className="w-12 h-12 sm:w-16 sm:h-16 transform -rotate-90"
                        viewBox="0 0 32 32"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className="text-[#FFE3EC]"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 14}`}
                          strokeDashoffset={`${
                            2 *
                            Math.PI *
                            14 *
                            (1 - getCompletionPercentage() / 100)
                          }`}
                          className="text-[#D291BC] transition-all duration-300"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-semibold text-[#D291BC]">
                          {getCompletionPercentage()}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
                  {/* Medical Checklist */}
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 sm:p-4">
                    <h3 className="font-semibold text-red-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <IconStethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
                      Pemeriksaan Medis
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      {currentData.checklist.medical.map((item, index) => {
                        const key = `${selectedWeek}-medical`;
                        const isChecked = checkedItems[key]?.[index] || false;

                        return (
                          <label
                            key={index}
                            className="flex items-start gap-2 sm:gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() =>
                                toggleChecklistItem("medical", index)
                              }
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 border-red-300 rounded focus:ring-red-500 mt-0.5 flex-shrink-0"
                            />
                            <span
                              className={`text-xs sm:text-sm transition-all ${
                                isChecked
                                  ? "text-red-600 line-through opacity-75"
                                  : "text-red-700 group-hover:text-red-800"
                              }`}
                            >
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lifestyle Checklist */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4">
                    <h3 className="font-semibold text-blue-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <IconActivity className="w-4 h-4 sm:w-5 sm:h-5" />
                      Gaya Hidup
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      {currentData.checklist.lifestyle.map((item, index) => {
                        const key = `${selectedWeek}-lifestyle`;
                        const isChecked = checkedItems[key]?.[index] || false;

                        return (
                          <label
                            key={index}
                            className="flex items-start gap-2 sm:gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() =>
                                toggleChecklistItem("lifestyle", index)
                              }
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
                            />
                            <span
                              className={`text-xs sm:text-sm transition-all ${
                                isChecked
                                  ? "text-blue-600 line-through opacity-75"
                                  : "text-blue-700 group-hover:text-blue-800"
                              }`}
                            >
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nutrition Checklist */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4">
                    <h3 className="font-semibold text-green-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <IconPill className="w-4 h-4 sm:w-5 sm:h-5" />
                      Nutrisi & Suplemen
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      {currentData.checklist.nutrition.map((item, index) => {
                        const key = `${selectedWeek}-nutrition`;
                        const isChecked = checkedItems[key]?.[index] || false;

                        return (
                          <label
                            key={index}
                            className="flex items-start gap-2 sm:gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() =>
                                toggleChecklistItem("nutrition", index)
                              }
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 border-green-300 rounded focus:ring-green-500 mt-0.5 flex-shrink-0"
                            />
                            <span
                              className={`text-xs sm:text-sm transition-all ${
                                isChecked
                                  ? "text-green-600 line-through opacity-75"
                                  : "text-green-700 group-hover:text-green-800"
                              }`}
                            >
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Important Note */}
                <div className="mt-4 sm:mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <IconShield className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1 text-sm sm:text-base">
                        Catatan Penting
                      </h4>
                      <p className="text-xs sm:text-sm text-yellow-700">
                        Checklist ini berdasarkan pedoman Buku KIA (Kesehatan
                        Ibu dan Anak). Selalu konsultasikan dengan dokter atau
                        bidan Anda untuk penyesuaian yang sesuai dengan kondisi
                        kehamilan Anda.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
