import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error('JWT Secret key is not matched');
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: any) {
  const secretKey = getJwtSecretKey();
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error('JWT Verification failed:', error);
    return null;
  }
}

export async function GET() {
  const token = cookies().get('token')?.value || null;
  if (!token) {
    return new NextResponse(
      JSON.stringify({ authenticated: false, payload: null }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 401,
      }
    );
  }

  const payload = await verifyJwtToken(token);

  if (!payload) {
    return new NextResponse(
      JSON.stringify({ authenticated: false, payload: null }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 401,
      }
    );
  } else {
    return new NextResponse(JSON.stringify({ authenticated: true, payload }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  }
}
