
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { BlogPostPage } from './pages/BlogPostPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AboutPage } from './pages/AboutPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminBlogEditorPage } from './pages/AdminBlogEditorPage';
import { SitemapGenerator } from './components/Sitemap';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;