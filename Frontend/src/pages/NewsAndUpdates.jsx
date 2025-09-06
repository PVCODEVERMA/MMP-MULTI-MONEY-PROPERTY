
import React, { useState } from 'react';
import { 
  CalendarIcon, 
  UserIcon, 
  TagIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline';

const NewsAndUpdates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock news data
  const newsArticles = [
    {
      id: 1,
      title: "Real Estate Market Shows Strong Recovery in Q3 2025",
      excerpt: "The Indian real estate sector has demonstrated remarkable resilience with a 23% growth in residential sales across major metropolitan cities...",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Market Analysis",
      author: "Priya Sharma",
      publishedDate: "2025-08-25",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600",
      tags: ["Market Trends", "Growth", "Q3 2025"],
      featured: true,
      views: 1250
    },
    {
      id: 2,
      title: "New RERA Guidelines Announced for Property Developers",
      excerpt: "The Real Estate Regulatory Authority has introduced new compliance requirements aimed at enhancing transparency and buyer protection...",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Regulatory Updates",
      author: "Rajesh Kumar",
      publishedDate: "2025-08-20",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600",
      tags: ["RERA", "Regulations", "Compliance"],
      featured: false,
      views: 890
    },
    {
      id: 3,
      title: "Top 10 Emerging Locations for Real Estate Investment in 2025",
      excerpt: "Discover the most promising areas for property investment with high growth potential and excellent connectivity infrastructure...",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Investment Guide",
      author: "Amit Patel",
      publishedDate: "2025-08-18",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600",
      tags: ["Investment", "Locations", "Growth Areas"],
      featured: true,
      views: 2150
    },
    {
      id: 4,
      title: "Digital Transformation in Real Estate: PropTech Trends 2025",
      excerpt: "How technology is revolutionizing the property sector with AI, VR tours, and blockchain-based transactions...",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Technology",
      author: "Sneha Gupta",
      publishedDate: "2025-08-15",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600",
      tags: ["PropTech", "Digital", "Innovation"],
      featured: false,
      views: 1680
    },
    {
      id: 5,
      title: "Home Loan Interest Rates Hit 5-Year Low",
      excerpt: "Major banks announce attractive home loan packages with reduced interest rates, making property purchases more affordable...",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Finance",
      author: "Vikram Singh",
      publishedDate: "2025-08-12",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600",
      tags: ["Home Loans", "Interest Rates", "Banking"],
      featured: false,
      views: 3200
    }
  ];

  const categories = [
    "All Categories",
    "Market Analysis", 
    "Regulatory Updates",
    "Investment Guide",
    "Technology",
    "Finance"
  ];

  const trendingTopics = [
    "RERA Compliance",
    "PropTech Solutions", 
    "Home Loan Rates",
    "Investment Hotspots",
    "Market Recovery",
    "Digital Payments"
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || 
                           selectedCategory === 'All Categories' || 
                           article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = newsArticles.filter(article => article.featured);
  const latestArticles = newsArticles.slice(0, 4);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const ArticleCard = ({ article, featured = false }) => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group ${featured ? 'lg:col-span-2' : ''}`}>
      <div className={`relative ${featured ? 'h-64' : 'h-48'}`}>
        <img 
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <UserIcon className="w-4 h-4 mr-1" />
          <span className="mr-4">{article.author}</span>
          <CalendarIcon className="w-4 h-4 mr-1" />
          <span className="mr-4">{formatDate(article.publishedDate)}</span>
          <ClockIcon className="w-4 h-4 mr-1" />
          <span>{article.readTime}</span>
        </div>

        <h3 className={`font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors ${featured ? 'text-2xl' : 'text-lg'}`}>
          {article.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <span>{article.views.toLocaleString()} views</span>
          </div>
          <button className="text-orange-500 hover:text-orange-600 font-medium flex items-center group">
            Read More
            <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <NewspaperIcon className="w-16 h-16 mr-4" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">News & Updates</h1>
              <p className="text-xl">Stay informed with the latest real estate insights</p>
            </div>
          </div>
          <p className="text-lg max-w-3xl mx-auto">
            Get the latest news, market analysis, regulatory updates, and expert insights 
            from India's real estate industry.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Articles */}
            {selectedCategory === 'all' && !searchTerm && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {featuredArticles.map(article => (
                    <ArticleCard key={article.id} article={article} featured={true} />
                  ))}
                </div>
              </div>
            )}

            {/* All Articles */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' || selectedCategory === 'All Categories' 
                    ? 'Latest Articles' 
                    : `${selectedCategory} Articles`}
                </h2>
                <span className="text-gray-500">
                  {filteredArticles.length} articles found
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Load More Articles
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Trending Topics */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUpIcon className="w-5 h-5 mr-2 text-orange-500" />
                  Trending Topics
                </h3>
                <div className="space-y-2">
                  {trendingTopics.map((topic, index) => (
                    <button
                      key={index}
                      className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                    >
                      #{topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                <p className="text-sm mb-4 opacity-90">
                  Get the latest real estate news delivered to your inbox weekly.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="w-full bg-white text-orange-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Subscribe Now
                  </button>
                </div>
              </div>

              {/* Popular Articles */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Most Read</h3>
                <div className="space-y-4">
                  {latestArticles.slice(0, 3).map((article, index) => (
                    <div key={article.id} className="flex items-start space-x-3">
                      <span className="bg-orange-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-2 hover:text-orange-600 cursor-pointer transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span>{article.views.toLocaleString()} views</span>
                          <span className="mx-2">•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.slice(1).map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        selectedCategory === category
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAndUpdates;
