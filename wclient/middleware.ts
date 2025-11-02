/**
 * Next.js Middleware for Route Protection
 * Protects /lab/* routes and handles authentication redirects
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookies
  const authToken = request.cookies.get('auth_token')?.value;

  // Check if user is trying to access protected /lab/* routes
  if (pathname.startsWith('/lab')) {
    if (!authToken) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Check if authenticated user is trying to access auth pages
  if (pathname === '/auth/login' || pathname === '/auth/register') {
    if (authToken) {
      // Redirect to dashboard if already authenticated
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on - only specific protected routes
export const config = {
  matcher: [
    '/lab/:path*',      // Protect all /lab routes
    '/auth/login',      // Handle authenticated users on login page
    '/auth/register',   // Handle authenticated users on register page
  ],
};
