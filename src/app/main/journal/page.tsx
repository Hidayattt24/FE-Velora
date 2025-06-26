"use client";

import { ProfileHeader } from "@/components/ui/profile-header";
import Image from "next/image";
import { IconTrendingUp, IconFlame, IconBookmark } from "@tabler/icons-react";
import { featuredArticles, trendingArticles, breakingNews, blogArticles } from "@/lib/data/journal-articles";
import Link from "next/link";
import { CategoryFilter } from "@/components/ui/category-filter";
import { useState, useMemo } from "react";

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories from all articles
  const categories = useMemo(() => {
    const allArticles = [...featuredArticles, ...trendingArticles, ...breakingNews, ...blogArticles];
    const uniqueCategories = new Set(allArticles.map(article => article.category));
    return Array.from(uniqueCategories);
  }, []);

  // Filter articles by category
  const filterArticles = (articles: typeof featuredArticles) => {
    if (selectedCategory === "all") return articles;
    return articles.filter(article => article.category === selectedCategory);
  };

  const filteredFeatured = filterArticles(featuredArticles);
  const filteredTrending = filterArticles(trendingArticles);
  const filteredBreaking = filterArticles(breakingNews);
  const filteredBlog = filterArticles(blogArticles);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader />
      
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Featured Articles */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatured.map((article) => (
            <Link href={`/main/journal/${article.id}`} key={article.id} className="block group">
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
                  <span className="text-white/80 text-sm">{article.category}</span>
                  <h3 className="text-white text-xl font-semibold mt-2 line-clamp-2">{article.title}</h3>
                  <div className="flex items-center mt-4 space-x-3">
                    <Image
                      src={article.authorImage}
                      alt={article.author}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-white/90 text-sm">{article.author}</span>
                    <span className="text-white/70 text-sm">·</span>
                    <span className="text-white/70 text-sm">{article.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending & Editor's Picks */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <IconTrendingUp className="w-6 h-6 text-[#D291BC]" />
            <h2 className="text-xl font-semibold text-[#D291BC]">Trending & Editor's Picks</h2>
          </div>
          <button className="text-[#D291BC] hover:text-pink-600 transition-colors">
            View all
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTrending.map((article) => (
            <Link href={`/main/journal/${article.id}`} key={article.id} className="block group">
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
                  <span className="text-[#D291BC]/80 text-sm">{article.category}</span>
                  <h3 className="text-gray-800 font-medium mt-2 group-hover:text-[#D291BC] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <span className="text-gray-500 text-sm mt-auto">{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Breaking News */}
      <section className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <IconFlame className="w-6 h-6 text-[#D291BC]" />
          <h2 className="text-xl font-semibold text-[#D291BC]">Breaking News</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {filteredBreaking.map((news) => (
            <Link href={`/main/journal/${news.id}`} key={news.id} className="block group">
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
                    <p className="text-gray-600 mb-4 line-clamp-3">{news.description}</p>
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
          ))}
        </div>
      </section>

      {/* Blog & Deep Article */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <IconBookmark className="w-6 h-6 text-[#D291BC]" />
            <h2 className="text-xl font-semibold text-[#D291BC]">Blog & Deep Article</h2>
          </div>
          <button className="text-[#D291BC] hover:text-pink-600 transition-colors">
            View all
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlog.map((article) => (
            <Link href={`/main/journal/${article.id}`} key={article.id} className="block group">
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-[480px]">
                <div className="h-[240px] relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col h-[240px]">
                  <span className="text-[#D291BC]/80 text-sm">{article.category}</span>
                  <h3 className="text-xl font-semibold text-gray-800 mt-2 group-hover:text-[#D291BC] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mt-2 line-clamp-3">{article.description}</p>
                  <span className="text-gray-500 text-sm mt-auto">{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
} 