import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Set to true for local development, false for production
const MOCK_MODE = true;

// Use import.meta.env instead of process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only check env vars if not in mock mode
if (!MOCK_MODE && (!supabaseUrl || !supabaseAnonKey)) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
  throw new Error('Missing Supabase environment variables');
}

// Ensure URL is properly formatted when not in mock mode
const fullUrl = MOCK_MODE 
  ? 'https://mock.supabase.co' 
  : (supabaseUrl.startsWith('http') ? supabaseUrl : `https://${supabaseUrl}`);

export const supabase = MOCK_MODE 
  ? null 
  : createClient<Database>(fullUrl, supabaseAnonKey);

// Helper to check if we're using mock data
export const isMockMode = () => MOCK_MODE;