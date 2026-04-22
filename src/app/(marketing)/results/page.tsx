'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

interface AdData {
  id: string;
  platform: string;
  ad_text?: string;
  ad_title?: string;
  ad_headlines?: string[];
  ad_descriptions?: string[];
  creative?: string;
  images?: string[];
  impressions?: string;
  start_date?: string;
  advertiser_name?: string;
  page_name?: string;
  format?: string;
}

interface SearchResult {
  success: boolean;
  domain: string;
  company: {
    name: string;
    logo?: string;
    industry?: string;
    description?: string;
    location?: string;
    linkedin?: string;
    facebook?: string;
  };
  ads: {
    facebook: AdData[];
    google: AdData[];
    total: number;
    has_facebook: boolean;
    has_google: boolean;
  };
  spend_tier: string;
  traffic: {
    monthly_visits: number;
    global_rank?: number;
    bounce_rate?: number;
    pages_per_visit?: number;
    top_keywords: string[];
  };
  ai_analysis: {
    summary?: string;
    messaging_themes?: string[];
    hooks?: string[];
    cta_types?: string[];
    offer_patterns?: string[];
    target_audience?: string;
    tone?: string;
    wins?: string[];
    improvements?: string[];
  };
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const domain = searchParams.get('domain') || '';
  const platformParam = searchParams.get('platform') || 'all';
  
  const [data, setData] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'facebook' | 'google'>('all');
  const [selectedAd, setSelectedAd] = useState<AdData | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const platform = platformParam as 'all' | 'google' | 'facebook';

  useEffect(() => {
    setVisibleCount(12);
  }, [activeTab]);

