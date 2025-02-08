import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://ugdgmtqgofvweaydjaxi.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Test the connection immediately
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error.message);
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