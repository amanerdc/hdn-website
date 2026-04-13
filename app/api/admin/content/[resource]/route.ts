import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  createAdminResourceItem,
  deleteAdminResourceItem,
  updateAdminResourceItem,
} from '@/lib/admin-content';
import { adminResourceDefinitions, type ResourceKey } from '@/lib/admin-resources';
import { getAdminSessionCookieName, verifyAdminSessionToken } from '@/lib/admin-auth';

type RouteContext = {
  params: Promise<{
    resource: string;
  }>;
};

async function getResourceKey(context: RouteContext) {
  const { resource } = await context.params;

  if (!(resource in adminResourceDefinitions)) {
    return null;
  }

  return resource as ResourceKey;
}

async function ensureAdmin() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(getAdminSessionCookieName())?.value);
}

export async function POST(request: NextRequest, context: RouteContext) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const resource = await getResourceKey(context);
  if (!resource) {
    return NextResponse.json({ error: 'Unknown resource.' }, { status: 404 });
  }

  try {
    const item = await request.json();
    const created = await createAdminResourceItem(resource, item);
    return NextResponse.json({ item: created });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create item.' }, { status: 400 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const resource = await getResourceKey(context);
  if (!resource) {
    return NextResponse.json({ error: 'Unknown resource.' }, { status: 404 });
  }

  try {
    const item = await request.json();
    const updated = await updateAdminResourceItem(resource, item);
    return NextResponse.json({ item: updated });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update item.' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const resource = await getResourceKey(context);
  if (!resource) {
    return NextResponse.json({ error: 'Unknown resource.' }, { status: 404 });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing item id.' }, { status: 400 });
  }

  try {
    const typedId = resource === 'tesdaCourses' ? id : Number(id);
    await deleteAdminResourceItem(resource, typedId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to delete item.' }, { status: 400 });
  }
}
