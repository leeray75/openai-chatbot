import { getDocumentById } from '@/app/libs/mongo-db/mongo-db';
const COLLECTION_NAME = "users";
async function getUserData({ sessionData }) {
    try {
        const documentId = sessionData?.userId ?? "";
        const user = await getDocumentById({ collectionName: COLLECTION_NAME, documentId });
        const data = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        return data;
    } catch (error) {
        console.error("[error] message:", error.message);
        throw error;

    }

}

export default getUserData