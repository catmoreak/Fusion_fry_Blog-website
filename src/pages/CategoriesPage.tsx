import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { blogService } from '../services/blogService';
import { Tag, supabase } from '../lib/supabase';
import { Tag as TagIcon, BookOpen, Clock } from 'lucide-react';

interface CategoryWithCount extends Tag {
  blog_count: number;
  latest_blog_date?: string;
}

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = React.useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!supabase) {
          setCategories([]);
        } else {
          // Get all published blogs with their tags
          const blogs = await blogService.getPublishedBlogs();
          
          // Create a map to count blogs per tag
          const tagCounts = new Map<string, { tag: Tag; count: number; latestDate: string }>();
          
          blogs.forEach(blog => {
            if (blog.tags && blog.tags.length > 0) {
              blog.tags.forEach((tag: Tag) => {
                const existing = tagCounts.get(tag.id);
                if (existing) {
                  existing.count += 1;
                  // Update latest date if this blog is newer
                  if (blog.created_at > existing.latestDate) {
                    existing.latestDate = blog.created_at;
                  }
                } else {
                  tagCounts.set(tag.id, {
                    tag,
                    count: 1,
                    latestDate: blog.created_at
                  });
                }
              });
            }
          });
          
          // Convert to array and sort by count (descending)
          const categoriesWithCounts: CategoryWithCount[] = Array.from(tagCounts.values())
            .map(({ tag, count, latestDate }) => ({
              ...tag,
              blog_count: count,
              latest_blog_date: latestDate
            }))
            .sort((a, b) => b.blog_count - a.blog_count);
          
          setCategories(categoriesWithCounts);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <SEO 
        title="Categories - FusionFry"
        description="Explore science and technology articles by category. Find content on AI, biotechnology, quantum computing, and more at FusionFry."
        keywords="science categories, technology topics, AI articles, biotechnology content, quantum computing"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Categories
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our articles organized by topics and discover content that interests you most.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-16">
            <TagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No categories yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Categories will appear here once blog posts with tags are published.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                        <TagIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>
                        {category.blog_count} {category.blog_count === 1 ? 'article' : 'articles'}
                      </span>
                    </div>
                    
                    {category.latest_blog_date && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Latest: {formatDate(category.latest_blog_date)}</span>
                      </div>
                    )}
                  </div>

                  {/* View Button */}
                  <Link
                    to={`/?tag=${category.slug}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm"
                  >
                    View articles →
                  </Link>
                </div>

                {/* Hover Effect Bar */}
                <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Browse All Articles
          </Link>
        </div>
      </div>
    </div>
  );
};