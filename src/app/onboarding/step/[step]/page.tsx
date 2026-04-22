'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const roles = [
  { id: 'media-buyer', emoji: '🎯', title: 'Media Buyer / Performance Marketer', desc: 'I run paid ads and need to know what\'s working' },
  { id: 'agency', emoji: '🏢', title: 'Marketing Agency', desc: 'I manage campaigns for multiple clients' },
  { id: 'brand', emoji: '🛍️', title: 'Brand / DTC Owner', desc: 'I need to watch what competitors are doing' },
  { id: 'manager', emoji: '📊', title: 'Marketing Manager', desc: 'I oversee strategy and need competitive intelligence' },
];

export default function OnboardingStep1() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      router.push('/onboarding/step/2');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="12" r="2"/>
            </svg>
          </div>
        </Link>
        <Link href="/dashboard" className="text-[#64748B] hover:text-[#0A0A0A] text-sm font-medium">
          Skip onboarding →
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded-full ${
                    step === 1 ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'
                  }`}
                />
              ))}
            </div>
            <p className="text-[#64748B] text-sm mb-2">Step 1 of 4</p>
            <h1 className="text-3xl font-bold text-[#0A0A0A]">How would you describe yourself?</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-6 rounded-2xl text-left transition-all ${
                  selectedRole === role.id
                    ? 'bg-[#EFF6FF] border-2 border-[#2563EB]'
                    : 'bg-white border-2 border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                <span className="text-3xl mb-3 block">{role.emoji}</span>
                <h3 className="font-semibold text-[#0A0A0A] mb-1">{role.title}</h3>
                <p className="text-sm text-[#64748B]">{role.desc}</p>
                {selectedRole === role.id && (
                  <div className="mt-3 w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="w-full"
          >
            Continue →
          </Button>
        </div>
      </main>
    </div>
  );
}
