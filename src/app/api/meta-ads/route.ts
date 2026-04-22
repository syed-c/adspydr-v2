import { NextRequest, NextResponse } from 'next/server';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = 'facebook-ads-library-scraper-api.p.rapidapi.com';

function extractCompanyName(domain: string): string {
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '').replace(/^www\./, '');
  const parts = cleanDomain.split('.');
  let companyName = parts[0];
  companyName = companyName.charAt(0).toUpperCase() + companyName.slice(1).toLowerCase();
  companyName = companyName.replace(/[-_]/g, ' ');
  const words = companyName.split(' ');
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return capitalizedWords.join(' ');
}

export async function POST(request: NextRequest) {
  let cleanDomain = '';
  let companyName = '';
  
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    companyName = extractCompanyName(cleanDomain);

    const apiUrl = `https://${RAPIDAPI_HOST}/company/ads?companyName=${encodeURIComponent(companyName)}&status=ALL&media_type=ALL&sort_by=total_impressions&trim=false`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Meta ads API error:', response.status, errorText);
      return NextResponse.json({
        success: true,
        domain: cleanDomain,
        company_name: companyName,
        ads: [],
        total_ads: 0,
        note: 'Could not fetch Meta ads',
      });
    }

    const data = await response.json();
    
    if (!data.success || !data.results || data.results.length === 0) {
      return NextResponse.json({
        success: true,
        domain: cleanDomain,
        company_name: companyName,
        ads: [],
        total_ads: 0,
      });
    }

    const formattedAds = data.results.map((ad: Record<string, unknown>) => {
      const snapshot = (ad.snapshot as Record<string, unknown>) || {};
      const cards = (snapshot.cards as Array<Record<string, unknown>>) || [];
      
      const images: string[] = [];
      const videos: Array<{ hd_url: string; sd_url: string; preview_image: string }> = [];
      
      if (snapshot.images && Array.isArray(snapshot.images)) {
        (snapshot.images as Array<Record<string, unknown>>).forEach((img: Record<string, unknown>) => {
          if (img.original_image_url) images.push(img.original_image_url as string);
          if (img.resized_image_url) images.push(img.resized_image_url as string);
        });
      }
      
      if (snapshot.videos && Array.isArray(snapshot.videos)) {
        (snapshot.videos as Array<Record<string, unknown>>).forEach((vid: Record<string, unknown>) => {
          videos.push({
            hd_url: (vid.video_hd_url as string) || '',
            sd_url: (vid.video_sd_url as string) || '',
            preview_image: (vid.video_preview_image_url as string) || '',
          });
        });
      }

      cards.forEach((card: Record<string, unknown>) => {
        if (card.original_image_url) images.push(card.original_image_url as string);
        if (card.resized_image_url) images.push(card.resized_image_url as string);
        if (card.video_hd_url) videos.push({ hd_url: card.video_hd_url as string, sd_url: (card.video_sd_url as string) || '', preview_image: (card.video_preview_image_url as string) || '' });
      });

      if (snapshot.extra_images && Array.isArray(snapshot.extra_images)) {
        (snapshot.extra_images as Array<Record<string, unknown>>).forEach((img: Record<string, unknown>) => {
          if (img.original_image_url) images.push(img.original_image_url as string);
          if (img.resized_image_url) images.push(img.resized_image_url as string);
        });
      }

      const adText = (snapshot.body as Record<string, unknown>)?.text as string || (snapshot.body as string) || '';
      const adTitle = (snapshot.title as string) || '';
      const ctaText = (snapshot.cta_text as string) || '';
      const ctaType = (snapshot.cta_type as string) || '';
      const linkUrl = (snapshot.link_url as string) || '';
      const linkDescription = (snapshot.link_description as string) || '';

      return {
        id: ad.ad_archive_id,
        platform: 'facebook',
        ad_text: adText,
        ad_title: adTitle,
        cta_text: ctaText,
        cta_type: ctaType,
        link_url: linkUrl,
        link_description: linkDescription,
        images: images.filter(Boolean),
        videos: videos.filter(v => v.hd_url || v.sd_url),
        primary_image: images[0] || '',
        primary_video: videos[0] || null,
        impressions: (ad.impressions_with_index as Record<string, unknown>)?.impressions_text as string || 'N/A',
        start_date: ad.start_date_string || null,
        end_date: ad.end_date_string || null,
        advertiser_name: snapshot.page_name || companyName,
        page_name: snapshot.page_name || companyName,
        page_id: ad.page_id,
        ad_archive_id: ad.ad_archive_id,
        is_active: ad.is_active,
        publisher_platform: ad.publisher_platform || [],
        display_format: snapshot.display_format || '',
      };
    });

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      company_name: companyName,
      ads: formattedAds,
      total_ads: formattedAds.length,
      search_count: data.searchResultsCount || formattedAds.length,
    });
  } catch (error) {
    console.error('Meta Ads API Error:', error);
    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      company_name: companyName,
      ads: [],
      total_ads: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
