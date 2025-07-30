import { supabase, Blog, Tag } from '../lib/supabase';


const checkSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set up your environment variables.');
  }
  return supabase;
};

// Helper to fetch tags for a single blog
async function fetchTagsForBlog(blogId: string): Promise<Tag[]> {
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
    .eq('blog_id', blogId);
  if (tagsError) {
    console.error('Error fetching tags for blog:', blogId, tagsError);
    return [];
  }
  return blogTags?.map((bt: any) => bt.tags).filter(Boolean) || [];
}

export const blogService = {

  async getPublishedBlogs(): Promise<(Blog & { tags: Tag[] })[]> {
    const { data: blogs, error } = await checkSupabase()
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }

    if (!blogs || blogs.length === 0) {
      return [];
    }

    // Fetch tags for each blog using helper
    const blogsWithTags = await Promise.all(
      blogs.map(async (blog: Blog) => ({
        ...blog,
        tags: await fetchTagsForBlog(blog.id)
      }))
    );
    return blogsWithTags;
  },


  async getBlogBySlug(slug: string): Promise<(Blog & { tags: Tag[] }) | null> {
    const { data: blog, error } = await checkSupabase()
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching blog by slug:', error);
      throw error;
    }

    if (!blog) {
      return null;
    }

    // Fetch tags for this blog using helper
    const tags = await fetchTagsForBlog(blog.id);
    return {
      ...blog,
      tags
    };
  },


  async getAllBlogs(): Promise<(Blog & { tags: Tag[] })[]> {
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

    // Fetch tags for each blog using helper
    const blogsWithTags = await Promise.all(
      blogs.map(async (blog: Blog) => ({
        ...blog,
        tags: await fetchTagsForBlog(blog.id)
      }))
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