import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('SUPABASE_URL or SUPABASE_KEY not set — some endpoints will fail until configured.');
}

export const supabase = (SUPABASE_URL && SUPABASE_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : new Proxy({}, {
    get() {
      throw new Error('Supabase client not configured. Set SUPABASE_URL and SUPABASE_KEY in environment.');
    },
    apply() {
      throw new Error('Supabase client not configured. Set SUPABASE_URL and SUPABASE_KEY in environment.');
    }
  });

export function requireSupabase() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase client not configured. Set SUPABASE_URL and SUPABASE_KEY in environment.');
  }
  return supabase;
}
