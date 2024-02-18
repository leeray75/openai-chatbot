import getSessionData from "@/app/utils/get-session-data";
import { getDocumentById } from '@/app/libs/mongo-db/mongo-db';
const COLLECTION_NAME = "users";
export async function GET(request, { params }) {
    console.log("[api][user][route](GET)");
    try {
        const userData = await getSessionData(request);
<<<<<<< HEAD
        console.log("[middleware] userData:\n", userData);
        const documentId = userData?.userId ?? "";
        const user = await getDocumentById({ collectionName: COLLECTION_NAME, documentId });
        const data = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        return Response.json(data);
    } catch (error) {
        console.error("[error] message:", error.message);
        return new Response(JSON.stringify({
            status: 401,
            message: error.message
        }),
            {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
=======
        console.log("[api][user][route](GET) userData:\n", userData);
        return Response.json(userData);
    } catch (error) {
        console.error("[error] message:", error.message);
        return Response.error(error);
>>>>>>> 8b5b571 (PPV-8: fix JWT token expiration handler)
    }

}