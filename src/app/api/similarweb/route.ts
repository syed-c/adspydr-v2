import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let cleanDomain = '';
  
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      estimated_spend: 'unknown',
      monthly_visits: 0,
      global_rank: null,
      bounce_rate: null,
      pages_per_visit: null,
      avg_visit_duration: null,
      traffic_sources: {},
      top_keywords: [],
      note: 'Traffic data requires SimilarWeb API subscription.',
    });
  } catch (error) {
    console.error('SimilarWeb API Error:', error);
    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      estimated_spend: 'unknown',
      monthly_visits: 0,
      global_rank: null,
      traffic_sources: {},
      top_keywords: [],
    });
  }
}
