/**
 * Next.js Middleware for Route Protection
 * Protects /lab/* routes and handles authentication redirects
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookies or check for stored token
  // Note: In browser, tokens are in localStorage. For middleware (server-side),
  // we need to use cookies or headers. You might need to modify AuthContext
  // to also store tokens in httpOnly cookies for better security.
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

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
