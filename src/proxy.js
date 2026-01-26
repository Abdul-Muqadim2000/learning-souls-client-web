import { NextResponse } from "next/server";

// Note: Server-side middleware/proxy cannot access localStorage where tokens are stored.
// Route protection is handled client-side using the ProtectedRoute component.
// This proxy is disabled to prevent redirect loops.

export function proxy(request) {
  // Allow all requests to pass through
  // Client-side protection via ProtectedRoute component handles authentication
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon|images|.*\\..*$).*)",
  ],
};
