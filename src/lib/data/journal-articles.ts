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
    title: "Latest Developments in Maternal Care",
    description:
      "Exploring recent advancements in maternal healthcare technology and practices.",
    image: "/main/journal/journal.jpg",
    category: "Technology",
    author: "Dr. Michael Chen",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "4 min read",
  },
  {
    id: "trending-2",
    title: "First Trimester Must-Knows: A Week-by-Week Guide",
    description:
      "Everything you need to know about your first trimester of pregnancy.",
    image: "/main/journal/journal.jpg",
    category: "Education",
    author: "Dr. Emily Brown",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "8 min read",
  },
  {
    id: "trending-3",
    title: "Preparing Your Home for Baby: Essential Checklist",
    description:
      "A comprehensive guide to preparing your home for your new arrival.",
    image: "/main/journal/journal.jpg",
    category: "Lifestyle",
    author: "Maria Rodriguez",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 min read",
  },
  {
    id: "trending-4",
    title: "Healthy Pregnancy Snacks for Every Trimester",
    description:
      "Nutritious and delicious snack ideas for your pregnancy journey.",
    image: "/main/journal/journal.jpg",
    category: "Nutrition",
    author: "Dr. Sarah Johnson",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "4 min read",
  },
];

export const breakingNews: Article[] = [
  {
    id: "breaking-1",
    title: "New Study Reveals Key Factors in Maternal Health",
    description:
      "Recent research highlights important factors affecting maternal health outcomes.",
    image: "/main/journal/journal.jpg",
    category: "Research",
    author: "Dr. Emily Brown",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "3 min read",
  },
  {
    id: "breaking-2",
    title: "New Study Reveals Benefits of Meditation During Pregnancy",
    description:
      "Research shows significant benefits of meditation for expectant mothers.",
    image: "/main/journal/journal.jpg",
    category: "Research",
    author: "Dr. Michael Chen",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "5 min read",
  },
  {
    id: "breaking-3",
    title: "Revolutionary Prenatal Care App Launches Worldwide",
    description:
      "New mobile app aims to transform prenatal care accessibility.",
    image: "/main/journal/journal.jpg",
    category: "Technology",
    author: "Dr. Sarah Johnson",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "4 min read",
  },
];

export const blogArticles: Article[] = [
  {
    id: "blog-1",
    title: "A Mother's Journey Through Healthcare",
    description:
      "Personal experiences and insights from maternal healthcare journey.",
    image: "/main/journal/journal.jpg",
    category: "Blog",
    author: "Maria Rodriguez",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 min read",
  },
  {
    id: "blog-2",
    title: "The Complete Guide to Pregnancy Sleep Positions",
    description:
      "Learn about the best sleeping positions for each trimester and tips for getting better rest during pregnancy.",
    image: "/main/journal/journal.jpg",
    category: "Wellness",
    author: "Dr. Sarah Johnson",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 min read",
  },
  {
    id: "blog-3",
    title: "Managing Pregnancy Anxiety: Tips from Mental Health Experts",
    description:
      "Practical strategies for dealing with pregnancy-related anxiety and stress.",
    image: "/main/journal/journal.jpg",
    category: "Mental Health",
    author: "Dr. Lisa Thompson",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "8 min read",
  },
  {
    id: "blog-4",
    title: "Essential Pregnancy Care Checklist for Each Trimester",
    description:
      "Complete guide to prenatal care appointments and what to expect during each trimester.",
    image: "/main/journal/journal.jpg",
    category: "Pregnancy Care",
    author: "Dr. Michael Chen",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "10 min read",
  },
];

export const mentalHealthArticles: Article[] = [
  {
    id: "mental-1",
    title: "Postpartum Depression: Signs and Support",
    description:
      "Understanding the signs of postpartum depression and finding the right support.",
    image: "/main/journal/journal.jpg",
    category: "Mental Health",
    author: "Dr. Anna Wilson",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "6 min read",
  },
  {
    id: "mental-2",
    title: "Mindfulness During Pregnancy: A Complete Guide",
    description:
      "How to practice mindfulness and reduce stress during your pregnancy journey.",
    image: "/main/journal/journal.jpg",
    category: "Mental Health",
    author: "Dr. Lisa Thompson",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "7 min read",
  },
];

export const pregnancyCareArticles: Article[] = [
  {
    id: "care-1",
    title: "First Prenatal Visit: What to Expect",
    description:
      "Complete guide to your first prenatal appointment and how to prepare.",
    image: "/main/journal/journal.jpg",
    category: "Pregnancy Care",
    author: "Dr. Sarah Johnson",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "5 min read",
  },
  {
    id: "care-2",
    title: "High-Risk Pregnancy: Understanding Your Care Plan",
    description:
      "What constitutes a high-risk pregnancy and how specialized care can help.",
    image: "/main/journal/journal.jpg",
    category: "Pregnancy Care",
    author: "Dr. Michael Chen",
    authorImage: "/main/journal/photo-profile.jpg",
    readTime: "9 min read",
  },
];
