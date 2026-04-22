'use client';

export default function AlertsPage() {
  return (
    <div>
      <div className="page-header">
        <div><h1>🔔 Alerts</h1><p>Get notified of changes.</p></div>
        <button className="btn-primary">+ Create Alert</button>
      </div>
      <div className="empty"><div className="empty-icon">🔔</div><h3>No alerts set up</h3></div>
      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .page-header h1 { font-size: 1.8rem; margin-bottom: 4px; }
        .page-header p { color: #6b6b6b; }
        .btn-primary { background: #0d0d0d; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .empty { text-align: center; padding: 80px; }
        .empty-icon { font-size: 4rem; margin-bottom: 16px; }
      `}</style>
    </div>
  );
}