'use client';

import { ReactNode, useState, useEffect } from 'react';
import MobileNav from '@/components/MobileNav';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="marketing-layout">
      {children}
      {isClient && <MobileNav />}
      
      <style>{`
        .marketing-layout {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}