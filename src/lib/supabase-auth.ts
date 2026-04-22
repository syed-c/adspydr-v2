import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { hash, compare } from 'bcryptjs';

let supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseAdmin) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabaseAdmin;
}

export async function createUser(email: string, password: string, name?: string) {
  const supabase = getSupabaseAdmin();
  
  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('Failed to create user');

  // Create user record in our public.users table
  const { error: userError } = await supabase.from('users').insert({
    id: authData.user.id,
    email,
    name: name || email.split('@')[0],
    password_hash: await hash(password, 12),
    role: 'USER',
    plan: 'FREE',
  });

  if (userError) throw userError;

  return authData.user;
}

export async function verifyPassword(user: { password_hash: string | null }, password: string) {
  if (!user.password_hash) return false;
  return compare(password, user.password_hash);
}

export async function getUserByEmail(email: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) return null;
  return data;
}

export async function getUserById(id: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function updateUser(id: string, updates: Record<string, any>) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  });

  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
  return data;
}

export async function verifyEmail(token: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: 'email',
  });

  if (error) throw error;
  return data;
}

export async function generateApiKey(userId: string, name: string) {
  const supabase = getSupabaseAdmin();
  const key = `adr_${crypto.randomUUID()}`;
  const keyHash = await hash(key, 12);
  const keyPrefix = key.slice(0, 8);

  const { data, error } = await supabase.from('api_keys').insert({
    user_id: userId,
    name,
    key_hash: keyHash,
    key_prefix: keyPrefix,
  }).select().single();

  if (error) throw error;
  return { ...data, key };
}

export async function verifyApiKey(key: string) {
  const supabase = getSupabaseAdmin();
  const keyHash = await hash(key, 12);

  const { data, error } = await supabase
    .from('api_keys')
    .select('*, users(*)')
    .eq('key_hash', keyHash)
    .is('revoked_at', null)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !data) return null;
  
  // Update last used
  await supabase.from('api_keys').update({ last_used: new Date().toISOString() }).eq('id', data.id);

  return data;
}
