'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Search {
  id: string;
  domain: string;
  company_name: string;
  ads_found: number;
  spend_tier: string;
  created_at: string;
}

export default function DashboardPage() {
  const [searches, setSearches] = useState<Search[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch('/api/search/history');
        const data = await res.json();
        setSearches(data.searches || []);
      } catch (e) {
        console.error('Failed to fetch history:', e);
      }
      setLoading(false);
    }
    fetchHistory();
  }, []);

  return (
    <div>
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div>
          <h1>Welcome back!</h1>
          <p>Ready to spy on your competitors?</p>
        </div>
        <Link href="/dashboard/spy" className="btn-primary">Start New Search 🔍</Link>
      </section>

      {/* Stats Grid */}
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Searches</span>
          <span className="stat-value">{searches.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">This Month</span>
          <span className="stat-value">{searches.length}</span>
        </div>
      </section>

      {/* Recent Searches */}
      <section className="section">
        <div className="section-header">
          <h2>Recent Searches</h2>
          <Link href="/dashboard/spy" className="section-link">View all →</Link>
        </div>
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : searches.length === 0 ? (
          <div className="empty">
            <p>No searches yet. Start by spying on a competitor!</p>
            <Link href="/dashboard/spy" className="btn-secondary">Start Searching</Link>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Domain</th>
                  <th>Ads Found</th>
                  <th>Spend Tier</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {searches.map(search => (
                  <tr key={search.id}>
                    <td>
                      <Link href={`/dashboard/spy?domain=${search.domain}`} className="domain-link">
                        {search.domain}
                      </Link>
                    </td>
                    <td>{search.ads_found || 0}</td>
                    <td>
                      <span className={`tier tier-${search.spend_tier?.toLowerCase() || 'low'}`}>
                        {search.spend_tier || 'LOW'}
                      </span>
                    </td>
                    <td>{search.created_at?.split('T')[0] || '-'}</td>
                    <td>
                      <Link href={`/dashboard/spy?domain=${search.domain}`} className="action-link">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="section">
        <div className="section-header"><h2>Quick Actions</h2></div>
        <div className="quick-actions">
          <Link href="/dashboard/spy" className="action-card">
            <span className="action-icon">🔍</span>
            <span className="action-title">New Search</span>
          </Link>
          <Link href="/dashboard/competitors" className="action-card">
            <span className="action-icon">🏢</span>
            <span className="action-title">Add Competitor</span>
          </Link>
          <Link href="/dashboard/alerts" className="action-card">
            <span className="action-icon">🔔</span>
            <span className="action-title">Set Alert</span>
          </Link>
          <Link href="/dashboard/reports" className="action-card">
            <span className="action-icon">📊</span>
            <span className="action-title">Generate Report</span>
          </Link>
        </div>
      </section>

      <style>{`
        .welcome-banner { background: linear-gradient(135deg, #0d0d0d, #262626); border-radius: 16px; padding: 40px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; flex-wrap: wrap; gap: 20px; }
        .welcome-banner h1 { font-size: 1.8rem; color: white; margin-bottom: 8px; }
        .welcome-banner p { color: rgba(255,255,255,0.7); }
        .btn-primary { background: white; color: #0d0d0d; padding: 14px 28px; border-radius: 10px; font-weight: 600; text-decoration: none; }
        .btn-secondary { background: #f5f5f5; color: #0d0d0d; padding: 12px 24px; border-radius: 8px; font-weight: 500; text-decoration: none; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
        .stat-card { background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; }
        .stat-label { display: block; font-size: 0.85rem; color: #6b6b6b; margin-bottom: 8px; }
        .stat-value { font-size: 2rem; font-weight: 700; }

        .section { background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
        .section-header h2 { font-size: 1.2rem; font-weight: 600; }
        .section-link { color: #0d0d0d; font-weight: 500; text-decoration: none; }

        .loading { text-align: center; padding: 40px; color: #6b6b6b; }
        .empty { text-align: center; padding: 40px; }
        .empty p { color: #6b6b6b; margin-bottom: 16px; }

        .table-container { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 14px 12px; text-align: left; border-bottom: 1px solid #e5e5e5; }
        th { font-size: 0.8rem; font-weight: 600; color: #6b6b6b; text-transform: uppercase; }
        .domain-link { color: #0d0d0d; font-weight: 500; text-decoration: none; }
        .action-link { color: #6b6b6b; text-decoration: none; font-size: 0.9rem; }
        .tier { font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
        .tier-high { background: #fef3c7; color: #d97706; }
        .tier-medium { background: #dbeafe; color: #2563eb; }
        .tier-low { background: #d1fae5; color: #059669; }

        .quick-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .action-card { background: #fafafa; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; text-decoration: none; display: flex; flex-direction: column; align-items: center; text-align: center; transition: all 0.2s; }
        .action-card:hover { background: white; transform: translateY(-2px); }
        .action-icon { font-size: 1.5rem; margin-bottom: 8px; }
        .action-title { font-weight: 600; color: #0d0d0d; font-size: 0.9rem; }

        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .quick-actions { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr; } .quick-actions { grid-template-columns: 1fr; } .welcome-banner { flex-direction: column; text-align: center; } }
      `}</style>
    </div>
  );
}