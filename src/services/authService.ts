import { supabase } from '../lib/supabase';

const checkSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set up your environment variables.');
  }
  return supabase;
};

export const authService = {
  async signIn(email: string, password: string) {
    const { data, error } = await checkSupabase().auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await checkSupabase().auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await checkSupabase().auth.getUser();
    if (error) throw error;
    return user;
  },

  onAuthStateChange(callback: (user: any) => void) {
    return checkSupabase().auth.onAuthStateChange((_event, session) => {
      callback(session?.user || null);
    });
  }
};