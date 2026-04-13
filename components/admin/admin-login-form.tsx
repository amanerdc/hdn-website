'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(payload?.error ?? 'Unable to sign in.');
        return;
      }

      router.replace('/admin/dashboard');
      router.refresh();
    } catch {
      setError('Unable to sign in right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader><CardTitle className="text-3xl">Admin Login</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Username</label><Input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Admin username" required /></div>
          <div><label className="mb-2 block text-sm font-semibold text-foreground">Password</label><Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required /></div>
          {error ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign in'}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
