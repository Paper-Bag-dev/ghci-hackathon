import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public (does NOT require Clerk session)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/guest-login",
  "/api/webhooks/(.*)",

  "/api/reminder/(.*)",
  "/api/ui/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js|json|jpg|jpeg|png|gif|svg|ico|woff2?|ttf)).*)",
    "/(api|trpc)(.*)",
  ],
};
