"use server";
import { NextResponse } from 'next/server'

const url = require('url');

export async function middleware(request) {
    
    const requestPathname = url.parse(request.url,true).pathname
    console.log("[middleware] requestPathname: ",requestPathname);
    if (requestPathname !== "/") {
        try {
            const userToken = request.cookies.get(process.env.JWT_COOKIE_NAME)?.value
            if (userToken == null || userToken == "") {
                return NextResponse.redirect(new URL('/user/login', request.url))
            }
        } catch (error) {
            console.error("[middleware][error] message:", error.message);
        }
    }
}

export const config = {
    matcher: ['/((?!api|user|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}

export const sessionOptions = {
    cookieName: process.env.JWT_COOKIE_NAME,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    }
}