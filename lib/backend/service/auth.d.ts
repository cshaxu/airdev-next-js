import { BecomeBody } from '../../common/types/context.js';
import { CommonResponse } from '@airent/api';
import { NextRequest, NextResponse } from 'next/server';
declare function become(request: NextRequest): Promise<NextResponse<CommonResponse<BecomeBody, Error>>>;
declare const AuthService: {
    become: typeof become;
};
export default AuthService;
