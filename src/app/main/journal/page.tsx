"use client";

import { ProfileHeader } from "@/components/ui/profile-header";
import Image from "next/image";
import { IconTrendingUp, IconFlame, IconBookmark } from "@tabler/icons-react";
import {
  featuredArticles,
  trendingArticles,
  breakingNews,
  blogArticles,
} from "@/lib/data/journal-articles";
import Link from "next/link";
import { CategoryFilter } from "@/components/ui/category-filter";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Kategori utama yang relevan untuk project ini (pastikan "all" hanya satu)
  const categories = [
    "Health",
    "Nutrition",
    "Fitness",
    "Technology",
    "Education",
    "Lifestyle",
    "Research",
    "Blog",
    "Wellness",
  ];

  // Get unique categories from all articles
  const uniqueCategories = useMemo(() => {
    const allArticles = [
      ...featuredArticles,
      ...trendingArticles,
      ...breakingNews,
      ...blogArticles,
    ];
    const categoriesSet = new Set(
      allArticles.map((article) => article.category)
    );
    return Array.from(categoriesSet);
  }, []);

  // Filter articles by category
  const filterArticles = (articles: typeof featuredArticles) => {
    if (selectedCategory === "all") return articles;
    return articles.filter((article) => article.category === selectedCategory);
  };

  const filteredFeatured = filterArticles(featuredArticles);
  const filteredTrending = filterArticles(trendingArticles);
  const filteredBreaking = filterArticles(breakingNews);
  // const filteredBlog = filterArticles(blogArticles); // Tidak dipakai lagi

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader />

      {/* Category Filter - Centered */}
      <div className="flex justify-center mb-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Featured Articles - Swiper */}
      <section className="mb-12">
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {filteredFeatured.length > 0 ? (
            filteredFeatured.map((article) => (
              <SwiperSlide key={article.id}>
                <Link
                  href={`/main/journal/${article.id}`}
                  className="block group"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-[400px]">
                    <div className="h-full relative">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <span className="text-white/80 text-sm">
                        {article.category}
                      </span>
                      <h3 className="text-white text-xl font-semibold mt-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center mt-4 space-x-3">
                        <Image
                          src={article.authorImage}
                          alt={article.author}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="text-white/90 text-sm">
                          {article.author}
                        </span>
                        <span className="text-white/70 text-sm">·</span>
                        <span className="text-white/70 text-sm">
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <div className="col-span-full flex justify-center">
              <EmptyStateIllustration />
            </div>
          )}
        </Swiper>
      </section>

      {/* Trending & Editor's Picks - Swiper */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <IconTrendingUp className="w-6 h-6 text-[#D291BC]" />
            <h2 className="text-xl font-semibold text-[#D291BC]">
              Trending & Editor's Picks
            </h2>
          </div>
        </div>
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {filteredTrending.length > 0 ? (
            filteredTrending.map((article) => (
              <SwiperSlide key={article.id}>
                <Link
                  href={`/main/journal/${article.id}`}
                  className="block group"
                >
                  <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-[320px]">
                    <div className="h-[180px] relative">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 h-[140px] flex flex-col">
                      <span className="text-[#D291BC]/80 text-sm">
                        {article.category}
                      </span>
                      <h3 className="text-gray-800 font-medium mt-2 group-hover:text-[#D291BC] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <span className="text-gray-500 text-sm mt-auto">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <div className="col-span-full flex justify-center">
              <EmptyStateIllustration />
            </div>
          )}
        </Swiper>
      </section>

      {/* Blog Articles - Swiper */}
      <section className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <IconBookmark className="w-6 h-6 text-[#D291BC]" />
          <h2 className="text-xl font-semibold text-[#D291BC]">Blog & Tips</h2>
        </div>
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {filterArticles(blogArticles).length > 0 ? (
            filterArticles(blogArticles).map((blog) => (
              <SwiperSlide key={blog.id}>
                <Link href={`/main/journal/${blog.id}`} className="block group">
                  <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-[320px]">
                    <div className="h-[180px] relative">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 h-[140px] flex flex-col">
                      <span className="text-[#D291BC]/80 text-sm">
                        {blog.category}
                      </span>
                      <h3 className="text-gray-800 font-medium mt-2 group-hover:text-[#D291BC] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <span className="text-gray-500 text-sm mt-auto">
                        {blog.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <div className="col-span-full flex justify-center">
              <EmptyStateIllustration />
            </div>
          )}
        </Swiper>
      </section>

      {/* Breaking News (tetap grid biasa) */}
      <section className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <IconFlame className="w-6 h-6 text-[#D291BC]" />
          <h2 className="text-xl font-semibold text-[#D291BC]">
            Breaking News
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {filteredBreaking.length > 0 ? (
            filteredBreaking.map((news) => (
              <Link
                href={`/main/journal/${news.id}`}
                key={news.id}
                className="block group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 h-[240px] relative rounded-xl overflow-hidden">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#D291BC] transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {news.description}
                      </p>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={news.authorImage}
                          alt={news.author}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="text-gray-700">{news.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex justify-center">
              <EmptyStateIllustration />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Komponen ilustrasi kosong: orang baca koran
function EmptyStateIllustration() {
  return (
    <div className="flex flex-col items-center justify-center py-16 w-full">
      <motion.svg
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        width={120}
        height={120}
        viewBox="0 0 120 120"
        fill="none"
        className="relative"
      >
        {/* Wajah emoji */}
        <motion.circle
          cx="60"
          cy="60"
          r="35"
          fill="#D291BC"
          stroke="#D291BC"
          strokeWidth="3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        />

        {/* Mata kiri (menangis) */}
        <motion.ellipse
          cx="48"
          cy="50"
          rx="4"
          ry="6"
          fill="#ffff"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        />

        {/* Mata kanan (menangis) */}
        <motion.ellipse
          cx="72"
          cy="50"
          rx="4"
          ry="6"
          fill="#ffff"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        />

        {/* Air mata kiri */}
        <motion.ellipse
          cx="45"
          cy="65"
          rx="3"
          ry="8"
          fill="#87CEEB"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [-10, 0, 0, 15],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.8,
            repeatDelay: 0.5,
          }}
        />

        {/* Air mata kanan */}
        <motion.ellipse
          cx="75"
          cy="65"
          rx="3"
          ry="8"
          fill="#87CEEB"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [-10, 0, 0, 15],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1.2,
            repeatDelay: 0.5,
          }}
        />

        {/* Air mata tambahan (tetes kecil) */}
        <motion.circle
          cx="42"
          cy="75"
          r="2"
          fill="#87CEEB"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, 10],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 1.5,
            repeatDelay: 1,
          }}
        />

        <motion.circle
          cx="78"
          cy="75"
          r="2"
          fill="#87CEEB"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, 10],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 2,
            repeatDelay: 1,
          }}
        />

        {/* Mulut sedih */}
        <motion.path
          d="M 50 75 Q 60 85 70 75"
          stroke="#ffff"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />

        {/* Alis kiri (sedih) */}
        <motion.path
          d="M 42 40 Q 48 35 54 40"
          stroke="#ffff"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        />

        {/* Alis kanan (sedih) */}
        <motion.path
          d="M 66 40 Q 72 35 78 40"
          stroke="#ffff"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        />

        {/* Efek berkedip mata */}
        <motion.rect
          x="44"
          y="47"
          width="8"
          height="6"
          fill="#D291BC"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 0, 0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />

        <motion.rect
          x="68"
          y="47"
          width="8"
          height="6"
          fill="#D291BC"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 0, 0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            delay: 0.1,
          }}
        />

        {/* Highlight wajah */}
        <motion.ellipse
          cx="52"
          cy="45"
          rx="6"
          ry="4"
          fill="#D291BC"
          fillOpacity="0.6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        />
      </motion.svg>

      <motion.p
        className="mt-6 text-[#D291BC] text-lg font-semibold text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        Tidak ada artikel pada kategori ini
      </motion.p>

      <motion.p
        className="mt-2 text-[#D291BC] text-sm opacity-70 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        Huhuhu... kosong nih 😢
      </motion.p>
    </div>
  );
}
