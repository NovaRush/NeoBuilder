import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  return NextResponse.json({
    isHealthy: true,
    hasAuth: !!cookieStore.get('auth-token'),
  });
}
