"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRequest = onRequest;
const utils_1 = require("./utils");
const template_1 = require("./template");
async function onRequest(context) {
    const { request, next, env } = context;
    const { pathname, searchParams } = new URL(request.url);
    const { error } = Object.fromEntries(searchParams);
    const cookie = request.headers.get('cookie') || '';
    const cookieKeyValue = await (0, utils_1.getCookieKeyValue)(env.CFP_PASSWORD);
    if (pathname === '/resources' && // Only protect the /about page
        !(cookie.includes(cookieKeyValue)) && // Check if cookie exists
        env.CFP_PASSWORD // Ensure password is set in environment
    ) {
        // Redirect to login if no valid cookie for /about
        return new Response((0, template_1.getTemplate)({ redirectPath: pathname, withError: error === '1' }), {
            headers: {
                'content-type': 'text/html',
                'cache-control': 'no-cache'
            }
        });
    }
    else {
        // Allow access to all other pages
        return await next();
    }
    //Comment
}
