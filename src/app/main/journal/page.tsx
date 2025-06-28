"use client";

import { motion } from "framer-motion";
import {
  IconBookmark,
  IconClock,
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
import Image from "next/image";
import { useState, useEffect } from "react";
import { ProfileHeader } from "@/components/ui/profile-header";
import {
  trendingArticles,
  breakingNews,
  blogArticles,
  mentalHealthArticles,
  pregnancyCareArticles,
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
const transformArticleData = (
  articles: any[],
  source: string
): ArticleExtended[] => {
  return articles.map((article, index) => ({
    ...article,
    id: article.id, // Use original ID from the data
    excerpt:
      article.description ||
      "Artikel informatif seputar kehamilan dan kesehatan ibu hamil...",
    content: article.description || "Konten artikel akan tersedia segera...",
    views: 0, // Remove views
    likes: 0, // Remove likes
    tags: [article.category.toLowerCase(), "kehamilan", "tips"],
    isBookmarked: false, // Set default to false to avoid hydration mismatch
    publishedAt: "2024-12-15", // Fixed date to avoid hydration issues
  }));
};

// Combine and transform all articles (removed featured articles)
const allExternalArticles = [
  ...transformArticleData(trendingArticles, "trending"),
  ...transformArticleData(breakingNews, "breaking"),
  ...transformArticleData(blogArticles, "blog"),
  ...transformArticleData(mentalHealthArticles, "mental"),
  ...transformArticleData(pregnancyCareArticles, "care"),
];
const articles = allExternalArticles;

// Generate categories based on actual article data
const generateCategories = () => {
  const categoryCounts = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryIcons = {
    Technology: <IconShield className="w-4 h-4" />,
    Education: <IconFileText className="w-4 h-4" />,
    Lifestyle: <IconMoodSmile className="w-4 h-4" />,
    Nutrition: <IconApple className="w-4 h-4" />,
    Research: <IconActivity className="w-4 h-4" />,
    Blog: <IconFileText className="w-4 h-4" />,
    Wellness: <IconHeartbeat className="w-4 h-4" />,
    "Mental Health": <IconMoodSmile className="w-4 h-4" />,
    "Pregnancy Care": <IconBabyCarriage className="w-4 h-4" />,
  };

  // Only include categories that have articles
  const existingCategories = Object.keys(categoryCounts);

  const categories = [
    {
      name: "Semua",
      icon: <IconStar className="w-4 h-4" />,
      count: articles.length,
    },
    ...existingCategories.map((category) => ({
      name: category,
      icon: categoryIcons[category as keyof typeof categoryIcons] || (
        <IconFileText className="w-4 h-4" />
      ),
      count: categoryCounts[category] || 0,
    })),
  ];

  return categories;
};

const categories = generateCategories();

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load bookmarked articles from localStorage
    const saved = localStorage.getItem("bookmarkedArticles");
    if (saved) {
      setBookmarkedArticles(JSON.parse(saved));
    }
  }, []);

  const toggleBookmark = (articleId: string) => {
    const updatedBookmarks = bookmarkedArticles.includes(articleId)
      ? bookmarkedArticles.filter((id) => id !== articleId)
      : [...bookmarkedArticles, articleId];

    setBookmarkedArticles(updatedBookmarks);
    localStorage.setItem(
      "bookmarkedArticles",
      JSON.stringify(updatedBookmarks)
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
            <div className="bg-white rounded-3xl shadow-sm p-4 lg:p-6 border border-[#D291BC]/10 sticky top-6">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <IconFilter className="w-5 h-5 text-[#D291BC]" />
                Kategori
              </h2>

              {/* Mobile: Horizontal scrollable categories */}
              <div className="lg:hidden">
                <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                  {categories.map((category, index) => (
                    <button
                      key={`mobile-${category.name}-${index}`}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-full transition-all text-xs font-medium ${
                        selectedCategory === category.name
                          ? "bg-gradient-to-r from-[#D291BC] to-pink-400 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <span className="w-3 h-3 flex-shrink-0">
                        {category.icon}
                      </span>
                      <span className="whitespace-nowrap text-xs">
                        {category.name}
                      </span>
                      {category.count > 0 && (
                        <span
                          className={`text-xs px-1 py-0.5 rounded-full min-w-[16px] text-center leading-none ${
                            selectedCategory === category.name
                              ? "bg-white/20 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {category.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop: Vertical categories */}
              <div className="hidden lg:block space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={`desktop-${category.name}-${index}`}
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
              <div className="mt-6 pt-6 border-t border-gray-100 hidden lg:block">
                <Link href="/main/journal/saved">
                  <div className="cursor-pointer hover:bg-gray-50 p-3 rounded-2xl transition-colors">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <IconBookmark className="w-5 h-5 text-[#D291BC]" />
                      Artikel Tersimpan
                    </h3>
                    <p className="text-sm text-gray-600">
                      {mounted ? bookmarkedArticles.length : 0} artikel disimpan
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {filteredArticles.length === 0 ? (
              <EmptyState category={selectedCategory} />
            ) : (
              <>
                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      className="bg-white rounded-3xl shadow-sm overflow-hidden border border-[#D291BC]/10 hover:shadow-md transition-all"
                    >
                      {/* Article Image */}
                      <div className="aspect-video bg-gradient-to-br from-[#FFE3EC] to-[#D291BC]/20 relative overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                          onError={(e: any) => {
                            // Fallback to default styling if image fails to load
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <button
                          onClick={() => toggleBookmark(article.id)}
                          className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 ${
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
                              <span className="text-gray-400">•</span>
                              <span>{article.author}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
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

        {/* Mobile: Saved Articles Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:hidden mt-6"
        >
          <Link href="/main/journal/saved">
            <div className="bg-white rounded-3xl shadow-sm p-4 border border-[#D291BC]/10 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#FFE3EC] p-2.5 rounded-xl">
                    <IconBookmark className="w-5 h-5 text-[#D291BC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Artikel Tersimpan
                    </h3>
                    <p className="text-sm text-gray-600">
                      {mounted ? bookmarkedArticles.length : 0} artikel disimpan
                    </p>
                  </div>
                </div>
                <div className="text-[#D291BC]">
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
