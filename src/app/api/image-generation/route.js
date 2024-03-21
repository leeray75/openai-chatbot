"use server";
import OpenAI from "openai";
import { getDocuments } from "../../libs/mongo-db/mongo-db";
import getSessionData from "@/app/utils/get-session-data";
const COLLECTION_NAME = "image-generation";
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function GET(request) {
  try {
    const userData = await getSessionData(request);
    console.log("[api][conversations][route](GET) userData:\n", userData);
    const { userId } = userData;

    const filter = {
      "user-id": userId,
    };
    const document = await getDocuments({
      collectionName: COLLECTION_NAME,
      filter,
    });
    return Response.json(document);
  } catch (error) {
    console.error("[api][conversations][route](GET) error:\n",error);
    throw error;
  }
}

export async function HEAD(request) {}

export async function POST(req, { params }) {}

export async function PUT(request) {}

export async function DELETE(request) {}

export async function PATCH(request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request) {}
