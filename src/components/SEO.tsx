import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  canonicalUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'FusionFry - Science and Technology Blog',
  description = 'Tech, Trends & Taste—All in One Fry. Your go-to source for technology insights and trends.',
  keywords = 'science, technology, research, artificial intelligence, biotechnology, quantum computing, innovation, scientific discoveries, peer review',
  image = 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200',
  url = window.location.href,
  type = 'website',
  author = 'FusionFry Team',
  publishedTime,
  modifiedTime,
  tags = [],
  canonicalUrl
}) => {
  React.useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    const updateMetaName = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Basic meta tags
    updateMetaName('description', description);
    updateMetaName('keywords', keywords);
    updateMetaName('author', author);
    updateMetaName('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Open Graph meta tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'FusionFry');
    updateMetaTag('og:locale', 'en_US');

    // Twitter meta tags
    updateMetaName('twitter:card', 'summary_large_image');
    updateMetaName('twitter:title', title);
    updateMetaName('twitter:description', description);
    updateMetaName('twitter:image', image);
    updateMetaName('twitter:site', '@FusionFry');
    updateMetaName('twitter:creator', '@FusionFry');

    // Article specific meta tags
    if (type === 'article') {
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime);
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime);
      }
      updateMetaTag('article:author', author);
      updateMetaTag('article:section', 'Technology');
      
      // Article tags
      tags.forEach(tag => {
        const tagElement = document.createElement('meta');
        tagElement.setAttribute('property', 'article:tag');
        tagElement.content = tag;
        document.head.appendChild(tagElement);
      });
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl || url;

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": type === 'article' ? 'Article' : 'WebSite',
      "name": title,
      "headline": title,
      "description": description,
      "url": url,
      "image": {
        "@type": "ImageObject",
        "url": image,
        "width": 1200,
        "height": 630
      },
      "author": {
        "@type": "Organization",
        "name": author,
        "url": "https://fusionfry.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "FusionFry",
        "logo": {
          "@type": "ImageObject",
          "url": "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400",
          "width": 400,
          "height": 400
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    };

    // Add article-specific structured data
    if (type === 'article') {
      Object.assign(structuredData, {
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "keywords": tags.join(', '),
        "articleSection": "Technology",
        "wordCount": document.querySelector('.prose')?.textContent?.split(' ').length || 0
      });
    }

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, tags, canonicalUrl]);

  return null;
};