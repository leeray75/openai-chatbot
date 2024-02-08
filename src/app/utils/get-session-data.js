'use server'

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
function getSessionData(request) {
    console.log("[get-session-data] cookies:\n", cookies())
    const token = cookies().get(process.env.JWT_COOKIE_NAME)?.value
    console.log("get-session-data] token:", token);
    if (token) {
        const promise = new Promise((resolve, reject) => {
            // Verify and decode the token
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log('[utils][get-session] error:\n', err);
                    reject(err);
                } else {
                    console.log('[utils][get-session] Decoded:\n', decoded);
                    resolve(decoded)
                }
            });
        })
        return promise;
    }
    else {
        return Promise.resolve(null)
    }
    

}

export default getSessionData;