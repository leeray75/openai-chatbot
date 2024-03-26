'use server'
import OpenAI from 'openai';

import getSessionData from '@/app/utils/get-session-data';

import { updateDocument, getOneDocument, saveDocument } from '@/app/libs/mongo-db/mongo-db';


const OPENAI_CONFIG = {
    //organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
}
//const MODEL = 'gpt-3.5-turbo';
const MODEL = 'gpt-4';
const COLLECTION_NAME = "conversations";
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function GET(request, { params }) {
    const { id } = params;
    console.log("[api][open-ai][chat][id][route](GET) id:", id);
    const userData = await getSessionData(request);
    console.log("[api][open-ai][chat][route](GET) userData:\n", userData);
    const { userId } = userData;
    const filter = {
        "user-id": userId,
        "conversation-id": id
    }
    const document = await getOneDocument({ collectionName: COLLECTION_NAME, filter });
    return Response.json(document);
}

export async function HEAD(request) { }

export async function POST(request, { params }) {
    const { id } = params;
    const userData = await getSessionData(request);
    console.log("[api][open-ai][chat][route](POST) userData:\n", userData);
    const { userId } = userData;
    //console.log("[api][open-ai][chat][id][route](POST) id:", id);
    const filter = {
        "user-id": userId,
        "route-id": id
    }
    const promises = [request.json(), getOneDocument({ collectionName: COLLECTION_NAME, filter })];

    const [json, document] = await Promise.all(promises)

    const { content } = json;
    const { messages = [] } = document ?? {};

    const userMessage = {
        timestamp: new Date().getTime(),
        role: 'user',
        content
    }
    const chatMessages = [...messages, userMessage];
    const formatMessages = chatMessages.map(({ role, content }) => {
        return {
            role,
            content
        }
    });

    // Call OpenAI API
    const openai = new OpenAI(OPENAI_CONFIG);
    const chatCompletion = await openai.chat.completions.create({
        messages: formatMessages,
        model: MODEL,
    });
    //console.log("[api][open-ai][chat][id][route](POST)(promise) chatCompletion:\n", chatCompletion);
    const { message: aiMessage = {} } = chatCompletion.choices[0];
    const newAiMessage = {
        type: "text",
        timestamp: new Date().getTime(),
        response: chatCompletion,
        ...aiMessage
    }
    const newMessages = [...chatMessages, newAiMessage]

    if (document == null && chatCompletion.choices.length > 0) {

        const payload = {
            collectionName: COLLECTION_NAME,
            document: {
                "route-id": id,
                "user-id": userId,
                "conversations": newMessages
            },
            uniqueProperty: 'route-id'
        }
        await saveDocument(payload);

    }
    else if (document != null) {
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

    //console.log("[api][open-ai][chat][id][route](POST)(promise) responseJson:\n", responseJson);

    const responseData = await getOneDocument({ collectionName: COLLECTION_NAME, filter });
    return Response.json(responseData);
}

export async function PUT(request) { }

export async function DELETE(request) { }

export async function PATCH(request) { }

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request) { }