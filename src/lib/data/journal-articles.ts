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

export const featuredArticles: Article[] = [
  {
    id: "1",
    title: "Understanding Maternal Health Risks",
    description: "A comprehensive guide to identifying and managing maternal health risks during pregnancy.",
    image: "/main/gallery.jpg",
    category: "Health",
    author: "Dr. Sarah Johnson",
    authorImage: "/images/authors/sarah.jpg",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Essential Nutrients During Pregnancy: A Complete Guide",
    description: "Learn about the vital nutrients needed during pregnancy for both mother and baby.",
    image: "/images/journal/nutrients.jpg",
    category: "Nutrition",
    author: "Dr. Emily Brown",
    authorImage: "/images/authors/emily.jpg",
    readTime: "6 min read"
  },
  {
    id: "3",
    title: "Safe Exercise During Pregnancy: What You Need to Know",
    description: "Guidelines for staying active safely during your pregnancy journey.",
    image: "/images/journal/exercise.jpg",
    category: "Fitness",
    author: "Dr. Michael Chen",
    authorImage: "/images/authors/michael.jpg",
    readTime: "7 min read"
  },
];

export const trendingArticles: Article[] = [
  {
    id: "1",
    title: "Latest Developments in Maternal Care",
    description: "Exploring recent advancements in maternal healthcare technology and practices.",
    image: "/images/article2.jpg",
    category: "Technology",
    author: "Dr. Michael Chen",
    authorImage: "/images/authors/michael.jpg",
    readTime: "4 min read"
  },
  {
    id: "2",
    title: "First Trimester Must-Knows: A Week-by-Week Guide",
    description: "Everything you need to know about your first trimester of pregnancy.",
    image: "/images/journal/first-trimester.jpg",
    category: "Education",
    author: "Dr. Emily Brown",
    authorImage: "/images/authors/emily.jpg",
    readTime: "8 min read"
  },
  {
    id: "3",
    title: "Preparing Your Home for Baby: Essential Checklist",
    description: "A comprehensive guide to preparing your home for your new arrival.",
    image: "/images/journal/baby-prep.jpg",
    category: "Lifestyle",
    author: "Maria Rodriguez",
    authorImage: "/images/authors/maria.jpg",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Healthy Pregnancy Snacks for Every Trimester",
    description: "Nutritious and delicious snack ideas for your pregnancy journey.",
    image: "/images/journal/snacks.jpg",
    category: "Nutrition",
    author: "Dr. Sarah Johnson",
    authorImage: "/images/authors/sarah.jpg",
    readTime: "4 min read"
  }
];

export const breakingNews: Article[] = [
  {
    id: "1",
    title: "New Study Reveals Key Factors in Maternal Health",
    description: "Recent research highlights important factors affecting maternal health outcomes.",
    image: "/images/article3.jpg",
    category: "Research",
    author: "Dr. Emily Brown",
    authorImage: "/images/authors/emily.jpg",
    readTime: "3 min read"
  },
  {
    id: "2",
    title: "New Study Reveals Benefits of Meditation During Pregnancy",
    description: "Research shows significant benefits of meditation for expectant mothers.",
    image: "/images/journal/meditation.jpg",
    category: "Research",
    author: "Dr. Michael Chen",
    authorImage: "/images/authors/michael.jpg",
    readTime: "5 min read"
  },
  {
    id: "3",
    title: "Revolutionary Prenatal Care App Launches Worldwide",
    description: "New mobile app aims to transform prenatal care accessibility.",
    image: "/images/journal/prenatal-app.jpg",
    category: "Technology",
    author: "Dr. Sarah Johnson",
    authorImage: "/images/authors/sarah.jpg",
    readTime: "4 min read"
  }
];

export const blogArticles: Article[] = [
  {
    id: "1",
    title: "A Mother's Journey Through Healthcare",
    description: "Personal experiences and insights from maternal healthcare journey.",
    image: "/images/article4.jpg",
    category: "Blog",
    author: "Maria Rodriguez",
    authorImage: "/images/authors/maria.jpg",
    readTime: "6 min read"
  },
  {
    id: "2",
    title: "The Complete Guide to Pregnancy Sleep Positions",
    description: "Learn about the best sleeping positions for each trimester and tips for getting better rest during pregnancy.",
    image: "/images/journal/sleep.jpg",
    category: "Wellness",
    author: "Dr. Sarah Johnson",
    authorImage: "/images/authors/sarah.jpg",
    readTime: "7 min read"
  }
]; 