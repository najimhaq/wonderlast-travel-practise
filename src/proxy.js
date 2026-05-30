// This file is used to protect the /my-bookings route and its sub-routes. If the user is not authenticated, they will be redirected to the login page.
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from './app/lib/auth';

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/my-bookings/:path*', '/add-destination', '/destinations/:path*'],
};
