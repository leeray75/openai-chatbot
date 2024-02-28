'use server'

import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid';
import getSessionData from '@/app/utils/get-session-data';
export async function GET(request) {
    let redirectUrl = '/';
    try {
        const sessionData = await getSessionData()
        console.log("[chat][route.js] sessionData:\n",sessionData);
        if(sessionData == null) {
            redirectUrl = `/user/login`; // Navigate to the new post page
        }
        else {
            const id = uuidv4();
            console.log("[chat][route](redirect) id:",id);
            redirectUrl = `/chat/${id}` // Navigate to the new post page
        }
        //console.log("[chat][id][route] sessionData:", sessionData);
    } catch (error) {
        console.error("[chat][route] error:\n",error);
        //redirect(`/user/login`) // Navigate to the new post page
    }
    return NextResponse.redirect(new URL(redirectUrl, request.url))
    
}