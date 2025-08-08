import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    res.status(500).send('Error fetching blogs');
    return;
  }

  const siteUrl = process.env.SITE_URL || 'https://fusionfry.vercel.app/';
  const feedItems = blogs.map(blog => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${siteUrl}/blog/${blog.slug}</link>
      <guid>${siteUrl}/blog/${blog.slug}</guid>
      <description><![CDATA[${blog.excerpt || ''}]]></description>
      <pubDate>${new Date(blog.created_at).toUTCString()}</pubDate>
    </item>
  `).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>FusionFry Blog</title>
      <link>${siteUrl}</link>
      <description>Latest updates from FusionFry Blog</description>
      <language>en-us</language>
      ${feedItems}
    </channel>
  </rss>`;

  res.setHeader('Content-Type', 'application/rss+xml');
  res.status(200).send(rss);
}
