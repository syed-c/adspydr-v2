'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const mainNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/spy', label: 'Spy Now', icon: '🔍' },
];

const intelligenceItems = [
  { href: '/competitors', label: 'Competitors', icon: '🎯' },
  { href: '/ads', label: 'Ad Library', icon: '📋' },
  { href: '/alerts', label: 'Alerts', icon: '🔔' },
  { href: '/reports', label: 'Reports', icon: '📊' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <aside className="w-60 bg-white border-r border-[#E2E8F0] flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logo-icon-light.svg" alt="Ads SpyDR" width={36} height={36} className="rounded-xl" />
          <span className="font-bold text-lg text-[#0A0A0A]">Ads SpyDR</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-2">
        <div className="mb-6">
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider px-3 mb-2">Main</p>
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-[#64748B] hover:bg-[#F8F9FA] hover:text-[#0A0A0A]'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider px-3 mb-2">Intelligence</p>
          <ul className="space-y-1">
            {intelligenceItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-[#64748B] hover:bg-[#F8F9FA] hover:text-[#0A0A0A]'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider px-3 mb-2">Account</p>
          <ul className="space-y-1">
            <li>
              <Link
                href="/account/settings"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/account')
                    ? 'bg-[#EFF6FF] text-[#2563EB]'
                    : 'text-[#64748B] hover:bg-[#F8F9FA] hover:text-[#0A0A0A]'
                }`}
              >
                <span>⚙️</span>
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-[#E2E8F0]">
        {session?.user && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-semibold">
              {session.user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#0A0A0A] truncate">{session.user.name}</p>
              <p className="text-xs text-[#64748B] capitalize">{(session.user as any)?.plan?.toLowerCase() || 'Free'} Plan</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
