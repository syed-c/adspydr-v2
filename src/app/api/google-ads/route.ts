import { NextRequest, NextResponse } from 'next/server';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = 'google-ad-library.p.rapidapi.com';

export async function POST(request: NextRequest) {
  let cleanDomain = '';
  
  try {
    const { domain, country = 'US' } = await request.json();

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    const response = await fetch(
      `https://google-ad-library.p.rapidapi.com/search?domain=${encodeURIComponent(cleanDomain)}&country_code=${country}&format=ALL&limit=40`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Google search error:', errorText);
      return NextResponse.json({
        success: true,
        domain: cleanDomain,
        ads: [],
        total_ads: 0,
        note: 'Could not fetch Google ads',
      });
    }

    const data = await response.json();
    const ads = data.ads || [];

    if (!ads || ads.length === 0) {
      return NextResponse.json({
        success: true,
        domain: cleanDomain,
        ads: [],
        total_ads: 0,
      });
    }

    const formattedAds = ads.map((ad: Record<string, unknown>, index: number) => {
      const variants = ad.variants as Array<{ content?: string; height?: number; width?: number }> | undefined;
      const firstVariant = variants?.[0];
      let adText = '';
      let creativeUrl = '';
      if (firstVariant?.content) {
        const imgMatch = firstVariant.content.match(/src="([^"]+)"/);
        if (imgMatch) {
          creativeUrl = imgMatch[1];
        }
      }
      
      return {
        id: ad.creative_id || `google-${index}`,
        platform: 'google',
        ad_text: adText,
        ad_headlines: [],
        ad_descriptions: [],
        creative: creativeUrl,
        ad_url: ad.original_url || '',
        impressions: 'N/A',
        start_date: ad.start || null,
        last_seen: ad.last_seen || null,
        advertiser_name: ad.advertiser_name || '',
        domain: cleanDomain,
        format: ad.format || '',
      };
    });

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      ads: formattedAds,
      total_ads: formattedAds.length,
    });
  } catch (error) {
    console.error('Google Ads API Error:', error);
    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      ads: [],
      total_ads: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
