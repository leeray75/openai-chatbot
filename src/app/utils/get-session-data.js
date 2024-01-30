'use server'

import jwt from 'jsonwebtoken';
function getSessionData(req) {
    const token = req.cookies.get(process.env.JWT_COOKIE_NAME)?.value
    console.log("get-session-data] token:",token);
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

export default getSessionData;