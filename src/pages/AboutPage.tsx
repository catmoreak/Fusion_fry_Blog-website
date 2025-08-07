import React from 'react';
import { SEO } from '../components/SEO';
import { Flame } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 py-8 sm:py-12 overflow-hidden">
      <SEO 
        title="About - FusionFry"
        description="Learn about FusionFry's mission to deliver cutting-edge science and technology insights."
        keywords="about fusionfry, science blog, technology insights"
      />
      {/* Decorative SVG background pattern */}
      <svg className="absolute left-1/2 top-0 -translate-x-1/2 opacity-20 dark:opacity-30 pointer-events-none z-0" width="900" height="600" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="450" cy="300" rx="400" ry="180" fill="url(#paint0_radial)" />
        <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(450 300) scale(400 180)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="blue-glow-border rounded-2xl">
          <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-12 flex flex-col items-center animate-fadein border border-blue-200 dark:border-blue-900">
            {/* Subtle blue glow border animation and fade-in */}
            <style>{`
              .blue-glow-border {
                position: relative;
                z-index: 1;
              }
              .blue-glow-border:before {
                content: '';
                position: absolute;
                inset: -8px;
                border-radius: 1.25rem;
                z-index: -1;
                pointer-events: none;
                box-shadow: 0 0 0 0 #2563eb55, 0 0 32px 8px #2563eb33;
                animation: blueGlow 4s ease-in-out infinite;
                background: transparent;
              }
              @keyframes blueGlow {
                0%, 100% { box-shadow: 0 0 0 0 #2563eb55, 0 0 32px 8px #2563eb33; }
                50% { box-shadow: 0 0 0 12px #2563eb33, 0 0 64px 16px #60a5fa44; }
              }
              .animate-fadein {
                animation: fadeInUp 1.2s cubic-bezier(.23,1.01,.32,1) both;
              }
              @keyframes fadeInUp {
                0% { opacity: 0; transform: translateY(40px); }
                100% { opacity: 1; transform: none; }
              }
              .glow-icon {
                box-shadow: 0 0 24px 6px #60a5fa88, 0 0 8px 2px #2563eb55;
                background: linear-gradient(135deg, #2563eb 60%, #60a5fa 100%);
                border-radius: 1.5rem;
                padding: 0.75rem;
                display: inline-block;
                margin-bottom: 1rem;
              }
              .gradient-text {
                background: linear-gradient(90deg, #2563eb 30%, #60a5fa 70%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
              }
              .quote {
                font-style: italic;
                color: #2563ebcc;
                font-size: 1.15rem;
                margin-top: 2.5rem;
                border-left: 4px solid #60a5fa;
                padding-left: 1rem;
                background: linear-gradient(90deg, #e0e7ff 0%, #f0f9ff 100%);
                border-radius: 0.5rem;
                box-shadow: 0 2px 8px 0 #2563eb11;
              }
            `}</style>
            <div className="text-center mb-8">
              <div className="glow-icon">
                <Flame className="h-10 w-10 text-white drop-shadow-lg" />
              </div>
              <h1 className="text-4xl font-extrabold gradient-text mb-4">
                About FusionFry
              </h1>
              <p className="text-xl text-blue-700 dark:text-blue-300 mb-6 font-medium">
                Tech, Trends & Taste—All in One Fry
              </p>
            </div>
            <div className="text-center mt-6">
              <div className="space-y-6 text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
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
            {/* <div className="quote mt-10 mx-auto max-w-xl">
              "Science and technology are the wings of our future. At FusionFry, we help you soar."
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}