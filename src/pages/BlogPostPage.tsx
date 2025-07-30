import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Calendar, User, Tag, Share2, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import { blogService } from '../services/blogService';
import { Blog, supabase } from '../lib/supabase';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = React.useState<Blog | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      
      try {
        // Check if Supabase is configured before making API calls
        if (!supabase) {
          // No demo content - redirect to home if no Supabase
          setNotFound(true);
        } else {
          const data = await blogService.getBlogBySlug(slug);
          if (data) {
            setBlog(data);
          } else {
            setNotFound(true);
          }
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog?.title,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      // Fall back to clipboard if share fails
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (notFound || !blog) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <SEO
        title={blog.meta_title || blog.title}
        description={blog.meta_description || blog.excerpt}
        image={blog.featured_image}
        type="article"
        author="FusionFry Team"
        publishedTime={blog.created_at}
        modifiedTime={blog.updated_at}
        tags={blog.tags?.map(tag => tag.name)}
        keywords={blog.tags?.map(tag => tag.name).join(', ')}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6 sm:mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to articles
        </button>

        {/* Featured Image */}
        {blog.featured_image && (
          <div className="aspect-[16/9] rounded-lg sm:rounded-2xl overflow-hidden mb-6 sm:mb-8">
            <img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-full object-cover"
              draggable={false}
              onContextMenu={e => e.preventDefault()}
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center mr-4 sm:mr-6">
              <Calendar className="h-4 w-4 mr-2" />
              <time>{formatDate(blog.created_at)}</time>
            </div>
            <div className="flex items-center mr-4 sm:mr-6">
              <User className="h-4 w-4 mr-2" />
              <span>Admin</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {blog.title}
          </h1>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="h-4 w-4 text-gray-400" />
              {blog.tags.map(tag => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none mb-6 sm:mb-8"
          dangerouslySetInnerHTML={{ 
            __html: blog.content.replace(new RegExp(`<h[12][^>]*>${blog.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</h[12]>`, 'gi'), '')
          }}
        />

        {/* Share Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 text-center">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Enjoyed this article?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
            Share it with your friends and colleagues
          </p>
          <button
            onClick={handleShare}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
          >
            Share Article
          </button>
        </div>
      </article>
    </div>
  );
};