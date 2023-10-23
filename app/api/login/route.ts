import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

const backendUrl = process.env.BACKEND_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const responseFromBackend = await axios.post(
      `${backendUrl}/api/v1/auth/signin`,
      {
        email: body.email,
        password: body.password,
      }
    );

    if (responseFromBackend.status === 200) {
      const backendToken = responseFromBackend.data.token;
      const response = NextResponse.json(
        { success: true },
        { status: 200, headers: { 'content-type': 'application/json' } }
      );

      cookies().set({
        name: 'token',
        value: backendToken,
        path: '/',
        sameSite: 'lax',
        secure: true,
      });
      return response;
    }

    return NextResponse.json({ success: false });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}
