'use client';

import Link from 'next/link';

export default function CompetitorsPage() {
  const competitors = [
    { id: '1', domain: 'shopify.com', nickname: 'Shopify', ads_found: 156 },
  ];

  return (
    <div>
      <div className="page-header">
        <div><h1>🏢 Competitors</h1><p>Track your competitors.</p></div>
        <button className="btn-primary">+ Add Competitor</button>
      </div>

      {competitors.length === 0 ? (
        <div className="empty"><div className="empty-icon">🏢</div><h3>No competitors tracked</h3></div>
      ) : (
        <div className="grid">
          {competitors.map(c => (
            <div key={c.id} className="card">
              <h3>{c.nickname}</h3>
              <p>{c.domain}</p>
              <p>{c.ads_found} ads</p>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .page-header h1 { font-size: 1.8rem; margin-bottom: 4px; }
        .page-header p { color: #6b6b6b; }
        .btn-primary { background: #0d0d0d; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .empty { text-align: center; padding: 80px; }
        .empty-icon { font-size: 4rem; margin-bottom: 16px; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .card { background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; }
        .card h3 { font-size: 1.1rem; margin-bottom: 8px; }
        .card p { color: #6b6b6b; font-size: 0.9rem; }
      `}</style>
    </div>
  );
}