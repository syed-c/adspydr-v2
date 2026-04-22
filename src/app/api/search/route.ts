import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const DEMO_MODE = false;

const DEMO_FACEBOOK_ADS = [
  {
    id: 'demo-fb-1',
    platform: 'facebook',
    ad_title: 'Start Your Online Store Today',
    ad_text: 'Join 1 million+ entrepreneurs who started their business with our platform. Free 14-day trial, no credit card required.',
    creative: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    impressions: '50K-100K',
    start_date: '2025-01-15',
    advertiser_name: 'Demo Brand',
    page_name: 'Demo Brand',
  },
  {
    id: 'demo-fb-2',
    platform: 'facebook',
    ad_title: 'The Easiest Way to Sell Online',
    ad_text: 'Everything you need to run your business in one place. From payments to shipping, we\'ve got you covered.',
    creative: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400',
    impressions: '100K-200K',
    start_date: '2025-02-01',
    advertiser_name: 'Demo Brand',
    page_name: 'Demo Brand',
  },
  {
    id: 'demo-fb-3',
    platform: 'facebook',
    ad_title: 'Build Your Dream Website',
    ad_text: 'Beautiful templates, powerful features. Start building your presence today.',
    creative: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    impressions: '25K-50K',
    start_date: '2025-02-15',
    advertiser_name: 'Demo Brand',
    page_name: 'Demo Brand',
  },
];

const DEMO_GOOGLE_ADS = [
  {
    id: 'demo-google-1',
    platform: 'google',
    ad_title: 'Demo Brand - Best Solution',
    ad_headlines: ['Best Ecommerce Platform', 'Start Selling Online', 'Free Trial'],
    ad_descriptions: ['The all-in-one platform to grow your business. Join thousands of merchants.'],
    ad_text: 'The all-in-one platform to grow your business. Start your free trial today.',
    impressions: '1M-5M',
    start_date: '2025-01-01',
    advertiser_name: 'Demo Brand',
    domain: 'demo.com',
  },
  {
    id: 'demo-google-2',
    platform: 'google',
    ad_title: 'Sell Anywhere, Anytime',
    ad_headlines: ['Sell Online Easily', 'Best POS System', 'Free Setup'],
    ad_descriptions: ['Accept payments anywhere. No hidden fees.'],
  },
];

