'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  const isDashboard = pathname?.startsWith('/dashboard');

  const navItems = isDashboard
    ? [
        { href: '/dashboard', label: 'Home', icon: '🏠' },
        { href: '/dashboard/spy', label: 'Spy', icon: '🔍' },
        { href: '/dashboard/competitors', label: 'Competitors', icon: '🏢' },
        { href: '/dashboard/reports', label: 'Reports', icon: '📊' },
        { href: '/dashboard/account', label: 'Account', icon: '👤' },
      ]
    : [
        { href: '/', label: 'Home', icon: '🏠' },
        { href: '/features', label: 'Features', icon: '⚡' },
        { href: '/pricing', label: 'Pricing', icon: '💰' },
        { href: '/blog', label: 'Blog', icon: '📝' },
      ];

  return (
    <nav className="mobile-nav">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`mobile-nav-item ${pathname === item.href ? 'active' : ''}`}
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          <span className="mobile-nav-label">{item.label}</span>
        </Link>
      ))}

      <style>{`
        .mobile-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid #e5e5e5;
          display: flex;
          justify-content: space-around;
          padding: 8px 0;
          z-index: 1000;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        }
        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-decoration: none;
          color: #6b6b6b;
          padding: 8px 12px;
          border-radius: 8px;
        }
        .mobile-nav-item.active {
          color: #0d0d0d;
        }
        .mobile-nav-icon {
          font-size: 1.2rem;
        }
        .mobile-nav-label {
          font-size: 0.7rem;
          font-weight: 500;
        }
      `}</style>
    </nav>
  );
}