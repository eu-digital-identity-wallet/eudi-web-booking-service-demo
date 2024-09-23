import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateEnv } from "@/env.mjs";

export function middleware(request: NextRequest) {
  try {
    // Validate client-side environment variables
    validateEnv();
  } catch (error: any) {
    console.error(error.message);

    // Optionally, you can customize the response or redirect to an error page
    return new NextResponse(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Proceed with the request if validation passes
  return NextResponse.next();
}

// Configure the middleware to match all routes except for static files and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - /_next/image (image optimization files)
     * - /favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
