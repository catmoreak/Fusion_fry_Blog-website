import React from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <SEO 
        title="Privacy Policy - FusionFry"
        description="Privacy policy for FusionFry website. Learn how we collect, use, and protect your personal information."
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              Last updated: July 2025
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                At FusionFry, we collect information to provide better services to our users. We collect information in the following ways:
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Information you give us</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Contact information when you reach out to us</li>
                <li>Comments and feedback you provide</li>
                <li>Email address if you subscribe to our newsletter</li>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic.
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Types of cookies we use:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Advertising cookies:</strong> Used to deliver relevant advertisements</li>
                <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              </ul>
              
              <p className="mb-4">
                You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
              </p>
            </section>
              </ul>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Google Ads and Third-Party Advertising</h2>
              <p className="mb-4">
                FusionFry uses Google AdSense and other third-party advertising services to display advertisements. These services may use cookies and other tracking technologies to serve ads based on your interests.
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Google AdSense</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Google may use cookies to serve ads based on your prior visits to our website</li>
                <li>Google's use of advertising cookies enables it to serve ads based on your visits to our site and other sites on the Internet</li>
                <li>You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:text-blue-700">Google's Ads Settings</a></li>
                <li>You can also opt out through the <a href="http://www.aboutads.info/choices/" className="text-blue-600 hover:text-blue-700">Digital Advertising Alliance opt-out page</a></li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Third-Party Ad Networks</h3>
              <p className="mb-4">
                We may also work with other advertising networks that use cookies and similar technologies to collect information about your browsing activities to provide targeted advertising.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. How We Use Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Respond to your comments and questions</li>
                <li>Send you technical notices and support messages</li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Display relevant advertisements</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Information we get from your use of our services</h3>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Service Providers:</strong> We may share information with trusted third parties who assist us in operating our website</li>
                <li><strong>Advertising Partners:</strong> We share information with Google and other advertising partners to display relevant ads</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger or acquisition</li>
              </ul>
            </section>
              <ul className="list-disc pl-6 mb-4 space-y-2">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>
                <li>Device information (browser type, operating system)</li>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">7. Your Rights and Choices</h2>
              <p className="mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-out:</strong> Opt out of marketing communications</li>
                <li><strong>Cookie Control:</strong> Manage cookie preferences through your browser</li>
              </ul>
            </section>
                <li>Log information (IP address, date/time of visits)</li>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">8. Children's Privacy</h2>
              <p className="mb-4">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>
                <li>Usage data (pages viewed, time spent on site)</li>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">9. International Data Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information during such transfers.
              </p>
            </section>
                <li>Location information (general geographic location)</li>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">10. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
              </ul>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">11. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us through our contact page or email us directly.
              </p>
            </section>
            </section>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Questions about your privacy?
              </h3>
              <p className="text-blue-800 dark:text-blue-200 mb-4">
                We're committed to protecting your privacy and being transparent about our data practices.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};