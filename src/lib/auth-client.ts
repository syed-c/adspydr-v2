import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase: SupabaseClient | null = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type AppUser = {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: 'USER' | 'ADMIN';
  plan: 'FREE' | 'PRO' | 'AGENCY';
  team_id: string | null;
  onboarding_done: boolean;
  created_at: string;
};

export type Session = {
  user: AppUser;
  accessToken: string;
};

export async function signUp(email: string, password: string, name?: string) {
  if (!supabase) throw new Error('Supabase not configured');
  const result = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });
  if (result.error) throw result.error;
  return result.data;
}

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error('Supabase not configured');
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (result.error) throw result.error;
  return result.data;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getUser() {
  if (!supabase) throw new Error('Supabase not configured');
  const result = await supabase.auth.getUser();
  if (result.error) throw result.error;
  return result.data;
}
