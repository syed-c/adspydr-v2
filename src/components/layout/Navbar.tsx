'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

interface Notification {
  id: string;
  title: string;
  body: string;
  readAt: Date | null;
  createdAt: Date;
}

export function Navbar() {
  const { data: session } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const notifications: Notification[] = [];
  const unreadCount = 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 fixed top-0 left-60 right-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-[#0A0A0A]">
          {getGreeting()}, {session?.user?.name?.split(' ')[0] || 'there'} 👋
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex items-center gap-2 text-[#64748B] bg-[#F8F9FA] px-4 py-2 rounded-lg text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search competitors, ads..." 
              className="bg-transparent border-none outline-none w-48 placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-[#64748B] hover:text-[#0A0A0A] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-[#E2E8F0] overflow-hidden">
              <div className="p-4 border-b border-[#E2E8F0]">
                <h3 className="font-semibold text-[#0A0A0A]">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-[#64748B] text-sm">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-[#E2E8F0] hover:bg-[#F8F9FA] cursor-pointer">
                      <p className="text-sm font-medium text-[#0A0A0A]">{notification.title}</p>
                      <p className="text-xs text-[#64748B] mt-1">{notification.body}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {session?.user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E2E8F0] overflow-hidden">
              <div className="p-2">
                <Link
                  href="/account/settings"
                  className="block px-4 py-2 text-sm text-[#0A0A0A] hover:bg-[#F8F9FA] rounded-lg"
                >
                  Settings
                </Link>
                <Link
                  href="/account/billing"
                  className="block px-4 py-2 text-sm text-[#0A0A0A] hover:bg-[#F8F9FA] rounded-lg"
                >
                  Billing
                </Link>
                <hr className="my-2 border-[#E2E8F0]" />
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="block w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-[#F8F9FA] rounded-lg"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
