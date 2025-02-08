import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Change this to false to use real Supabase
const MOCK_MODE = false;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

console.log('Supabase URL:', supabaseUrl); // Debug log

// Ensure the URL has https:// prefix and no trailing spaces
const fullUrl = supabaseUrl.startsWith('http') 
  ? supabaseUrl.trim()
  : `https://${supabaseUrl.trim()}`;

console.log('Full URL:', fullUrl); // Debug log

export const supabase = MOCK_MODE 
  ? null 
  : createClient<Database>(fullUrl, supabaseAnonKey);

// Helper to check if we're using mock data
export const isMockMode = () => MOCK_MODE;