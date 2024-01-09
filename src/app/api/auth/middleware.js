import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check if the user is authenticated
  const session = await getSession({ req });
  const isAuthenticated = !!session;

  // Redirect logic
  if (isAuthenticated) {
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } else {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Continue to the original request if no redirects are needed
  return NextResponse.next();
});
