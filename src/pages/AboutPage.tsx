import React from 'react';
import { SEO } from '../components/SEO';
import { Flame } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 py-8 sm:py-12">
      <SEO 
        title="About - FusionFry"
        description="Learn about FusionFry's mission to deliver cutting-edge science and technology insights."
        keywords="about fusionfry, science blog, technology insights"
      />
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="blue-glow-border rounded-lg">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 sm:p-10 flex flex-col items-center animate-fadein">
            {/* Subtle blue glow border animation and fade-in */}
            <style>{`
              .blue-glow-border {
                position: relative;
                z-index: 1;
              }
              .blue-glow-border:before {
                content: '';
                position: absolute;
                inset: -6px;
                border-radius: 0.875rem;
                z-index: -1;
                pointer-events: none;
                box-shadow: 0 0 0 0 #2563eb55, 0 0 16px 2px #2563eb33;
                animation: blueGlow 4s ease-in-out infinite;
                background: transparent;
              }
              @keyframes blueGlow {
                0%, 100% { box-shadow: 0 0 0 0 #2563eb55, 0 0 16px 2px #2563eb33; }
                50% { box-shadow: 0 0 0 6px #2563eb33, 0 0 32px 8px #60a5fa44; }
              }
              .animate-fadein {
                animation: fadeInUp 1.2s cubic-bezier(.23,1.01,.32,1) both;
              }
              @keyframes fadeInUp {
                0% { opacity: 0; transform: translateY(40px); }
                100% { opacity: 1; transform: none; }
              }
            `}</style>
            <div className="text-center mb-8">
              <div className="bg-blue-600 p-3 rounded-xl inline-block mb-4">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                About FusionFry
              </h1>
              <p className="text-xl text-blue-600 dark:text-blue-400 mb-6">
                Tech, Trends & Taste—All in One Fry
              </p>
            </div>
            <div className="text-center mt-6">
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  FusionFry is your source for science and technology insights. We make complex topics simple and accessible for everyone.
                </p>
                <p>
                  Our focus areas include artificial intelligence, biotechnology, cloud computing, web development, sustainability, space technology, and scientific research.
                </p>
                <p>
                  We believe in accuracy, accessibility, and innovation. Our goal is to keep you informed about the latest developments that are shaping our world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}