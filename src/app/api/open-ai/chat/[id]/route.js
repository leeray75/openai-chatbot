'use server'
import { getDocuments } from '../libs/mongo-db/mongo-db';

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function GET(request, { params }) {
    const { id } = params;
    console.log("[api][open-ai][chat][id](GET) id:",id);
    const documents = await getDocuments({ collectionName: "conversations"});
    return Response.json({ documents });
}
 
export async function HEAD(request) {}
 
export async function POST(req, res) {}
 
export async function PUT(request) {}
 
export async function DELETE(request) {}
 
export async function PATCH(request) {}
 
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request) {}