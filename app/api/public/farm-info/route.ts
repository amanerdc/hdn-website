import { NextResponse } from 'next/server';
import { getFarmInfo } from '@/lib/site-content';

export async function GET() {
  const farmInfo = await getFarmInfo();
  return NextResponse.json({ farmInfo });
}
