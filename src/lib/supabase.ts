import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://ugdgmtqgofvweaydjaxi.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add debug logging
console.log('Initializing Supabase client with:', {
  url: supabaseUrl,
  keyLength: supabaseAnonKey?.length || 0
});

// Create client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Supabase connected successfully');
  }
});

export const isMockMode = () => false;

// Mock auth functions if needed
if (false) {
  supabase.auth = {
    ...supabase.auth,
    signUp: async () => ({ data: { user: { email: 'mock@example.com' } }, error: null }),
    signInWithPassword: async () => ({ data: { user: { email: 'mock@example.com' } }, error: null }),
    signInWithOAuth: async () => ({ data: { user: { email: 'mock@example.com' } }, error: null }),
  } as any;
}