import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables: SUPABASE_URL or SUPABASE_ANON_KEY');
}
const supabase = createClient(supabaseUrl, supabaseKey);

const handler = async (req: any, res: any) => {
  const { blog_id } = req.query;
  if (!blog_id) {
    return res.status(400).json({ error: 'Missing blog_id parameter' });
  }
  const { data, error } = await supabase
    .from('blog_tags')
    .select('tags(id,name,slug,created_at)')
    .eq('blog_id', blog_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json(data);
};

export default handler;
