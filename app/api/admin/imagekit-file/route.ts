import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionCookieName, verifyAdminSessionToken } from '@/lib/admin-auth';
import { getImageKitInstance } from '@/lib/imagekit';

async function ensureAdmin() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(getAdminSessionCookieName())?.value);
}

export async function DELETE(request: NextRequest) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const fileUrl = String(payload?.fileUrl ?? '');

    if (!fileUrl) {
      return NextResponse.json({ error: 'Missing file URL.' }, { status: 400 });
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(fileUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid file URL.' }, { status: 400 });
    }

    if (!parsedUrl.hostname.includes('imagekit.io')) {
      return NextResponse.json({ error: 'Only ImageKit URLs can be deleted.' }, { status: 400 });
    }

    const pathname = decodeURIComponent(parsedUrl.pathname);
    const fileName = pathname.split('/').pop();

    if (!fileName) {
      return NextResponse.json({ error: 'Unable to determine file name from URL.' }, { status: 400 });
    }

    const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
    const folderPath = normalizedPath.includes('/') ? normalizedPath.slice(0, normalizedPath.lastIndexOf('/') + 1) : '/';

    const imagekit = getImageKitInstance();
    const files = (await imagekit.assets.list({ path: folderPath, searchQuery: `name = "${fileName}"`, limit: 50 })) as Array<{
      fileId: string;
      url?: string;
      filePath?: string;
      name?: string;
    }>;

    const candidate = files.find((file) => {
      if (file.url === fileUrl) return true;
      if (file.filePath && file.filePath === normalizedPath) return true;
      if (file.filePath && file.filePath.endsWith(`/${fileName}`) && normalizedPath.endsWith(`/${fileName}`)) return true;
      return false;
    });

    if (!candidate?.fileId) {
      return NextResponse.json({ error: 'Image not found in ImageKit.' }, { status: 404 });
    }

    await imagekit.deleteFile(candidate.fileId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('ImageKit delete error:', error);
    return NextResponse.json({ error: 'Unable to delete image from ImageKit.' }, { status: 500 });
  }
}
