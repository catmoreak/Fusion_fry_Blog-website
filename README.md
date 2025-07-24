
# Fusion Fry Blog Website

Fusion Fry is a technology blog focused on the latest tech trends, tools, and innovations. The platform is designed for sharing insights, tutorials, and news about the world of technology. It features a modern UI, dark mode, and a robust admin dashboard for easy content management.

## Tech Stack & Architecture
- **Frontend:** React (with TypeScript) for building a fast, interactive, and component-driven UI.
- **Styling:** Tailwind CSS for utility-first, responsive, and easily customizable design.
- **Build Tool:** Vite for lightning-fast development and optimized builds.
- **Backend/Data:** Supabase for authentication, user management, and blog data storage.
- **Admin Dashboard:** Secure admin pages for blog creation, editing, and management, including:
  - Blog post editor with rich text support
  - Category and tag management
  - Real-time user statistics
  - Dark mode and theme toggles
- **SEO & Performance:** Lazy image loading, SEO meta tags, and sitemap support.


## Features
- ⚡ Fast, responsive, and mobile-friendly UI
- 🌙 Dark mode and theme toggle everywhere
- 📝 Blog posts, categories, and tags
- 🔒 Admin dashboard for secure blog creation, editing, and management
- 🖼️ Lazy image loading and SEO support
- 🦾 Supabase backend for authentication and data

## Getting Started
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

Or see the live site at: [https://fusionfry.vercel.app/](https://fusionfry.vercel.app/)

## Project Structure
- `src/` — Main source code
  - `components/` — Reusable UI components (Header, Footer, BlogCard, etc.)
  - `pages/` — Page components (Home, About, Admin, etc.)
  - `lib/` — Utilities and Supabase client
  - `services/` — API and business logic
- `public/` — Static assets
- `supabase/` — Database migrations

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## Customization
- Edit `tailwind.config.js` for theme and design
- Update Supabase settings in `src/lib/supabase.ts`
- Add or edit pages in `src/pages/`

## Deployment
Deploy easily to Vercel, Netlify, or your favorite platform. See `vercel.json` for Vercel configuration.

**Live Demo:** [https://fusionfry.vercel.app/](https://fusionfry.vercel.app/)

## License
MIT. See `LICENSE` file.

---

Made with ❤️ using React, Vite, and Supabase.
