import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SimpleHeader() {
  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">Ad SpyDr</Link>
        <span className="badge">Coming Soon</span>
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 16px 24px;
          background: rgba(13, 13, 13, 0.9);
          backdrop-filter: blur(10px);
        }
        .header-container {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
        }
        .badge {
          background: #fbbf24;
          color: #0d0d0d;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
      `}</style>
    </header>
  );
}