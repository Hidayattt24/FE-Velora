interface Article {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  author: string;
  authorImage: string;
  readTime: string;
}

export const trendingArticles: Article[] = [
  {
    id: "trending-1",
    title: "Bulan 1 Kehamilan: Tanda-tanda Awal dan Tips Penting",
    description:
      "Mengenali gejala kehamilan pertama dan tips penting untuk bulan pertama perjalanan kehamilan Anda.",
    image: "/main/journal/journal.jpg",
    category: "Trimester Pertama",
    author: "Dr. Sarah Amelia",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "5 menit baca",
  },
  {
    id: "trending-2",
    title: "Bulan 2 Kehamilan: Mengatasi Mual dan Morning Sickness",
    description:
      "Strategi efektif untuk mengatasi mual dan morning sickness selama bulan kedua kehamilan.",
    image: "/main/journal/journal.jpg",
    category: "Trimester Pertama",
    author: "Dr. Emily Sari",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
  {
    id: "trending-3",
    title: "Bulan 3 Kehamilan: Vitamin Prenatal dan Nutrisi Penting",
    description:
      "Vitamin essential dan panduan nutrisi untuk kehamilan sehat di bulan ketiga.",
    image: "/main/journal/journal.jpg",
    category: "Nutrisi",
    author: "Dr. Michael Budi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 menit baca",
  },
  {
    id: "trending-4",
    title: "Bulan 4 Kehamilan: Olahraga Aman dan Gerakan Sehat",
    description:
      "Olahraga terbaik dan aktivitas fisik yang aman untuk awal trimester kedua.",
    image: "/main/journal/journal.jpg",
    category: "Olahraga",
    author: "Dr. Lisa Dewi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "5 menit baca",
  },
  {
    id: "trending-5",
    title: "Bulan 5 Kehamilan: Merasakan Gerakan Bayi Pertama",
    description:
      "Memahami quickening dan apa yang diharapkan saat merasakan gerakan bayi untuk pertama kali.",
    image: "/main/journal/journal.jpg",
    category: "Perkembangan Bayi",
    author: "Dr. Anna Fitri",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
  {
    id: "trending-6",
    title: "Bulan 6 Kehamilan: Tips Tidur dan Posisi Nyaman",
    description:
      "Cara mendapatkan tidur berkualitas selama kehamilan dengan posisi tidur yang aman dan nyaman.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Umum",
    author: "Dr. Maria Indah",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "5 menit baca",
  },
];

export const breakingNews: Article[] = [
  {
    id: "breaking-1",
    title: "Bulan 7 Kehamilan: Persiapan Memasuki Trimester Ketiga",
    description:
      "Persiapan penting dan apa yang diharapkan saat memasuki trimester ketiga kehamilan.",
    image: "/main/journal/journal.jpg",
    category: "Trimester Ketiga",
    author: "Dr. Emily Sari",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
  {
    id: "breaking-2",
    title: "Bulan 8 Kehamilan: Mengatasi Ketidaknyamanan dan Gejala",
    description:
      "Tips mengatasi ketidaknyamanan trimester ketiga seperti sakit punggung dan pembengkakan.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Umum",
    author: "Dr. Michael Budi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 menit baca",
  },
  {
    id: "breaking-3",
    title: "Bulan 9 Kehamilan: Tanda-tanda Persalinan dan Persiapan Lahir",
    description:
      "Mengenali tanda-tanda persalinan dan persiapan akhir untuk kelahiran bayi Anda.",
    image: "/main/journal/journal.jpg",
    category: "Persalinan",
    author: "Dr. Sarah Amelia",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "8 menit baca",
  },
  {
    id: "breaking-4",
    title: "Bulan Pertama Setelah Konsepsi: Do's dan Don'ts Penting",
    description:
      "Perubahan gaya hidup penting dan tindakan pencegahan di bulan pertama kehamilan.",
    image: "/main/journal/journal.jpg",
    category: "Trimester Pertama",
    author: "Dr. Anna Fitri",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "5 menit baca",
  },
  {
    id: "breaking-5",
    title: "Kehamilan Bulan 2: Mengatasi Kelelahan dan Perubahan Mood",
    description:
      "Memahami dan mengelola perubahan emosional serta fisik di bulan kedua kehamilan.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Umum",
    author: "Dr. Lisa Dewi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
];

export const blogArticles: Article[] = [
  {
    id: "blog-1",
    title: "Bulan 3 Kehamilan: Panduan Kunjungan Prenatal Pertama",
    description:
      "Apa yang diharapkan selama kunjungan prenatal pertama dan pertanyaan penting untuk dokter.",
    image: "/main/journal/journal.jpg",
    category: "Perawatan Prenatal",
    author: "Dr. Maria Indah",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
  {
    id: "blog-2",
    title: "Bulan 4 Kehamilan: Memahami Perkembangan Bayi",
    description:
      "Pelajari milestone pertumbuhan dan perkembangan bayi selama bulan keempat kehamilan.",
    image: "/main/journal/journal.jpg",
    category: "Perkembangan Bayi",
    author: "Dr. Sarah Amelia",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 menit baca",
  },
  {
    id: "blog-3",
    title: "Bulan 5 Kehamilan: Panduan Kenaikan Berat Badan Sehat",
    description:
      "Saran ahli tentang kenaikan berat badan yang tepat selama kehamilan dan tips makan sehat.",
    image: "/main/journal/journal.jpg",
    category: "Nutrisi",
    author: "Dr. Lisa Dewi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
  {
    id: "blog-4",
    title: "Bulan 6 Kehamilan: Mengatasi Heartburn dan Gangguan Pencernaan",
    description:
      "Obat alami dan tips diet untuk mengurangi heartburn selama kehamilan.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Umum",
    author: "Dr. Michael Budi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "5 menit baca",
  },
  {
    id: "blog-5",
    title: "Bulan 7 Kehamilan: Persiapan Kedatangan Bayi",
    description:
      "Persiapan penting untuk kamar bayi dan tips packing tas rumah sakit.",
    image: "/main/journal/journal.jpg",
    category: "Persalinan",
    author: "Dr. Emily Sari",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "8 menit baca",
  },
  {
    id: "blog-6",
    title: "Bulan 8 Kehamilan: Latihan Pernapasan untuk Persalinan",
    description:
      "Pelajari teknik pernapasan dan metode relaksasi untuk persiapan persalinan.",
    image: "/main/journal/journal.jpg",
    category: "Persalinan",
    author: "Dr. Anna Fitri",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
  {
    id: "blog-7",
    title: "Bulan 9 Kehamilan: Tanda Persalinan dan Kapan ke Rumah Sakit",
    description:
      "Mengenali tanda persalinan sejati dan mengetahui kapan saatnya menuju rumah sakit.",
    image: "/main/journal/journal.jpg",
    category: "Persalinan",
    author: "Dr. Sarah Amelia",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 menit baca",
  },
];

export const mentalHealthArticles: Article[] = [
  {
    id: "mental-1",
    title: "Kecemasan Kehamilan Bulan ke Bulan: Strategi Mengatasi",
    description:
      "Memahami kecemasan kehamilan dan mekanisme coping yang efektif untuk setiap trimester.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Mental",
    author: "Dr. Anna Fitri",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 menit baca",
  },
  {
    id: "mental-2",
    title: "Mindfulness Selama Kehamilan: Panduan Bulan ke Bulan",
    description:
      "Cara mempraktikkan mindfulness dan meditasi sepanjang perjalanan kehamilan Anda.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Mental",
    author: "Dr. Lisa Dewi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "8 menit baca",
  },
  {
    id: "mental-3",
    title: "Mengelola Mood Swing di Awal Kehamilan (Bulan 1-3)",
    description:
      "Memahami perubahan mood hormonal dan strategi untuk keseimbangan emosional.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Mental",
    author: "Dr. Emily Sari",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
  {
    id: "mental-4",
    title: "Stres Trimester Ketiga: Persiapan Mental untuk Persalinan",
    description:
      "Teknik persiapan mental untuk persalinan dan mengelola kecemasan pra-kelahiran.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Mental",
    author: "Dr. Michael Budi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 menit baca",
  },
];

export const pregnancyCareArticles: Article[] = [
  {
    id: "care-1",
    title: "Bulan 1-2 Kehamilan: Tips Perawatan Awal yang Penting",
    description:
      "Langkah perawatan kehamilan awal yang kritis dan perubahan gaya hidup untuk awal yang sehat.",
    image: "/main/journal/journal.jpg",
    category: "Perawatan Prenatal",
    author: "Dr. Sarah Amelia",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
  {
    id: "care-2",
    title: "Perawatan Pertengahan Kehamilan: Panduan Kesehatan Bulan 4-6",
    description:
      "Panduan kesehatan penting dan tips perawatan untuk bulan-bulan trimester kedua.",
    image: "/main/journal/journal.jpg",
    category: "Trimester Kedua",
    author: "Dr. Michael Budi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 menit baca",
  },
  {
    id: "care-3",
    title: "Perawatan Akhir Kehamilan: Persiapan Bulan 7-9",
    description:
      "Panduan perawatan komprehensif untuk trimester ketiga dan persiapan persalinan.",
    image: "/main/journal/journal.jpg",
    category: "Trimester Ketiga",
    author: "Dr. Emily Sari",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "8 menit baca",
  },
  {
    id: "care-4",
    title: "Nutrisi Kehamilan Bulan ke Bulan: Makanan Penting",
    description:
      "Panduan nutrisi lengkap dengan makanan essential untuk setiap bulan kehamilan.",
    image: "/main/journal/journal.jpg",
    category: "Nutrisi",
    author: "Dr. Lisa Dewi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "9 menit baca",
  },
  {
    id: "care-5",
    title: "Keamanan Olahraga Sepanjang Kehamilan: Panduan Bulan ke Bulan",
    description:
      "Rutinitas olahraga aman dan modifikasi untuk setiap tahap kehamilan Anda.",
    image: "/main/journal/journal.jpg",
    category: "Olahraga",
    author: "Dr. Anna Fitri",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 menit baca",
  },
  {
    id: "care-6",
    title: "Tanda Bahaya Kehamilan: Yang Harus Diwaspadai Setiap Bulan",
    description:
      "Tanda bahaya penting dan gejala yang memerlukan perhatian medis segera.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Umum",
    author: "Dr. Maria Indah",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
];

export const nutritionArticles: Article[] = [
  {
    id: "nutrition-1",
    title: "Bulan 1 Kehamilan: Asam Folat dan Nutrisi Penting",
    description:
      "Nutrisi kritis yang dibutuhkan di awal kehamilan termasuk asam folat, zat besi, dan kalsium.",
    image: "/main/journal/journal.jpg",
    category: "Nutrisi",
    author: "Dr. Sarah Amelia",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "5 menit baca",
  },
  {
    id: "nutrition-2",
    title: "Bulan 2-3 Kehamilan: Makanan untuk Mengatasi Morning Sickness",
    description:
      "Makanan dan camilan terbaik untuk membantu mengurangi mual dan menjaga nutrisi selama awal kehamilan.",
    image: "/main/journal/journal.jpg",
    category: "Nutrisi",
    author: "Dr. Emily Sari",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
  {
    id: "nutrition-3",
    title: "Bulan 4-6 Kehamilan: Dorongan Nutrisi Trimester Kedua",
    description:
      "Kebutuhan kalori yang meningkat dan nutrisi penting untuk bayi yang berkembang di trimester kedua.",
    image: "/main/journal/journal.jpg",
    category: "Nutrisi",
    author: "Dr. Michael Budi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 menit baca",
  },
  {
    id: "nutrition-4",
    title: "Bulan 7-9 Kehamilan: Fokus Nutrisi Trimester Ketiga",
    description:
      "Nutrisi penting untuk perkembangan otak bayi dan mempersiapkan tubuh untuk menyusui.",
    image: "/main/journal/journal.jpg",
    category: "Nutrisi",
    author: "Dr. Lisa Dewi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
];

export const exerciseArticles: Article[] = [
  {
    id: "exercise-1",
    title: "Bulan 1-3 Kehamilan: Olahraga Aman Trimester Pertama",
    description:
      "Olahraga ringan dan aktivitas yang aman selama trimester pertama kehamilan Anda.",
    image: "/main/journal/journal.jpg",
    category: "Olahraga",
    author: "Dr. Anna Fitri",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
  {
    id: "exercise-2",
    title: "Bulan 4-6 Kehamilan: Membangun Kekuatan untuk Trimester Kedua",
    description:
      "Latihan penguatan dan rutinitas yoga prenatal untuk trimester kedua Anda.",
    image: "/main/journal/journal.jpg",
    category: "Olahraga",
    author: "Dr. Maria Indah",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 menit baca",
  },
  {
    id: "exercise-3",
    title: "Bulan 7-9 Kehamilan: Mempersiapkan Tubuh untuk Persalinan",
    description:
      "Latihan khusus untuk mempersiapkan tubuh Anda untuk persalinan di trimester ketiga.",
    image: "/main/journal/journal.jpg",
    category: "Olahraga",
    author: "Dr. Sarah Amelia",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "8 menit baca",
  },
];

export const symptomManagementArticles: Article[] = [
  {
    id: "symptoms-1",
    title: "Bulan 1-2 Kehamilan: Mengelola Gejala Awal Kehamilan",
    description:
      "Mengatasi kelelahan, nyeri payudara, dan perubahan mood di awal kehamilan.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Umum",
    author: "Dr. Emily Sari",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
  {
    id: "symptoms-2",
    title: "Bulan 3-5 Kehamilan: Mengatasi Tantangan Transisi Trimester",
    description:
      "Mengelola gejala transisi dan ketidaknyamanan umum di pertengahan kehamilan.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Umum",
    author: "Dr. Michael Budi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 menit baca",
  },
  {
    id: "symptoms-3",
    title: "Bulan 6-8 Kehamilan: Tips Kenyamanan Trimester Ketiga",
    description:
      "Mengelola sakit punggung, pembengkakan, dan kesulitan tidur di akhir kehamilan.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Umum",
    author: "Dr. Lisa Dewi",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit baca",
  },
  {
    id: "symptoms-4",
    title: "Bulan 9 Kehamilan: Kenyamanan dan Persiapan Minggu Terakhir",
    description:
      "Mengelola ketidaknyamanan bulan terakhir dan persiapan mental serta fisik untuk persalinan.",
    image: "/main/journal/journal.jpg",
    category: "Kesehatan Umum",
    author: "Dr. Anna Fitri",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "5 menit baca",
  },
];
