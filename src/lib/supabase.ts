import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Change this to false to use real Supabase
const MOCK_MODE = false;

// Use import.meta.env instead of process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = MOCK_MODE 
  ? null 
  : createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper to check if we're using mock data
export const isMockMode = () => MOCK_MODE;