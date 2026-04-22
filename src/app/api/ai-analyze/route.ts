import { NextRequest, NextResponse } from 'next/server';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'open-ai21.p.rapidapi.com';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

async function generateWithGroq(prompt: string): Promise<Record<string, unknown>> {
  console.log('Calling Groq API...');
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 1,
      max_tokens: 4096,
    }),
  });

  console.log('Groq response status:', response.status);
  const data = await response.json();
  console.log('Groq response keys:', Object.keys(data));
  const content = data.choices?.[0]?.message?.content || '';
  
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.log('Failed to parse Groq response as JSON');
  }
  
  return {
    summary: content.substring(0, 500) || 'Could not analyze ads',
    messaging_themes: [],
    hooks: [],
    cta_types: [],
    offer_patterns: [],
    target_audience: 'Unknown',
    tone: 'Mixed',
    wins: [],
    improvements: [],
  };
}

export async function POST(request: NextRequest) {
  try {
    const { ads, domain } = await request.json();

    if (!ads || !Array.isArray(ads) || ads.length === 0) {
      return NextResponse.json({ error: 'Ads array is required' }, { status: 400 });
    }

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const adTexts = ads
      .slice(0, 15)
      .map((ad: { ad_text?: string; ad_title?: string; ad_headlines?: string[]; ad_descriptions?: string[]; advertiser_name?: string; format?: string; creative?: string }) => {
        let text = '';
        if (ad.advertiser_name) text += `Advertiser: ${ad.advertiser_name}\n`;
        if (ad.format) text += `Ad Format: ${ad.format}\n`;
        if (ad.ad_title) text += `Title: ${ad.ad_title}\n`;
        if (ad.ad_text) text += `Body: ${ad.ad_text}\n`;
        if (ad.ad_headlines?.length) text += `Headlines: ${ad.ad_headlines.join(', ')}\n`;
        if (ad.ad_descriptions?.length) text += `Descriptions: ${ad.ad_descriptions.join(', ')}\n`;
        return text;
      })
      .join('\n---\n');

    const prompt = `You are an expert marketing analyst. Analyze these competitor ads for "${domain}" and provide strategic insights.

ADS CONTENT:
${adTexts}

Provide a JSON response with exactly this structure (no extra text):
{
  "summary": "2-3 sentence overview of their ad strategy",
  "messaging_themes": ["theme 1", "theme 2", "theme 3"],
  "hooks": ["hook 1", "hook 2", "hook 3"],
  "cta_types": ["CTA 1", "CTA 2"],
  "offer_patterns": ["pattern 1", "pattern 2"],
  "target_audience": "brief description",
  "tone": "professional/urgent/playful/educational/etc",
  "wins": ["what they're doing well 1", "what they're doing well 2"],
  "improvements": ["potential weakness 1"]
}`;

    const response = await fetch('https://open-ai21.p.rapidapi.com/claude3', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        web_access: false,
      }),
    });

    let analysis: Record<string, unknown>;
    
    const data = await response.json();
    console.log('RapidAPI response:', JSON.stringify(data).slice(0, 500));
    
    if (!response.ok || !data.choices?.[0]?.message?.content) {
      console.log('RapidAPI failed or returned empty, falling back to Groq...');
      analysis = await generateWithGroq(prompt);
    } else {
      const content = data.choices[0].message.content;
      
      try {
        analysis = JSON.parse(content);
      } catch {
        analysis = {
          summary: content.substring(0, 500) || 'Could not analyze ads',
          messaging_themes: [],
          hooks: [],
          cta_types: [],
          offer_patterns: [],
          target_audience: 'Unknown',
          tone: 'Mixed',
          wins: [],
          improvements: [],
        };
      }
    }

    return NextResponse.json({
      success: true,
      domain,
      ...analysis,
    });
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze ads', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
