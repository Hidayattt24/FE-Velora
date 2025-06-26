"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { ProfileHeader } from "@/components/ui/profile-header";
import { featuredArticles, trendingArticles, breakingNews, blogArticles } from "@/lib/data/journal-articles";

export default function ArticlePage() {
  const params = useParams();
  const id = params.id as string;

  // Combine all articles to find the one with matching id
  const allArticles = [...featuredArticles, ...trendingArticles, ...breakingNews, ...blogArticles];
  const article = allArticles.find((article) => article.id === id);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProfileHeader />
        <div className="max-w-4xl mx-auto mt-8">
          <h1 className="text-2xl font-bold text-center text-gray-800">Article not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader />

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

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
        
        {article.description && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.description}
          </p>
        )}

        <div className="prose prose-lg max-w-none">
          <div className="bg-pink-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-[#D291BC] mb-4">Key Takeaways</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Important point 1 about {article.title}</li>
              <li>Key insight about the topic</li>
              <li>Practical application or advice</li>
              <li>Final important consideration</li>
            </ul>
          </div>

          <div className="space-y-6 text-gray-700">
            <p>
              This is where the full article content would go. In a real application,
              you would fetch the complete article content from your backend and render
              it here with proper formatting and styling.
            </p>
            
            <p>
              The content could include multiple paragraphs, images, quotes, and other
              rich media elements to provide a comprehensive and engaging reading
              experience.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
} 