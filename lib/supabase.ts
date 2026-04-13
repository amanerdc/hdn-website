import 'server-only';

import { createClient } from '@supabase/supabase-js';

export function hasSupabaseServerConfig() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function getSupabaseUrl() {
  const url = process.env.SUPABASE_URL;

  if (!url) {
    throw new Error('SUPABASE_URL is missing.');
  }

  return url;
}

function getSupabaseAuthKey() {
  const key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!key) {
    throw new Error('Supabase auth key is missing.');
  }

  return key;
}

export function getSupabaseServerClient() {
  const url = getSupabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase server configuration is missing.');
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function getSupabaseAuthClient() {
  return createClient(getSupabaseUrl(), getSupabaseAuthKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
