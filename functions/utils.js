"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256 = sha256;
exports.getCookieKeyValue = getCookieKeyValue;
const constants_1 = require("./constants");
async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.prototype.map
        .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
        .join('');
}
async function getCookieKeyValue(password) {
    // Provide a default value if password is undefined
    const hash = await sha256(password ?? '');
    return `${constants_1.CFP_COOKIE_KEY}=${hash}`;
}
