'use server'
import OpenAI from 'openai';

import getSessionData from '@/app/utils/get-session-data';

import { updateDocument, getOneDocument, saveDocument } from '@/app/libs/mongo-db/mongo-db';


const OPENAI_CONFIG = {
    //organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
}
//const MODEL = 'gpt-3.5-turbo';
const MODEL = 'dall-e-3';
const COLLECTION_NAME = "image-generation";
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function GET(request, { params }) {
    const { id } = params;
    console.log("[api][open-ai][chat][id][route](GET) id:", id);
    const userData = await getSessionData(request);
    console.log("[api][open-ai][chat][route](GET) userData:\n", userData);
    const { userId } = userData;
    const filter = {
        "user-id": userId,
        "images-id": id
    }
    const document = await getOneDocument({ collectionName: COLLECTION_NAME, filter });
    return Response.json(document);
}

export async function HEAD(request) { }

export async function POST(request, { params }) {
    const { id } = params;
    const userData = await getSessionData(request);
    console.log("[api][open-ai][image-generation][route](POST) userData:\n", userData);
    const { userId } = userData;
    //console.log("[api][open-ai][chat][id][route](POST) id:", id);
    const filter = {
        "user-id": userId,
        "images-id": id
    }
    const promises = [request.json(), getOneDocument({ collectionName: COLLECTION_NAME, filter })];

    const [json, document] = await Promise.all(promises)

    const { prompt } = json;
  
    // Call OpenAI API
    const openai = new OpenAI(OPENAI_CONFIG);
    const response = await openai.createImage({
        prompt,
        model: MODEL,
        n: 1,
        size: "1024x1024"
    });
    //console.log("[api][open-ai][chat][id][route](POST)(promise) chatCompletion:\n", chatCompletion);

    const payload = {
        collectionName: COLLECTION_NAME,
        document: {
            "images-id": id,
            "user-id": userId,
            "response": response
        },
        //uniqueProperty: 'images-id'
    }
    await saveDocument(payload);
    //console.log("[api][open-ai][chat][id][route](POST)(promise) responseJson:\n", responseJson);

    const responseData = await getOneDocument({ collectionName: COLLECTION_NAME, filter });
    return Response.json(responseData);
}

export async function PUT(request) { }

export async function DELETE(request) { }

export async function PATCH(request) { }

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request) { }