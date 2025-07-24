import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_project_url_here' || supabaseKey === 'your_supabase_anon_key_here') {
  console.warn('Supabase environment variables not configured. Please set up your Supabase credentials in the .env file.');
}

export const supabase = supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_project_url_here' 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featured_image?: string;
  published: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogTag {
  blog_id: string;
  tag_id: string;
}