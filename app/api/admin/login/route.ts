import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  createAdminSessionToken,
  getAdminSessionCookieName,
  getAdminSessionMaxAge,
  isAdminCredentialsValid,
} from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password || !isAdminCredentialsValid(username, password)) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(getAdminSessionCookieName(), createAdminSessionToken(username), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: getAdminSessionMaxAge(),
  });

  return NextResponse.json({ success: true });
}
