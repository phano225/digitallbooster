import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Bullet-proof client creator to prevent crashes if environment variables 
// are missing or stripped during static page prerendering at build-time.
export const supabase = (function() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase env keys not found! Using mock client for static build safety.");
    
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: new Error("Supabase is not configured") })
          })
        }),
        update: () => ({
          eq: async () => ({ data: null, error: new Error("Supabase is not configured") })
        })
      }),
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ data: { user: null, session: null }, error: new Error("Supabase is not configured") }),
        signOut: async () => ({ error: null })
      },
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: new Error("Supabase is not configured") }),
          getPublicUrl: () => ({ data: { publicUrl: "" } })
        })
      }
    } as any;
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
})();