export async function POST(request: NextRequest) {
  try {
    const { domain, includeGoogle = true, includeMeta = true, limit = 20, demo = false } = await request.json();

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    let metaAds: Record<string, unknown>[] = [];
    let googleAds: Record<string, unknown>[] = [];
    let companyInfo: Record<string, unknown> = {};
    let trafficData: Record<string, unknown> = {};

    if (demo || DEMO_MODE) {
      metaAds = includeMeta ? DEMO_FACEBOOK_ADS : [];
      googleAds = includeGoogle ? DEMO_GOOGLE_ADS : [];
      companyInfo = {
        company_name: cleanDomain.split('.')[0].charAt(0).toUpperCase() + cleanDomain.split('.')[0].slice(1),
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100',
        industry: 'Technology',
        description: `Leading provider in the ${cleanDomain.split('.')[0]} space.`,
        location: 'San Francisco, CA',
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
      };
      trafficData = {
        estimated_spend: 'medium',
        monthly_visits: 1500000,
        global_rank: 1250,
        bounce_rate: 45,
        pages_per_visit: 3.2,
        top_keywords: ['online store', 'ecommerce', 'sell online', 'shopping cart', 'payment gateway'],
      };
    } else {
      if (includeMeta) {
        try {
          const metaResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/meta-ads`,
            { domain: cleanDomain }
          );
          metaAds = metaResponse.data.ads || [];
        } catch (e) {
          console.log('Meta ads fetch failed:', e);
        }
      }

      if (includeGoogle) {
        try {
          const googleResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/google-ads`,
            { domain: cleanDomain }
          );
          googleAds = googleResponse.data.ads || [];
        } catch (e) {
          console.log('Google ads fetch failed:', e);
        }
      }

      try {
        const enrichResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/enrich`,
          { domain: cleanDomain }
        );
        companyInfo = enrichResponse.data || {};
      } catch (e) {
        console.log('Enrich failed:', e);
      }

      try {
        const similarwebResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/similarweb`,
          { domain: cleanDomain }
        );
        trafficData = similarwebResponse.data || {};
      } catch (e) {
        console.log('SimilarWeb failed:', e);
      }
    }

    const allAds = [...metaAds, ...googleAds].slice(0, limit);

    const aiFallback = {
      summary: demo ? 'This demo data shows how the AI analysis will appear. The brand focuses on ease-of-use messaging and emphasizes free trials to reduce customer friction.' : 'Based on the ads analyzed, this brand uses various marketing strategies across their campaigns.',
      messaging_themes: demo ? ['Free trial', 'Easy setup', 'All-in-one solution', 'Business growth'] : ['Brand messaging', 'Product features', 'Social proof'],
      hooks: demo ? ['Start for free', 'No credit card required', 'Join 1M+ merchants', 'Everything you need'] : ['Limited time offer', 'Free trial', 'Exclusive deal'],
      cta_types: demo ? ['Start free trial', 'Sign up now', 'Get started', 'Try for free'] : ['Learn more', 'Sign up', 'Get started', 'Try now'],
      offer_patterns: demo ? ['Free trial (14 days)', 'No credit card required', 'Everything included', 'Money-back guarantee'] : ['Free trial', 'Discount', 'Limited time'],
      target_audience: demo ? 'Small business owners, entrepreneurs, dropshippers, e-commerce newbies' : 'General consumers and businesses',
      tone: demo ? 'Professional yet approachable, growth-focused' : 'Professional and informative',
      wins: demo ? ['Strong free trial offer', 'Clear value proposition', 'Social proof with user count'] : ['Clear messaging', 'Visual appeal'],
      improvements: demo ? ['Could add more specific use cases', 'Consider retargeting ads'] : ['More diverse ad formats'],
    };

    let aiAnalysis: Record<string, unknown> = {};

    if (allAds.length > 0) {
      try {
        const aiResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/ai-analyze`,
          { ads: allAds, domain: cleanDomain },
          { timeout: 45000 }
        );
        console.log('AI response status:', aiResponse.status);
        const responseData = aiResponse.data;
        console.log('AI response keys:', Object.keys(responseData));
        
        if (responseData.summary && responseData.summary !== 'Could not analyze ads') {
          aiAnalysis = responseData;
        } else {
          console.log('AI returned fallback, using static fallback');
          aiAnalysis = aiFallback;
        }
      } catch (aiError) {
        console.log('AI analysis failed:', aiError);
        aiAnalysis = aiFallback;
      }
    } else {
      aiAnalysis = aiFallback;
    }

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      company: {
        name: companyInfo.company_name || cleanDomain.split('.')[0],
        logo: companyInfo.logo,
        industry: companyInfo.industry,
        description: companyInfo.description,
        location: companyInfo.location,
        linkedin: companyInfo.linkedin,
        facebook: companyInfo.facebook,
      },
      ads: {
        facebook: metaAds,
        google: googleAds,
        total: allAds.length,
        has_facebook: metaAds.length > 0,
        has_google: googleAds.length > 0,
      },
      spend_tier: trafficData.estimated_spend || 'unknown',
      traffic: {
        monthly_visits: trafficData.monthly_visits || 0,
        global_rank: trafficData.global_rank,
        bounce_rate: trafficData.bounce_rate,
        pages_per_visit: trafficData.pages_per_visit,
        top_keywords: trafficData.top_keywords || [],
      },
      ai_analysis: aiAnalysis,
      timestamp: new Date().toISOString(),
      is_demo: demo || DEMO_MODE,
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Failed to complete search', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
