'use client';

import Image from 'next/image';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
      
      <div className="hidden lg:flex lg:w-[60%] bg-[#EFF6FF] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/60 rounded-3xl shadow-lg rotate-6 animate-pulse" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/40 rounded-3xl shadow-lg -rotate-4" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/50 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-[#2563EB] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl overflow-hidden">
            <Image src="/logo-wordmark-light.svg" alt="Ads SpyDR" width={96} height={96} className="scale-150" />
          </div>
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">See Every Ad. Win Every Campaign.</h2>
          <p className="text-lg text-[#64748B] max-w-md">
            Join thousands of marketers who use Ads SpyDR to spy on competitors and dominate their ad campaigns.
          </p>
          
          <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg max-w-sm mx-auto">
            <p className="text-sm text-[#64748B] italic">
              "This completely transformed how my team researches competitor campaigns. We now launch with confidence."
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-[#0A0A0A]">John D.</p>
                <p className="text-xs text-[#64748B]">Marketing Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
