import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isMockMode = () => import.meta.env.VITE_MOCK_AUTH === 'true';

// Create client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    // Use site URL from Supabase dashboard instead of manual redirect
    // This will respect the URL you set in your Supabase project settings
  }
});

// Test the connection immediately
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error.message);
  } else {
    console.log('Supabase connected successfully');
  }
});

// Mock auth functions if needed
if (false) {
  supabase.auth = {
    ...supabase.auth,
    signUp: async () => ({ data: { user: { email: 'mock@example.com' } }, error: null }),
    signInWithPassword: async () => ({ data: { user: { email: 'mock@example.com' } }, error: null }),
    signInWithOAuth: async () => ({ data: { user: { email: 'mock@example.com' } }, error: null }),
  } as any;
}