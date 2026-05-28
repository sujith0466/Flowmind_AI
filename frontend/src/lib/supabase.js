import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fail gracefully if env vars are missing (useful for mock/demo environments)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * Ensures an anonymous session exists so we can save workflows linked to a user.
 * Call this early in the app lifecycle (e.g., AppLayout).
 */
export async function ensureAnonymousSession() {
  if (!supabase) return null;
  
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (!session) {
    // If no session, sign in anonymously
    const { data, error: signInError } = await supabase.auth.signInAnonymously();
    if (signInError) {
      return null;
    }
    return data.session;
  }
  
  return session;
}
