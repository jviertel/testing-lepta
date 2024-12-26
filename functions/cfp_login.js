"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRequestPost = onRequestPost;
const constants_1 = require("./constants");
const utils_1 = require("./utils");
async function onRequestPost(context) {
    const { request, env } = context;
    const body = await request.formData();
    const { password, redirect } = Object.fromEntries(body);
    const hashedPassword = await (0, utils_1.sha256)(password.toString());
    if (!env.CFP_PASSWORD) {
        // Handle the case where CFP_PASSWORD is undefined
        return new Response('Password not set in environment', { status: 500 });
    }
    const hashedCfpPassword = await (0, utils_1.sha256)(env.CFP_PASSWORD);
    const redirectPath = redirect.toString() || '/';
    if (hashedPassword === hashedCfpPassword) {
        const cookieKeyValue = await (0, utils_1.getCookieKeyValue)(env.CFP_PASSWORD);
        return new Response('', {
            status: 302,
            headers: {
                'Set-Cookie': `${cookieKeyValue}; Max-Age=${constants_1.CFP_COOKIE_MAX_AGE}; Path=/; HttpOnly; Secure`,
                'Cache-Control': 'no-cache',
                Location: redirectPath
            }
        });
    }
    else {
        return new Response('', {
            status: 302,
            headers: {
                'Cache-Control': 'no-cache',
                Location: `${redirectPath}?error=1`
            }
        });
    }
}
