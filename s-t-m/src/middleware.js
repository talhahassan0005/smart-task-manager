import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/',                         // Protect homepage
    '/api/(.*)',                 // Protect API routes
    '/((?!_next|.*\\..*).*)',    // Skip static files like .js/.png
  ],
};
