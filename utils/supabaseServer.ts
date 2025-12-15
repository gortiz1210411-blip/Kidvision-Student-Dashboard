// utils/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase environment variables. Ensure `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`) are set.",
    );
  }

  return createClient(url, serviceKey);
}
