import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';
import { Blog } from '../lib/supabase';

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden w-full">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={blog.featured_image || 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={blog.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          draggable={false}
          onContextMenu={e => e.preventDefault()}
        />
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Calendar className="h-4 w-4 mr-2" />
          <time>{formatDate(blog.created_at)}</time>
          <User className="h-4 w-4 ml-4 mr-2" />
          <span>Admin</span>
        </div>
        
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
          <Link to={`/blog/${blog.slug}`}>
            {blog.title}
          </Link>
        </h3>
        
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
        
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <Tag className="h-4 w-4 text-gray-400" />
            {blog.tags.slice(0, 2).map(tag => (
              <span
                key={tag.id}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <Link
          to={`/blog/${blog.slug}`}
          className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm sm:text-base"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
};