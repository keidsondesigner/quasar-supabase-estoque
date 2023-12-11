import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lfcahrjpryrpfhahjmar.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmY2FocmpwcnlycGZoYWhqbWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMTc1NTgsImV4cCI6MjAxNzg5MzU1OH0.SCoTZA92DE9fsufvCjVPvD2yoZx_Q_Or68ewaGt4BEU';
const supabase = createClient(supabaseUrl, supabaseKey);
console.log('Supabase iniciado', supabase);

export default function useSupabase() {
  return { supabase };
}
