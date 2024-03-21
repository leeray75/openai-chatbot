'use server'
import OpenAI from 'openai';

import getSessionData from '@/app/utils/get-session-data';

import { updateDocument, getOneDocument, saveDocument } from '@/app/libs/mongo-db/mongo-db';


const OPENAI_CONFIG = {
    //organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
}
//const MODEL = 'gpt-3.5-turbo';
const MODEL = 'dall-e-2';
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
        "route-id": id
    }
    const document = await getOneDocument({ collectionName: COLLECTION_NAME, filter });
    return Response.json(document);
}

export async function HEAD(request) { }

export async function POST(request, { params }) {
    const timestamp = new Date().getTime();
    const { id } = params;
    const userData = await getSessionData(request);
    console.log("[api][open-ai][image-generation][route](POST) userData:\n", userData);
    const { userId } = userData;
    //console.log("[api][open-ai][chat][id][route](POST) id:", id);
    const filter = {
        "user-id": userId,
        "route-id": id
    }
    const promises = [request.json(), getOneDocument({ collectionName: COLLECTION_NAME, filter })];

    const [json, document] = await Promise.all(promises)

    const { prompt } = json;
    console.log("prompt:",prompt);
    const userMessage = {
        type: 'text',
        timestamp: new Date().getTime(),
        role: 'user',
        content: prompt
    }
    const { messages = [] } = document ?? {};
  

    // Call OpenAI API
    const openai = new OpenAI(OPENAI_CONFIG);
    const config = {
        prompt,
        model: MODEL,
        n: 1,
        size: "256x256",
        response_format: "b64_json",
        style: "vivid"
    }
    const response = await openai.images.generate(config);
    //console.log("[api][open-ai][chat][id][route](POST)(promise) chatCompletion:\n", chatCompletion);

    
    const newAiMessage = {
        role: "openai",
        type: "image",
        model: MODEL,
        timestamp: new Date().getTime(),
        config,
        response,
        images: response.data.map( image => {
            return {
                src: image.url ?? image.b64_json
            }
        })
        
    }
    const newMessages = [...messages, userMessage, newAiMessage];

    if (document == null && response.data.length > 0) {

        const payload = {
            collectionName: COLLECTION_NAME,
            document: {
                "route-id": id,
                "user-id": userId,
                "messages": newMessages
            },
            uniqueProperty: 'route-id'
        }
        await saveDocument(payload);

    }
    else if(document != null) {
        const payload = {
            _id: document._id,
            collectionName: COLLECTION_NAME,
            updatedData: {
                "messages": newMessages
            }
        }
        console.log("[api][open-ai][chat][id][route](POST)(promise) updateDocument - payload:\n", payload);
        await updateDocument(payload);
    }

    const responseData = await getOneDocument({ collectionName: COLLECTION_NAME, filter });
    return Response.json(responseData);
}

export async function PUT(request) { }

export async function DELETE(request) { }

export async function PATCH(request) { }

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request) { }