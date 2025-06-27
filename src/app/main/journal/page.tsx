"use client";

import { motion } from "framer-motion";
import {
  IconBookmark,
  IconClock,
  IconEye,
  IconHeart,
  IconShare,
  IconSearch,
  IconFilter,
  IconStar,
  IconBabyCarriage,
  IconHeartbeat,
  IconApple,
  IconMoodSmile,
  IconShield,
  IconActivity,
  IconFileText,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { ProfileHeader } from "@/components/ui/profile-header";
import {
  featuredArticles,
  trendingArticles,
  breakingNews,
  blogArticles,
} from "@/lib/data/journal-articles";

// Interface untuk artikel yang diperlukan di halaman ini
interface ArticleExtended {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  readTime: string;
  views: number;
  likes: number;
  image: string;
  tags: string[];
  isBookmarked: boolean;
  publishedAt: string;
  author: string;
  authorImage?: string;
}

// Transform external articles to match our interface and add additional data
const transformArticleData = (articles: any[]): ArticleExtended[] => {
  return articles.map((article, index) => ({
    ...article,
    excerpt:
      article.description ||
      "Artikel informatif seputar kehamilan dan kesehatan ibu hamil...",
    content: article.description || "Konten artikel akan tersedia segera...",
    views: Math.floor(Math.random() * 2000) + 500, // Random views
    likes: Math.floor(Math.random() * 200) + 20, // Random likes
    tags: [article.category.toLowerCase(), "kehamilan", "tips"],
    isBookmarked: Math.random() > 0.7, // Random bookmark status
    publishedAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // Random date in last 10 days
  }));
};

// Combine and transform all articles
const allExternalArticles = [
  ...featuredArticles,
  ...trendingArticles,
  ...breakingNews,
  ...blogArticles,
];
const articles = transformArticleData(allExternalArticles);

// Generate categories based on actual article data
const generateCategories = () => {
  const categoryCounts = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryIcons = {
    Health: <IconShield className="w-4 h-4" />,
    Nutrition: <IconApple className="w-4 h-4" />,
    Fitness: <IconActivity className="w-4 h-4" />,
    Psychology: <IconMoodSmile className="w-4 h-4" />,
    General: <IconStar className="w-4 h-4" />,
    "Trimester 1": <IconBabyCarriage className="w-4 h-4" />,
    "Trimester 2": <IconHeartbeat className="w-4 h-4" />,
    "Trimester 3": <IconApple className="w-4 h-4" />,
  };

  const categories = [
    {
      name: "Semua",
      icon: <IconStar className="w-4 h-4" />,
      count: articles.length,
    },
    ...Object.entries(categoryCounts).map(([category, count]) => ({
      name: category,
      icon: categoryIcons[category as keyof typeof categoryIcons] || (
        <IconFileText className="w-4 h-4" />
      ),
      count,
    })),
  ];

  return categories;
};

const categories = generateCategories();

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>(
    articles
      .filter((article) => article.isBookmarked)
      .map((article) => article.id)
  );

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "Semua" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles[0] || articles[0]; // Featured article (most recent or popular)

  // Empty state component with interactive SVG
  const EmptyState = ({ category }: { category: string }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-6"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="mb-8"
      >
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#FFE3EC] to-[#D291BC]/20 rounded-full flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <IconFileText className="w-16 h-16 text-[#D291BC]" />
          </motion.div>
        </div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-gray-700 mb-3"
      >
        Belum Ada Artikel di Kategori "{category}"
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-500 max-w-md mx-auto"
      >
        Kami sedang menyiapkan konten terbaru untuk kategori ini. Coba
        eksplorasi kategori lain atau kembali lagi nanti!
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSelectedCategory("Semua")}
        className="mt-6 bg-gradient-to-r from-[#D291BC] to-pink-400 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg transition-all"
      >
        Lihat Semua Artikel
      </motion.button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#FFF5F7] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6 border border-[#D291BC]/10"
        >
          <ProfileHeader />
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6 border border-[#D291BC]/10"
        >
          <div className="relative max-w-md mx-auto">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D291BC]/20 focus:border-[#D291BC] transition-all"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-[#D291BC]/10 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <IconFilter className="w-5 h-5 text-[#D291BC]" />
                Kategori
              </h2>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                      selectedCategory === category.name
                        ? "bg-gradient-to-r from-[#D291BC] to-pink-400 text-white"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <span className="font-medium text-sm">
                        {category.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        selectedCategory === category.name
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Bookmark Section */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <IconBookmark className="w-5 h-5 text-[#D291BC]" />
                  Artikel Tersimpan
                </h3>
                <p className="text-sm text-gray-600">
                  {bookmarkedArticles.length} artikel disimpan
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {filteredArticles.length === 0 ? (
              <EmptyState category={selectedCategory} />
            ) : (
              <>
                {/* Featured Article */}
                {featuredArticle && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-sm overflow-hidden border border-[#D291BC]/10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-[#FFE3EC] to-[#D291BC]/20 rounded-2xl flex items-center justify-center">
                          <IconBabyCarriage className="w-16 h-16 text-[#D291BC]" />
                        </div>
                        <div className="absolute top-3 left-3 bg-[#D291BC] text-white px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="mb-3">
                          <span className="bg-[#FFE3EC] text-[#C86B85] px-3 py-1 rounded-full text-xs font-medium">
                            {featuredArticle.category}
                          </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                          {featuredArticle.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {featuredArticle.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <IconClock className="w-4 h-4" />
                            {featuredArticle.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <IconEye className="w-4 h-4" />
                            {featuredArticle.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <IconHeart className="w-4 h-4" />
                            {featuredArticle.likes}
                          </div>
                        </div>
                        <Link href={`/main/journal/${featuredArticle.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-r from-[#D291BC] to-pink-400 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg transition-all w-full md:w-auto"
                          >
                            Baca Selengkapnya
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.slice(1).map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="bg-white rounded-3xl shadow-sm overflow-hidden border border-[#D291BC]/10 hover:shadow-md transition-all"
                    >
                      {/* Article Image */}
                      <div className="aspect-video bg-gradient-to-br from-[#FFE3EC] to-[#D291BC]/20 flex items-center justify-center relative">
                        <IconHeartbeat className="w-12 h-12 text-[#D291BC]" />
                        <button
                          onClick={() => toggleBookmark(article.id)}
                          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                            bookmarkedArticles.includes(article.id)
                              ? "bg-[#D291BC] text-white"
                              : "bg-white/80 text-gray-600 hover:bg-white"
                          }`}
                        >
                          <IconBookmark className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Article Content */}
                      <div className="p-6">
                        <div className="mb-3">
                          <span className="bg-[#FFE3EC] text-[#C86B85] px-3 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>

                        {/* Article Meta */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <IconClock className="w-3 h-3" />
                              {article.readTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <IconEye className="w-3 h-3" />
                              {article.views}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                              <IconHeart className="w-3 h-3" />
                              {article.likes}
                            </button>
                            <button className="hover:text-[#D291BC] transition-colors">
                              <IconShare className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Read More Button */}
                        <Link href={`/main/journal/${article.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-[#FFE3EC] to-[#D291BC]/10 text-[#D291BC] py-3 rounded-2xl font-medium hover:from-[#D291BC] hover:to-pink-400 hover:text-white transition-all"
                          >
                            Baca Artikel
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Load More Button */}
                {filteredArticles.length > 6 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <button className="bg-white border border-[#D291BC] text-[#D291BC] px-8 py-3 rounded-2xl font-medium hover:bg-[#D291BC] hover:text-white transition-all">
                      Muat Lebih Banyak
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
