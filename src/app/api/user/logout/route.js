import { cookies } from 'next/headers'
export async function GET(request, { params }) {
    try {

        const oneDay = 24 * 60 * 60 * 1000;
        const options = { expires: Date.now() - oneDay }
        cookies().set(process.env.JWT_COOKIE_NAME, '', options)
        const json = { success: true, message: `Cookie ${process.env.JWT_COOKIE_NAME} deleted successfully` };
        return Response.json(json);
    } catch (error) {
        console.error("[error] message:", error.message);
        return null;
    }

}