import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Development fallback values that work without Supabase
const MOCK_MODE = true;

export const supabase = MOCK_MODE 
  ? null 
  : createClient<Database>(
      import.meta.env.VITE_SUPABASE_URL || '',
      import.meta.env.VITE_SUPABASE_ANON_KEY || ''
    );

// Helper to check if we're using mock data
export const isMockMode = () => MOCK_MODE;