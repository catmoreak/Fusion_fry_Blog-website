import React from 'react';
import { blogService } from '../services/blogService';
import { supabase, Blog } from '../lib/supabase';

export const generateSitemap = async () => {
  const baseUrl = window.location.origin;
  const currentDate = new Date().toISOString();
  
  let urls = [
    {
      loc: baseUrl,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/categories`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    }
  ];

  // Add blog posts if Supabase is configured
  if (supabase) {
    try {
      const blogs = await blogService.getPublishedBlogs();
      const blogUrls = blogs.map((blog: Blog) => ({
        loc: `${baseUrl}/blog/${blog.slug}`,
        lastmod: blog.updated_at,
        changefreq: 'monthly',
        priority: '0.9'
      }));
      urls = [...urls, ...blogUrls];
    } catch (error) {
      console.error('Error generating sitemap:', error);
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const SitemapGenerator: React.FC = () => {
  React.useEffect(() => {
    // Generate sitemap on component mount
    generateSitemap().then(sitemap => {
      // Store sitemap for potential use
      console.log('Sitemap generated:', sitemap);
    });
  }, []);

  return null;
};

export default SitemapGenerator;