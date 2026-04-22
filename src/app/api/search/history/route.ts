import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { domain, userId, results } = await req.json();

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      // Demo mode
      return NextResponse.json({ success: true, id: 'demo-search' });
    }

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/searches`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          domain,
          user_id: userId || 'anonymous',
          results: JSON.stringify(results || {}),
          status: 'COMPLETED',
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save search error:', error);
    return NextResponse.json({ error: 'Failed to save search' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'anonymous';

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return NextResponse.json({ searches: [] });
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/searches?user_id=eq.${userId}&order=created_at.desc&limit=50`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    const data = await res.json();
    return NextResponse.json({ searches: data || [] });
  } catch (error) {
    console.error('Fetch searches error:', error);
    return NextResponse.json({ searches: [] });
  }
}