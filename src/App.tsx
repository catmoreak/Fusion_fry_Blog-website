
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));


import { Suspense, lazy } from 'react';
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminBlogEditorPage = lazy(() => import('./pages/AdminBlogEditorPage'));
const SitemapGenerator = lazy(() => import('./components/Sitemap'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));


function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        <SitemapGenerator />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Admin routes without header/footer */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/blog/new" element={<AdminBlogEditorPage />} />
            <Route path="/admin/blog/edit/:id" element={<AdminBlogEditorPage />} />

            {/* Public routes with header/footer */}
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <main id="main-content" className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/blog/:slug" element={<BlogPostPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/categories" element={<CategoriesPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/terms" element={<TermsPage />} />
                      <Route path="/privacy" element={<PrivacyPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;