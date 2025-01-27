import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export function middleware(req) {
  const cookies = parse(req.headers.get('cookie') || '');
  const authToken = cookies.authToken;
  const url = req.url;

  // Check if the user is trying to access login or register routes and if authenticated
  if ((url.includes('/login') || url.includes('/register')) && authToken) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect authenticated users to the dashboard
  }

  // Prevent unauthenticated users from accessing protected routes like /wishlist and /profile
  if ((url.includes('/wishlist') || url.includes('/profile')) && !authToken) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to login if not authenticated
  }

  // If no issues, proceed with internationalization middleware
  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ['/', '/(hi|en)/:path*'], // Protect /wishlist and /profile routes
};
