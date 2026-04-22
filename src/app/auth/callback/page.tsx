'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/auth-client';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { error: err } = await supabase?.auth.getSession();
        
        if (err) {
          setError(err.message);
          return;
        }

        // Get current session
        const { data: { session } } = await supabase?.auth.getSession();
        
        if (session) {
          // Check if user profile exists
          const { data: user } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (user?.onboarding_done) {
            router.push('/dashboard');
          } else {
            router.push('/onboarding');
          }
        } else {
          router.push('/auth/login');
        }
      } catch (err: any) {
        setError(err.message || 'Authentication failed');
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#EF4444] mb-4">Authentication Failed</h1>
          <p className="text-[#64748B] mb-4">{error}</p>
          <a href="/auth/login" className="text-[#2563EB] hover:underline">
            Try again
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#64748B]">Completing sign in...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#64748B]">Loading...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
