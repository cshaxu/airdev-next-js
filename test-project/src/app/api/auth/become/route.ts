import { HEADER_CURRENT_USER_ID_KEY } from '@/common/config';
import { CommonResponse } from '@airent/api';
import { NextRequest, NextResponse } from 'next/server';

type BecomeBody = { userId: string | null };

export async function POST(
  request: NextRequest
): Promise<NextResponse<CommonResponse<BecomeBody, Error>>> {
  const { userId } = await request.json();
  const response = NextResponse.json(
    { code: 200, data: { userId } },
    { status: 200 }
  );
  // become user
  if (userId === null) {
    response.cookies.delete(HEADER_CURRENT_USER_ID_KEY);
  } else {
    response.cookies.set(HEADER_CURRENT_USER_ID_KEY, userId);
  }
  return response;
}
