'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Demo mode - accept any login
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link href="/" className="auth-logo">Ad SpyDr</Link>
            <h1>Welcome back</h1>
            <p>Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="auth-error">{error}</div>}
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link href="/auth/signup">Sign up</Link></p>
          </div>
        </div>
      </div>

      <style>{`
        .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #fafafa; padding: 24px; }
        .auth-container { width: 100%; max-width: 400px; }
        .auth-card { background: white; border: 1px solid #e5e5e5; border-radius: 16px; padding: 40px; }
        .auth-header { text-align: center; margin-bottom: 32px; }
        .auth-logo { font-size: 1.4rem; font-weight: 700; color: #0d0d0d; text-decoration: none; display: block; margin-bottom: 24px; }
        .auth-header h1 { font-size: 1.5rem; margin-bottom: 8px; }
        .auth-header p { color: #6b6b6b; }
        .auth-form { display: flex; flex-direction: column; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { font-size: 0.9rem; font-weight: 500; }
        .form-group input { padding: 14px 16px; border: 1px solid #e5e5e5; border-radius: 10px; font-size: 1rem; }
        .form-group input:focus { outline: none; border-color: #0d0d0d; }
        .btn-primary { background: #0d0d0d; color: white; border: none; padding: 16px; border-radius: 10px; font-weight: 600; cursor: pointer; }
        .btn-primary:disabled { opacity: 0.7; }
        .auth-error { background: #fef2f2; color: #dc2626; padding: 12px; border-radius: 8px; font-size: 0.9rem; }
        .auth-footer { text-align: center; margin-top: 24px; }
        .auth-footer p { color: #6b6b6b; }
        .auth-footer a { color: #0d0d0d; font-weight: 500; }
      `}</style>
    </div>
  );
}