  useEffect(() => {
    if (!domain) {
      setError('No domain provided');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            domain, 
            includeGoogle: platform === 'all' || platform === 'google',
            includeMeta: platform === 'all' || platform === 'facebook',
            limit: 40 
          }),
        });

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch data');
        }

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [domain, platform]);

  if (loading) {
    const platformText = platform === 'all' ? 'Facebook, Google' : platform === 'google' ? 'Google' : 'Facebook';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Spying on {domain}...</h2>
          <p className="text-gray-400">Collecting ads from {platformText} & AI analysis</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link href="/" className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg">
            Try Another Search
          </Link>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const displayAds = activeTab === 'all' 
    ? [...data.ads.facebook, ...data.ads.google]
    : activeTab === 'facebook' 
      ? data.ads.facebook 
      : data.ads.google;

  const spendTierColor = {
    low: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    high: 'bg-red-500/20 text-red-400',
    unknown: 'bg-gray-500/20 text-gray-400',
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <span className="text-purple-400">Ad</span>Spy
          </Link>
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← New Search
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {data.company.logo && (
              <img src={data.company.logo} alt={data.company.name} className="w-12 h-12 rounded-lg object-cover" />
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">{data.company.name}</h1>
              <p className="text-gray-400">{data.domain}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${spendTierColor[data.spend_tier as keyof typeof spendTierColor] || spendTierColor.unknown}`}>
              {data.spend_tier === 'high' ? '💰 High Spend' : data.spend_tier === 'medium' ? '💵 Medium Spend' : data.spend_tier === 'low' ? '💲 Low Spend' : 'Unknown Spend'}
            </div>
            {data.company.industry && (
              <div className="px-4 py-2 rounded-full bg-white/10 text-sm text-gray-300">
                {data.company.industry}
              </div>
            )}
            {data.traffic.global_rank && (
              <div className="px-4 py-2 rounded-full bg-white/10 text-sm text-gray-300">
                Global Rank: #{data.traffic.global_rank}
              </div>
            )}
            {data.traffic.monthly_visits > 0 && (
              <div className="px-4 py-2 rounded-full bg-white/10 text-sm text-gray-300">
                {(data.traffic.monthly_visits / 1000000).toFixed(1)}M monthly visits
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Active Ads</h2>
                <div className="flex gap-2">
                  {[
                    { id: 'all', label: `All (${data.ads.total})` },
                    { id: 'facebook', label: `Facebook (${data.ads.facebook.length})` },
                    { id: 'google', label: `Google (${data.ads.google.length})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {displayAds.length === 0 ? (
                <div className="bg-white/5 rounded-xl p-8 text-center">
                  <p className="text-gray-400">No ads found for this domain</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {displayAds.slice(0, visibleCount).map((ad, index) => (
                      <div
                        key={ad.id || index}
                        onClick={() => setSelectedAd(ad)}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 cursor-pointer transition-all hover:border-purple-500/50"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            ad.platform === 'facebook' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {ad.platform === 'facebook' ? 'Facebook' : 'Google'}
                          </span>
                          {ad.format && (
                            <span className="text-xs text-gray-500">{ad.format}</span>
                          )}
                          {ad.impressions && ad.impressions !== 'N/A' && (
                            <span className="text-xs text-gray-500">{ad.impressions} impressions</span>
                          )}
                        </div>
                        {ad.creative && (
                          <div className="mb-3 rounded-lg overflow-hidden bg-black/20">
                            <img src={ad.creative} alt="Ad creative" className="w-full h-32 object-cover" />
                          </div>
                        )}
                        {ad.images && ad.images.length > 0 && (
                          <div className="mb-3 grid grid-cols-2 gap-1">
                            {ad.images.slice(0, 4).map((img, idx) => (
                              <div key={idx} className="rounded overflow-hidden bg-black/20">
                                <img src={img} alt={`Ad creative ${idx + 1}`} className="w-full h-20 object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                        {ad.ad_title && (
                          <h3 className="font-semibold text-white mb-2 line-clamp-2">{ad.ad_title}</h3>
                        )}
                        {ad.ad_text && (
                          <p className="text-sm text-gray-400 line-clamp-3">{ad.ad_text}</p>
                        )}
                        {!ad.ad_title && !ad.ad_text && ad.advertiser_name && (
                          <p className="text-sm text-gray-400 mb-2">{ad.advertiser_name}</p>
                        )}
                        {ad.ad_headlines && ad.ad_headlines.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {ad.ad_headlines.slice(0, 2).map((headline, i) => (
                              <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded">{headline}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {displayAds.length > visibleCount && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 12)}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Load More ({displayAds.length - visibleCount} more)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            {data.ai_analysis && data.ai_analysis.summary && (
              <div className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-xl p-6 border border-purple-500/20 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🤖</span>
                  <h2 className="text-lg font-semibold text-white">AI Strategy Analysis</h2>
                </div>
                
                <p className="text-gray-300 mb-6">{data.ai_analysis.summary}</p>
                
                {data.ai_analysis.messaging_themes && data.ai_analysis.messaging_themes.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-purple-400 mb-2">Messaging Themes</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.ai_analysis.messaging_themes.map((theme, i) => (
                        <span key={i} className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300">{theme}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {data.ai_analysis.hooks && data.ai_analysis.hooks.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-cyan-400 mb-2">Top Hooks</h3>
                    <ul className="space-y-1">
                      {data.ai_analysis.hooks.slice(0, 3).map((hook, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-cyan-400">→</span> {hook}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {data.ai_analysis.cta_types && data.ai_analysis.cta_types.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-yellow-400 mb-2">Call-to-Actions</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.ai_analysis.cta_types.map((cta, i) => (
                        <span key={i} className="text-xs bg-yellow-500/10 px-3 py-1 rounded-full text-yellow-300">{cta}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {data.ai_analysis.target_audience && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-green-400 mb-2">Target Audience</h3>
                    <p className="text-sm text-gray-300">{data.ai_analysis.target_audience}</p>
                  </div>
                )}
                
                {data.ai_analysis.wins && data.ai_analysis.wins.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-green-400 mb-2">What They Do Well</h3>
                    <ul className="space-y-1">
                      {data.ai_analysis.wins.slice(0, 2).map((win, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-green-400">✓</span> {win}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {data.traffic.top_keywords && data.traffic.top_keywords.length > 0 && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-4">Top Keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {data.traffic.top_keywords.slice(0, 10).map((keyword: string, i: number) => (
                    <span key={i} className="text-sm bg-white/10 px-3 py-1 rounded-lg text-gray-300">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedAd && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedAd(null)}>
          <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded text-sm font-medium ${
                  selectedAd.platform === 'facebook' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  {selectedAd.platform === 'facebook' ? 'Facebook' : 'Google'} Ad
                </span>
                <button onClick={() => setSelectedAd(null)} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {selectedAd.ad_title && (
                <h3 className="text-xl font-bold text-white mb-4">{selectedAd.ad_title}</h3>
              )}
              
              {selectedAd.ad_headlines && selectedAd.ad_headlines.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Headlines</h4>
                  {selectedAd.ad_headlines.map((headline, i) => (
                    <p key={i} className="text-white mb-1">{headline}</p>
                  ))}
                </div>
              )}
              
              {selectedAd.ad_text && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Ad Copy</h4>
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedAd.ad_text}</p>
                </div>
              )}
              
              {selectedAd.ad_descriptions && selectedAd.ad_descriptions.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Descriptions</h4>
                  {selectedAd.ad_descriptions.map((desc, i) => (
                    <p key={i} className="text-gray-300 mb-1">{desc}</p>
                  ))}
                </div>
              )}

              {selectedAd.creative && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Creative</h4>
                  <img src={selectedAd.creative} alt="Ad creative" className="w-full rounded-lg" />
                </div>
              )}
              
              <div className="flex gap-4 text-sm text-gray-500">
                {selectedAd.impressions && selectedAd.impressions !== 'N/A' && (
                  <span>{selectedAd.impressions} impressions</span>
                )}
                {selectedAd.start_date && (
                  <span>Started: {new Date(selectedAd.start_date).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading...</h2>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}