import getSessionData from "@/app/utils/get-session-data";
export async function GET(request, { params }) {
    try {
        const userData = await getSessionData(request);
        console.log("[middleware] userData:\n", userData);
        return Response.json(document);
    } catch (error) {
        console.error("[error] message:", error.message);
        return null;
    }

}