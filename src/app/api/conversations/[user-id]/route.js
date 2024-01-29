'use server'
import OpenAI from 'openai';
import { getDocuments } from '../../libs/mongo-db/mongo-db';

const COLLECTION_NAME = "conversations";
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function GET(request, { params }) {
    const { "user-id": userId } = params
    //console.log("[api][conversations][route](GET)");
    const filter = {
        "user-id": userId
    }
    const document = await getDocuments({ collectionName: COLLECTION_NAME, filter });
    return Response.json(document);
}

export async function HEAD(request) { }

export async function POST(req, { params }) {}

export async function PUT(request) { }

export async function DELETE(request) { }

export async function PATCH(request) { }

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request) { }