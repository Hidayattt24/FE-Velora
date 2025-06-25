"use client";

import { ProfileHeader } from "@/components/ui/profile-header";
import Image from "next/image";
import { IconTrendingUp, IconFlame, IconBookmark } from "@tabler/icons-react";
import { featuredArticles, trendingArticles, breakingNews, blogArticles } from "@/lib/data/journal-articles";

export default function JournalPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader />
      
      {/* Hero Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <div key={article.id} className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="aspect-[4/3] relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <span className="text-white/80 text-sm">{article.category}</span>
                <h3 className="text-white text-xl font-semibold mt-2">{article.title}</h3>
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
          {trendingArticles.map((article) => (
            <div key={article.id} className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="aspect-[3/2] relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <span className="text-[#D291BC]/80 text-sm">{article.category}</span>
                <h3 className="text-gray-800 font-medium mt-2 group-hover:text-[#D291BC] transition-colors">
                  {article.title}
                </h3>
                <span className="text-gray-500 text-sm mt-2 block">{article.readTime}</span>
              </div>
            </div>
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
          {breakingNews.map((news) => (
            <div key={news.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 aspect-[16/9] relative rounded-xl overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{news.title}</h3>
                  <p className="text-gray-600 mb-4">{news.description}</p>
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
          {blogArticles.map((article) => (
            <div key={article.id} className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="aspect-[16/9] relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <span className="text-[#D291BC]/80 text-sm">{article.category}</span>
                <h3 className="text-xl font-semibold text-gray-800 mt-2 group-hover:text-[#D291BC] transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mt-2">{article.description}</p>
                <span className="text-gray-500 text-sm mt-3 block">{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 