import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)"], // Protect all routes except static files and _next
};
// This middleware ensures that all routes are protected by Clerk authentication,
// except for static files and Next.js internal routes.