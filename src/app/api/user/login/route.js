'use server'

import { getOneDocument } from '@/app/libs/mongo-db/mongo-db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

const COLLECTION_NAME = "users";
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function POST(req, { params }) {
    const json = await req.json();
    const { email, password } = json;
    const filter = { email }
    const user = await getOneDocument({ collectionName: COLLECTION_NAME, filter });
    if (!user) {
        throw new Error('Invalid credentials');

    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    cookies().set(process.env.JWT_COOKIE_NAME, token)
    console.log("[api][user][login][route](POST) cookie name: ",process.env.JWT_COOKIE_NAME)
    console.log("[api][user][login][route](POST) cookie value: ",token)
    return Response.json({
        token,
        id: user._id
    });

}

