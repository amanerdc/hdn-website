import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { getAllAdminContent } from '@/lib/admin-content';
import { getAdminSessionCookieName, verifyAdminSessionToken } from '@/lib/admin-auth';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(cookieStore.get(getAdminSessionCookieName())?.value);

  if (!session) {
    redirect('/admin');
  }

  const initialData = await getAllAdminContent();

  return <AdminDashboard initialData={initialData} email={session.username} />;
}
