import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { getAdminSessionCookieName, verifyAdminSessionToken } from '@/lib/admin-auth';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(cookieStore.get(getAdminSessionCookieName())?.value);

  if (session) {
    redirect('/admin/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f6fbf4_0%,#edf7f0_100%)] px-4">
      <AdminLoginForm />
    </div>
  );
}
