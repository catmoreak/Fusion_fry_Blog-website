

import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';



const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 px-4">
      <SEO title="404 Not Found - FusionFry" description="Page not found" />
      <div className="flex flex-col items-center">
        {/* SVG Illustration */}
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mb-6 animate-bounce">
          <circle cx="60" cy="60" r="56" fill="#3B82F6" fillOpacity="0.1" />
          <path d="M40 80 Q60 100 80 80" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <circle cx="50" cy="55" r="5" fill="#3B82F6"/>
          <circle cx="70" cy="55" r="5" fill="#3B82F6"/>
        </svg>
        {/* Animated 404 */}
        <h1 className="text-7xl font-extrabold text-blue-600 mb-2 animate-pulse" aria-label="404">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 text-center">Oops! Page Not Found</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 text-center max-w-md">
          The page you are looking for doesn&apos;t exist, was moved, or you may have mistyped the address.<br />
          <span className="text-blue-500">Let&apos;s get you back on track!</span>
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all font-semibold text-lg"
          aria-label="Go to Home Page"
        >
          <span className="mr-3"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h6"/></svg></span>
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
