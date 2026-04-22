'use client';

import { useState } from 'react';

export default function SpyPage() {
  const [domain, setDomain] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setSearching(true);
    await new Promise(r => setTimeout(r, 2000));
    setSearching(false);
  };

  return (
    <div className="spy-page">
      <section className="search-header">
        <h1>🔍 Spy on Competitor Ads</h1>
        <p>Enter a domain to find their active ads.</p>
        <form onSubmit={handleSearch} className="search-form">
          <input type="text" placeholder="Enter domain (e.g., shopify.com)" value={domain} onChange={e => setDomain(e.target.value)} className="search-input" />
          <button type="submit" className="search-btn">{searching ? 'Searching...' : 'Find Ads'}</button>
        </form>
      </section>

      {!searching && !domain && (
        <section className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Ready to Find Competitor Ads</h3>
          <p>Enter a domain above to start.</p>
          <div className="suggested">
            <p>Try: <button onClick={() => setDomain('shopify.com')}>shopify.com</button> <button onClick={() => setDomain('funnel.io')}>funnel.io</button></p>
          </div>
        </section>
      )}

      <style>{`
        .spy-page { max-width: 1200px; }
        .search-header { text-align: center; padding: 40px; background: linear-gradient(135deg, #0d0d0d, #262626); border-radius: 16px; margin-bottom: 32px; }
        .search-header h1 { font-size: 2rem; color: white; margin-bottom: 8px; }
        .search-header p { color: rgba(255,255,255,0.7); margin-bottom: 24px; }
        .search-form { display: flex; gap: 12px; max-width: 500px; margin: 0 auto; }
        .search-input { flex: 1; padding: 16px 20px; border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; background: rgba(255,255,255,0.1); color: white; font-size: 1rem; }
        .search-input::placeholder { color: rgba(255,255,255,0.5); }
        .search-btn { background: white; color: #0d0d0d; border: none; padding: 16px 32px; border-radius: 10px; font-weight: 600; cursor: pointer; }
        .empty-state { text-align: center; padding: 80px; }
        .empty-icon { font-size: 4rem; margin-bottom: 20px; }
        .suggested button { background: #f5f5f5; border: none; padding: 8px 16px; border-radius: 20px; margin: 4px; cursor: pointer; }
      `}</style>
    </div>
  );
}