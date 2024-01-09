// export { default } from "next-auth/middleware";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Dashboard from './app/(app)/dashboard/page';
// import { authOptions } from "./auth";
// import { getServerSession } from "next-auth";

export async function middleware(request: NextRequest) {
    const { url, nextUrl, cookies } = request;
    const { value: token } = cookies.get("next-auth.session-token") ?? { value: null };
    
    // console.log('=>', cookies, '=>', url)
    
    let pathname = nextUrl.pathname
    if(token){
        if(pathname === '/login' || pathname === '/register' || pathname === '/'){
            return NextResponse.redirect(new URL('/dashboard', url))
        }
    }else{
        if(pathname === '/dashboard' ){
            return NextResponse.redirect(new URL('/', url))
        }
    }

    // Allow other requests to proceed normally
    return NextResponse.next();
}

export const config = {
    // matcher: ['/((?!register|api|login).*)']
    matcher: ['/(.*)']
}