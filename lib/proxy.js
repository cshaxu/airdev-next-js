"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.proxy = proxy;
const server_1 = require("next/server");
function proxy(request) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.nextUrl.pathname + request.nextUrl.search);
    const response = server_1.NextResponse.next({ request: { headers: requestHeaders } });
    return response;
}
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
//# sourceMappingURL=proxy.js.map