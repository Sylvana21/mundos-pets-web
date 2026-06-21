import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Si las variables de entorno no están configuradas, exportamos null y
// la UI cae en modo "demo" (guarda en localStorage) en vez de tronar.
export const supabase = supabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
