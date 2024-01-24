'use server'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
export async function GET(request) {
    const id = uuidv4();
    redirect(`/chat/${id}`) // Navigate to the new post page
}