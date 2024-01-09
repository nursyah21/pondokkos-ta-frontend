export { default } from "next-auth/middleware";
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth";

export async function middleware(request) {
    const session = await getServerSession(authOptions);
    const { pathname } = request.nextUrl;

    console.log('sdsad')
    if (session) {
        // Redirect authenticated users to /dashboard
        return NextResponse.redirect(new URL('/dashboard', req.url));
    } else {
        // Redirect unauthenticated users to /login
        return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
    // matcher: ['/((?!register|api|login).*)']
    matcher: ['/.*']
}