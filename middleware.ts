import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const url = request.nextUrl;

  // Protect dashboard and projects routes
  if (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/projects')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  // Allow public access to published sites via subdomain
  // This will be handled by separate middleware in Phase 5

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/projects/:path*'],
};
