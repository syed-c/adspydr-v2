'use client';

import { SessionProvider } from 'next-auth/react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#F8F9FA]">
        <Sidebar />
        <Navbar />
        <main className="ml-60 pt-16">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SessionProvider>
  );
}
