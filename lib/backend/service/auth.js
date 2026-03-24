import { HEADER_CURRENT_USER_ID_KEY } from '@/config/public';
import { NextResponse } from 'next/server';
async function become(request) {
    const { userId } = await request.json();
    const response = NextResponse.json({ code: 200, data: { userId } }, { status: 200 });
    // become user
    if (userId === null) {
        response.cookies.delete(HEADER_CURRENT_USER_ID_KEY);
    }
    else {
        response.cookies.set(HEADER_CURRENT_USER_ID_KEY, userId);
    }
    return response;
}
const AuthService = { become };
export default AuthService;
//# sourceMappingURL=auth.js.map