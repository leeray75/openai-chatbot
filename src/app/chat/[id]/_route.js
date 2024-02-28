'use server'
import { redirect } from 'next/navigation'
import getSessionData from '@/app/utils/get-session-data';
export async function GET(request) {
    try {
        const sessionData = await getSessionData()
        console.log("[chat][id][route.js] sessionData:\n",sessionData);
        if(sessionData == null) {
            redirect(`/user/login`) // Navigate to the new post page
        }
        else {
            return;
        }
        //console.log("[chat][id][route] sessionData:", sessionData);
    } catch (error) {
        //console.error("[chat][id][route] error:\n",error);
        redirect(`/user/login`) // Navigate to the new post page
    }
    
}