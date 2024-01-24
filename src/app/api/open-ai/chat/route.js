'use server';
import OpenAI from 'openai';

const OPENAI_CONFIG = {
    //organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
}
console.log("[api][open-ai][chat][route] OPENAI_CONFIG:\n",OPENAI_CONFIG);

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export async function GET(request) {}
 
export async function HEAD(request) {}
 
export async function POST(req, res) {
    //console.log("[api][open-ai][chat][POST] req:", req);
    try {
        const json = await req.json();
        console.log("[api][open-ai][chat][route] json:", json);
  
        // Call OpenAI API
        const openai = new OpenAI(OPENAI_CONFIG);
        const message = { role: 'user', content: json.text };
        console.log("[api][open-ai][chat][route](POST) message:\n",message);
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: json.text }],
            model: 'gpt-3.5-turbo',
        });
        const responseJson = { text: chatCompletion.choices[0]?.message?.content || 'No Response' }
        return Response.json(responseJson); //;
    } catch (error) {
        console.error('[api][open-ai][chat][POST] Error sending message to OpenAI:', error.message);
        throw new Error({ error: 'Internal Server Error' })
    }
}
 
export async function PUT(request) {}
 
export async function DELETE(request) {}
 
export async function PATCH(request) {}
 
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request) {}