
import { createClient } from '@supabase/supabase-js';

// These are public keys that can be exposed in the client-side code
// For sensitive operations, use Supabase Edge Functions
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
