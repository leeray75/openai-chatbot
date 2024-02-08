"use server";
import { NextResponse } from 'next/server'

import getSessionData from '@/app/utils/get-session-data'
export async function middleware(request) {
    try {
        const userToken = request.cookies.get(process.env.JWT_COOKIE_NAME)?.value
        console.log("[middleware] userToken:\n", userToken);
        if (userToken == null || userToken == "") {
            console.log("[middleware] redirect to login");
            return NextResponse.redirect(new URL('/user/login', request.url))
        }
    } catch (error) {
        console.error("[middleware][error] message:", error.message);
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