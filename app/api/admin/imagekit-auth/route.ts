import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionCookieName, verifyAdminSessionToken } from '@/lib/admin-auth';
import { getImageKitInstance } from '@/lib/imagekit';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(cookieStore.get(getAdminSessionCookieName())?.value);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
    if (!publicKey) {
      return NextResponse.json({ error: 'ImageKit public key is missing.' }, { status: 500 });
    }

    const folder = request.nextUrl.searchParams.get('folder') || 'general';
    const imagekit = getImageKitInstance();
    const auth = imagekit.helper.getAuthenticationParameters();

    return NextResponse.json({
      ...auth,
      publicKey,
      folder: `/hdn-integrated-farm/${folder}`,
    });
  } catch (error) {
    console.error('ImageKit auth error:', error);
    return NextResponse.json({ error: 'ImageKit is not configured.' }, { status: 500 });
  }
}
