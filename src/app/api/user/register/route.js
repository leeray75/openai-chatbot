'use server'

import { getOneDocument, saveDocument } from '@/app/libs/mongo-db/mongo-db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
const COLLECTION_NAME = "users";
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function POST(req, { params }) {
    const json = await req.json();
    console.log("[api][user][register][route] json:\n", json);
    const { username, email, password } = json;

    try {
        const filter = {
            email
        }
        const existingUser = await getOneDocument({ collectionName: COLLECTION_NAME, filter });
        console.log("[api][user][register][route] existingUser:\n", existingUser);
        if (existingUser) {
            throw new Error('Email already registered');
        }
        console.log("[api][user][register][route] encrypting");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("[api][user][register][route] hashPassword:", hashedPassword);
        const doc = {
            username,
            email,
            password: hashedPassword,
        }
        const newUserObjectId = await saveDocument({
            collectionName: COLLECTION_NAME, document: doc,
            uniqueProperty: 'email'
        })
        console.log("[api][user][register][route] newUser:\n", newUserObjectId);
        const token = jwt.sign({ userId: newUserObjectId }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        cookies().set(process.env.JWT_COOKIE_NAME, token)
        return Response.json({
            token,
            id: newUserObjectId
        });
    } catch (error) {
        console.error("[api][user][register][route] error:\n", error.message);
        throw new Error('Internal server error');
    }

}

