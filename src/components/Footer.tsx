import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700 lg:flex-row lg:divide-y-0 lg:gap-16">
          {/* Brand */}
          <div className="py-4 lg:py-0 flex-1 flex flex-col items-center lg:items-start">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-4 text-center lg:text-left w-full">
              FusionFry
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-2 lg:mb-4 text-center lg:text-left w-full">
              Your source for science and technology insights
            </p>
          </div>

          {/* Navigation */}
          <div className="py-4 lg:py-0 flex-1 flex flex-col items-center lg:items-start">
            <h4 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-2 lg:mb-4 text-center lg:text-left w-full">Navigation</h4>
            <ul className="space-y-1 lg:space-y-2 w-full">
              <li><a href="/" className="block py-1 px-2 rounded text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-primary-600 dark:hover:text-primary-400 w-full text-center lg:text-left">Home</a></li>
              <li><a href="/about" className="block py-1 px-2 rounded text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 w-full text-center lg:text-left">About</a></li>
              <li><a href="/categories" className="block py-1 px-2 rounded text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 w-full text-center lg:text-left">Categories</a></li>
              <li><a href="/contact" className="block py-1 px-2 rounded text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 w-full text-center lg:text-left">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="py-4 lg:py-0 flex-1 flex flex-col items-center lg:items-start">
            <h4 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 dark:text-white mb-2 lg:mb-4 text-center lg:text-left w-full">Legal</h4>
            <ul className="space-y-1 lg:space-y-2 w-full">
              <li><a href="/terms" className="block py-1 px-2 rounded text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 w-full text-center lg:text-left">Terms & Conditions</a></li>
              <li><a href="/privacy" className="block py-1 px-2 rounded text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 w-full text-center lg:text-left">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 lg:mt-8 lg:pt-6 text-center">
          <div className="flex justify-center items-center gap-4 mb-2">
            <a href="/api/rss.xml" target="_blank" rel="noopener noreferrer" title="RSS Feed" className="inline-flex items-center text-orange-500 hover:text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-1"><circle cx="6.18" cy="17.82" r="2.18"/><path d="M4 4.44v3.06a12.5 12.5 0 0 1 12.5 12.5h3.06C19.56 10.61 13.39 4.44 4 4.44z"/><path d="M4 10.69v3.06a6.25 6.25 0 0 1 6.25 6.25h3.06A9.31 9.31 0 0 0 4 10.69z"/></svg>
              <span className="text-xs sm:text-sm lg:text-base">RSS Feed</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300">
            © 2025 FusionFry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;