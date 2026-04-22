import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

async function fetchFromSupabase(table: string, slug?: string) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return null;
  }
  
  const tableName = 'blog_posts';
  const url = slug 
    ? `${SUPABASE_URL}/rest/v1/${tableName}?slug=eq.${slug}`
    : `${SUPABASE_URL}/rest/v1/${tableName}?select=*&order=published_at.desc&published=eq.true`;
    
  try {
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    return slug ? (data[0] || null) : (data || []);
  } catch (e) {
    console.error('Supabase fetch error:', e);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  // Try Supabase first
  if (SUPABASE_URL && SUPABASE_KEY) {
    if (slug) {
      const post = await fetchFromSupabase('blogs', slug);
      if (post) {
        return NextResponse.json({ success: true, post });
      }
    } else {
      const posts = await fetchFromSupabase('blogs');
      if (posts) {
        return NextResponse.json({ success: true, posts });
      }
    }
  }
  
  // Fallback: Return empty (demo data handled in frontend)
  return NextResponse.json({ success: true, posts: [] });
}