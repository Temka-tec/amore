import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/create(.*)"]);

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:css|js|mjs|png|jpg|jpeg|gif|svg|ico|webp|json|txt|map)).*)",
    "/(api|trpc)(.*)",
  ],
};
