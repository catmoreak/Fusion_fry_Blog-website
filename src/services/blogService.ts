import { supabase, Blog } from '../lib/supabase';

const checkSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set up your environment variables.');
  }
  return supabase;
};

export const blogService = {
  async getPublishedBlogs() {
    // Fetch blogs from the Vercel serverless function instead of directly from Supabase
    const response = await fetch('/api/blogs.mjs');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const blogs = await response.json();
    return blogs;
  },

  async getBlogBySlug(slug: string) {
    // Fetch all blogs from the Vercel serverless function and filter by slug
    const response = await fetch('/api/blogs.mjs');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const blogs = await response.json();
    const blog = blogs.find((b: any) => b.slug === slug && b.published);
    return blog || null;
  },

  async getAllBlogs() {
    const { data: blogs, error } = await checkSupabase()
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all blogs:', error);
      throw error;
    }

    if (!blogs || blogs.length === 0) {
      return [];
    }

    // Fetch tags for each blog separately
    const blogsWithTags = await Promise.all(
      blogs.map(async (blog) => {
        const { data: blogTags, error: tagsError } = await checkSupabase()
          .from('blog_tags')
          .select(`
            tags (
              id,
              name,
              slug,
              created_at
            )
          `)
          .eq('blog_id', blog.id);

        if (tagsError) {
          console.error('Error fetching tags for blog:', blog.id, tagsError);
          return { ...blog, tags: [] };
        }

        return {
          ...blog,
          tags: blogTags?.map((bt: any) => bt.tags).filter(Boolean) || []
        };
      })
    );
    
    return blogsWithTags;
  },

  async createBlog(blog: Partial<Blog>, tagIds: string[]) {
    const { data, error } = await checkSupabase()
      .from('blogs')
      .insert([blog])
      .select()
      .single();

    if (error) throw error;

    // Add tags
    if (tagIds.length > 0) {
      const blogTags = tagIds.map(tagId => ({
        blog_id: data.id,
        tag_id: tagId
      }));

      await checkSupabase().from('blog_tags').insert(blogTags);
    }

    return data;
  },

  async updateBlog(id: string, blog: Partial<Blog>, tagIds: string[]) {
    const { data, error } = await checkSupabase()
      .from('blogs')
      .update(blog)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Update tags
    await checkSupabase().from('blog_tags').delete().eq('blog_id', id);
    
    if (tagIds.length > 0) {
      const blogTags = tagIds.map(tagId => ({
        blog_id: id,
        tag_id: tagId
      }));

      await checkSupabase().from('blog_tags').insert(blogTags);
    }

    return data;
  },

  async deleteBlog(id: string) {
    const { error } = await checkSupabase()
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getTags() {
    const { data, error } = await checkSupabase()
      .from('tags')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async createTag(name: string) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const { data, error } = await checkSupabase()
      .from('tags')
      .insert([{ name, slug }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};