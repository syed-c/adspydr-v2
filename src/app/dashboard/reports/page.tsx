'use client';

export default function ReportsPage() {
  return (
    <div>
      <div className="page-header">
        <div><h1>📊 Reports</h1><p>Generate ad intelligence reports.</p></div>
        <button className="btn-primary">+ Generate Report</button>
      </div>
      <div className="empty"><div className="empty-icon">📊</div><h3>No reports yet</h3></div>
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