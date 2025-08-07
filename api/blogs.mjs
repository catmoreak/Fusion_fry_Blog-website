import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables: SUPABASE_URL or SUPABASE_ANON_KEY');
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // If ?tags=1, return all tags
  if (req.query && req.query.tags) {
    const { data: tags, error: tagsError } = await supabase
      .from('tags')
      .select('*')
      .order('name');
    if (tagsError) {
      return res.status(500).json({ error: tagsError.message });
    }
    return res.status(200).json(tags);
  }

  // Otherwise, return blogs with their tags
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Fetch tags for each blog
  const blogsWithTags = await Promise.all(
    blogs.map(async (blog) => {
      const { data: blogTags, error: tagsError } = await supabase
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

      return {
        ...blog,
        tags: blogTags?.map((bt) => bt.tags).filter(Boolean) || []
      };
    })
  );

  res.status(200).json(blogsWithTags);
}
