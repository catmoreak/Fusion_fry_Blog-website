import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables: SUPABASE_URL or SUPABASE_ANON_KEY');
}
const supabase = createClient(supabaseUrl, supabaseKey);

const handler = async (req, res) => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json(data);
};

export default handler;
