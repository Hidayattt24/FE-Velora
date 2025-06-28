"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ProfileHeader } from "@/components/ui/profile-header";
import {
  trendingArticles,
  breakingNews,
  blogArticles,
  mentalHealthArticles,
  pregnancyCareArticles,
} from "@/lib/data/journal-articles";

// Mock data for local articles that matches the main journal page
const localArticles = [
  {
    id: "1",
    title: "Tips Mengatasi Mual Morning Sickness",
    description:
      "Cara alami dan efektif untuk mengurangi rasa mual di trimester pertama kehamilan...",
    image: "/main/journal/tips-1.jpg",
    category: "Trimester 1",
    author: "Dr. Sarah Wijaya",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "5 menit",
  },
  {
    id: "2",
    title: "Nutrisi Penting untuk Trimester Kedua",
    description:
      "Panduan lengkap nutrisi yang dibutuhkan ibu dan bayi di trimester kedua...",
    image: "/main/journal/nutrition.jpg",
    category: "Trimester 2",
    author: "Dr. Ani Susanti",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 menit",
  },
  {
    id: "3",
    title: "Persiapan Persalinan di Trimester Ketiga",
    description:
      "Tips dan persiapan mental serta fisik menjelang persalinan...",
    image: "/main/journal/birth-prep.jpg",
    category: "Trimester 3",
    author: "Dr. Maya Indira",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "8 menit",
  },
  {
    id: "4",
    title: "Olahraga Aman untuk Ibu Hamil",
    description:
      "Jenis-jenis olahraga yang aman dan bermanfaat selama kehamilan...",
    image: "/main/journal/exercise.jpg",
    category: "Umum",
    author: "Dr. Fitri Handayani",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 menit",
  },
  {
    id: "5",
    title: "Mengenali Tanda-Tanda Bahaya Kehamilan",
    description:
      "Waspadai tanda-tanda yang memerlukan perhatian medis segera...",
    image: "/main/journal/warning-signs.jpg",
    category: "Kesehatan",
    author: "Dr. Budi Santoso",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "10 menit",
  },
  {
    id: "6",
    title: "Tips Bonding dengan Bayi dalam Kandungan",
    description:
      "Cara membangun ikatan emosional dengan bayi sejak dalam kandungan...",
    image: "/main/journal/bonding.jpg",
    category: "Psikologi",
    author: "Dr. Rina Sari",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "5 menit",
  },
];

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Combine all articles to find the one with matching id
  const allArticles = [
    ...trendingArticles,
    ...breakingNews,
    ...blogArticles,
    ...mentalHealthArticles,
    ...pregnancyCareArticles,
    ...localArticles,
  ];
  const article = allArticles.find((article) => article.id === id);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProfileHeader />
        <div className="max-w-4xl mx-auto mt-8">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Article not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader />

      <button
        onClick={() => router.back()}
        className="mt-8 mb-8 flex items-center gap-2 text-[#D291BC] hover:text-pink-300 transition-colors py-3 px-6 text-lg rounded-xl font-semibold "
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Kembali
      </button>

      <article className="max-w-4xl mx-auto mt-8">
        <div className="aspect-[16/9] relative rounded-2xl overflow-hidden mb-8">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <Image
            src={article.authorImage}
            alt={article.author}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h3 className="font-medium text-gray-800">{article.author}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{article.readTime}</span>
              <span>·</span>
              <span>{article.category}</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>

        {article.description && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.description}
          </p>
        )}

        <div className="prose prose-lg max-w-none">
          <div className="bg-pink-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-[#D291BC] mb-4">
              Ringkasan Artikel
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Poin penting pertama tentang {article.title}</li>
              <li>Wawasan utama tentang topik ini</li>
              <li>Penerapan praktis atau saran yang berguna</li>
              <li>Pertimbangan penting yang perlu diingat</li>
            </ul>
          </div>

          <div className="space-y-6 text-gray-700">
            <p>{article.description}</p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Mengapa Ini Penting?
            </h3>

            <p>
              Informasi dalam artikel ini sangat penting untuk dipahami oleh
              setiap ibu hamil. Dengan memahami topik ini, Anda dapat membuat
              keputusan yang lebih baik untuk kesehatan Anda dan bayi.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Tips Praktis
            </h3>

            <div className="bg-blue-50 rounded-lg p-6">
              <ul className="list-decimal list-inside space-y-2">
                <li>Konsultasikan selalu dengan dokter kandungan Anda</li>
                <li>Jaga pola makan yang sehat dan bergizi</li>
                <li>Lakukan pemeriksaan rutin sesuai jadwal</li>
                <li>Istirahat yang cukup dan hindari stres berlebihan</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Kesimpulan
            </h3>

            <p>
              Artikel ini memberikan panduan komprehensif tentang{" "}
              {article.title.toLowerCase()}. Ingatlah bahwa setiap kehamilan
              adalah unik, jadi selalu konsultasikan dengan tenaga medis
              profesional untuk mendapatkan saran yang sesuai dengan kondisi
              Anda.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> Informasi dalam artikel ini hanya
                untuk tujuan edukasi dan tidak dapat menggantikan konsultasi
                medis profesional. Selalu konsultasikan dengan dokter Anda untuk
                mendapatkan saran medis yang tepat.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
