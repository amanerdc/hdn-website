import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  createAdminSessionToken,
  getAdminSessionCookieName,
  getAdminSessionMaxAge,
} from '@/lib/admin-auth';
import { getSupabaseAuthClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const supabase = getSupabaseAuthClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(getAdminSessionCookieName(), createAdminSessionToken(data.user.email ?? data.user.id), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: getAdminSessionMaxAge(),
  });

  return NextResponse.json({ success: true });
}
