import Link from 'next/link';
import MobileNav from '@/components/MobileNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo">Ad SpyDr</Link>
        </div>
        
        <nav className="sidebar-nav">
          <Link href="/dashboard" className="nav-item">
            <span className="nav-icon">📊</span>
            <span className="nav-label">Dashboard</span>
          </Link>
          <Link href="/dashboard/spy" className="nav-item">
            <span className="nav-icon">🔍</span>
            <span className="nav-label">Spy</span>
          </Link>
          <Link href="/dashboard/competitors" className="nav-item">
            <span className="nav-icon">🏢</span>
            <span className="nav-label">Competitors</span>
          </Link>
          <Link href="/dashboard/alerts" className="nav-item">
            <span className="nav-icon">🔔</span>
            <span className="nav-label">Alerts</span>
          </Link>
          <Link href="/dashboard/reports" className="nav-item">
            <span className="nav-icon">📈</span>
            <span className="nav-label">Reports</span>
          </Link>
          <Link href="/dashboard/account" className="nav-item">
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">Account</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="plan-badge">
            <span className="plan-label">Plan</span>
            <span className="plan-value">FREE</span>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-user">
            <Link href="/auth/login" className="btn-logout">Sign Out</Link>
          </div>
        </header>
        
        <div className="dashboard-content">
          {children}
        </div>
      </main>

      <MobileNav />

      <style>{`
        .dashboard-layout { display: flex; min-height: 100vh; background: #fafafa; }
        .sidebar { width: 260px; background: #0d0d0d; color: white; display: flex; flex-direction: column; position: fixed; height: 100vh; left: 0; top: 0; }
        .sidebar-header { padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .sidebar-logo { font-size: 1.4rem; font-weight: 700; color: white; text-decoration: none; }
        .sidebar-nav { flex: 1; padding: 20px 12px; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 14px 16px; color: rgba(255,255,255,0.7); text-decoration: none; border-radius: 10px; margin-bottom: 4px; transition: all 0.2s; }
        .nav-item:hover { background: rgba(255,255,255,0.1); color: white; }
        .nav-item.active { background: white; color: #0d0d0d; }
        .nav-icon { font-size: 1.1rem; }
        .nav-label { font-size: 0.95rem; font-weight: 500; }
        .sidebar-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
        .plan-badge { display: flex; justify-content: space-between; }
        .plan-label { font-size: 0.8rem; color: rgba(255,255,255,0.5); }
        .plan-value { font-size: 0.85rem; font-weight: 600; color: #22c55e; }
        .dashboard-main { flex: 1; margin-left: 260px; min-height: 100vh; padding-bottom: 70px; }
        .dashboard-header { background: white; padding: 20px 32px; border-bottom: 1px solid #e5e5e5; display: flex; justify-content: flex-end; }
        .btn-logout { color: #6b6b6b; text-decoration: none; font-size: 0.9rem; }
        .btn-logout:hover { color: #0d0d0d; }
        .dashboard-content { padding: 32px; }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .dashboard-main { margin-left: 0; }
          .dashboard-content { padding: 16px; padding-bottom: 80px; }
        }
      `}</style>
    </div>
  );
}