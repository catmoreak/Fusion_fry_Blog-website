import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { BookOpen } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 px-4">
      <SEO title="404 Not Found - FusionFry" description="Page not found" />
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <BookOpen className="h-5 w-5 mr-2" />
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
