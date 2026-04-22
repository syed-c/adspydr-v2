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
        if (!supabase) {
          setError('Supabase not configured');
          return;
        }
        
        const { data, error: err } = await supabase.auth.getSession();
        
        if (err) {
          setError(err.message);
          return;
        }

        // Get current session
        const session = data?.session;
        
        if (session) {
          // Check if user profile exists
          const { data: user } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (!user) {
            // Create user profile
            await supabase
              .from('users')
              .insert({
                id: session.user.id,
                email: session.user.email,
                name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
                avatar_url: session.user.user_metadata?.avatar_url,
              });
          }

          router.push('/dashboard');
        } else {
          router.push('/auth/login?error=no_session');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('Authentication failed');
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#C4CBCA]">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-[#0A0F0D] mb-4">Authentication Error</h1>
          <p className="text-[#0A0F0D]">{error}</p>
          <a href="/auth/login" className="inline-block mt-4 px-6 py-3 bg-[#F95738] text-white rounded-lg">
            Back to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#C4CBCA]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#F95738] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#0A0F0D]">Authenticating...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#C4CBCA]">
        <p className="text-[#0A0F0D]">Loading...</p>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
