import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAdminSessionCookieName, verifyAdminSessionToken } from '@/lib/admin-auth';

export async function GET() {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(cookieStore.get(getAdminSessionCookieName())?.value);

  return NextResponse.json({
    authenticated: Boolean(session),
    username: session?.username ?? null,
  });
}
