'use client';

export default function AccountPage() {
  return (
    <div>
      <div className="page-header"><h1>⚙️ Account Settings</h1></div>
      
      <section className="section">
        <h2>Profile</h2>
        <div className="form-group"><label>Name</label><input type="text" defaultValue="User" /></div>
        <div className="form-group"><label>Email</label><input type="email" defaultValue="user@example.com" /></div>
        <button className="btn-primary">Save Changes</button>
      </section>

      <section className="section">
        <h2>Current Plan</h2>
        <div className="plan-card"><div><h3>FREE Plan</h3><p>5 searches/month</p></div><button className="btn-secondary">Upgrade</button></div>
      </section>

      <style>{`
        .page-header h1 { font-size: 1.8rem; margin-bottom: 32px; }
        .section { background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
        .section h2 { font-size: 1.1rem; margin-bottom: 20px; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-size: 0.9rem; font-weight: 500; margin-bottom: 6px; }
        .form-group input { width: 100%; padding: 12px 16px; border: 1px solid #e5e5e5; border-radius: 8px; }
        .btn-primary { background: #0d0d0d; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .btn-secondary { background: white; border: 1px solid #e5e5e5; padding: 12px 24px; border-radius: 8px; cursor: pointer; }
        .plan-card { display: flex; justify-content: space-between; align-items: center; background: #f5f5f5; padding: 20px; border-radius: 8px; }
        .plan-card h3 { font-size: 1.2rem; margin-bottom: 4px; }
        .plan-card p { color: #6b6b6b; }
      `}</style>
    </div>
  );
}