"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  IconBookmark,
  IconArrowLeft,
  IconClock,
  IconShare,
  IconHeartHandshake,
  IconMoodSad,
} from "@tabler/icons-react";
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

// Transform external articles to match our interface
const transformArticleData = (
  articles: any[],
  source: string
): ArticleExtended[] => {
  return articles.map((article, index) => ({
    ...article,
    id: article.id,
    excerpt:
      article.description ||
      "Artikel informatif seputar kehamilan dan kesehatan ibu hamil...",
    content: article.description || "Konten artikel akan tersedia segera...",
    views: 0,
    likes: 0,
    tags: [article.category.toLowerCase(), "kehamilan", "tips"],
    isBookmarked: false,
    publishedAt: "2024-12-15",
  }));
};

// Combine all articles
const allExternalArticles = [
  ...transformArticleData(trendingArticles, "trending"),
  ...transformArticleData(breakingNews, "breaking"),
  ...transformArticleData(blogArticles, "blog"),
  ...transformArticleData(mentalHealthArticles, "mental"),
  ...transformArticleData(pregnancyCareArticles, "care"),
];

export default function SavedArticlesPage() {
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

  // Filter only bookmarked articles
  const savedArticles = allExternalArticles.filter((article) =>
    bookmarkedArticles.includes(article.id)
  );

  // Empty state component
  const EmptyState = () => (
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
          <IconMoodSad className="w-16 h-16 text-[#D291BC]/40" />
        </div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-gray-700 mb-3"
      >
        Belum Ada Artikel Tersimpan
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-500 max-w-md mx-auto mb-6"
      >
        Mulai simpan artikel favorit Anda dengan menekan ikon bookmark pada
        artikel yang Anda sukai.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link href="/main/journal">
          <button className="bg-gradient-to-r from-[#D291BC] to-pink-400 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg transition-all">
            Jelajahi Artikel
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#FFF5F7] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <Link href="/main/journal">
            <motion.div
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-2xl bg-white shadow-sm border border-[#D291BC]/10 hover:shadow-md transition-all"
            >
              <IconArrowLeft className="w-5 h-5 text-[#D291BC]" />
            </motion.div>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <IconBookmark className="w-8 h-8 text-[#D291BC]" />
              Artikel Tersimpan
            </h1>
            <p className="text-gray-600 mt-1">
              {mounted ? bookmarkedArticles.length : 0} artikel disimpan
            </p>
          </div>
        </motion.div>

        {/* Content */}
        {savedArticles.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {savedArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-3xl shadow-sm overflow-hidden border border-[#D291BC]/10 hover:shadow-md transition-all"
              >
                {/* Article Image */}
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    onError={(e: any) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <button
                    onClick={() => toggleBookmark(article.id)}
                    className="absolute top-3 right-3 p-2 bg-[#D291BC] text-white rounded-full transition-all z-10 hover:bg-[#C86B85]"
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
          </motion.div>
        )}

        {/* Quick Actions */}
        {savedArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-[#D291BC]/10">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <IconHeartHandshake className="w-5 h-5 text-[#D291BC]" />
                Tips Berguna
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Artikel yang Anda simpan akan tetap tersedia untuk dibaca kapan
                saja. Bagikan dengan keluarga dan teman untuk berbagi
                pengetahuan!
              </p>
              <Link href="/main/journal">
                <button className="bg-gradient-to-r from-[#D291BC]/10 to-[#FFE3EC] text-[#D291BC] px-6 py-3 rounded-2xl font-medium hover:from-[#D291BC] hover:to-pink-400 hover:text-white transition-all">
                  Cari Artikel Lainnya
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
