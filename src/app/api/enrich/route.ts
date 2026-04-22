import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const HUNTER_API_KEY = process.env.HUNTER_API_KEY;

export async function POST(request: NextRequest) {
  let cleanDomain = '';
  
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    const response = await axios.get(`https://api.hunter.io/v2/domain-search`, {
      params: {
        domain: cleanDomain,
        api_key: HUNTER_API_KEY,
      },
    });

    const data = response.data.data;

    if (!data || !data.domain) {
      return NextResponse.json({
        success: true,
        domain: cleanDomain,
        company_name: cleanDomain.split('.')[0].charAt(0).toUpperCase() + cleanDomain.split('.')[0].slice(1),
        logo: null,
        industry: null,
        description: null,
        employee_count: null,
        location: null,
        linkedin: null,
        facebook: null,
        twitter: null,
        emails: [],
      });
    }

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      company_name: data.companyName || data.name || cleanDomain.split('.')[0],
      logo: data.logo || null,
      industry: data.industry || null,
      description: data.description || null,
      employee_count: data.numberOfEmployees || data.employeeCount || null,
      location: data.city && data.country ? `${data.city}, ${data.country}` : data.location || null,
      linkedin: data.linkedin || null,
      facebook: data.facebook || null,
      twitter: data.twitter || null,
      emails: data.emails || [],
    });
  } catch (error) {
    console.error('Hunter.io API Error:', error);
    
    const fallbackDomain = cleanDomain || 'unknown';
    
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return NextResponse.json({
        success: true,
        domain: fallbackDomain,
        company_name: fallbackDomain.split('.')[0],
        logo: null,
        industry: null,
        description: null,
        employee_count: null,
        location: null,
        linkedin: null,
        facebook: null,
        twitter: null,
        emails: [],
      });
    }

    return NextResponse.json(
      { error: 'Failed to enrich domain', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
