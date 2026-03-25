import { HEADER_URL_KEY } from '../common/constant.js';
import { NextResponse } from 'next/server';
export function proxy(request) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(HEADER_URL_KEY, request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.next({ request: { headers: requestHeaders } });
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
//# sourceMappingURL=proxy.js.map