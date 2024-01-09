// export { default } from "next-auth/middleware";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from "./app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function middleware(request: NextRequest) {
    const session = await getServerSession(authOptions);
    // const { pathname } = request.nextUrl;
    console.log('=>', request)
    // console.log("path", pathname)
    // if (session) {
    //     // Redirect authenticated users to /dashboard
    //     return NextResponse.redirect('/dashboard');
    // } else {
    //     // Redirect unauthenticated users to /login
    //     return NextResponse.redirect('/login');
    // }
    // return NextResponse.redirect(new URL('/home', request.url))
    const { pathname } = request.nextUrl;

    // Redirect to /dashboard if the request path matches your condition
    if (pathname === '/') { // Example: Redirect from the root path
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Allow other requests to proceed normally
    return NextResponse.next();
}

export const config = {
    // matcher: ['/((?!register|api|login).*)']
    matcher: ['/(.*)']
}